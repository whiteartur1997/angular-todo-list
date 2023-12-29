import {Component, forwardRef, Input} from "@angular/core";
import {NG_VALUE_ACCESSOR, SelectControlValueAccessor} from "@angular/forms";

@Component({
  selector: "app-todo-select",
  standalone: true,
  imports: [],
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    }
  ]
})
export class SelectComponent extends SelectControlValueAccessor {
  @Input() options: any[];
  @Input() label = "";
  @Input() selectId: string | null = null;
}
