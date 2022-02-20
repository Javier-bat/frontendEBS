import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  myEventEmiter: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  emitir() {
    this.myEventEmiter.emit();
  }

}
