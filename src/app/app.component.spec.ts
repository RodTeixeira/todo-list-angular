import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { first } from "rxjs";
import { TodoSignalsService } from "./services/todo-signals.service";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Todo } from "./models/model/todo.model";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoSignalsService: TodoSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule, NoopAnimationsModule],
      providers: [TodoSignalsService],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoSignalsService = TestBed.inject(TodoSignalsService);
    fixture.detectChanges();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  //Teste d @input
  it("should set @Input() property correctly", () => {
    component.projectName = "Testing angular";
    fixture.detectChanges();
    expect(component.projectName).toEqual("Testing angular");
  });

  // teste de @output() e @input()
  it("should emit event with @output decorator correctly", () => {
    component.projectName = "testing my angular aplication";
    component.outputEvent.pipe(first()).subscribe({
      next: (event) => {
        expect(event).toEqual("testing my angular aplication");
        component.handleEmitEvent();
      },
    });
  });

  //teste de acionamento de serviço e de um signal
  it("should create new todo correctly and call service method", () => {
    jest.spyOn(todoSignalsService, "updateTodos");
    const newTodo: Todo = {
      id: 0,
      title: "Testing",
      description: "Test new todo",
      done: true,
    };

    component.handleCreateTodo(newTodo);
    fixture.detectChanges();
    expect(todoSignalsService.updateTodos).toHaveBeenCalledWith(newTodo);
    expect(component.todoSignal()).toEqual([newTodo]);
  });

  //Teste de um elemento do Dom
  it("should not render paragraph in the DOM", () => {
    const component: DebugElement = fixture.debugElement;
    const element: HTMLElement = component.nativeElement;
    const paragraph = element.querySelector("p");
    expect(paragraph).toBeNull;
  });

  it("should render paragraph in the DOM", () => {
    component.renderTestMessage = true;
    fixture.detectChanges();
    const componentDebugElement: DebugElement = fixture.debugElement;
    const element = componentDebugElement.query(By.css("p"));
    const paragraph: HTMLElement = element.nativeElement;
    expect(paragraph.textContent).toEqual("Test your angular application");
  });

  it("should isDoned property to be false", () => {
    component.hanDlerCheckIsDone();
    expect(component.isDone).toBe(false);
  });

  it("should isDoned property to be true", fakeAsync(() => {
    component.hanDlerCheckIsDone();
    tick(200);
    expect(component.isDone).toBe(true);
  }));
});
