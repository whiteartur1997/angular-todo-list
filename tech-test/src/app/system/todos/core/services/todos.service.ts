import {TodoModel, TodoWithoutId} from "../interfaces/todo.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TodosService {
  constructor(
    private http: HttpClient
  ) {}

  // tslint:disable-next-line:variable-name
  private _todos: TodoModel[] = [];
  // tslint:disable-next-line:variable-name
  private _todoUnderEdit: TodoModel | null = null;
  $todosChanged = new BehaviorSubject<TodoModel[]>(this._todos);
  $todoUnderEdit = new Subject<TodoModel>();

  fetchTodos() {
    this.http.get<TodoModel[]>("/tasks")
      .subscribe(
        (todos) => {
          this._todos = todos;
          this.$todosChanged.next(this._todos.slice());
        },
        (error) => {
          console.error("Error", error);
        }
    );
  }

  postTodo(todo: TodoModel) {
    return this.http.post<TodoModel>("/tasks", todo)
      .pipe(
        tap((todo) => {
          this._todos = [...this._todos, todo];
          this.$todosChanged.next(this._todos.slice());
        }),
        catchError(async (error) => console.error(error, "Failed post"))
      );
  }

  updateTodo(todo: TodoWithoutId, todoId: number) {
    return this.http.patch<TodoModel>(`/tasks/${todoId}`, todo)
      .pipe(
        tap((updatedTodo) => {
          this._todos = this._todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
          this.$todosChanged.next(this._todos.slice());
        }),
        catchError(async (error) => console.error(error, "Failed patch"))
      );
  }

  deleteTodo(todoId: number) {
    return this.http.delete(`/tasks/${todoId}`);
  }

  addTodoForEdition(todo: TodoModel) {
    this._todoUnderEdit = {...todo};
    this.$todoUnderEdit.next(this._todoUnderEdit);
  }
}
