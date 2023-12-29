import {Component, Input} from "@angular/core";
import {ButtonComponent} from "../../../shared/button/button.component";
import {TodoModel} from "../core/interfaces/todo.model";
import {NgClass} from "@angular/common";
import {TodosService} from "../core/services/todos.service";

@Component({
  selector: "app-todo-item",
  standalone: true,
  templateUrl: "./todo-item.component.html",
  imports: [
    ButtonComponent,
    NgClass
  ],
  styleUrls: ["./todo-item.component.scss"]
})
export class TodoItemComponent {

  @Input() todo: TodoModel;

  constructor(private todoService: TodosService) {
  }
  getIsDoneClasses() {
    return({
      isDone: this.todo.done,
      isDoneButton: true,
    });
  }

  onEditTodo() {
    this.todoService.addTodoForEdition(this.todo);
  }

  onDeleteTodo() {
    this.todoService.deleteTodo(this.todo.id).subscribe(
      () => this.todoService.fetchTodos()
    );
  }
}
