import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import reducer from './reducers';
import rootSaga from './redux-sagas';
// import authReducer from "./reducers/authSlice";


const configureAppStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware];

    const store = configureStore({
        reducer: reducer,
        // reducer: combineReducers({ authReducer }),
        // reducer: {
        //     currentUser: authReducer,
        // },
        middleware: (getDefaultMiddleware) => {
            const middleware = [
                ...getDefaultMiddleware({ thunk: false }),
                ...middlewares,
            ];

            return middleware;
        },
    });

    sagaMiddleware.run(rootSaga);

    return store;
};

export default configureAppStore;