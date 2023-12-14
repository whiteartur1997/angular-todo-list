import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NgClass} from "@angular/common";

@Component({
  selector: "todo-button",
  standalone: true,
  template: `
      <button [disabled]="disabled" class="base" [ngClass]="isRegular ? 'regular' : 'icon'" (click)="onButtonClick($event)">
          <ng-content></ng-content>
      </button>
  `,
  imports: [
    NgClass
  ],
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent {
  @Input() isRegular = true;
  @Input() disabled = false;
  @Output() buttonClicked = new EventEmitter();

  onButtonClick(event: any) {
    this.buttonClicked.emit(event);
  }
}
