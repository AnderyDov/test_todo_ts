import { useAppDispatch } from "../store/customHooks"; // Хуки редакса
import SvgComponent from "../components/SvgComponent"; // Компонент для отрисовки SVG картинок
import { delTask, changeTask, changeStatus } from "../store/appSlice"; // Редюсеры управления состоянием приложения

interface Prop {
  id: string;
  text: string;
  status: boolean;
  filter: string;
}

export default function Task({ id, text, status, filter }: Prop) {
  const dispatch = useAppDispatch();

  // Функция удаляет задачу по её ID
  function deleteItem(e: React.MouseEvent<HTMLButtonElement>): void {
    dispatch(delTask(e.currentTarget.dataset.id));
  }

  // Функци изменения статуса задачаи, срабатывает по клику
  function changeStatusFunc(e: React.MouseEvent<HTMLDivElement>) {
    dispatch(changeStatus(e.currentTarget.dataset.id));
  }

  // Фукнция вставляет инпут для редактирования задачи, вешает на него событие потери фокуса
  function startChangeTaskText(e: React.MouseEvent<HTMLSpanElement>): void {
    let t = e.currentTarget;
    if (t.children.length === 0) {
      let inp = document.createElement("input");
      inp.classList.add("input", "input-bordered", "input-sm");
      inp.value = t.textContent;
      t.innerHTML = "";
      t.append(inp);
      inp.focus();
      inp.addEventListener("blur", saveText);
    }
  }

  // Функция для сохранентя текста,срабаывает по потери фокуса
  function saveText(e: React.FocusEvent<HTMLInputElement> | any) {
    let t = e.currentTarget;
    dispatch(changeTask({ id: t.dataset.id, text: t.value }));
    console.log(t.value);
    e.currentTarget.parentElement.innerHTML = t.value;
  }

  let out = (
    <li className="relative m-4   border-b-[0.5px] flex items-center">
      <div
        className="w-5 h-5 mr-2 rounded-full outline outline-1 p-1  cursor-pointer"
        data-id={id}
        onClick={changeStatusFunc}
      >
        {status === true && <SvgComponent name="ok" />}
      </div>
      <span
        className="flex items-center overflow-hidden max-w-[70%]  cursor-pointer"
        onClick={startChangeTaskText}
        data-id={id}
      >
        {text}
      </span>
      <button
        className="absolute btn btn-xs btn-ghost text-[10px] flex self-center right-0  cursor-pointer"
        data-id={id}
        onClick={deleteItem}
      >
        del
      </button>
    </li>
  );

  if (filter === "completed" && status === true) {
    return out;
  }
  if (filter === "active" && status === false) {
    return out;
  }
  if (filter === "all") {
    return out;
  }
}
