import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class HeroService {


  // of(HEROES) returns an Observable<Hero[]> 
  // that emits a single value, the array of mock heroes.
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
  // This is a typical "service-in-service" scenario: you inject the MessageService into 
  // the HeroService which is injected into the HeroesComponent.
  constructor(private messageService: MessageService) { }
}
