import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from 'utils/theme'
import Overlay from 'lib/components/overlay'
import FaIcon from 'lib/components/fa_icon'
import { observable, computed, action, reaction } from 'mobx'
import { observer } from 'mobx-react'
import { tag } from 'utils/common_styles'
@styled`
  .wrapper {
    z-index: 5000;
    position: relative;
  }
  .tag-input {
    border-radius: ${t(`panelRadius`)};
    overflow: hidden;
    border: 1px solid ${t(`border`)};
    background: white;
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
export class TagField extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onRawChange: PropTypes.func,
    onlyAllowSuggestions: PropTypes.bool,
    placeholder: PropTypes.string,
    popularSuggestions: PropTypes.arrayOf(PropTypes.string),
    suggestions: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    value: PropTypes.array,
  }

  static defaultProps = {
    onlyAllowSuggestions: false,
  }

  componentWillMount() {
    if (this.props.value) {
      const tags = this.props.value.map(tag => tag.name || tag)
      this.tags.replace(tags)
    }
  }

  componentDidMount() {
    reaction(
      () => this.tags.map(tag=>tag),
      () => this.props.onChange({ name: this.props.name, value: this.tags.toJS() })
    )
  }

  componentWillReceiveProps(props) {
    if (JSON.stringify(props.value) !== JSON.stringify(this.tags)) {
      if (props.value) {
        const tags = props.value.map(tag => tag.name || tag)
        this.tags.replace(tags)
      }
    }
  }

  componentDidUpdate() {
    if (this.input) this.input.focus()
  }

  @observable focussed = false
  @observable tags = []
  @observable current_index = -1

  @observable suggestions = []
  @observable suggestion_query = ``

  @computed get current_value() { return this.tags[this.current_index] }
  set current_value(value) { this.tags[this.current_index] = value }
  @computed get tag_except_current() { return this.tags.filter((_, i)=>i!==this.current_index) }
  @computed get filtered_suggestions() {
    return this.suggestions.filter(sug => this.tag_except_current.indexOf(sug) === -1)
  }
  @computed get any_popular_suggestions() { return !!this.props.popularSuggestions }
  @computed get popular_suggestions() {
    return this.props.popularSuggestions.filter(sug => this.tag_except_current.indexOf(sug) === -1)
  }

  @computed get suggestions_up_to_date() { return this.current_value === this.suggestion_query }

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
  //just move to next one
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
      if (this.props.onlyAllowSuggestions) return null
      if (this.tag_except_current.indexOf(this.current_value) !== -1) this.current_value = ``
      else {
        if (this.current_index < this.tags.length - 1) {
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

  renderTag(tag) {
    return (
      <span key={tag} onClick={this.handleTagClick.bind(this, tag)}>
        {tag}
        <FaIcon icon="cross" onClick={this.handleRemoveTag.bind(this, tag)} />
      </span>
    )
  }

  renderInput(tag=``) {
    return (
      <input
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
    const { className } = this.props
    return (
      <div className={className}>
        {this.focussed && <Overlay clickThrough onClick={this.handleBlur} />}
        <div className="wrapper" onClick={this.handleFocus}>
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
export default TagField
