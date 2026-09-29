// Email signup. The endpoint is the form's `data-endpoint` attribute in index.html.
// The address is sent as a URL-encoded POST under the input's `name`.

const CONTACT_EMAIL = 'contact@skintheory.app';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const form = document.querySelector('[data-signup]');
if (form) initSignup(form);

function initSignup(form) {
  const input = form.querySelector('input[type="email"]');
  const trap = form.querySelector('.field-trap input');
  const button = form.querySelector('button[type="submit"]');
  const message = form.querySelector('.field-msg');
  const done = document.querySelector('[data-signup-done]');
  const mascot = document.querySelector('[data-signup-mascot]');
  const endpoint = form.dataset.endpoint;
  const buttonLabel = button.textContent;

  const showError = (text, { invalid = false } = {}) => {
    message.textContent = text;
    input.setAttribute('aria-invalid', String(invalid));
  };

  const setBusy = (busy) => {
    button.disabled = busy;
    button.textContent = busy ? 'Sending…' : buttonLabel;
  };

  const showDone = (email) => {
    done.querySelector('[data-signup-email]').textContent = email;
    form.hidden = true;
    done.hidden = false;
    done.focus();
    mascot?.classList.add('is-happy');
  };

  input.addEventListener('input', () => {
    if (message.textContent) showError('');
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = input.value.trim();

    if (!EMAIL_PATTERN.test(email)) {
      showError('Enter an email address like name@example.com.', { invalid: true });
      input.focus();
      return;
    }
    // Bots fill every field; pretend it worked and send nothing.
    if (trap?.value) {
      showDone(email);
      return;
    }

    showError('');
    setBusy(true);
    try {
      await subscribe(endpoint, form);
      showDone(email);
    } catch (error) {
      console.error('Signup failed:', error);
      showError(`That didn’t go through. Try again, or email ${CONTACT_EMAIL}.`);
    } finally {
      setBusy(false);
    }
  });
}

async function subscribe(endpoint, form) {
  if (!endpoint) return previewSubscribe();

  const response = await fetch(endpoint, {
    method: 'POST',
    body: new URLSearchParams(new FormData(form)),
  });
  if (!response.ok) throw new Error(`Signup endpoint answered ${response.status}`);
}

// No endpoint yet: show the success state on a local preview, fail honestly anywhere else.
async function previewSubscribe() {
  const isLocal = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
  if (!isLocal) throw new Error('No signup endpoint is configured.');

  console.info('Signup preview: nothing was sent. Set data-endpoint on the form in index.html to go live.');
  await new Promise((resolve) => setTimeout(resolve, 600));
}
