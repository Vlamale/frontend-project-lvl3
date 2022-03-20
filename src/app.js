import onChange from 'on-change';
import formHandler from './handlers/formHandler';
import view from './view';
import i18next from 'i18next'
import resources from './locales/index'
import { setLocale } from 'yup'

function app() {
    const i18nextInstance = i18next.createInstance()
    i18nextInstance.init({
        lng: 'ru',
        debug: true,
        resources: {
            ru: resources.ru
        }
    }).then(() => {
        setLocale({
            mixed: {
                notOneOf: 'rssAlreadyExists',
            },
            string: {
                url: 'rssIsNotValid',
            },
        })
    })

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

    formHandler(state, elements, i18nextInstance);
}

export default app;
