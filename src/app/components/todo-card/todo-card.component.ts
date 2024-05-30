import { Todo } from "./../../models/model/todo.model";
import { Component, OnInit, computed, inject } from "@angular/core";
import { NgFor, NgIf, NgTemplateOutlet } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { TodoSignalsService } from "src/app/services/todo-signals.service";
import { TodoKeyLocalStorage } from "src/app/models/model/enum/todoKeyLocalStorage";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { TodoFormComponent } from "../todo-form/todo-form.component";
import { SharedModule } from "src/app/shared/shared-module";

@Component({
  selector: "app-todo-card",
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    TodoFormComponent,
    SharedModule,
  ],
  templateUrl: "./todo-card.component.html",
  styleUrls: [],
})
export class TodoCardComponent implements OnInit {
  private todoSignalsService = inject(TodoSignalsService);
  private todosSignal = this.todoSignalsService.todosState;
  public todosList = computed(() => this.todosSignal());

  private dialogSercice = inject(MatDialog);

  public ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  private getTodosInLocalStorage(): void {
    const todosDatas = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string;
    todosDatas && this.todosSignal.set(JSON.parse(todosDatas));
  }

  private saveTodosInLocalStorage(): void {
    this.todoSignalsService.saveTodosInLocalStorage();
  }

  public handleDoneTodo(todoId: number): void {
    if (todoId) {
      this.todosSignal.mutate((todos) => {
        const todoSelected = todos.find((todo) => todo?.id === todoId) as Todo;
        todoSelected && (todoSelected.done = true) && (todoSelected.doneDate = new Date());
        this.saveTodosInLocalStorage();
      });
    }
  }

  public handleDeleteTodo(todo: Todo): void {
    if (todo) {
      const index = this.todosList().indexOf(todo);
      if (index !== -1) {
        this.todosSignal.mutate((todos) => {
          todos.splice(index, 1);
          this.saveTodosInLocalStorage();
        });
      }
    }
  }

  public handlerEditTodo(todo: Todo) {
    if (todo) {
      this.dialogSercice.open(TodoFormComponent, {
        width: "50vw",
        maxHeight: "80vh",
        data: todo,
      });
    }
  }
}
