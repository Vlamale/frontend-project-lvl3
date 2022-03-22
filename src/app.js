import onChange from 'on-change';
import i18next from 'i18next';
import { setLocale } from 'yup';
import formHandler from './handlers/formHandler';
import view from './view';
import resources from './locales/index';
import watchRssUpdates from './watchRssUpdates';

function app() {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: resources.ru,
    },
  }).then(() => {
    setLocale({
      mixed: {
        notOneOf: 'form.errors.rssAlreadyExists',
      },
      string: {
        url: 'form.errors.rssIsNotValid',
      },
    });
  });

  const elements = {
    $form: document.querySelector('.link-form'),
    $urlInput: document.querySelector('.link-form__input'),
    $feedback: document.querySelector('.feedback'),
    $postContainer: document.querySelector('.post-container'),
    $feedContainer: document.querySelector('.feed-container'),
  };

  const initialState = {
    rssForm: {
      url: '',
      isValid: true,
      status: 'waiting',
      feedbackMessage: '',
    },
    feedUrls: [],
    feeds: [],
    posts: [],
  };
  const state = onChange(initialState, view.bind(null, elements, i18nextInstance));

  formHandler(state, elements, i18nextInstance);
  watchRssUpdates(state, 5000);
}

export default app;
