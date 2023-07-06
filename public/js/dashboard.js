const form = document.querySelector('#adventure-form');
const logoutBtn = document.querySelector('.logout');
const formHeader = document.querySelector('#form-header');
const titleInput = document.querySelector('#title-input');
const locationInput = document.querySelector('#location-input');
const output = document.querySelector('.adventures');

function getUser() {
  return JSON.parse(localStorage.getItem('adventure_user'));
}

function handleSubmit(e) {
  e.preventDefault();

  const user = getUser();

  if (!titleInput.value || !locationInput.value) return;

  fetch('/api/adventure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: titleInput.value,
      location: locationInput.value,
      user_id: user.id
    })
  }).then(() => window.location.reload())
}

function getAdventures() {
  const user = getUser();

  fetch(`/api/adventures/${user.id}`)
    .then(res => res.json())
    .then(adventures => {

      if (!adventures.length) output.innerHTML = '<p>No Adventures Have Been Added.';

      adventures.forEach(adventure => {
        output.insertAdjacentHTML('beforeend', `
        <article class="card">
          <h3 class="card-header">${adventure.title}</h3>
          <div class="card-body">
            <p>Location: ${adventure.location}</p>
            <p>Added By: You</p>
            <p>Added On: ${adventure.createdOn}</p>
            <div class="flex-row">
              <button data-id="${adventure.id}" id="edit" class="btn text-dark bg-light">Edit</button>
              <button data-id="${adventure.id}" id="delete" class="btn text-white bg-danger">Delete</button>
          </div>
        </article>
        `);
      })
    })
}

function logout(e) {
  e.preventDefault();

  localStorage.removeItem('adventure_user');
  window.location = '/adventures';
}

function editAdventure(adventure_id) {
  fetch(`/api/adventure/${adventure_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: titleInput.value,
      location: locationInput.value
    })
  }).then(() => window.location.reload());
}

function showEditView(adventure_id) {
  fetch(`/api/adventure/${adventure_id}`)
    .then(res => res.json())
    .then(adventure => {
      formHeader.innerText = 'Edit Your Adventure';
      titleInput.value = adventure.title;
      locationInput.value = adventure.location;

      form.removeEventListener('submit', handleSubmit);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        editAdventure(adventure_id);
      });
    });
}

function deleteAdventure(adventure_id) {
  fetch(`/api/adventure/${adventure_id}`, {
    method: 'DELETE'
  }).then(res => window.location.reload());
}

function isAuthenticated() {
  const user = localStorage.getItem('adventure_user');

  if (!user) return window.location = '/login';


  getAdventures();

  logoutBtn.addEventListener('click', logout);
  form.addEventListener('submit', handleSubmit);
  output.addEventListener('click', (e) => {
    if (e.target.innerText === 'Edit') showEditView(e.target.dataset.id);

    if (e.target.innerText === 'Delete') deleteAdventure(e.target.dataset.id);
  })
}

isAuthenticated();
