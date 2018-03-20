import { observable, createTransformer, action, computed } from "mobx"
import windowStore from "stores/window"

class TagStore {
  static TAG_SEPARATOR = `+`
  static TAG_SPACE = `_`

  @computed
  get tags() {
    const { tags: tag_string = `` } = windowStore.location.params
    const tags = tag_string.split(TagStore.TAG_SEPARATOR).filter(tag => tag)
    const tag_array = observable(
      tags.map(tag =>
        tag.
          split(TagStore.TAG_SPACE).
          join(` `).
          trim(),
      ),
    )
    return tag_array
  }

  isSelected = createTransformer(name => this.tags.includes(name))

  @action
  add(tag) {
    if (this.tags.includes(tag)) return
    this.setTags([...this.tags, tag])
  }

  @action
  remove(tag) {
    const newTags = this.tags.filter(t => t !== tag)
    this.setTags(newTags)
  }

  @action
  setTags(newTags) {
    const tag_string = newTags.
      map(tag => tag.split(` `).join(TagStore.TAG_SPACE)).
      join(TagStore.TAG_SEPARATOR)
    const newParams = { ...windowStore.location.params, tags: tag_string }
    windowStore.location.params = newParams
  }
}

export default new TagStore()
