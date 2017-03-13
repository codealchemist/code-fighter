export default class El {
  constructor (element) {
    if (typeof element === 'string') {
      element = document.getElementById(element)
    }

    this.$el = element
  }

  get () {
    return this.$el
  }

  show () {
    this.$el.style.display = 'block'
    return this
  }

  hide () {
    this.$el.style.display = 'none'
    return this
  }

  toggle () {
    if (this.$el.style.display === 'none') {
      this.show()
      return this
    }

    this.hide()
    return this
  }

  isVisible () {
    return (this.$el.style.display !== 'none' && this.$el.style.opacity !== 0)
  }

  style (styleName, value) {
    this.$el.style[styleName] = value
    return this
  }

  focus () {
    this.$el.focus()
    return this
  }

  html (value) {
    this.$el.innerHTML = value
    return this
  }

  val (value) {
    if (value === undefined) return this.$el.value
    this.$el.value = value
    return this
  }
}
