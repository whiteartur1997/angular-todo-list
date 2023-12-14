import { Component } from "@angular/core";
import {TodoItemComponent} from "./system/todos/todo-item/todo-item.component";
import {HeaderComponent} from "./system/header/header.component";
import {TodosComponent} from "./system/todos/todos.component";
import {CreateTodoComponent} from "./system/todos/create-todo/create-todo.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  imports: [
    TodoItemComponent,
    HeaderComponent,
    TodosComponent,
    CreateTodoComponent
  ],
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "tech-test";
}
