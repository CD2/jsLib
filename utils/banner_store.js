import { observable, action, computed, toJS } from "mobx"

class BannerStore {
  @observable bannerContents = []

  @action
  set(contents) {
    this.bannerContents = contents
  }

  @action
  addItem(content) {
    this.bannerContents.push(content)
  }

  @computed
  get contents() {
    return toJS(this.bannerContents)
  }

  @computed
  get hasContents() {
    return this.bannerContents.length > 0
  }

  @action
  removeLast() {
    this.bannerContents.pop()
  }

  getLast() {
    return toJS(this.bannerContents.get(this.bannerContents.length - 1))
  }

  @action
  clear() {
    this.bannerContents = []
  }
}

export default new BannerStore()
