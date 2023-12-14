import {TodoModel} from "../interfaces/todo.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TodosService {
  constructor(
    private http: HttpClient
  ) {}

  // tslint:disable-next-line:variable-name
  private _todos: TodoModel[] = [];

  todosChanged = new BehaviorSubject<TodoModel[]>(this._todos);

  fetchTodos() {
    this.http.get<TodoModel[]>("/tasks")
      .subscribe(
        (todos) => {
          this._todos = todos;
          this.todosChanged.next(this._todos.slice());
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
          this.todosChanged.next(this._todos.slice());
        }),
        catchError(async (error) => console.error(error, "Failed post"))
      );
  }
}
