function getAllAdventures() {
  const output = document.querySelector('.adventures');

  fetch('/api/adventures')
    .then(res => res.json())
    .then(adventures => {
      if (!adventures.length) output.innerHTML = '<p>No Adventures Have Been Added.';

      adventures.forEach(adventure => {
        output.insertAdjacentHTML('beforeend', `
        <article class="card">
          <h3 class="card-header">${adventure.title}</h3>
          <div class="card-body flex-column">
            <p>Location: ${adventure.location}</p>
            <p>Added By: ${adventure.username}</p>
            <p>Added On: ${adventure.createdOn}</p>
          </div>
        </article>
        `);
      })
    })
}

getAllAdventures();