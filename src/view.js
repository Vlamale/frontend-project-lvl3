import renderByformStatus from './renders/renderByformStatus';
import { createFeedsTemplate, createPostsTemplate } from './templates';

function view(elements, i18nextInstance, path, value) {
  switch (path) {
    case 'rssForm.status':
      renderByformStatus[value](elements);
      break;

    case 'rssForm.feedbackMessage':
      elements.$feedback.textContent = value;
      break;

    case 'feeds':
      createFeedsTemplate(value, elements.$feedContainer, i18nextInstance);
      break;

    case 'posts':
      createPostsTemplate(value, elements.$postContainer, i18nextInstance);
      break;

    default:
      break;
  }
}

export default view;
