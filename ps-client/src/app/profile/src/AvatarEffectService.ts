import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppActions } from '../../AppActions';
import { ProfileService } from './ProfileService';
import { ProfileDataService } from './ProfileDataService';
import { IPSResponse } from '../../core';
import { IAppStore } from '../../IAppState';
import { includes } from 'lodash';
import { IPayloadAction } from '../../core/src/IPayloadAction';

@Injectable()
export class AvatarEffectService {
  private types = {
    success: AppActions.AVATAR_POST_SUCCESS,
    fault: AppActions.AVATAR_POST_FAIL
  };

  private appendURLParameter(url, key, value) {
    return `${url}${includes(url, '?') ? '&' : '?'}${key}=${value}`;
  }

  public constructor(private profileService: ProfileService,
                     private profileDataService: ProfileDataService,
                     private actions$: Actions<IPayloadAction>,
                     private store: Store<IAppStore>) {
  }

  @Effect()
  public resetAvatar$: Observable<Action> = this.actions$
    .ofType(AppActions.RESET_AVATAR)
    .withLatestFrom(this.profileService.getAvatar())
    .map(([action, picture]) => {
      const timestamp = new Date().getTime();

      picture.m = this.appendURLParameter(picture.m, 'timestamp', timestamp);
      picture.s = this.appendURLParameter(picture.s, 'timestamp', timestamp);
      picture.l = this.appendURLParameter(picture.l, 'timestamp', timestamp);

      return picture;
    })
    .map((picture) => ({type: AppActions.SET_DIRTY_AVATAR, payload: picture}));

  @Effect()
  public uploadAvatar$: Observable<IPayloadAction> = this.actions$
    .ofType(AppActions.UPLOAD_AVATAR)
    .withLatestFrom(this.profileService.getDirtyAvatar())
    .switchMap(([action, avatar]) => this.profileDataService.uploadAvatar(avatar.m))
    .map((res: IPSResponse) => ({
      type: this.types[res.type],
      payload: {
        message: res.message,
        body: res.body
      },
    }));

  @Effect()
  public uploadAvatarSuccess$: Observable<IPayloadAction> = this.actions$
    .ofType(AppActions.AVATAR_POST_SUCCESS)
    .do((action) => {
      this.store.dispatch({type: AppActions.SET_AVATAR, payload: action.payload.body});
    })
    .map(() => ({type: AppActions.RESET_AVATAR}));
}