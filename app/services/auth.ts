import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable()
export class Auth {
  private _user: User;


  get currentUser() {
    return this._user;
  }

  set currentUser(user: User) {
    this._user = user;
  }

  loginUser(params: any){
    return new Promise<User>(resolve =>
      setTimeout(() => resolve(new User(42, params.username, params.password)), 2000) // 2 seconds
    );
  }

  // getItems() {
  //   return new Promise<Item[]>(resolve =>
  //     setTimeout(() => resolve(ITEMS), 2000) // 2 seconds
  //   );
  // }
  // getItem(id: number) {
  //   return Promise.resolve(ITEMS).then(
  //     items => items.filter(item => item.id === id)[0]
  //   );
  // }
}
