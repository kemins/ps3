import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AppSettings, HttpService, IPSResponse } from '../../core';
import { Profile } from './profile.model';
import { IAlbum } from './IAlbum';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlbumDataService {
  private albumUrl = `${AppSettings.getSetting('endpoint')}albums`;

  public constructor(private http: HttpService) {
  }

  public create(album: IAlbum): Observable<IPSResponse> {
    return this.http.post(this.albumUrl, {album})
      .map((response: Response) => response.json());
  }

  public getUserAlbums(): Observable<Array<IAlbum>> {
    return this.http.get(this.albumUrl)
      .map(this.extractData);
  }

  private extractData(res: Response): Array<IAlbum> {
    const data = res.json(),
      {albums} = data.body;

    return albums;
  }
}
