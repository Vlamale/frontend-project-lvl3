import renderByformStatus from './renders/renderByformStatus';

function view(elements, path, value) {
  switch (path) {
    case 'rssForm.url':
      break;

    case 'rssForm.status':
      renderByformStatus[value](elements);
      break;

    case 'rssForm.feedbackMessage':
      elements.$feedback.textContent = value;
      break;

    default:
      break;
  }
}

export default view;
