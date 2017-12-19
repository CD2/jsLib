import React from 'react'
import PropTypes from 'prop-types'
import { observable, action, reaction } from 'mobx'
import { observer } from 'mobx-react'

import { tag } from 'lib/utils/common_styles'
import decorate from 'lib/utils/decorate'
import { styled, t } from 'lib/utils/theme'

import Overlay from 'lib/components/overlay'
import FaIcon from 'lib/components/fa_icon'

import Popover from 'lib/components/popover'
import TagsStore from 'lib/utils/tags_store'

const NEW_INPUT = `new/text/input`

export class TagsInput extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    dropdown: PropTypes.bool,
    format: PropTypes.oneOf([`id`, `name`, `object`]),
    hideClear: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onlyAllowSuggestions: PropTypes.bool,
    popularSuggestions: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })),
      PropTypes.arrayOf(PropTypes.string),
    ]),
    suggestions: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })),
      PropTypes.arrayOf(PropTypes.string),
    ]),
    updateSuggestions: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })),
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
    ]),
  }

  static defaultProps = {
    disabled: false,
    format: `name`,
    onlyAllowSuggestions: false,
    dropdown: false,
    value: [],
    suggestions: [],
    popularSuggestions: [],
    hideClear: false,
  }

  @action componentDidMount() {
    const { props } = this

    TagsStore.setVals(props, `tags`, `value`)
    TagsStore.setVals(props, `suggestions`)
    TagsStore.setVals(props, `popularSuggestions`)
    this.props.onChange({ name: this.props.name, value: TagsStore.getTagsFormat(props) })
    reaction(
      () => TagsStore.tags.map(tag=>tag),
      () => {
        this.props.onChange({ name: this.props.name, value: TagsStore.getTagsFormat(this.props) })
      }
    )
    reaction(
      () => this.props.suggestions.map(sug => sug),
      () => TagsStore.setVals(this.props, `suggestions`)
    )
  }

  @action componentDidUpdate(props) {
    if (this.textInput) this.textInput.focus()
    if (this.textInput && TagsStore.current_tag) {
      this.textInput.selectionStart = TagsStore.current_tag.length
      this.textInput.selectionEnd = TagsStore.current_tag.length
    }
    if (props.value.length < this.props.value.length) TagsStore.current_tag = NEW_INPUT
  }

  @observable mouseOverPopover = false

  handleChange = (value, e) => {
    const filteredForRepeats = value.reduce((filtered, tag) => {
      const capitalisedTag = tag.toUpperCase()

      if (!filtered.find(found => capitalisedTag === found.toUpperCase())) {
        filtered.push(capitalisedTag)
      }

      return filtered
    }, [])

    TagsStore.tags.replace(filteredForRepeats)
    TagsStore.filterText = ``
    if (this.textInput) this.textInput.value = ``
    e && this.handleBlur(e)
  }

  @action handleInput = (e = null) => {
    if (this.props.dropdown && e) {
      if (e.key === `ArrowUp` && TagsStore.dropdownHighlight > 0) TagsStore.dropdownHighlight -= 1
      if (e.key === `ArrowDown` && TagsStore.dropdownHighlight < TagsStore.filteredSuggestions.length) {
        TagsStore.dropdownHighlight += 1
        //this.popover.scrollTop = e.target.offsetTop
      }
      if (e.key === `Enter` && TagsStore.filteredSuggestions[TagsStore.dropdownHighlight]) {
        return this.handleChange([
          ...TagsStore.tags,
          TagsStore.filteredSuggestions[TagsStore.dropdownHighlight]
        ], e)
      }
    }

    if (!this.textInput) return
    const textValue = this.textInput && this.textInput.value

    if(textValue !== `` && (!e || e.key === `Enter` || e.key === `Tab` || e.key === `,`)) { // enter
      e && e.preventDefault()
      if (TagsStore.current_tag === NEW_INPUT) {
        let newValue = null

        if(this.props.onlyAllowSuggestions) {
          const allSuggestions = TagsStore.allSuggestions
          newValue = allSuggestions.find(sug => sug.toUpperCase() === textValue.toUpperCase())
        } else {
          newValue = textValue
        }

        if (newValue) this.handleChange([...TagsStore.tags, newValue], e)
      } else {
        const valueCopy = TagsStore.tags.slice()
        let newValue = null

        if(this.props.onlyAllowSuggestions) {
          newValue = TagsStore.allSuggestions.find(sug => sug.toUpperCase() === textValue.toUpperCase())
        } else {
          newValue = textValue
        }

        if (newValue) valueCopy[TagsStore.currentTagIndex] = newValue

        this.handleChange(valueCopy, e)
      }

      TagsStore.current_tag = null
    } else if(e && textValue === `` && e.key === `Backspace`) { //backspace
      this.handleRemoveTag(e)
    } else {
      this.props.updateSuggestions && this.props.updateSuggestions(textValue)
    }

    TagsStore.filterText = e && e.key === `Backspace`
      ? textValue.toUpperCase().substring(0, textValue.length - 1)
      : textValue.toUpperCase()
  }

  @action handleRemoveTag = (e = null, selectedTag = null) => {
    if (selectedTag !== null) {
      this.handleChange(TagsStore.tags.filter(tag => tag !== selectedTag), e)
    } else if (TagsStore.current_tag && TagsStore.current_tag !== NEW_INPUT) {
      const tagBeforeCurrent = TagsStore.tags.get(TagsStore.currentTagIndex - 1)
      const newTags = TagsStore.tags.filter(tag => tag !== TagsStore.current_tag)
      this.handleChange(newTags, e)

      if (tagBeforeCurrent) {
        return TagsStore.current_tag = tagBeforeCurrent
      }
    } else {
      if (TagsStore.tags.length > 0) return TagsStore.current_tag = TagsStore.tags.get(TagsStore.tags.length - 1)
    }

    TagsStore.current_tag = null
  }

  handleAddTag = tag => this.handleChange([...TagsStore.tags.slice(), tag])

  @action handleTagClick = (e, tag) => {
    e.stopPropagation()
    if (this.props.onlyAllowSuggestions) {
      this.handleRemoveTag(e, tag)
    } else {
      TagsStore.current_tag = tag
    }
  }

  @action handleBlur = (e, force = false) => {
    e && e.preventDefault()
    if (!this.mouseOverPopover || force) {
      TagsStore.current_tag && this.handleInput()
      TagsStore.current_tag = null
      TagsStore.filterText = ``
    }
  }

  @action handleFocus = () => {
    if(!TagsStore.current_tag) {
      TagsStore.current_tag = NEW_INPUT
    }
  }

  renderInput = (tag=``) => (
    <input
      ref={elem => this.textInput = elem}
      key={tag}
      defaultValue={tag}
      onKeyDown={this.handleInput}
    />
  )

  renderTag = (tag) => (
    <span
      className="tag-input__tag"
      key={tag}
      onClick={e => !this.props.disabled && this.handleTagClick(e, tag)}
    >
      {tag}
      <FaIcon
        icon="cross"
        className="tag-input__tag-remove"
        onClick={e => !this.props.disabled && this.handleRemoveTag(e, tag)}
      />
    </span>
  )

  renderPopularSuggestions = () => TagsStore.filteredPopularSuggestions.map(suggestion => (
    <span
      key={suggestion}
      className="suggestion-tag tag-input__tag"
      onClick={this.handleAddTag.bind(this, suggestion)}
    >
      + {suggestion}
    </span>
  ))

  renderNoSuggestionsMessage = () => (
    <span className="tag-input__dropdown-suggestion">No suggestions found</span>
  )

  @action setMouseOver = (isMousedOver = true) => this.mouseOverPopover = isMousedOver

  renderSuggestions() {
    if (
      !TagsStore.current_tag
      || TagsStore.filteredSuggestions.length === 0 && !this.props.onlyAllowSuggestions
    ) return
    let style = `tag-input__suggestion tag-input__tag`

    let suggestionsComponent = TagsStore.filteredSuggestions.map((suggestion, index) => {
      if (this.props.dropdown) {
        style = `tag-input__dropdown-suggestion ${TagsStore.dropdownHighlight === index
          ? `tag-input__dropdown-suggestion--highlight`
          : ``}`
      }

      return (
        <span
          key={suggestion}
          className={style}
          onClick={this.handleAddTag.bind(this, suggestion)}
        >
          {suggestion}
        </span>
      )
    })

    if (suggestionsComponent.length === 0) suggestionsComponent = this.renderNoSuggestionsMessage()

    if (this.props.dropdown) {
      return (
        <Popover
          containerClassName="tag-input__suggestion-dropdown-container"
          popoverClassName="tag-input__suggestion-dropdown"
          open
          closeOnOutsideClick
          onMouseEnter={() => this.setMouseOver()}
          onMouseLeave={() => this.setMouseOver(false)}
        >
          {suggestionsComponent}
        </Popover>
      )
    }

    return (
      <div
        className="tag-input__suggestion-container"
        onMouseEnter={() => this.setMouseOver()}
        onMouseLeave={() => this.setMouseOver(false)}
      >
        {suggestionsComponent}
      </div>
    )
  }

  renderValue = () => {
    const result = TagsStore.tags.map(tag => {
      if (tag === TagsStore.current_tag) {
        return this.renderInput(tag)
      }

      return this.renderTag(tag)
    })

    if (TagsStore.current_tag === NEW_INPUT && !this.props.onlyAllowSuggestions) {
      result.push(this.renderInput())
    }

    return result
  }

  renderClearAll = () => {
    if(TagsStore.tags.length > 0 && !this.props.hideClear) {
      return (
        <div className="tag-input__clear-all"onClick={e => this.handleChange([], e)}>
          Clear
        </div>
      )
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        {TagsStore.current_tag && <Overlay clickThrough onClick={e => this.handleBlur(e, true)} />}
        <div className="wrapper" onClick={!this.props.disabled && this.handleFocus}>
          {this.renderPopularSuggestions()}
          <div
            className="tag-input"
            tabIndex="0"
            onKeyDown={e => {
              !TagsStore.current_tag && e.preventDefault()
              this.props.onlyAllowSuggestions && this.handleInput(e)
              this.handleFocus()
            }}
          >
            {this.renderClearAll()}
            {this.renderValue()}
          </div>
          {this.renderSuggestions()}
        </div>
      </div>
    )
  }

}

export default decorate(
  styled`
    .wrapper {
      z-index: 5000;
    }
    .tag-input {
      border-radius: ${t(`panelRadius`)};
      overflow: hidden;
      border: 1px solid ${t(`border`)};
      background: white;
      padding: 6px;
      cursor: pointer;
      min-height: 48px;
      position: relative;
      margin-top: 4px;

      &:focus-within {
        border: 1px solid #39b5b1;
      }
    }
    .tag-input__tag {
      ${tag}
      margin-top: 2px;
      z-index: 6000;
      cursor: pointer;
    }
    .tag-input__clear-all {
      border-radius: 6px;
      font-size: 0.8rem;
      position: absolute;
      top: 5px;
      right: 5px;
      background-color: red;
      color: white;
      padding: 4px;
      opacity: 0.5;
    }
    .tag-input__tag-remove {
      z-index: 7000;
    }
    .tag-input__suggestion-dropdown-container {
      width: 100%;
      display: block;
      z-index: 100000;
    }
    .tag-input__suggestion-container {
      position: relative;
      z-index: 100000;
    }
    .tag-input__suggestion-dropdown {
      display: flex;
      flex-direction: column;
      width: 100%;
      top: 0;
      bottom: auto;
      max-height: 200px;
      overflow-y: auto;
    }
    .tag-input__dropdown-suggestion {
      width: 100%;
      padding: 10px;
      border-bottom: 1px solid ${t(`border`)};
      cursor: pointer;

      &--highlight {
        background-color: ${t(`background`)};
      }
      &:hover {
        background-color: ${t(`background`)};
      }
    }
  `,
  observer,
  TagsInput,
)
