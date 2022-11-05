import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/customHooks'; // Хуки редакса
import { setCount } from '../store/appSlice'; // Редюсеры управления состоянием приложения
import Task from './Task'; // Компонент для отрисовки одной задачи
import ButtonsPanel from './ButtonsPanel'; // Компонент панель кнопок для управления приложением

export default function List() {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.app.list); // Состояние список задач
  const filter = useAppSelector((state) => state.app.filter); // Состояние режим фильтрации

  // Взависимости от состояния фильтрации добовляет элементы списка
  const showList = [...list].map((el) => (
    <Task
      key={el.id}
      id={el.id}
      text={el.text}
      status={el.status}
      filter={filter}
    />
  ));

  // Эффект срабатывает при перерендере и изменяет колличество элементов списаки для показа на страние
  useEffect(() => {
    dispatch(setCount(document.querySelectorAll('li').length));
  });

  const out = (
    <div
      className='w-6/12 min-w-[500px]  mt-7 border rounded-md'
      data-testid='list'
    >
      <ol>{showList}</ol>
      <ButtonsPanel />
    </div>
  );

  return out;
}
