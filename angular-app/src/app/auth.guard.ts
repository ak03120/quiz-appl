import { CanActivateFn } from '@angular/router';
import { SocialUser } from '@abacritt/angularx-social-login';

export const authGuard: CanActivateFn = (route, state) => {
  const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user: SocialUser = JSON.parse(storedUser);
      if (user == null) {

        return false;
      }
    }
    return false;

};
