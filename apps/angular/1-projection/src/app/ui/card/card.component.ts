import { Component, input } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="card-container flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content></ng-content>

      <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="item.firstName || item.name"
            [id]="item.id"
            [type]="type()"
            [onDelete]="deleteItem"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  styles: `
    .card-container {
      background-color: var(--card-bg-color, white);
    }
  `,
  imports: [ListItemComponent],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly type = input.required<CardType>();
  readonly store = input.required<TeacherStore | StudentStore | CityStore>();
  readonly onAdd = input.required<() => void>();

  CardType = CardType;

  addNewItem() {
    const addFn = this.onAdd();
    if (addFn) addFn();
  }

  deleteItem = (id: number): void => {
    const store = this.store();
    if (store) store.deleteOne(id);
  };
}
