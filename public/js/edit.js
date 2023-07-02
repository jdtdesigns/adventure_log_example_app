const formEl = document.querySelector('#log-form');
const titleInput = document.querySelector('#title-input');
const locationInput = document.querySelector('#location-input');

function getParams() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  return params;
}

function outputLogDetails() {
  const log_id = getParams().get('log_id');

  fetch(`/edit/${log_id}`)
    .then(res => res.json())
    .then(log => {
      titleInput.value = log.title;
      locationInput.value = log.location;
    })
}

function updateLog(e) {
  const user_id = getParams().get('user_id');
  e.preventDefault();
  const log_id = getParams().get('log_id');

  fetch('/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: log_id,
      title: titleInput.value,
      location: locationInput.value
    })
  }).then(res => window.location = `/log?id=${user_id}`);
}

formEl.addEventListener('submit', updateLog);
outputLogDetails();