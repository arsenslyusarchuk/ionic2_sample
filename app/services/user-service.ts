import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
  forgotPassword(data: any) {
    return new Promise<{}>(resolve =>
      setTimeout(() => resolve({data: 'success'}), 1000) // 2 seconds
    );
  }
}
