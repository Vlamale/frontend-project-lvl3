import * as yup from 'yup';

function formHandler(state, elements, i18nextInstance) {
    elements.$form.addEventListener('submit', (e) => {
        e.preventDefault();
        state.rssForm.status = 'waiting';
        state.rssForm.feedbackMessage = '';

        const urlSchema = yup
            .string()
            .url()
            .required()
            .notOneOf(state.feedUrls)
        const data = new FormData(e.target);
        const dataUrl = data.get('url');

        urlSchema
            .validate(dataUrl)
            .then((url) => {
                state.rssForm.url = url;
                state.rssForm.status = 'success';
                state.rssForm.feedbackMessage = i18nextInstance.t('rssSuccessfullyLoaded');
                state.feedUrls.push(url);
            })
            .catch((err) => {
                state.rssForm.status = 'error';
                state.rssForm.feedbackMessage = i18nextInstance.t(err.message);
            });
    });
}

export default formHandler;
