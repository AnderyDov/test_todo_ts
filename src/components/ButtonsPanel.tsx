import { useAppDispatch, useAppSelector } from "../store/customHooks"; // Хуки редакса
import { clearCompleted, changeFilter } from "../store/appSlice"; // Редюсеры  для фильтрации и удаления выполненных щадач
import React from "react";

export default function ButtonsPanel() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.app.count); // Состояние колличество задач
  const filter = useAppSelector((state) => state.app.filter); // Состояние фильтрации

  // Функция удаляет выполненные задачи
  function clearCompletedFunc() {
    dispatch(clearCompleted());
  }

  // Функция изменяет фильтр для показа задач
  function changeFilterFunc(e: React.ChangeEvent<HTMLButtonElement>) {
    dispatch(changeFilter(e.currentTarget.dataset.title));
  }

  let out = (
    <div className="flex justify-around my-1">
      <div className="flex items-center">{count} items</div>
      <div className="btn-group">
        <input
          type="radio"
          name="options"
          data-title="all"
          checked={filter === "all" ? true : false}
          onChange={changeFilterFunc}
          className="btn btn-ghost btn-sm text-[10px]"
          value="All"
        />
        <input
          type="radio"
          name="options"
          data-title="active"
          onChange={changeFilterFunc}
          checked={filter === "active" ? true : false}
          className="btn btn-ghost btn-sm text-[10px]"
          value="Active"
        />
        <input
          type="radio"
          name="options"
          data-title="completed"
          onChange={changeFilterFunc}
          checked={filter === "completed" ? true : false}
          className="btn btn-ghost btn-sm text-[10px]"
          value="Completed"
        />
      </div>
      <button
        className="btn btn-ghost btn-sm text-[10px]"
        onClick={clearCompletedFunc}
      >
        Clear completed
      </button>
    </div>
  );

  return out;
}
