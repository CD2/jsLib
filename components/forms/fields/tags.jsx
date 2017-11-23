import React from 'react'
import PropTypes from 'prop-types'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { tag } from 'lib/utils/common_styles'
import decorate from 'lib/utils/decorate'
import { styled, t } from 'lib/utils/theme'

import Overlay from 'lib/components/overlay'
import FaIcon from 'lib/components/fa_icon'

import Popover from 'lib/components/popover'

export class TagsInput extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    dropdown: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onlyAllowSuggestions: PropTypes.bool,
    popularSuggestions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
    })),
    suggestions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
    })),
    updateSuggestions: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
    })),
  }

  static defaultProps = {
    onlyAllowSuggestions: false,
    dropdown: false,
    value: [],
    suggestions: [],
    popularSuggestions: []
  }

  @observable current_tag_index = null

  handleChange = value => {
    const { suggestions, popularSuggestions } = this.props
    const mapedToPopularSuggestions = value.map(tag => (tag.id && popularSuggestions.find(sug => sug.text === tag.text)) || tag)
    const mapedToSuggestions = mapedToPopularSuggestions.map(tag => (tag.id && suggestions.find(sug => sug.text === tag.text)) || tag)
    const filteredForRepeats = mapedToSuggestions.reduce((filtered, tag) => {
      if (!filtered.find(found => (tag.id && tag.id === found.id) || tag.text === found.text)) {
        filtered.push(tag)
      }

      return filtered
    }, [])

    this.props.onChange({ name: this.props.name, value: filteredForRepeats })
  }

  filterAgainstValues = toFilter => {
    return toFilter.filter(suggestion => !this.props.value.find(val => val.text === suggestion.text))
  }

  @action handleInput = (e = null) => {
    const textValue = this.textInput.value

    if(textValue !== `` && (!e || e.key === `Enter` || e.key === `Tab` || e.key === `,`)) { // enter
      if (this.current_tag_index === -1) {
        this.handleChange([...this.props.value, { id: null, text: textValue }])
        return this.textInput.value = ``
      } else {
        const valueCopy = [...this.props.value]

        valueCopy[this.current_tag_index] = {
          id: valueCopy[this.current_tag_index],
          text: textValue
        }

        this.handleChange(valueCopy)
      }

      this.current_tag_index = null
    } else if(e && this.props.value.length > 0 && textValue === `` && e.key === `Backspace`) { //backspace
      this.handleRemoveTag()
    } else if(e) {
      this.props.updateSuggestions && this.props.updateSuggestions(textValue)
    }
  }

  @action handleRemoveTag = (e = null, tagIndex = null) => {
    e && e.stopPropagation()
    if (tagIndex) {
      this.handleChange(this.props.value.filter((tag, index) => index !== tagIndex))
    } else if (this.current_tag_index > 0) {
      const newTags = this.props.value.filter((tag, index) => index !== this.current_tag_index)

      this.handleChange(newTags)
      if (newTags.length > 0 && this.current_tag_index > 0) return this.current_tag_index = this.current_tag_index - 1
    } else {
      const newTags = this.props.value.slice(0, this.props.value.length - 1)

      if (newTags.length > 0) return this.current_tag_index = newTags.length
    }

    this.current_tag_index = null
  }

  handleAddTag = tag => {
    this.handleChange([...this.props.value, tag])
  }

   @action handleTagClick = (e, tagIndex) => {
     e.stopPropagation()
     this.current_tag_index = tagIndex
   }
   @action handleBlur = e => {
     e.stopPropagation()
     this.current_tag_index && this.handleInput()
     this.current_tag_index = null
   }
   @action handleFocus = () => {
     this.current_tag_index = -1
   }

   renderInput(tag=``) {
     return (
       <input
         ref={elem => this.textInput = elem}
         key="input"
         value={tag.text}
         onKeyDown={this.handleInput}
       />
     )
   }

   renderTag(tag, index) {
     return (
       <span
         className="tag-input__tag"
         key={index}
         onClick={e => this.handleTagClick(e, index)}
       >
         {tag.text}
         <FaIcon
           icon="cross"
           className="tag-input__tag-remove"
           onClick={e => this.handleRemoveTag(e, index)}
         />
       </span>
     )
   }

   renderPopularSuggestions() {
     return this.filterAgainstValues(this.props.popularSuggestions).map((suggestion, index) => {
       return (
         <span
           key={index}
           className="suggestion-tag tag-input__tag"
           onClick={this.handleAddTag.bind(this, suggestion)}
         >
           + {suggestion.text}
         </span>
       )
     })
   }

   renderSuggestions() {
     if (!this.current_tag_index) return

     const suggestionsComponent = this.filterAgainstValues(this.props.suggestions).map((suggestion, index) => (
       <span
         key={index}
         className={this.props.dropdown ? `tag-input__suggestion tag-input__tag tag-input__dropdown-suggestion` : `tag-input__suggestion tag-input__tag`}
         onClick={this.handleAddTag.bind(this, suggestion)}
       >
         {suggestion.text}
       </span>
     ))

     if (this.props.dropdown) {
       return (
         <Popover
           containerClassName="tag-input__suggestion-dropdown-container"
           className="tag-input__suggestion-dropdown"
           open
           closeOnOutsideClick
         >
           {suggestionsComponent}
         </Popover>
       )
     }

     return (
       <div className="tag-input__suggestion-container">
         {suggestionsComponent}
       </div>
     )
   }

   renderValue() {
     const result = this.props.value.map((tag, i) => {
       if (i === this.current_tag_index && this.current_tag_index !== -1) {
         return this.renderInput(tag)
       }

       return this.renderTag(tag, i)
     })

     if (this.current_tag_index === -1) result.push(this.renderInput())

     return result
   }

   render() {
     return (
       <div className={this.props.className}>
         {this.current_tag_index && <Overlay clickThrough onClick={this.handleBlur} />}
         <div className="wrapper" onClick={this.handleFocus}>
           {this.renderPopularSuggestions()}
           <div className="tag-input">
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
      min-height: 44px;
    }
    .tag-input__tag {
      ${tag}
      margin-top: 2px;
      z-index: 6000;
    }
    .tag-input__tag-remove {
      z-index: 7000;
    }
    .tag-input__suggestion-dropdown-container {
      width: 100%;
      display: block;
    }
    .tag-input__suggestion-dropdown {
      padding: 10px;
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
    }
  `,
  observer,
  TagsInput,
)
