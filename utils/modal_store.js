import { observable, action, computed, toJS } from "mobx"

class ModalStore {
  @observable modalContents = []

  @action
  set(contents) {
    this.modalContents = contents
  }

  @action
  addItem(content) {
    this.modalContents.push(content)
  }

  @computed
  get contents() {
    return toJS(this.modalContents)
  }

  @computed
  get hasContents() {
    return this.modalContents.length > 0
  }

  @action
  removeLast() {
    this.modalContents.pop()
  }

  getLast() {
    return toJS(this.modalContents.get(this.modalContents.length - 1))
  }

  @action
  clear() {
    console.log('clear')
    this.modalContents = []
  }
}

export default new ModalStore()
