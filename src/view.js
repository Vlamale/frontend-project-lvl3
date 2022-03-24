import { createFeedsTemplate, createPostsTemplate } from './templates';
import { renderModal, renderByFormStatus } from './renders/index';

function view({ elements, i18nextInstance }, path, value) {
  switch (path) {
    case 'showModalWithData':
      renderModal({
        elements,
        modalData: value,
      });

      break;

    case 'rssForm.status':
      renderByFormStatus(elements)[value]();

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
