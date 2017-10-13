import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { AppActions } from '../../app.actions';
import { ProfileService } from './profile.service';
import { ProfileDataService } from './profile-data.service';
import { IPSResponse } from '../../core/src/ps-response';
import { AlbumService } from './album.service';
import { AlbumDataService } from './album-data.service';

@Injectable()
export class NewAlbumEffectService {
  private types = {
    success: AppActions.ALBUM_POST_SUCCESS,
    fault: AppActions.ALBUM_POST_FAIL
  };

  public constructor(private albumService: AlbumService,
                     private albumDataService: AlbumDataService,
                     private actions$: Actions) {
  }

  @Effect()
  public createAlbum: Observable<Action> = this.actions$
    .ofType(AppActions.CREATE_NEW_ALBUM)
    .withLatestFrom(this.albumService.getNewAlbum())
    .switchMap(([action, album]) => this.albumDataService.create(album))
    .map((res: IPSResponse) => ({
      type: this.types[res.type],
      payload: {
        message: res.message,
        body: res.body
      },
    }));
}