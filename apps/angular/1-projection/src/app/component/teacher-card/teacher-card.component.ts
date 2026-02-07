import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [type]="cardType"
      [store]="store"
      [onAdd]="addNewItem"
      customClass="bg-light-red">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" priority />
    </app-card>
  `,
  styles: [
    `
      app-card {
        --card-bg-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);

  protected store = inject(TeacherStore);

  teachers = this.store.teachers;
  cardType = CardType.TEACHER;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addNewItem = (): void => {
    this.store.addOne(randTeacher());
  };
}
