import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import rootSaga from './rootSaga';
import authReducer from "./reducers/loginSlice";
import userReducer from './reducers/userSlice';
import signupReducer from './reducers/signupSlice';
import messageReducer from './reducers/conversationSlice';
import settingsReducer from './reducers/settingSlice';
import notificationReducer from './reducers/notificationSlice';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = configureStore({
    reducer: {
        login: authReducer,
        user: userReducer,
        signup: signupReducer,
        messages: messageReducer,
        settings: settingsReducer,
        notification: notificationReducer,
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

export default store;