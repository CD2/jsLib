import React from 'react'
import PropTypes from 'prop-types'
import { observable, action, reaction, toJS, computed } from 'mobx'
import { observer } from 'mobx-react'

import { tag } from 'lib/utils/common_styles'
import decorate from 'lib/utils/decorate'
import { styled, t } from 'lib/utils/theme'

import Overlay from 'lib/components/overlay'
import FaIcon from 'lib/components/fa_icon'

import Popover from 'lib/components/popover'

const NEW_INPUT = `new/text/input`

export class TagsInput extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    dropdown: PropTypes.bool,
    format: PropTypes.oneOf([`id`, `text`, `object`]),
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onlyAllowSuggestions: PropTypes.bool,
    popularSuggestions: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
      })),
      PropTypes.arrayOf(PropTypes.string),
    ]),
    suggestions: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
      })),
      PropTypes.arrayOf(PropTypes.string),
    ]),
    updateSuggestions: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
      })),
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
    ]),
  }

  static defaultProps = {
    format: `text`,
    onlyAllowSuggestions: false,
    dropdown: false,
    value: [],
    suggestions: [],
    popularSuggestions: []
  }

  @action componentDidMount() {
    this.setVals(`tags`, `value`)
    this.setVals(`suggestions`)
    this.setVals(`popularSuggestions`)
    reaction(
      () => this.tags.map(tag=>tag),
      () => {
        console.log(JSON.stringify(this.getTagsFormat()))
        this.props.onChange({ name: this.props.name, value: this.getTagsFormat() })
      }
    )
    reaction(
      () => this.props.suggestions.map(sug => sug),
      () => this.setVals(`suggestions`)
    )
  }

  @action componentDidUpdate(props) {
    if (this.textInput) this.textInput.focus()
    if (this.textInput && this.current_tag) {
      this.textInput.selectionStart = this.current_tag.length
      this.textInput.selectionEnd = this.current_tag.length
    }
    if (props.value.length < this.props.value.length) this.current_tag = NEW_INPUT
  }

  @observable tags = []
  @observable current_tag = null
  @observable suggestions = []
  @observable popularSuggestions = []

  @computed get allSuggestions() {
    return Array.from(new Set(toJS(this.suggestions), toJS(this.popularSuggestions)))
  }

  getTagsFormat = () => {
    const { format } = this.props

    if (format === `text`) return toJS(this.tags)

    const tags = this.getTagObjects()

    if (format === `object`) return tags
    if (format === `id`) return tags.map(tag => tag.id)
  }

  getTagObjects = () => {
    const { suggestions, popularSuggestions } = this.props
    const mapedToPopularSuggestions = this.tags.map(tag => popularSuggestions.find(sug => sug.text && sug.text.toUpperCase() === tag) || tag)
    const mapedToSuggestions = mapedToPopularSuggestions.map(tag => {
      if (typeof tag === `string`) {
        const found = suggestions.find(sug => sug.text && sug.text.toUpperCase() === tag)

        if (found) return found
      }

      return { id: null, text: tag }
    })

    return mapedToSuggestions
  }

  setVals = (name, fromNameRaw = null) => {
    const { format } = this.props
    let fromName = fromNameRaw || name

    if (format === `text`) this[name].replace(this.props[fromName])
    if (format === `object` || format === `id`) {
      this[name].replace(this.props[fromName].map(tag => tag.text))
    }
  }

  handleChange = value => {
    const filteredForRepeats = value.reduce((filtered, tag) => {
      const capitalisedTag = tag.toUpperCase()

      if (!filtered.find(found => capitalisedTag === found.toUpperCase())) filtered.push(capitalisedTag)

      return filtered
    }, [])

    this.tags.replace(filteredForRepeats)
  }

  getCurrentTagIndex = () => this.tags.findIndex(tag => tag === this.current_tag)

  @action handleInput = (e = null) => {
    const textValue = this.textInput && this.textInput.value

    if(textValue !== `` && (!e || e.key === `Enter` || e.key === `Tab` || e.key === `,`)) { // enter
      e && e.stopPropagation()
      if (this.current_tag === NEW_INPUT) {
        let newValue = null

        if(this.props.onlyAllowSuggestions) {
          const allSuggestions = this.allSuggestions
          newValue = allSuggestions.find(sug => sug.toUpperCase() === textValue.toUpperCase())
        } else {
          newValue = textValue
        }

        if (newValue) this.handleChange([...this.tags, newValue])
      } else {
        const valueCopy = this.tags.slice()
        let newValue = null

        if(this.props.onlyAllowSuggestions) {
          newValue = this.allSuggestions.find(sug => sug.toUpperCase() === textValue.toUpperCase())
        } else {
          newValue = textValue
        }

        if (newValue) valueCopy[this.getCurrentTagIndex()] = newValue

        this.handleChange(valueCopy)
      }

      this.current_tag = null
    } else if(e && textValue === `` && e.key === `Backspace`) { //backspace
      this.handleRemoveTag()
    } else {
      return this.props.updateSuggestions && this.props.updateSuggestions(textValue)
    }
  }

  @action handleRemoveTag = (e = null, selectedTag = null) => {
    e && e.stopPropagation()
    if (selectedTag !== null) {
      this.handleChange(this.tags.filter(tag => tag !== selectedTag))
    } else if (this.current_tag && this.current_tag !== NEW_INPUT) {
      const tagBeforeCurrent = this.tags.get(this.getCurrentTagIndex() - 1)
      const newTags = this.tags.filter(tag => tag !== this.current_tag)
      this.handleChange(newTags)

      if (tagBeforeCurrent) {
        return this.current_tag = tagBeforeCurrent
      }
    } else {
      if (this.tags.length > 0) return this.current_tag = this.tags.get(this.tags.length - 1)
    }

    this.current_tag = null
  }

    handleAddTag = tag => this.handleChange([...this.tags, tag])

   @action handleTagClick = (e, tag) => {
     e.stopPropagation()
     this.current_tag = tag
   }
   @action handleBlur = e => {
     e.stopPropagation()
     this.current_tag && this.handleInput()
     this.current_tag = null
   }
   @action handleFocus = () => {
     if(!this.current_tag) this.current_tag = NEW_INPUT
   }

   @computed get filteredSuggestions() {
     return this.suggestions.filter(suggestion => !this.tags.find(val => val === suggestion.toUpperCase()))
   }

   @computed get filteredPopularSuggestions() {
     return this.popularSuggestions.filter(suggestion => !this.tags.find(val => val === suggestion.toUpperCase()))
   }

   renderInput(tag=``) {
     return (
       <input
         ref={elem => this.textInput = elem}
         key={tag}
         defaultValue={tag}
         onKeyDown={this.handleInput}
       />
     )
   }

   renderTag(tag) {
     return (
       <span
         className="tag-input__tag"
         key={tag}
         onClick={e => this.handleTagClick(e, tag)}
       >
         {tag}
         <FaIcon
           icon="cross"
           className="tag-input__tag-remove"
           onClick={e => this.handleRemoveTag(e, tag)}
         />
       </span>
     )
   }

   renderPopularSuggestions() {
     return this.filteredPopularSuggestions.map(suggestion => {
       return (
         <span
           key={suggestion}
           className="suggestion-tag tag-input__tag"
           onClick={this.handleAddTag.bind(this, suggestion)}
         >
           + {suggestion}
         </span>
       )
     })
   }

   renderSuggestions() {
     if (!this.current_tag || this.filteredSuggestions.length === 0) return

     const suggestionsComponent = this.filteredSuggestions.map(suggestion => (
       <span
         key={suggestion}
         className={
           this.props.dropdown
             ? `tag-input__suggestion tag-input__tag tag-input__dropdown-suggestion`
             : `tag-input__suggestion tag-input__tag`
         }
         onClick={this.handleAddTag.bind(this, suggestion)}
       >
         {suggestion}
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

   renderValue = () => {
     const result = this.tags.map(tag => {
       if (tag === this.current_tag) {
         return this.renderInput(tag)
       }

       return this.renderTag(tag)
     })

     if (this.current_tag === NEW_INPUT) result.push(this.renderInput())

     return result
   }

   render() {
     return (
       <div className={this.props.className}>
         {this.current_tag && <Overlay clickThrough onClick={this.handleBlur} />}
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
