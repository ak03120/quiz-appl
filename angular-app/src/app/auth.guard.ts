import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const jwt = localStorage.getItem('jwt');
  if(jwt) return true;
  else return false;
};
