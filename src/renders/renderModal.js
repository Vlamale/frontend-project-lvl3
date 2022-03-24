function renderModalWrapper() {
  const $modalWrapper = document.createElement('div');

  $modalWrapper.classList.add('modal-wrapper');
  $modalWrapper.dataset.action = 'closeModal';
  $modalWrapper.style.backgroundColor = '#000';
  $modalWrapper.style.position = 'fixed';
  $modalWrapper.style.top = '0';
  $modalWrapper.style.bottom = '0';
  $modalWrapper.style.right = '0';
  $modalWrapper.style.left = '0';
  $modalWrapper.style.opacity = '.5';
  document.body.append($modalWrapper);
}

function renderModal({ elements, modalData }) {
  if (!modalData) {
    const $modalWrapper = document.querySelector('.modal-wrapper');

    document.body.removeChild($modalWrapper);
    elements.$modal.style.display = 'none';

    return;
  }

  const $postTitle = document.querySelector(`[data-id='${modalData.elementId}'] .post-title`);

  $postTitle.classList.add('fw-normal');
  $postTitle.classList.remove('fw-bold');

  renderModalWrapper();

  elements.$modal.querySelector('.modal-title').textContent = modalData.title;
  elements.$modal.querySelector('.modal-body > p').textContent = modalData.description;
  elements.$modal.querySelector('[data-action=readMore]').href = modalData.url;
  elements.$modal.style.display = 'block';
}

export default renderModal;
