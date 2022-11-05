import * as actions from "../store/appSlice";
import store from "../store/store";

let state = store.getState().app;
describe("appSlice reduser testings", () => {
  test("Should be initialstate", () => {
    expect(state).toEqual(store.getState().app);
  });

  test("setTheme change store app theme", () => {
    store.dispatch(actions.setTheme(true));
    expect(store.getState().app.theme).toBeTruthy();
    store.dispatch(actions.setTheme(false));
    expect(store.getState().app.theme).toBeFalsy();
    store.dispatch(actions.setTheme(true));
    expect(store.getState().app.theme).toBeTruthy();
  });

  test("addTask added new task object in todo list", () => {
    store.dispatch(actions.addTask("new task"));
    expect(store.getState().app.list[0].text).toEqual("new task");
    expect(store.getState().app.list[0].status).toBeFalsy();
  });

  test("changeTask change text target task by id", () => {
    const targetId = store.getState().app.list[0].id;
    store.dispatch(actions.changeTask({ id: targetId, text: "777" }));
    expect(store.getState().app.list[0].text).toEqual("777");
  });

  test("changeStatus change status target task by id", () => {
    const targetId = store.getState().app.list[0].id;
    store.dispatch(actions.changeStatus(targetId));
    expect(store.getState().app.list[0].status).toBeTruthy();
    store.dispatch(actions.changeStatus(targetId));
    expect(store.getState().app.list[0].status).toBeFalsy();
  });

  test("delTask deleted target taskby id", () => {
    const targetId = store.getState().app.list[0].id;
    store.dispatch(actions.delTask(targetId));
    expect(store.getState().app.list.length).toEqual(0);
  });

  test("clearCompleted delele all task with completed status", () => {
    store.dispatch(actions.addTask("new task"));
    store.dispatch(actions.addTask("new task"));
    store.dispatch(actions.addTask("new task"));
    const targetId = store.getState().app.list[1].id;
    store.dispatch(actions.changeStatus(targetId));
    store.dispatch(actions.clearCompleted());
    expect(store.getState().app.list.length).toEqual(2);
  });

  test("changeFilter change value finltration parametr", () => {
    store.dispatch(actions.changeFilter("active"));
    expect(store.getState().app.filter).toEqual("active");
    store.dispatch(actions.changeFilter("completed"));
    expect(store.getState().app.filter).toEqual("completed");
    store.dispatch(actions.changeFilter("all"));
    expect(store.getState().app.filter).toEqual("all");
  });

  test("setCount change value count in app store", () => {
    store.dispatch(actions.setCount(6));
    expect(store.getState().app.count).toEqual(6);
  });
});
