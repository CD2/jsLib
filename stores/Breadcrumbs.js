import { observable, action } from "mobx"

class BreadcrumbsStore {
  @observable breadcrumbs = [null, null, null, null, null, null, null]
  @observable color = `white`

  @action
  set(position, crumb) {
    this.breadcrumbs[position] = crumb
  }

  @action
  remove(position) {
    this.breadcrumbs[position] = null
  }

  @action
  clear() {
    this.breadcrumbs.replace([null, null, null, null, null, null, null, null])
  }
}

export default new BreadcrumbsStore()
