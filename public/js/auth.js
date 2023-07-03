const form = document.querySelector('#auth-form');

function handleSubmit(e) {
  e.preventDefault();

  const isRegister = window.location.pathname.includes('register');
  const usernameInput = document.querySelector('#username-input');
  const passwordInput = document.querySelector('#password-input');
  const errorOutput = document.querySelector('.error');
  const url = isRegister ? '/register' : '/login';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: usernameInput.value,
      password: passwordInput.value
    })
  }).then(res => res.json())
    .then(userObj => {
      const error = userObj.message;

      if (error) {
        errorOutput.innerText = error;
        errorOutput.classList.add('show');
        return;
      }

      localStorage.setItem('adventure_user', JSON.stringify(userObj));
      window.location = '/dashboard';
    });
}

function isAuthenticated() {
  const user = localStorage.getItem('adventure_user');

  if (user) window.location = '/dashboard';
}

isAuthenticated();
form.addEventListener('submit', handleSubmit);
