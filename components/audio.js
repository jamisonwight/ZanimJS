import _ from 'lodash'
import zanimate from 'zanimate.js'

export default function audio() {

  let newAudio = document.createElement('audio'),
      appendAudio = appendChild(newAudio)
      elementID = document.getElementById()

  constructor(selector, path) {
    this.selector = selector,
    this.selectorSet = '',
    this.path = path,
  }

  checkElement() {
    if (elementID(this.selector).length !== 0) {
      this.isID = true
    } else {
      throw new Error('Element selector must be an Id') 
    }
    return this.setElement()
  }

  setElement() {
    if (this.isID == true) {
      this.selectorSet = elementID(this.selector).appendAudio()
    } else {
      throw new Error('Id selector not found')
    }
  }

  return this.checkElement()
}