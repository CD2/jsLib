import React from 'react'
import PropTypes from 'prop-types'
import { action, reaction } from 'mobx'
import { observer } from 'mobx-react'

import { tag } from 'lib/utils/common_styles'
import decorate from 'lib/utils/decorate'
import { styled, t } from 'lib/utils/theme'

import Overlay from 'lib/components/overlay'
import FaIcon from 'lib/components/fa_icon'

import Popover from 'lib/components/popover'
import TagsStore from 'lib/utils/tags_store'

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

  componentDidMount() {
    this.store.onMount(this.props)
    reaction(
      () => this.props.suggestions.map(sug => sug),
      () => this.store.setVals(this.props, `suggestions`)
    )
  }

  @action componentDidUpdate(props) {
    if (this.textInput) this.textInput.focus()
    if (this.textInput && this.store.current_tag) {
      this.textInput.selectionStart = this.store.current_tag.length
      this.textInput.selectionEnd = this.store.current_tag.length
    }
    if (props.value.length < this.props.value.length) this.store.current_tag = this.store.NEW_INPUT
  }

  store = new TagsStore(this, this.props)

  renderInput = (tag=``) => (
    <input
      ref={elem => this.textInput = elem}
      key={tag}
      defaultValue={tag}
      onKeyDown={this.store.handleInput}
    />
  )

  renderTag = (tag) => (
    <span
      className="tag-input__tag"
      key={tag}
      onClick={e => !this.props.disabled && this.store.handleTagClick(e, tag)}
    >
      {tag}
      <FaIcon
        icon="cross"
        className="tag-input__tag-remove"
        onClick={e => !this.props.disabled && this.store.handleRemoveTag(e, tag)}
      />
    </span>
  )

  renderPopularSuggestions = () => this.store.filteredPopularSuggestions.map(suggestion => (
    <span
      key={suggestion}
      className="suggestion-tag tag-input__tag"
      onClick={this.store.handleAddTag.bind(this, suggestion)}
    >
      + {suggestion}
    </span>
  ))

  renderNoSuggestionsMessage = () => (
    <span className="tag-input__dropdown-suggestion">No suggestions found</span>
  )

  renderSuggestions() {
    if (
      !this.store.current_tag
      || this.store.filteredSuggestions.length === 0 && !this.props.onlyAllowSuggestions
    ) return
    let style = `tag-input__suggestion tag-input__tag`

    let suggestionsComponent = this.store.filteredSuggestions.map((suggestion, index) => {
      if (this.props.dropdown) {
        style = `tag-input__dropdown-suggestion ${this.store.dropdownHighlight === index
          ? `tag-input__dropdown-suggestion--highlight`
          : ``}`
      }

      return (
        <span
          key={suggestion}
          className={style}
          onClick={this.store.handleAddTag.bind(this, suggestion)}
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
          onMouseEnter={() => this.store.setMouseOver()}
          onMouseLeave={() => this.store.setMouseOver(false)}
        >
          {suggestionsComponent}
        </Popover>
      )
    }

    return (
      <div
        className="tag-input__suggestion-container"
        onMouseEnter={() => this.store.setMouseOver()}
        onMouseLeave={() => this.store.setMouseOver(false)}
      >
        {suggestionsComponent}
      </div>
    )
  }

  renderValue = () => {
    const result = this.store.tags.map(tag => {
      if (tag === this.store.current_tag) {
        return this.renderInput(tag)
      }

      return this.renderTag(tag)
    })

    if (this.store.current_tag === this.store.NEW_INPUT) {
      result.push(this.renderInput())
    }

    return result
  }

  renderClearAll = () => {
    if(this.store.tags.length > 0 && !this.props.hideClear) {
      return (
        <div className="tag-input__clear-all" onClick={e => this.store.handleChange([], e)}>
          Clear
        </div>
      )
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.store.current_tag 
          && <Overlay clickThrough onClick={e => this.store.handleInputBlur(e, true)} />}
        <div className="wrapper" onClick={!this.props.disabled && this.store.handleInputFocus}>
          {this.renderPopularSuggestions()}
          <div
            className="tag-input"
            tabIndex="0"
            onKeyDown={e => {
              !this.store.current_tag && e.preventDefault()
              this.store.handleInputFocus()
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
