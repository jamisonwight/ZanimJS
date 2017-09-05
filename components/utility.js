// UTILITY FUNCTIONS
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function replaceClass(element, removeClass, addClass) {
  element.classList.remove(removeClass)
  element.classList.add(addClass)
}

export function removeClass(theClass, ...args) {
  args.forEach((element) => {
    element.classList.remove(theClass)
  })
}

export function removeMultiClass(element, ...args) {
  args.forEach((c) => {
    element.classList.remove(c)
  })
}

export function addMultiClass(element, ...args) {
  args.forEach((c) => {
    element.classList.add(c)
  })
}

export function addClass(theClass, ...args) {
  args.forEach((element) => {
    element.classList.add(theClass)
  })
}

export function showElements(showClass, ...args) {
  args.forEach((element) => {
    element.classList.add(showClass)
  })
}

export function hideElements(hideClass, ...args) {
  args.forEach((element) => {
    element.classList.add(hideClass)
  })
}

export function removeElement(...args) {
  args.forEach((element) => {
    element.classList.remove('sticky_remove')
  })
}

export function addElement(...args) {
  args.forEach((element) => {
    element.classList.add('sticky_remove')
  })
}

export function setKeyframeIn(time, ...args) {
  setTimeout(() => {
    // Hide each element given as an argument
    args.forEach((element) => {
      hideElements('sticky_hide', element)
    })
    zanIn(0)
  }, time)
}

export function setKeyframe(time, element, ...classes) {
  setTimeout(() => {
    args.forEach((theClass) => {
      addClass(theClass, element)
    })
  }, time)
}

export function removeKeyframe(time, element, ...classes) {
  setTimeout(() => {
    args.forEach((theClass) => {
      addClass(theClass, element)
    })
  }, time)
}

