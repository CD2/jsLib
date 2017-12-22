import { observable, reaction, action, autorun } from 'mobx'
import { getUrlSearch } from 'lib/utils/http'
import qs from 'qs'


export default class LocationStore {

  @observable pathname = ``
  @observable hash = ``
  @observable search = ``
  @observable _params = {}

  @action update = () => {
    const { hash, pathname, search } = this.history.location
    if (this.hash !== hash) this.hash = hash
    if (this.pathname !== pathname) this.pathname = pathname
    if (this.search !== search) this.search = search
  }

  constructor() {
    autorun(() => {
      this.updateParams()
    })
  }

  bindHistory(history) {
    this.history = history
    this.update()
    history.listen(this.update)

    reaction(() => this.pathname,
      (pathname) => {
        if (this.history.location.pathname !== pathname) {
          let { hash, search } = this
          this.history.push({ hash, search, pathname })
        }
      }
    )

    reaction(() => this.hash,
      (hash) => {
        if (this.history.location.hash !== hash) {
          let { pathname, search } = this
          this.history.push({ pathname, search, hash })
        }
      }
    )

    reaction(() => this.search,
      (search) => {
        if (this.history.location.search !== search) {
          const { hash, pathname } = this
          this.history.push({ hash, pathname, search })
        }
      }
    )
  }

  //pathExpression = '/courses/:id/*'
  startsWith(pathExpression) {
    const str = this.pathExpressionToRegex(pathExpression)
    const regex = new RegExp(`^${str}.*$`)
    return regex.test(this.pathname)
  }

  updateParams() {
    const raw_params = getUrlSearch(this.search)
    const params = Object.entries(raw_params).reduce((params, [key, value]) => {
      if (value !== ``) {
        params[key] = value
      }
      return params
    }, {})
    this._params = params
  }

  get params() { return this._params }
  set params(value) {
    this.search = qs.stringify(value)
  }

  pathExpressionToRegex(expression) {
    return expression.replace(/:(\w+)/g, (match, p1) => {
      return `([^/]+)`
    }).replace(/\//g, `\\/`)
  }

}
