import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import reducer from './reducers';
import rootSaga from './redux-sagas';

const configureAppStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware];

    const middleware = [
        ...getDefaultMiddleware({ thunk: false }),
        ...middlewares,
    ];

    const store = configureStore({
        reducer: reducer,
        middleware: middleware,
    });

    sagaMiddleware.run(rootSaga);

    return store;
};

// const sagaMiddleware = createSagaMiddleware();

// const store = configureStore({
//     reducer: reducer,
//     middleware: [sagaMiddleware],
// });

// sagaMiddleware.run(rootSaga);

export default configureAppStore;