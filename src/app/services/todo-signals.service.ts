import { Injectable, signal } from "@angular/core";
import { Todo } from "../models/model/todo.model";
import { TodoKeyLocalStorage } from "../models/model/enum/todoKeyLocalStorage";

@Injectable({
  providedIn: "root",
})
export class TodoSignalsService {
  public todosState = signal<Array<Todo>>([]);

  updateTodos(todo: Todo) {
    if (todo !== null || undefined) {
      this.todosState.mutate((todos) => {
        if (todos !== null) {
          todos.push(new Todo(todo.id, todo.title, todo.description, todo.done));
        }
      });
      this.saveTodosInLocalStorage();
    }
  }

  saveTodosInLocalStorage() {
    const todos = JSON.stringify(this.todosState());
    todos && localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, todos);
  }
}
