import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
// import reducer from './reducers';
import rootSaga from './redux-sagas';
import authReducer from "./reducers/loginSlice";
import userReducer from './reducers/userSlice';
import signupReducer from './reducers/signupSlice';


const configureAppStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware];

    const store = configureStore({
        reducer: {
            login: authReducer,
            user: userReducer,
            signup: signupReducer,
        },
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