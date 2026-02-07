import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      [type]="cardType"
      [store]="store"
      [onAdd]="addNewItem"
      customClass="bg-light-green">
      <img ngSrc="assets/img/student.webp" width="200" height="200" priority />
    </app-card>
  `,
  styles: [
    `
      app-card {
        --card-bg-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);

  protected store = inject(StudentStore);

  students = this.store.students;
  cardType = CardType.STUDENT;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewItem = (): void => {
    this.store.addOne(randStudent());
  };
}
