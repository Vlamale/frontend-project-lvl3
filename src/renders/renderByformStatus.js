function renderByFormStatus(elements) {
  return {
    ready: () => {
      elements.$submitBtn.disabled = false;
      elements.$urlInput.classList.remove('is-invalid');
    },
    error: () => {
      elements.$submitBtn.disabled = false;
      elements.$feedback.classList.add('text-danger');
      elements.$feedback.classList.remove('text-success');
    },
    validationError: () => {
      elements.$submitBtn.disabled = false;
      elements.$urlInput.classList.add('is-invalid');
      elements.$feedback.classList.add('text-danger');
      elements.$feedback.classList.remove('text-success');
    },
    success: () => {
      elements.$submitBtn.disabled = false;
      elements.$urlInput.classList.remove('is-invalid');
      elements.$urlInput.value = '';
      elements.$urlInput.focus();
      elements.$feedback.classList.remove('text-danger');
      elements.$feedback.classList.add('text-success');
    },
    waiting: () => {
      elements.$urlInput.classList.remove('is-invalid');
      elements.$submitBtn.disabled = true;
    },
  };
}

export default renderByFormStatus;
