window.onload = (event) => {
  // To animate element it should have
  // 1. class: is-invisible
  // 2. id: element-N. Elements are animated incrementalls from element-1 to element-N/
  // 3. data-animation-type: Which kind of animation should be applied
  // HTML element example:
  // <footer class="is-invisible" id="element-7" data-animation-type='fade-in'>
  var animationNumber = 1
  const ELEMENT_INVISIBLE_CLASS = 'is-invisible'

  function calculateElementAnimationStart (element) {
    return window.innerWidth - element.getBoundingClientRect().x
  }

  function triggerElementAnimation (element) {
    const animationType = element.getAttribute('data-animation-type')

    if(animationType == 'slide-in') {
      element.style.transform = "translateX(" + calculateElementAnimationStart(element) + "px" + ")";
    }

    showElement(element)
    element.classList.add(animationType)
  }

  function showElement (element) {
    element.classList.remove(ELEMENT_INVISIBLE_CLASS)
  }

  function skipAnimation () {
    Array.from(document.getElementsByClassName(ELEMENT_INVISIBLE_CLASS)).forEach(element => showElement(element))
    hideTrigger()
  }

  document.addEventListener('keyup', event => {
    // skip animation on Escape
    if (event.code === 'Escape') {
      skipAnimation()
    }

    // next animation on Space
    if (event.code === 'Space') {
      const query = `[data-animation-order='${animationNumber}']`
      const elements = Array.from(document.querySelectorAll(query))

      if (elements.length == 0) {
        console.error("element with " + query + " " + "not found")
        return
      }

      elements.forEach(element => triggerElementAnimation(element))
      animationNumber += 1; // take next element
    }
  })
}
