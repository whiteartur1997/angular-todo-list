import {Component, forwardRef, Input} from "@angular/core";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: "todo-input",
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: "input" | "textarea" = "input";
  @Input() inputId = "";
  @Input() label: string | undefined;
  @Input() value: string | undefined;
  onChange(_: any) {}

  onBlur() {}

  writeValue(value: any) {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onBlur = fn;
  }
}
