import { Action } from '@ngrx/store';
import { AppActions } from '../../AppActions';

export const profileAvatar = (data, action: Action) => {
  let result;

  switch (action.type) {
    case AppActions.USER_AUTH_SUCCESS:
      result = {...action.payload.body.picture};
      break;

    case AppActions.SET_AVATAR:
      result = {...action.payload};
      break;

    case AppActions.LOGOUT_SUCCESS:
      result = {};

    default:
      result = data;
      break;
  }

  return result;
};