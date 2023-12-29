import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NgClass} from "@angular/common";

@Component({
  selector: "app-todo-button",
  standalone: true,
  template: `
      <button [type]="type" [disabled]="disabled" class="base" [ngClass]="getButtonClasses()" (click)="onButtonClick($event)">
          <ng-content></ng-content>
      </button>
  `,
  imports: [
    NgClass
  ],
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent {
  @Input() type: "submit" | "reset" | "button" | undefined = "button";
  @Input() isRegular = true;
  @Input() isWarning = false;
  @Input() disabled = false;
  @Output() buttonClicked = new EventEmitter();

  onButtonClick(event: any) {
    this.buttonClicked.emit(event);
  }

  getButtonClasses() {
    return {
      regular: this.isRegular,
      icon: !this.isRegular,
      warning: this.isWarning
    };
  }
}
