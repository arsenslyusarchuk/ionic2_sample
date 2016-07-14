import {Injectable} from '@angular/core';
import {ITEMS} from './items-mock';
import {Item} from '../models/item';

@Injectable()
export class ItemService {
  getItems() {
    return new Promise<Item[]>(resolve =>
      setTimeout(() => resolve(ITEMS), 1000) // 2 seconds
    );
  }
  getItem(id: number) {
    return Promise.resolve(ITEMS).then(
      items => items.filter(item => item.id === id)[0]
    );
  }
  // getHeroes() {
  //   return Promise.resolve(HEROES);
  // }
  // getHeroesSlowly() {
  //   return new Promise<Hero[]>(resolve =>
  //     setTimeout(() => resolve(HEROES), 2000) // 2 seconds
  //   );
  // }
  // getHero(id: number) {
  //   return Promise.resolve(HEROES).then(
  //     heroes => heroes.filter(hero => hero.id === id)[0]
  //   );
  // }
}
