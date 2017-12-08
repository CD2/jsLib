import { observable, action, computed, toJS } from 'mobx'

class TagsStore {

  @observable tags = []
  @observable current_tag = null
  @observable suggestions = []
  @observable popularSuggestions = []
  @observable filterText = ``
  @observable dropdownHighlight = 0

  @computed get allSuggestions() {
    return Array.from(new Set(toJS(this.suggestions), toJS(this.popularSuggestions)))
  }

  getFilteredSuggestions = (suggestions, filter = false) => {
    const nonSelected =  suggestions.filter(suggestion => {
      return !this.tags.find(val => val.toUpperCase() === suggestion.toUpperCase())
    })

    if (filter && this.filterText) {
      return nonSelected.filter(suggestion => {
        return suggestion.toUpperCase().indexOf(this.filterText) !== -1
      })
    }

    return nonSelected
  }

  @computed get filteredSuggestions() {
    return this.getFilteredSuggestions(this.suggestions, true)
  }

  @computed get filteredPopularSuggestions() {
    return this.getFilteredSuggestions(this.popularSuggestions)
  }

  @computed get currentTagIndex() {
    return this.tags.findIndex(tag => tag === this.current_tag)
  }

  getTagsFormat = (props) => {
    const { format } = props

    if (format === `name`) return toJS(this.tags)

    const tags = this.getTagObjects(props)

    if (format === `object`) return tags
    if (format === `id`) return tags.map(tag => tag.id)
  }

  @action getTagObjects = (props) => {
    const { suggestions, popularSuggestions } = props
    const mapedToPopularSuggestions = this.tags.map(tag => popularSuggestions.find(sug => {
      return sug.name && sug.name.toUpperCase() === tag
    }) || tag)
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

  @action setVals = (props, name, fromNameRaw = null) => {
    const { format } = props
    let fromName = fromNameRaw || name

    if (format === `name`) this[name].replace(props[fromName])
    if (format === `object` || format === `id`) {
      this[name].replace(props[fromName].map(tag => tag.name))
    }
  }

}

export default new TagsStore()
