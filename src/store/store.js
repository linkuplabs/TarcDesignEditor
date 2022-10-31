import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const middleware = [thunk ];

const initialState = {}


export const store = createStore(
        rootReducer,
        initialState,
        compose(
                applyMiddleware(...middleware),
                //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
);

export const unsplash = {
        secretKey:"oSrd8SgHuTDudf9DbkdiaW_eENryvpsUI0h0whNgHAQ",
        accessKey:"0bRGkWnwmLqvD6VoaiThJqCElxZzy8N4-5ce-Zrd0Js"

}

export const pixabay = {
        api_key : "30770841-415e7a8e674354c7d780eca15"
}

export const postermywall = {
        api_key : "zx1ZZgqWjgLGIHalPahVXC1PsOdccjYH",
        app_id: "9d02318d-211a-40d9-82af-31fd65b24ceb"
}

