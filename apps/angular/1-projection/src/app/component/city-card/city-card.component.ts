import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      [type]="cardType"
      [store]="store"
      [onAdd]="addNewItem"
      customClass="bg-light-blue">
      <img ngSrc="assets/img/city.png" width="200" height="200" priority />
    </app-card>
  `,
  styles: [
    `
      app-card {
        --card-bg-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);

  protected store = inject(CityStore);

  cities = this.store.cities;
  cardType = CardType.CITY;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  addNewItem = (): void => {
    this.store.addOne(randomCity());
  };
}
