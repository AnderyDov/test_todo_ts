import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-uuid"; // Библиотека для генерации случайного ID

// Интерфейс одной задачи
interface Task {
  id: string;
  text: string;
  status: boolean;
}

// Интерфейс начального состояния
interface InitialState {
  theme: boolean;
  list: Task[];
  filter: string;
  count: number;
}

// Начальное состояние
const initialState: InitialState = {
  theme: false, // Тема по умолччанию светлая
  list: [], // Список дел
  filter: "all", // Фильт показа списка дел
  count: 0 // Колличество показанных элементов списка
};

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    // Меняет состояние темы
    setTheme(state, action: PayloadAction<boolean>) {
      state.theme = action.payload;
    },
    // Добавляет новую задачу
    addTask(state, action: PayloadAction<string>) {
      state.list.push({
        id: uuid(),
        text: action.payload,
        status: false
      });
    },
    // Удаляет задачу по принятому ID
    delTask(state, action: PayloadAction<string>) {
      state.list = state.list.filter((el) => {
        return el.id !== action.payload;
      });
    },
    // Изменяет задачу по принятому ID и тексту
    changeTask(state, action: PayloadAction<{ id: string; text: string }>) {
      state.list.map((el) => {
        if (el.id === action.payload.id) {
          el.text = action.payload.text;
        }
        return el;
      });
    },
    // Изменяет статус задача
    changeStatus(state, action: PayloadAction<string>) {
      state.list.map((el) => {
        if (el.id === action.payload) {
          el.status = !el.status;
        }
        return el;
      });
    },
    // Удаляет выполненные задачи
    clearCompleted(state, action) {
      state.list = state.list.filter((el) => {
        return el.status === false;
      });
    },
    // Изменяет состояние фильтрации
    changeFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    // Изменяет колличество отрисованных элементов списка дел
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    }
  }
});

export const {
  setTheme,
  addTask,
  delTask,
  changeTask,
  changeStatus,
  clearCompleted,
  changeFilter,
  setCount
} = appSlice.actions;

export default appSlice.reducer;
