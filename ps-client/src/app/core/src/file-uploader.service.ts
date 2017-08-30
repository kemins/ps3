import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class FileUploader {
  uploadFiles(input) {
    return Observable.fromEvent(input, 'change')
      .readFile((reader, file) => reader.readAsDataURL(file));
  }
}