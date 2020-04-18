// let's load activities before user click
async function loadActivities () {
  let response = await fetch('https://raw.githubusercontent.com/deny7ko/what-to-do/master/activities.json')
  let data = await response.json()

  return data; // there is "" as the last item in the list
}

loadActivities().then(activities => {
  let onStartClick = startGenerating.bind(null, activities);
  let generatingTriggerElement = document.getElementById('js-random-activity-trigger');

  generatingTriggerElement.addEventListener('click', onStartClick);
  // generatingTriggerElement.addEventListener('click', onStopClick);
}).catch(reason => console.log(reason.message));

function startGenerating (activities, event) {
  event.preventDefault();

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
  // let element = createActivityElement(activity);
  // debugger
  const activityContainer = document.getElementById('js-random-activity-container')
  activityContainer.innerHTML = activity.title;
  activityContainer.style.color = randomColor();
}

function randomColor () { return "#" + Math.floor(Math.random()*16777215).toString(16) }
