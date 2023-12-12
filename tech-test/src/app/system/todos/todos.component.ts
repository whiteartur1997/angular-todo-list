import {Component, OnInit} from "@angular/core";
import {tap} from "rxjs/operators";
import {TodosService} from "./core/services/todos.service";
import {TodoModel} from "./core/interfaces/todo.model";
import {TodoItemComponent} from "./todo-item/todo-item.component";

@Component({
  selector: "todos",
  standalone: true,
  imports: [
    TodoItemComponent
  ],
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.scss"]
})
export class TodosComponent implements OnInit {

  isTodosLoading = false;
  todos: TodoModel[] = [];
  constructor(private todosService: TodosService) {
  }
  ngOnInit() {
    this.isTodosLoading = true;
    this.todosService.fetchTodos()
      .pipe(
        tap((res) => console.log(res))
      )
      .subscribe(
        (todos) => {
          this.todos = todos;
        },
        (error) => {
          console.error("Error", error);
        },
        () => this.isTodosLoading = false
      );
  }
}
