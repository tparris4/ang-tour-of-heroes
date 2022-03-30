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

  // Like getHeroes(), getHero() has an asynchronous signature. It returns a mock hero as an
  // Observable, using the RxJS of() function.

  // You'll be able to re-implement getHero() as a real Http request without having to 
  // change the HeroDetailComponent that calls it.
  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

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
