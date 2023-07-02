const formEl = document.querySelector('#log-form');
const titleInput = document.querySelector('#title-input');
const locationInput = document.querySelector('#location-input');
const logOutput = document.querySelector('.user-adventures');

function getId() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const id = params.get('id');

  return id;
}

function handleSubmit(e) {
  e.preventDefault();

  const user_id = getId();

  fetch('/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: user_id,
      title: titleInput.value,
      location: locationInput.value
    })
  }).then(res => window.location = `/dashboard?id=${user_id}`);
}

function outputAdventures() {
  const user_id = getId();

  fetch(`/logs/${user_id}`)
    .then(res => res.json())
    .then(logs => {
      if (!logs.length) {
        logOutput.innerHTML = '<p class="mt-3">No Logs Have Been Added.</p>';
      }

      logs.forEach(log => {
        logOutput.insertAdjacentHTML('beforeend', `
        <article class="card">
          <h3 class="card-header">${log.title}</h3>
          <div class="card-body">
            <p>Location: ${log.location}</p>
            <a class="btn text-white" href="/edit?user_id=${user_id}&log_id=${log.id}">Edit Log</a>
            <a class="btn text-white bg-danger" href="/del/${log.id}?user_id=${user_id}">Delete Log</a>
          </div>
        </article>
        `);
      })
    })
}

outputAdventures();
formEl.addEventListener('submit', handleSubmit);

