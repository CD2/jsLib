import { observable, action, computed, toJS, reaction } from "mobx"

export default class TagsStore {
  constructor(component, props) {
    this.component = component
    this.props = props
  }

  @observable tags = []
  @observable current_tag = null
  @observable suggestions = []
  @observable popularSuggestions = []
  @observable filterText = ``
  @observable dropdownHighlight = 0
  @observable mouseOverPopover = false

  NEW_INPUT = `new/text/input`

  onMount = props => {
    this.setVals(props, `tags`, `value`)
    this.setVals(props, `suggestions`)
    this.setVals(props, `popularSuggestions`)
    props.onChange({ name: props.name, value: this.getTagsFormat(props) })

    reaction(
      () => this.tags.map(tag => tag),
      () => {
        props.onChange({ name: props.name, value: this.getTagsFormat(props) })
      },
    )
  }

  @computed
  get allSuggestions() {
    return Array.from(new Set(toJS(this.suggestions), toJS(this.popularSuggestions)))
  }

  getFilteredSuggestions = (suggestions, filter = false) => {
    const nonSelected = suggestions.filter(suggestion => {
      return !this.tags.find(val => val.toUpperCase() === suggestion.toUpperCase())
    })

    if (filter && this.filterText) {
      return nonSelected.filter(suggestion => {
        return suggestion.toUpperCase().indexOf(this.filterText) !== -1
      })
    }

    return nonSelected
  }

  @computed
  get filteredSuggestions() {
    return this.getFilteredSuggestions(this.suggestions, true)
  }

  @computed
  get filteredPopularSuggestions() {
    return this.getFilteredSuggestions(this.popularSuggestions)
  }

  @computed
  get currentTagIndex() {
    return this.tags.findIndex(tag => tag === this.current_tag)
  }

  getTagsFormat = props => {
    const { format } = props

    if (format === `name`) return toJS(this.tags)

    const tags = this.getTagObjects(props)

    if (format === `object`) return tags
    if (format === `id`) return tags.map(tag => tag.id)
  }

  @action
  getTagObjects = props => {
    const { suggestions, popularSuggestions } = props
    const mapedToPopularSuggestions = this.tags.map(
      tag =>
        popularSuggestions.find(sug => {
          return sug.name && sug.name.toUpperCase() === tag
        }) || tag,
    )
    const mapedToSuggestions = mapedToPopularSuggestions.map(tag => {
      if (typeof tag === `string`) {
        const found = suggestions.find(sug => {
          return sug.name && sug.name.toUpperCase() === tag.toUpperCase()
        })

        if (found) return found
      }

      return { id: null, name: tag }
    })

    return mapedToSuggestions
  }

  @action
  setVals = (props, name, fromNameRaw = null) => {
    const { format } = props

    let fromName = fromNameRaw || name
    if (format === `name`) this[name].replace(props[fromName])
    if (format === `object` || format === `id`) {
      this[name].replace(props[fromName].map(tag => tag.name))
    }
  }

  @action setMouseOver = (isMousedOver = true) => (this.mouseOverPopover = isMousedOver)

  @action
  handleInputBlur = (e, force = false) => {
    return (this.current_tag = null)
    e && e.preventDefault()
    if (!this.mouseOverPopover || force) {
      this.current_tag && this.handleInput()
      this.current_tag = null
      this.filterText = ``
    }
  }

  @action
  handleInputFocus = () => {
    if (!this.current_tag) this.current_tag = this.NEW_INPUT
  }

  handleChange = (value, e) => {
    const filteredForRepeats = value.reduce((filtered, tag) => {
      if (!filtered.find(found => tag === found)) {
        filtered.push(tag)
      }

      return filtered
    }, [])

    this.tags.replace(filteredForRepeats)
    this.filterText = ``
    if (this.component.textInput) this.component.textInput.value = ``
    e && this.handleInputBlur(e)
  }

  @action
  handleInput = (e = null) => {
    if (this.props.dropdown && e) {
      if (e.key === `ArrowUp` && this.dropdownHighlight > 0) this.dropdownHighlight -= 1
      if (e.key === `ArrowDown` && this.dropdownHighlight < this.filteredSuggestions.length) {
        this.dropdownHighlight += 1
        //this.popover.scrollTop = e.target.offsetTop
      }
      if (e.key === `Enter` && this.filteredSuggestions[this.dropdownHighlight]) {
        return this.handleChange(
          [...this.tags, this.filteredSuggestions[this.dropdownHighlight]],
          e,
        )
      }
    }

    if (!this.component.textInput) return
    const textValue = this.component.textInput && this.component.textInput.value

    if (textValue !== `` && (!e || e.key === `Enter` || e.key === `Tab` || e.key === `,`)) {
      // enter
      e && e.preventDefault()
      if (this.current_tag === this.NEW_INPUT) {
        let newValue = null

        if (this.props.onlyAllowSuggestions) {
          const allSuggestions = this.allSuggestions
          newValue = allSuggestions.find(sug => sug.toUpperCase() === textValue.toUpperCase())
        } else {
          newValue = textValue
        }

        if (newValue) this.handleChange([...this.tags, newValue], e)
      } else {
        const valueCopy = this.tags.slice()
        let newValue = null

        if (this.props.onlyAllowSuggestions) {
          newValue = this.allSuggestions.find(sug => sug.toUpperCase() === textValue.toUpperCase())
        } else {
          newValue = textValue
        }

        if (newValue) valueCopy[this.currentTagIndex] = newValue

        this.handleChange(valueCopy, e)
      }

      this.current_tag = null
    } else if (e && textValue === `` && e.key === `Backspace`) {
      this.handleRemoveTag(e)
    } else {
      this.props.updateSuggestions && this.props.updateSuggestions(textValue)
    }

    this.filterText =
      e && e.key === `Backspace`
        ? textValue.toUpperCase().substring(0, textValue.length - 1)
        : textValue.toUpperCase()
  }

  @action
  handleRemoveTag = (e = null, selectedTag = null) => {
    if (selectedTag !== null) {
      this.handleChange(this.tags.filter(tag => tag !== selectedTag), e)
    } else if (this.current_tag && this.current_tag !== this.NEW_INPUT) {
      const tagBeforeCurrent = this.tags.get(this.currentTagIndex - 1)
      const newTags = this.tags.filter(tag => tag !== this.current_tag)
      this.handleChange(newTags, e)

      if (tagBeforeCurrent) {
        return (this.current_tag = tagBeforeCurrent)
      }
    } else {
      if (this.tags.length > 0) return (this.current_tag = this.tags.get(this.tags.length - 1))
    }

    this.current_tag = null
  }

  handleAddTag = tag => this.handleChange([...this.tags.slice(), tag])

  @action
  handleTagClick = (e, tag) => {
    e.stopPropagation()
    if (this.props.onlyAllowSuggestions) {
      this.handleRemoveTag(e, tag)
    } else {
      this.current_tag = tag
    }
  }
}
