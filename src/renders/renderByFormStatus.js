const renderByFormStatus = {
  ready: (elements) => {
    elements.$urlInput.readOnly = false;
    elements.$submitBtn.disabled = false;
    elements.$urlInput.classList.remove('is-invalid');
  },
  error: (elements) => {
    elements.$urlInput.readOnly = false;
    elements.$submitBtn.disabled = false;
    elements.$feedback.classList.add('text-danger');
    elements.$feedback.classList.remove('text-success');
  },
  validationError: (elements) => {
    elements.$urlInput.readOnly = false;
    elements.$submitBtn.disabled = false;
    elements.$urlInput.classList.add('is-invalid');
    elements.$feedback.classList.add('text-danger');
    elements.$feedback.classList.remove('text-success');
  },
  success: (elements) => {
    elements.$urlInput.readOnly = false;
    elements.$submitBtn.disabled = false;
    elements.$urlInput.classList.remove('is-invalid');
    elements.$urlInput.value = '';
    elements.$urlInput.focus();
    elements.$feedback.classList.remove('text-danger');
    elements.$feedback.classList.add('text-success');
  },
  waiting: (elements) => {
    elements.$urlInput.classList.remove('is-invalid');
    elements.$urlInput.readOnly = true;
    elements.$submitBtn.disabled = true;
  },
};

export default renderByFormStatus;
