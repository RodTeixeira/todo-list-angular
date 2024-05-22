import { Todo } from "src/app/models/model/todo.model";
import { Component, EventEmitter, Input, Output, WritableSignal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { TodoCardComponent } from "./components/todo-card/todo-card.component";
import { TodoSignalsService } from "./services/todo-signals.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @Input() projectName!: string;
  @Output() outputEvent = new EventEmitter<string>();
  title = "todo-list-16";

  todoSignal!: WritableSignal<Todo[]>;
  renderTestMessage = false;
  isDone = false;

  constructor(private todoSignalsService: TodoSignalsService) {}

  handleEmitEvent() {
    this.outputEvent.emit(this.projectName);
  }

  handleCreateTodo(todo: Todo) {
    if (todo) {
      this.todoSignalsService.updateTodos(todo);
      this.todoSignal = this.todoSignalsService.todosState;
    }
  }

  hanDlerCheckIsDone() {
    setTimeout(() => {
      this.isDone = true;
    }, 200);
  }
}
