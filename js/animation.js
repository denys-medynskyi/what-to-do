window.onload = (event) => {
  // To animate element it should have
  // 1. class: is-invisible
  // 2. id: element-N. Elements are animated incrementalls from element-1 to element-N/
  // HTML element example:
  // <footer class="is-invisible" id="element-7">
  var elementNumber = 2
  const ELEMENT_INVISIBLE_CLASS = 'is-invisible'
  const ANIMATION_TRIGGER_ID = 'js-animation-trigger'

  function calculateElementAnimationStart (element) {
    return window.innerWidth - element.getBoundingClientRect().x
  }

  function triggerElementAnimation (element, animationStartPosition) {
    element.style.transform = "translateX(" + animationStartPosition + "px" + ")";
    showElement(element)
    element.classList.add('slide-in')
  }

  function showElement (element) {
    element.classList.remove(ELEMENT_INVISIBLE_CLASS)
  }

  function hideElement (element) {
    element.classList.add(ELEMENT_INVISIBLE_CLASS)
  }

  function skipAnimation () {
    Array.from(document.getElementsByClassName(ELEMENT_INVISIBLE_CLASS)).forEach(element => showElement(element))
    hideTrigger()
  }

  function hideTrigger() {
    hideElement(document.getElementById(ANIMATION_TRIGGER_ID)) // hide trigger when nothing to animate
  }

  document.addEventListener('keyup', event => {
    // skip animation on Escape
    if (event.code === 'Escape') {
      skipAnimation()
    }

    // next animation on Space
    if (event.code === 'Space') {
      const element = document.getElementById('element-' + elementNumber);
      if (element == null) {
        hideTrigger()
        console.error("element with #id=" + 'element-' + elementNumber + " " + "not found")
        return
      }
      triggerElementAnimation(element, calculateElementAnimationStart(element))
      elementNumber += 1; // take next element
    }
  })
}
