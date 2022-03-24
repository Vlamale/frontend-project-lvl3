import { createFeedsTemplate, createPostsTemplate } from './templates.js';
import { renderByFormStatus, renderModal } from './renders/index.js';

function view({ elements, i18nextInstance }, path, value) {
  switch (path) {
    case 'showModalWithData':
      renderModal({
        elements,
        modalData: value,
      });

      break;

    case 'rssForm.status':
      renderByFormStatus[value](elements);

      break;

    case 'rssForm.feedbackMessage':
      elements.$feedback.textContent = value;

      break;

    case 'feeds':
      createFeedsTemplate({
        feeds: value,
        $container: elements.$feedContainer,
        i18nextInstance,
      });

      break;

    case 'posts':
      createPostsTemplate({
        posts: value,
        $container: elements.$postContainer,
        i18nextInstance,
      });

      break;

    default:
      break;
  }
}

export default view;
