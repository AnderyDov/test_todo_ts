import "./App.css";
import { useAppSelector } from "./store/customHooks"; // Кастомный хук редакса для управления состоянием
import ToggleTheme from "./components/ToggleTheme"; // Компонент переключатель темы

export default function App() {
  const theme = useAppSelector((state) => state.app.theme); // Состояние темы

  let out = (
    <div
      className="flex flex-col h-full items-center p-10"
      data-theme={theme ? "luxury" : "fantasy"}
    >
      TODO LIST
      <ToggleTheme />
    </div>
  );

  return out;
}