export default class Store {
  constructor (namespace) {
    this.namespace = namespace
  }

  set (key, value) {
    if (value === undefined) {
      value = key
      key = this.namespace
      console.log(`- KEY: ${key} / VALUE:`, value)
    }
    if (typeof value === 'object') value = JSON.stringify(value)
    localStorage.setItem(key, value)
  }

  get (key) {
    let data = localStorage.getItem(this.namespace)
    if (typeof data !== 'string') return data

    try {
      data = JSON.parse(data)
      if (key) data = data[key]
      return data
    } catch (e) {
      return data
    }
  }
}
