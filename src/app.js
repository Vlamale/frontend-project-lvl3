import onChange from 'on-change';
import formHandler from './handlers/formHandler';
import view from './view';

function app() {
  const elements = {
    $form: document.querySelector('.link-form'),
    $urlInput: document.querySelector('.link-form__input'),
    $feedback: document.querySelector('.feedback'),
  };

  const initialState = {
    rssForm: {
      url: '',
      isValid: true,
      status: 'waiting',
      feedbackMessage: '',
    },
    feedUrls: [],
  };
  const state = onChange(initialState, view.bind(null, elements));

  formHandler(state, elements);
}

export default app;
