function renderModal({ elements, modalData }) {
  if (!modalData) {
    elements.$modal.style.display = 'none';
    elements.$modalWrapper.style.display = 'none';

    return;
  }

  const $postTitle = document.querySelector(`[data-id='${modalData.elementId}'] .post-title`);

  $postTitle.classList.add('fw-normal');
  $postTitle.classList.remove('fw-bold');

  elements.$modal.querySelector('.modal-title').textContent = modalData.title;
  elements.$modal.querySelector('.modal-body > p').textContent = modalData.description;
  elements.$modal.querySelector('[data-action=readMore]').href = modalData.url;
  elements.$modal.style.display = 'block';
  elements.$modalWrapper.style.display = 'block';
}

export default renderModal;
