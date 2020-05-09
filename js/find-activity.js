// 1. Onload start generating activity.
// 2. When `Stop` is clicked -> show `Try again`
// 3. When `Try again` is clicked -> restart generating activity.

window.onload = (event) => {
  loadActivities().then(activities => {
    // 1. Onload start generating activity.
    window.generatingActivityInProgress = startGenerating(activities)
    startImageAnimation();
    const stopTrigger = document.getElementById('js-stop-activity-generator')
    const restartTrigger = document.getElementById('js-restart-activity-generator')
    const activityLink = findRandomActivityLink()

    // 2. When `Stop` is clicked -> show `Try again`
    stopTrigger.addEventListener('click', (event) => {
      event.preventDefault()
      clearInterval(window.generatingActivityInProgress);
      stopImageAnimation();
      hideElement(stopTrigger);
      showElement(restartTrigger);
      showElement(activityLink);
    })

    // 3. When `Try again` is clicked -> restart generating activity.
    restartTrigger.addEventListener('click', (event) => {
      event.preventDefault()
      window.generatingActivityInProgress = startGenerating(activities)
      startImageAnimation();

      hideElement(restartTrigger);
      showElement(stopTrigger);
      hideElement(activityLink);
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
  // manipulate text
  const activityText = document.getElementById('js-random-activity-text')
  activityText.innerHTML = activity.title;
  activityText.style.color = randomColor();

  // manipulate link
  if (activity.url) {
    const activityLink = findRandomActivityLink()
    activityLink.href = activity.url;
  }
}

function findRandomActivityLink () {
  return document.getElementById('js-random-activity-link')
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
