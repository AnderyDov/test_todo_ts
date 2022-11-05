import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'; // Хуки редакса
import type { RootState, AppDispatch } from './store'; // Типы для хуков

export const useAppDispatch = () => useDispatch<AppDispatch>(); // Кастомный хук изменения состояния приложения
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // Кастомняй хук состония приложение
