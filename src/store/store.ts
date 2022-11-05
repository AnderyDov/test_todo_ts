import { configureStore } from '@reduxjs/toolkit'; // Хук редакса для настройки хранилища
import appReducer from './appSlice'; // Слайз для состояния приложения

const store = configureStore({
    reducer: {
        app: appReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
