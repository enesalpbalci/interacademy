import { decodeJwt } from './decode.jwt.helper';

export function UserIdHelper(): any {
  let claims = JSON.parse(
    decodeJwt(localStorage.getItem('token')?.split('.')[1])
  );

  if (typeof claims === 'object' && typeof claims.jti !== 'undefined') {
    return claims.jti;
  }

  return '';
}
