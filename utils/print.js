import { observable, action, computed, toJS } from 'mobx'

class PrintStore {

  @observable printViewContents = null;

  @action set(contents) {
    this.printViewContents = contents
  }

  @computed get contents() {
    return toJS(this.printViewContents)
  }

  @computed get hasContents() {
    return !!this.printViewContents
  }

  @action clear() {
    this.printViewContents = null
  }

  print() {
    window.print()
    this.clear()
  }

}

export default new PrintStore()
