import { TestBed } from "@angular/core/testing";
import { ExampleTestService } from "../example-teste.service";
import { TodoSignalsService } from "../todo-signals.service";
import { Todo } from "src/app/models/model/todo.model";

describe("ExampleTestService", () => {
  let service: ExampleTestService;
  let todoService: TodoSignalsService;

  beforeEach(() => {
    service = TestBed.inject(ExampleTestService);
    todoService = TestBed.inject(TodoSignalsService);
  });

  it("should return correct list", () => {
    service.getTestsNamesList().subscribe({
      next(list) {
        expect(list).toEqual([
          { id: 1, name: "test 1" },
          { id: 2, name: "test 2" },
        ]);
      },
    });
  });

  it("should return corret todo list", () => {
    jest.spyOn(todoService, "updateTodos");
    const newTodo: Todo = {
      id: 1,
      title: "new todo",
      description: "descriprion",
      done: true,
    };

    service.hanldeCreateTodo(newTodo).subscribe({
      next: (value) => {
        expect(value).toEqual([newTodo]);
        expect(todoService.updateTodos).toHaveBeenCalledWith(newTodo);
      },
    });
  });
});
