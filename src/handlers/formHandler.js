import * as yup from 'yup';

function formHandler(state, elements) {
  const urlSchema = yup
    .string()
    .url('Ссылка должна быть валидным URL')
    .required();

  elements.$form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.rssForm.status = 'waiting';
    state.rssForm.feedbackMessage = '';

    const data = new FormData(e.target);
    const dataUrl = data.get('url');

    urlSchema
      .validate(dataUrl)
      .then((url) => {
        if (state.feedUrls.includes(url)) {
          throw new Error('RSS уже существует');
        }
        state.rssForm.url = url;
        state.rssForm.status = 'success';
        state.rssForm.feedbackMessage = 'RSS успешно загружен';
        state.feedUrls.push(url);
      })
      .catch((err) => {
        state.rssForm.status = 'error';
        state.rssForm.feedbackMessage = err.message;
      });
  });
}

export default formHandler;
