import { Action } from '@ngrx/store';
import { IPSResponse } from '../../core';
import { AppActions } from '../../app.actions';
import { Profile } from './profile.model';


export const profile = (profile: Profile, action: Action) => {
    let result: Profile;

    switch (action.type) {
        case AppActions.PROFILE_POST_SUCCESS:
            result = Object.assign({}, action.payload.body);
            break;

        default:
            result = profile;
            break;
    }

    return result;
};