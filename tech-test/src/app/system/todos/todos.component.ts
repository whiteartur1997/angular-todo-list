import {Component, inject, OnInit} from "@angular/core";
import {TodosService} from "./core/services/todos.service";
import {TodoModel} from "./core/interfaces/todo.model";
import {TodoItemComponent} from "./todo-item/todo-item.component";

@Component({
  selector: "app-todos",
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
  private todosService = inject(TodosService);
  ngOnInit() {
    this.isTodosLoading = true;
    this.todosService.$todosChanged.subscribe(
      (todos) => {
        this.todos = todos;
        this.isTodosLoading = false;
      },
      (error) => {
        console.error(error);
        this.isTodosLoading = false;
      },
    );
    this.todosService.fetchTodos();
  }

}
