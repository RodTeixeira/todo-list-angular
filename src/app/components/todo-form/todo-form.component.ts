import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { TodoSignalsService } from "src/app/services/todo-signals.service";
import { HeaderComponent } from "../header/header.component";
import { Todo } from "src/app/models/model/todo.model";

@Component({
  selector: "app-todo-form",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: "./todo-form.component.html",
  styleUrls: [],
})
export class TodoFormComponent implements OnInit {
  private todosSignalsService = inject(TodoSignalsService);
  private dialogRefService = inject(MatDialogRef<HeaderComponent>);
  private matData = inject<Todo>(MAT_DIALOG_DATA);
  allTodos = this.todosSignalsService.todosState();

  public todosForm = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(3)]),
    description: new FormControl("", [Validators.required, Validators.minLength(3)]),
  });

  ngOnInit(): void {
    console.log("ID=", this.matData.id);
    if (this.matData) {
      this.todosForm.patchValue({
        title: this.matData.title || "", // Usa o valor de `title` de `this.data` ou deixa vazio
        description: this.matData.description || "", // Usa o valor de `description` de `this.data` ou deixa vazio
      });
    }
  }

  setNameSubmitButton(): string {
    return this.matData ? "Confirmar" : "Adicionar";
  }

  handlerCommit() {
    this.matData ? this.handleEditTodo() : this.handleCreateNewTodo();
  }

  handleCreateNewTodo() {
    if (this.todosForm.value && this.todosForm.valid) {
      const title = String(this.todosForm.controls["title"].value);
      const description = String(this.todosForm.controls["description"].value);
      const maxId = this.allTodos.reduce((max, todo) => Math.max(max, todo.id), 0);
      const id = maxId + 1;
      const done = false;
      const createDate = new Date();

      this.todosSignalsService.updateTodos({ id, title, description, done, createDate });
      this.dialogRefService.close();
    }
  }

  handleEditTodo() {
    if (this.todosForm.value && this.todosForm.valid) {
      const title = String(this.todosForm.controls["title"].value);
      const description = String(this.todosForm.controls["description"].value);
      const id = this.matData.id;
      const done = this.matData.done;
      const createDate = this.matData.createDate;
      const editDate = new Date();

      this.todosSignalsService.editTodo({ id, title, description, done, createDate, editDate });
      this.dialogRefService.close();
    }
  }

  handleCloseModal() {
    this.dialogRefService.close();
  }
}
