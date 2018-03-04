import { observable, action, computed } from "mobx"
import { history } from "lib/utils/router"

class RouteChangesStore {
  constructor() {
    history.listen(location => this.update(location))
  }

  @observable previousPathname = null
  @observable routeChanges = null

  @action
  update(location) {
    if (location.pathname !== this.previousPathname) {
      this.previousPathname = location.pathname
      this.routeChanges += 1
      window.scrollTo(0, 0)
    }
  }

  @computed
  get changeCounter() {
    return this.routeChanges
  }
}

export default new RouteChangesStore()
