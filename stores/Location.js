import { observable, reaction, action, autorun } from "mobx"
import { getUrlSearch } from "lib/utils/http"
import qs from "qs"

export default class LocationStore {
  @observable pathname = ``
  @observable hash = ``
  @observable search = ``
  @observable params = observable.map()

  @action
  update = () => {
    const { hash, pathname, search } = this.history.location
    if (this.hash !== hash) this.hash = hash
    if (this.pathname !== pathname) this.pathname = pathname
    if (this.search !== search) this.search = search

    const rawParams = getUrlSearch(this.search)
    const newParams = Object.entries(rawParams).reduce(
      (params, [key, value]) => {
        if (value !== ``) {
          params[key] = value
        }
        return params
      },
      {},
    )
    this.params.replace(newParams)
  }

  bindHistory(history) {
    this.history = history
    this.update()
    history.listen(this.update)

    reaction(
      () => this.pathname,
      pathname => {
        if (this.history.location.pathname !== pathname) {
          let { hash, search } = this
          this.history.push({ hash, search, pathname })
        }
      },
    )

    reaction(
      () => this.hash,
      hash => {
        if (this.history.location.hash !== hash) {
          let { pathname, search } = this
          this.history.push({ pathname, search, hash })
        }
      },
    )

    reaction(
      () => this.search,
      search => {
        if (this.history.location.search !== search) {
          const { hash, pathname } = this
          this.history.push({ hash, pathname, search })
        }
      },
    )

    this.params.observe(params => {
      this.search = qs.stringify(this.params.toJS())
    })
  }

  //pathExpression = '/courses/:id/*'
  startsWith(pathExpression) {
    const str = this.pathExpressionToRegex(pathExpression)
    const regex = new RegExp(`^${str}.*$`)
    return regex.test(this.pathname)
  }

  pathExpressionToRegex(expression) {
    return expression
      .replace(/:(\w+)/g, (match, p1) => {
        return `([^/]+)`
      })
      .replace(/\//g, `\\/`)
  }
}
