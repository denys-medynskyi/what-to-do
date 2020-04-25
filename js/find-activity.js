// 1. Onload start generating activity.
// 2. When `Stop` is clicked -> show `Try again`
// 3. When `Try again` is clicked -> restart generating activity.

window.onload = (event) => {
  loadActivities().then(activities => {
    // 1. Onload start generating activity.
    window.generatingActivityInProgress = startGenerating(activities)
    window.animationInProgress = startAnimating()

    let stopTrigger = document.getElementById('js-stop-activity-generator')
    let restartTrigger = document.getElementById('js-restart-activity-generator')

    // 2. When `Stop` is clicked -> show `Try again`
    stopTrigger.addEventListener('click', (event) => {
      event.preventDefault()
      clearInterval(window.generatingActivityInProgress);
      clearInterval(window.animationInProgress)

      hideElement(stopTrigger);
      showElement(restartTrigger);
    })

    // 3. When `Try again` is clicked -> restart generating activity.
    restartTrigger.addEventListener('click', (event) => {
      event.preventDefault()
      window.generatingActivityInProgress = startGenerating(activities)
      window.animationInProgress = startAnimating()

      hideElement(restartTrigger);
      showElement(stopTrigger);
    })

  }).catch(reason => console.log(reason.message));
}

// let's load activities before user click
async function loadActivities () {
  let response = await fetch('https://raw.githubusercontent.com/deny7ko/what-to-do/master/activities.json')
  let data = await response.json()

  return data;
}

function startGenerating (activities) {
  return setInterval(() => {
    const activity = pickActivity(activities);
    showActivity(activity)
  }, 200)
}

function pickActivity (activities) {
  const randomActivityIndex = Math.floor(Math.random() * activities.length)
  return activities[randomActivityIndex]
}

function showActivity (activity) {
  const activityContainer = document.getElementById('js-random-activity-container')
  activityContainer.innerHTML = activity.title;
  activityContainer.style.color = randomColor();

  // if (activity.url) {
  //   const activityLink = findActivityLink()
  //   if (!activityLink) {
  //     debugger
  //   }
  //   activityLink.href = activity.url;
  // }
}


function showElement (element) {
  element.classList.remove('is-hidden');
}

function hideElement (element) {
  element.classList.add('is-hidden');
}

function randomColor () { return "#" + Math.floor(Math.random()*16777215).toString(16) }

function startAnimating () {
  // 1. letters are moving
  // 2. pattern is moving
  // 3. pattern should have bigger height
  const animatedImage = document.getElementById('js-animated-image')
  const animatedImageTwo = document.getElementById('js-animated-image-2')

  return setInterval(() => {
    let bounding = animatedImage.getBoundingClientRect();
    animatedImage.style.top = (bounding.top + 1) + 'px';
    let bounding2 = animatedImageTwo.getBoundingClientRect();
    animatedImageTwo.style.top = (bounding2.top + 1) + 'px';
    // let bounding = animatedImage.getBoundingClientRect();
    // // element inside the screen

    // if (bounding.bottom < window.innerHeight) {
    //   // move image down
    //   animatedImage.style.top = (bounding.top + 1) + 'px';
    // } else  {
    //   // move image up
    //   animatedImage.style.top = (bounding.top - 1) + 'px';
    // }

  }, 10)
}
