import {Injectable} from '@angular/core';

@Injectable()
export class JenkinsBddParserService {

  constructor() {
  }

  getTitle():string {
    return 'app works from service :)';
  }
}
