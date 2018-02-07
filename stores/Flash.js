import { observable } from "mobx"

export default observable({
  flashes: [],
  previousFlashes: [],
  add(message, { level = `notice`, timeout = 8000, disableTimeout = false } = {}) {
    const id = Date.now()

    if (this.flashes.length >= 3) this.flashes.shift()

    this.flashes.push({ id, message, level, timeout })

    if (!disableTimeout) setTimeout(this.remove.bind(this, id), timeout)
  },
  remove(id) {
    const newFlashes = this.flashes.filter(flash => flash.id !== id)
    this.flashes.replace(newFlashes)
  },
  removeAll() {
    this.flashes.clear()
  },
  hasFlashes() {
    return this.flashes.length > 0
  },
  handleRouteChange() {
    const newFlashes = this.flashes.filter(flash => {
      return !this.previousFlashes.find(previous => previous.id === flash.id)
    })
    this.previousFlashes.replace(newFlashes)
    this.flashes.replace(newFlashes)
  },
})
