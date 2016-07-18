import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Storage, LocalStorage, SqlStorage} from 'ionic-angular';

@Injectable()
export class Auth {
  public _user: User;
  private _storage;

  constructor(){
    // this._storage = new Storage(SqlStorage);
    this._storage = new Storage(LocalStorage);
  }

  get currentUser() {
    return this._user;
  }

  set currentUser(user: User) {
    this._user = user;
  }

  loginUser(params: any){
    return new Promise<User>(resolve =>
      setTimeout(() => resolve(new User(42, params.username, params.password)), 1000) // 2 seconds
    );
  }

  //without setters or getters (Using localStorage)

  getCurrentUser() {
    return new Promise<User>((resolve, reject) => {
      this._storage.get('currentuser').then((data) => {
        if (data) {
          this.currentUser = JSON.parse(data);
          console.warn('LocalStorage.get', data);
          resolve(data);
        } else {
          reject('User not Found')
        }
      }, (err) => {
        console.log('error', err);
        reject(err);
      });
    });
    // return this._user;
  }

  setCurrentUser(user: User) {
    return new Promise<{}>((resolve, reject) => {
      this._storage.set('currentuser', JSON.stringify(user)).then(() => {
        this.currentUser = user;
        resolve();
      }, (err) => {
        console.log('error', err);
        reject(err);
      });
    });
  }
}
