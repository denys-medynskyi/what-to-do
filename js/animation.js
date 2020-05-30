window.onload = (event) => {
  var elementNumber = 2

  function calculateElementAnimationStart (element) {
    return window.innerWidth - element.getBoundingClientRect().x
  }

  function triggerelementAnimation (element, animationStartPosition) {
    element.style.transform = "translateX(" + animationStartPosition + "px" + ")";
    element.classList.remove('is-invisible')
    element.classList.add('slide-in')
  }

  document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      const element = document.getElementById('element-' + elementNumber);
      if (element == null) {
        console.error("element with #id=" + 'element-' + elementNumber + " " + "not found")
        return
      }
      triggerelementAnimation(element, calculateElementAnimationStart(element))
      elementNumber += 1; // take next element
    }
  })
}
