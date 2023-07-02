const adventureOutput = document.querySelector('.adventure-output');

function getAdventures() {
  fetch('/logs')
    .then(res => res.json())
    .then(logs => {
      logs.forEach(log => {
        adventureOutput.insertAdjacentHTML('beforeend', `
        <article class="card">
          <h3 class="card-header">${log.title}</h3>
          <div class="card-body">
            <p>Location: ${log.location}</p>
            <p>Added By: ${log.username}</p>
          </div>
        </article>
        `);
      })
    })
}

getAdventures();