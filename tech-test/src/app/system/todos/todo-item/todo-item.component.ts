import {Component, Input} from "@angular/core";
import {ButtonComponent} from "../../../shared/button/button.component";
import {TodoModel} from "../core/interfaces/todo.model";
import {NgClass} from "@angular/common";

@Component({
  selector: "todo-item",
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

  getIsDoneClasses() {
    return({
      isDone: this.todo.done,
      isDoneButton: true,
    });
  }
}
