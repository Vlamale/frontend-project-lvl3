const renderByformStatus = {
  error: (elements) => {
    elements.$feedback.classList.add('text-danger');
    elements.$feedback.classList.remove('text-success');
  },
  validationError: (elements) => {
    elements.$urlInput.classList.add('is-invalid');
    elements.$feedback.classList.add('text-danger');
    elements.$feedback.classList.remove('text-success');
  },
  success: (elements) => {
    elements.$urlInput.classList.remove('is-invalid');
    elements.$urlInput.value = '';
    elements.$urlInput.focus();
    elements.$feedback.classList.remove('text-danger');
    elements.$feedback.classList.add('text-success');
  },
  waiting: (elements) => {
    elements.$urlInput.classList.remove('is-invalid');
  },
};

export default renderByformStatus;
