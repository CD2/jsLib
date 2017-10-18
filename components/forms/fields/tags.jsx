import React from 'react'
import PropTypes from 'prop-types'

import { styled } from 'utils/theme'
import Overlay from 'lib/components/overlay'
import FaIcon from 'lib/components/fa_icon'

import { observable, computed, action, reaction } from 'mobx'
import { observer } from 'mobx-react'
import { tag, panel } from 'utils/common_styles'
@styled`
  .wrapper {
    z-index: 5000;
    position: relative;
  }
  .tag-input {
    ${panel};
    padding: 6px;
    cursor: pointer;
    min-height: 44px;
  }
  span {
    ${tag}
    margin-top: 2px;

  }
`
@observer
export default class TagField extends React.Component {

  static propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onRawChange: PropTypes.func,
    placeholder: PropTypes.string,
    popularSuggestions: PropTypes.arrayOf(PropTypes.string),
    suggestions: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  }


  @observable focussed = false
  @observable tags = []
  @observable current_index = -1

  @observable suggestions = []
  @observable suggestion_query = ``

  @computed get current_value() { return this.tags[this.current_index] }
  set current_value(value) { this.tags[this.current_index] = value }
  @computed get tag_except_current() { return this.tags.filter((_, i)=>i!==this.current_index) }
  @computed get filtered_suggestions() { return this.suggestions.filter(sug => this.tag_except_current.indexOf(sug) === -1) }
  @computed get any_popular_suggestions() { return !!this.props.popularSuggestions }
  @computed get popular_suggestions() { return this.props.popularSuggestions.filter(sug => this.tag_except_current.indexOf(sug) === -1) }

  @computed get suggestions_up_to_date() { return this.current_value === this.suggestion_query }


  componentDidMount() {
    reaction(
      () => this.tags.map(tag=>tag),
      () => this.props.onChange({ name: this.props.name, value: this.tags.toJS() })
    )
  }

  // replaces current editing with suggestion
  @action use_suggestion(suggestion) {
    if (this.current_index === -1) this.tags.push(suggestion)
    else {
      this.current_value = suggestion
      this.suggestions.clear()
      this.current_index++
      if (this.current_index >= this.tags.length) {
        this.tags.push(``)
      }
    }
  }

  @observable fetchingSuggestions = false

  @action fetchSuggestions() {
    if (this.fetchingSuggestions || this.suggestions_up_to_date) return
    const { suggestions } = this.props
    const query = this.current_value
    if (suggestions && this.current_value) {
      this.fetchingSuggestions = true
      if (typeof suggestions === `function`) {
        window.Promise.resolve(suggestions(query)).then(
          action(`fetchSuggestionsFulfilled`, array => {
            this.fetchingSuggestions = false
            this.suggestion_query = query
            this.suggestions.replace(array)
          })
        )
      } else {
        this.fetchingSuggestions = false
        this.suggestions.replace(suggestions.filter(sug => sug.indexOf(query) !== -1))
        this.suggestion_query = query
      }
    }
  }

  @action handleBlur = () => {
    this.focussed = false
    this.tags.replace(this.tags.filter(tag=>tag))
    this.current_index = -1
  }
  @action handleFocus = () => {
    this.focussed = true
    if (this.current_index === -1) {
      this.current_index = this.tags.length
      this.tags.push(``)
    }
  }

  @action handleTagClick = (tag) => {
    this.tags.replace(this.tags.filter(tag=>tag))
    this.current_index = this.tags.indexOf(tag)
  }

  @action handleInputKeyDown = (e) => {
    switch (e.key) {
    case `Backspace`:
      if (this.current_index !== 0 && this.current_value === ``) {
        e.preventDefault()
        this.current_index--
        this.tags.replace(this.tags.filter(tag=>tag))
      }
      break
    case `Tab`:
    case `Enter`:
    case `,`:
      e.preventDefault()
      if (this.tag_except_current.indexOf(this.current_value) !== -1) this.current_value = ``
      else {
        if (this.current_index < this.tags.length - 1) { //just move to next one
          this.tags.replace(this.tags.filter(tag=>tag))
          this.current_index = this.tags.indexOf(this.current_value) + 1
        } else if (this.current_index === this.tags.length - 1 && this.current_value !== ``){
          this.current_index = this.tags.length
          this.tags.push(``)
        }
      }
      break
    default:
    }
  }

  @action handleRemoveTag = (tag, e) => {
    e.stopPropagation()
    const cv = this.current_value
    this.tags.replace(this.tags.filter(t => t!==tag))
    this.current_index = this.tags.indexOf(cv)
  }

  @action handleCurrentTagChange = (e) => {
    this.current_value = e.target.value
    this.fetchSuggestions()
  }

  componentWillMount() {
    if (this.props.value) this.tags.replace(this.props.value)
  }

  componentDidUpdate() {
    if (this.input) this.input.focus()
  }

  componentWillReceiveProps(props) {
    if (JSON.stringify(props.value) !== JSON.stringify(this.tags)) {
      if (props.value) this.tags.replace(props.value)
    }
  }

  //////RENDERING

  renderTag(tag) {
    // Sometimes tag is a string, sometimes it's an object
    const tagName = tag.name || tag
    return (
      <span key={tag} onClick={this.handleTagClick.bind(this, tag)}>
        {tagName}
        <FaIcon icon="cross" onClick={this.handleRemoveTag.bind(this, tag)} />
      </span>
    )
  }

  renderInput(tag=``) {
    return (
      <input
        disabled={this.props.disabled}
        ref={elem => this.input = elem}
        key="input"
        value={tag}
        onKeyDown={this.handleInputKeyDown}
        onChange={this.handleCurrentTagChange}
      />
    )
  }

  renderValue() {
    const result = this.tags.map((tag, i) => {
      return i === this.current_index ?
        this.renderInput(tag) :
        this.renderTag(tag, i)
    })
    if (this.focussed && (this.current_index === -1 || this.current_index >= this.tags.length)) {
      result.push(this.renderInput())
    }
    return result
  }

  @computed get renderPopularSuggestions() {
    if (!this.any_popular_suggestions) return
    return this.popular_suggestions.map(suggestion => {
      return (
        <span
          key={suggestion}
          className="suggestion-tag"
          onClick={this.use_suggestion.bind(this, suggestion)}
        >
          + {suggestion}
        </span>
      )
    })
  }

  @computed get renderSuggestions() {
    if (!this.focussed) return

    const suggestionsComponent = this.filtered_suggestions.map(suggestion => {
      return (
        <span
          key={suggestion}
          className="tag-input__suggestion tag-input__tag"
          onClick={this.use_suggestion.bind(this, suggestion)}
        >
          {suggestion}
        </span>
      )
    })
    return (
      <div className="tag-input__suggestion-container">
        {suggestionsComponent}
      </div>
    )
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.focussed && <Overlay onClick={this.handleBlur} clickThrough />}
        <div onClick={this.handleFocus} className="wrapper">
          {this.renderPopularSuggestions}
          <div className="tag-input">
            {this.renderValue()}
          </div>
          {this.renderSuggestions}
        </div>
      </div>
    )
  }

}
