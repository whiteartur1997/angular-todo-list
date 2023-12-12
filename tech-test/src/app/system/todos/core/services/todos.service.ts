import {TodoModel} from "../interfaces/todo.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TodosService {
  constructor(
    private http: HttpClient
  ) {}

  fetchTodos() {
    return this.http.get<TodoModel[]>("/tasks");
  }
}
