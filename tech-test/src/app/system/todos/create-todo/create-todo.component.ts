import {Component, inject, OnInit} from "@angular/core";
import {FormsModule, NgForm} from "@angular/forms";
import {TodoModel, TodoWithoutId} from "../core/interfaces/todo.model";
import {todoCategories} from "../core/interfaces/todo-categories";
import {TodosService} from "../core/services/todos.service";
import {ButtonComponent} from "../../../shared/button/button.component";
import {InputComponent} from "../../../shared/input/input.component";
import {SelectComponent} from "../../../shared/select/select.component";


const defaultTodo = new TodoModel("", "", null);


@Component({
  selector: "app-create-todo",
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent,
    InputComponent,
    SelectComponent
  ],
  templateUrl: "./create-todo.component.html",
  styleUrl: "./create-todo.component.scss",
})
export class CreateTodoComponent implements OnInit {
  isEditMode = false;
  todo = defaultTodo;
  private todosService = inject(TodosService);
  protected readonly todoCategories = todoCategories;

  ngOnInit() {
    this.todosService.$todoUnderEdit.subscribe(
      todo => {
        if (todo) {
          this.todo = todo;
          this.isEditMode = true;
        } else {
          this.todo = defaultTodo;
          this.isEditMode = false;
        }

      }
    );
  }

  onSubmit(form: NgForm) {
    if (this.isEditMode) {
      const updatedTodo: TodoWithoutId = {
        label: form.value.name,
        description: form.value.description,
        category: form.value.category,
        done: form.value.done
      };
      this.todosService.updateTodo(updatedTodo, this.todo.id).subscribe(
        () => {},
        () => {},
        () => form.resetForm(),
      );
    } else {
      const todo: TodoModel = {
        id: Date.now(),
        label: form.value.name,
        description: form.value.description,
        category: form.value.category,
        done: false
      };
      this.todosService.postTodo(todo).subscribe(
        () => {},
        () => {},
        () => form.resetForm(),
      );
    }
  }

  onClearEditMode() {
    this.todosService.$todoUnderEdit.next(null);
  }
}
