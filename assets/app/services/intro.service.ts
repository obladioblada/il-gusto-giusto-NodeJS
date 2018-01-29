import {EventEmitter} from '@angular/core';

export class IntroService {

  skipIntroEvent: EventEmitter<boolean>;
constructor() {
  this.skipIntroEvent = new EventEmitter<boolean>();
}

}
