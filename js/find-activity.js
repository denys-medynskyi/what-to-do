// 1. Onload start generating activity.
// 2. When `Stop` is clicked -> show `Try again`
// 3. When `Try again` is clicked -> restart generating activity.

window.onload = (event) => {
  loadActivities().then(activities => {
    // 1. Onload start generating activity.
    window.generatingActivityInProgress = startGenerating(activities)
    startImageAnimation();
    let stopTrigger = document.getElementById('js-stop-activity-generator')
    let restartTrigger = document.getElementById('js-restart-activity-generator')

    // 2. When `Stop` is clicked -> show `Try again`
    stopTrigger.addEventListener('click', (event) => {
      event.preventDefault()
      clearInterval(window.generatingActivityInProgress);
      stopImageAnimation();
      hideElement(stopTrigger);
      showElement(restartTrigger);
    })

    // 3. When `Try again` is clicked -> restart generating activity.
    restartTrigger.addEventListener('click', (event) => {
      event.preventDefault()
      window.generatingActivityInProgress = startGenerating(activities)
      startImageAnimation();

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

function stopImageAnimation () {
  Array.from(document.getElementsByClassName('is-animated')).forEach(function (element) {
    stopAnimation(element)
  })
}

function startImageAnimation () {
  Array.from(document.getElementsByClassName('is-animated')).forEach(function (element) {
    startAnimation(element)
  })
}

function stopAnimation(element) {
  element.style.webkitAnimationPlayState = "paused";
}

function startAnimation (element) {
  element.style.webkitAnimationPlayState = "running";
}
