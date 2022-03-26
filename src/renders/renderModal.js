function renderModalWrapper($root) {
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
  $root.append($modalWrapper);
}

function renderModal({ elements, modalData }) {
  const { $root } = elements;
  const { $modal } = elements;

  if (!modalData) {
    const $modalWrapper = $root.querySelector('.modal-wrapper');

    $root.removeChild($modalWrapper);
    $modal.style.display = 'none';

    return;
  }

  const $postTitle = $root.querySelector(`[data-id='${modalData.elementId}'] .post-title`);

  $postTitle.classList.add('fw-normal');
  $postTitle.classList.remove('fw-bold');

  renderModalWrapper($root);

  $modal.querySelector('.modal-title').textContent = modalData.title;
  $modal.querySelector('.modal-body').textContent = modalData.description;
  $modal.querySelector('[data-action=readMore]').href = modalData.url;
  $modal.style.display = 'block';
}

export default renderModal;
