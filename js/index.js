// let's load activities before user click
async function loadActivities () {
  let response = await fetch('https://raw.githubusercontent.com/deny7ko/what-to-do/master/activities.txt')
  let data = await response.json()
  debugger

  return data.split("\n").filter(el => el != ""); // there is "" as the last item in the list
}

let activities = loadActivities()
//

function pickActivity (activities) {
  const randomActivityIndex = Math.floor(Math.random() * activities.length)
  return activities[randomActivityIndex]
}

function showActivity (activity) {
  document.getElementById('js-random-activity-container').innerHTML = activity;
}

function onActivityClick (event) {
  event.preventDefault()

  activities
    .then(activities => {
      const activity = pickActivity(activities)
      showActivity(activity)
    })
    .catch(reason => console.log(reason.message))
}

document.getElementById('js-random-activity-trigger').addEventListener('click', onActivityClick)
