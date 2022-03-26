import onChange from 'on-change';
import i18next from 'i18next';
import { setLocale } from 'yup';
import { formHandler, pageClickHandler } from './handlers/index.js';
import view from './view.js';
import resources from './locales/index.js';
import watchRssUpdates from './watchRssUpdates.js';

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
        notOneOf: 'validationError:form.errors.rssAlreadyExists',
      },
      string: {
        url: 'validationError:form.errors.rssIsNotValid',
      },
    });
  });

  const elements = {
    $root: document.querySelector('#root'),
    $form: document.querySelector('.link-form'),
    $submitBtn: document.querySelector('.link-form__submit-btn'),
    $urlInput: document.querySelector('.link-form__input'),
    $feedback: document.querySelector('.feedback'),
    $postContainer: document.querySelector('.post-container'),
    $feedContainer: document.querySelector('.feed-container'),
    $modal: document.querySelector('.modal'),
  };

  const initialState = {
    rssForm: {
      url: '',
      isValid: true,
      status: 'ready',
      feedbackMessage: '',
    },
    feedUrls: [],
    feeds: [],
    posts: [],
    showModalWithData: null,
  };
  const state = onChange(initialState, view.bind(
    null,
    {
      elements,
      i18nextInstance,
    },
  ));

  elements.$root.addEventListener('click', pageClickHandler.bind(null, state));

  elements.$form.addEventListener('submit', formHandler.bind(null, {
    state,
    i18nextInstance,
  }));

  watchRssUpdates({
    state,
    i18nextInstance,
    delay: 5000,
  });
}

export default app;
