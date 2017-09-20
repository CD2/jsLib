import React from 'react'
import PropTypes from 'prop-types'

import Overlay from 'lib/components/overlay'
import { styled } from 'utils/theme'

import { observable, computed, action, reaction } from 'mobx'
import { observer } from 'mobx-react'

@styled`
  .wrapper {
    z-index: 5000;
    position: relative;
    background: white;
  }
`
@observer
export default class TagField extends React.Component {

  static propTypes = {
    suggestions: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    popularSuggestions: PropTypes.arrayOf(PropTypes.string),

    name: PropTypes.string,
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
  }


  @observable focussed = false
  @observable suggestions = ['hello', 'SUGGESTION']
  @observable tags = []
  @observable current_index = -1

  @computed get current_value() { return this.tags[this.current_index] }
  set current_value(value) { this.tags[this.current_index] = value }

  @computed get popular_suggestions() { return this.props.popularSuggestions.filter(sug => this.tags.indexOf(sug) === -1) }

  // componentDidMount() {
  //   this.cleanup = reaction(()=>this.tags, () => {
  //     console.log('running', this.current_value)
  //     this.fetchSuggestions(this.current_value)
  //   })
  // }



  // replaces current editing with suggestion
  @action use_suggestion(suggestion) {
    if (this.current_index === -1) this.tags.push(suggestion)
    else {
      this.current_value = suggestion
      this.current_index++
    }
  }

  @observable fetchingSuggestions = false

  @action fetchSuggestions() {
    if (this.fetchingSuggestions) return
    const { suggestions } = this.props
    const search_value = this.current_value
    if (suggestions && this.current_value) {
      this.fetchingSuggestions = true
      if (typeof suggestions === 'function') {
        window.Promise.resolve(suggestions(search_value)).then(
          action('fetchSuggestionsFulfilled', array => {
            this.fetchingSuggestions = false
            this.suggestions.replace(array)
          })
        )
      } else {
        this.fetchingSuggestions = false
        this.suggestions.replace(suggestions.filter(sug => sug.indexOf(search_value)!==-1))
      }
    }
  }

  @action blur = () => {
    this.focussed = false
    this.tags = this.tags.filter(tag=>tag)
    this.current_index = -1
  }
  @action handlefocus = () => {
    this.focussed = true
    if (this.current_index === -1) {
      this.current_index = this.tags.length
      this.tags.push('')
    }
  }

  @action handleTagClick = (tag) => {
    this.tags = this.tags.filter(tag=>tag)
    this.current_index = this.tags.indexOf(tag)
  }

  @action handleInputKeyDown = (e) => {
    switch (e.key) {
      case 'Backspace':
        if (this.current_index !== 0 && this.current_value === '') {
          e.preventDefault()
          this.current_index--
        }
        break;
      case 'Tab':
      case 'Enter':
      case ',':
        e.preventDefault()
        if (this.current_index < this.tags.length - 1) { //just move to next one
          this.tags = this.tags.filter(tag=>tag)
          this.current_index++
        } else if (this.current_index === this.tags.length - 1 && this.current_value !== ''){
          this.current_index = this.tags.length
          this.tags.push('')
        }
        break
      default:{}
    }
  }

  @action handleCurrentTagChange = (e) => {
    this.current_value = e.target.value
    this.fetchSuggestions()
  }

  componentDidUpdate() {
    if (this.input) this.input.focus()
  }

  //////RENDERING

  renderTag(tag) {
    return (
      <span key={tag} onClick={this.handleTagClick.bind(this, tag)}>{tag}</span>
    )
  }

  renderInput(tag='') {
    return (
      <input
          key='input'
          value={tag}
          ref={elem => this.input = elem}
          onKeyDown={this.handleInputKeyDown}
          onChange={this.handleCurrentTagChange}
        />
    )
  }

  renderValue() {
    const result = this.tags.map((tag, i) => {
      return (i === this.current_index) ?
        this.renderInput(tag) :
        this.renderTag(tag, i)
    })
    if (this.focussed && (this.current_index === -1 || this.current_index >= this.tags.length)) {
      result.push(this.renderInput())
    }
    return result
  }

  @computed get renderPopularSuggestions() {
    return this.popular_suggestions.filter(sug => this.tags.indexOf(sug) === -1).map(suggestion => {
      return <span key={suggestion} onClick={this.use_suggestion.bind(this, suggestion)}>{suggestion}</span>
    })
  }

  @computed get renderSuggestions() {
    console.log('SUG: ', this.suggestions)
    if (!this.focussed) return
    if (this.suggestions.length === 0) return

    const suggestionsComponent = this.suggestions.map(suggestion => {
      return (
        <span
            className='tag-input__suggestion tag-input__tag'
            onClick={() => this.handleAddSuggestion(suggestion)}
          >{suggestion}
        </span>
      )
    })
    return (
      <div className='tag-input__suggestion-container'>
        {suggestionsComponent}
      </div>
    )
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.focussed && <Overlay onClick={this.blur} visible/>}
        <div onClick={this.handlefocus} className='wrapper'>
          {this.current_index} {JSON.stringify(this.tags)}
          {this.renderPopularSuggestions}
          <div>
            {this.renderValue()}
          </div>
          {this.renderSuggestions}
        </div>
      </div>
    )
  }

}
