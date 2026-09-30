// Email signup via Loops (https://loops.so). The endpoint is the form's
// `data-endpoint` attribute in index.html: a Loops newsletter-form URL.
// Loops expects a URL-encoded POST with `email`, `userGroup` and `mailingLists`.

const CONTACT_EMAIL = 'contact@skintheory.app';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_KEY = 'loops-form-timestamp';
const RATE_LIMIT_MS = 60_000;
const RATE_LIMIT_MESSAGE = 'Too many signups. Please try again in a minute.';

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

    // Loops rejects rapid repeat submissions; mirror that locally so the user gets a clear message.
    if (recentlySubmitted()) {
      showError(RATE_LIMIT_MESSAGE);
      return;
    }

    showError('');
    setBusy(true);
    try {
      await subscribe(endpoint, email);
      showDone(email);
    } catch (error) {
      console.error('Signup failed:', error);
      showError(errorText(error));
    } finally {
      setBusy(false);
    }
  });
}

function recentlySubmitted() {
  try {
    const previous = Number(localStorage.getItem(RATE_LIMIT_KEY));
    return previous > 0 && previous + RATE_LIMIT_MS > Date.now();
  } catch {
    return false;
  }
}

function rememberSubmission(clear = false) {
  try {
    localStorage.setItem(RATE_LIMIT_KEY, clear ? '' : String(Date.now()));
  } catch {
    // Storage unavailable (private mode etc.); the server still rate-limits.
  }
}

async function subscribe(endpoint, email) {
  if (!endpoint) return previewSubscribe();

  rememberSubmission();

  const body = new URLSearchParams({ userGroup: '', mailingLists: '', email });
  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
  } catch (error) {
    // Loops' Cloudflare rate limit blocks the request outright, surfacing as a network failure.
    if (error instanceof TypeError) throw new SignupError(RATE_LIMIT_MESSAGE);
    rememberSubmission(true);
    throw error;
  }

  if (response.ok) return;

  rememberSubmission(true);
  const data = await response.json().catch(() => null);
  throw new SignupError(data?.message, response.status);
}

class SignupError extends Error {
  constructor(message, status) {
    super(message || `Signup endpoint answered ${status}`);
    this.userMessage = message || null;
  }
}

function errorText(error) {
  if (error instanceof SignupError && error.userMessage) return error.userMessage;
  return `That didn’t go through. Try again, or email ${CONTACT_EMAIL}.`;
}

// No endpoint yet: show the success state on a local preview, fail honestly anywhere else.
async function previewSubscribe() {
  const isLocal = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
  if (!isLocal) throw new Error('No signup endpoint is configured.');

  console.info('Signup preview: nothing was sent. Set data-endpoint on the form in index.html to go live.');
  await new Promise((resolve) => setTimeout(resolve, 600));
}
