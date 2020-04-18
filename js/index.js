// let's load activities before user click
async function loadActivities () {
  let response = await fetch('https://raw.githubusercontent.com/deny7ko/what-to-do/master/activities.json')
  let data = await response.json()

  return data;
}

const START_COLOR = '#8E59FF';
const STOP_COLOR = '#F3BC55';

loadActivities().then(activities => {
  let onStartClick = startClickFn.bind(null, activities);
  let generatingTriggerElement = document.getElementById('js-random-activity-trigger');

  generatingTriggerElement.addEventListener('click', onStartClick);
}).catch(reason => console.log(reason.message));

function startClickFn(activities, event) {
  event.preventDefault();
  event.target.style.backgroundColor = STOP_COLOR;
  event.target.innerText = 'Stop'

  if (window.generatingStartedInterval) {
    clearInterval(window.generatingStartedInterval);
    event.target.innerText = 'Another one?'
    event.target.style.backgroundColor = START_COLOR;
    window.generatingStartedInterval = null;
    return
  }

  window.generatingStartedInterval = startGenerating(activities)
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
}

function randomColor () { return "#" + Math.floor(Math.random()*16777215).toString(16) }
