import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
// import reducer from './reducers';
import rootSaga from './rootSaga';
import authReducer from "./reducers/loginSlice";
import userReducer from './reducers/userSlice';
import signupReducer from './reducers/signupSlice';
import usersReducer from './reducers/usersSlice';
import messageReducer from './reducers/conversationSlice';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = configureStore({
    reducer: {
        login: authReducer,
        user: userReducer,
        signup: signupReducer,
        // users: usersReducer,
        messages: messageReducer,
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