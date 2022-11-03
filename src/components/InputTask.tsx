import { useAppDispatch } from "../store/customHooks"; // Хук редакса для изменения состояния
import { addTask } from "../store/appSlice"; // Редюсер для доьавления задачи
import React from "react";

export default function InputTask() {
  const dispatch = useAppDispatch();

  // Функция добавления новой задачи, срабатывае при потере фокуса
  function addNewTask(e:React.FocusEvent<HTMLInputElement>):void  {
    if (e.target.value !== "") {
      dispatch(addTask( e.target.value));
    }
    e.target.value = "";
  }

  // Функция сбрасввания фокуса с инпута по нажатию "Enter"
  function addTaskPressEnter(e:React.KeyboardEvent< HTMLInputElement>):void {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  }

  let out = (
    <div className="w-6/12 min-w-[500px] mt-7 border rounded-md p-2 flex justify-center">
      <input
        type="text"
        placeholder="add task"
        className="input input-sm w-full max-w-xs input-bordered input-primary"
        onBlur={addNewTask}
        onKeyDown={addTaskPressEnter}
      />
    </div>
  );

  return out;
}
