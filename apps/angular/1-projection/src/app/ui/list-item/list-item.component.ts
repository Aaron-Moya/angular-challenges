import { Component, input } from '@angular/core';
import { CardType } from '../../model/card.model';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name() }}
      <button (click)="deleteItem(id())">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
})
export class ListItemComponent {
  readonly id = input.required<number>();
  readonly name = input.required<string>();
  readonly type = input.required<CardType>();
  readonly onDelete = input.required<(id: number) => void>();

  deleteItem(id: number) {
    const deleteFn = this.onDelete();
    if (deleteFn) deleteFn(id);
  }
}
