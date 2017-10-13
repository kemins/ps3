import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, OnDestroy } from '@angular/core';
import * as albumsStyles from './albums.styl';

@Component({
  selector: 'ps-albums',
  styles: [albumsStyles],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './albums.html'
})
export class AlbumsComponent implements OnInit, AfterViewInit, OnDestroy {
  public ngOnInit() {
  }

  public ngAfterViewInit() {
  }

  public constructor() {
  }

  public ngOnDestroy() {
  }
}
