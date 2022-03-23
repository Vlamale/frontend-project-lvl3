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
