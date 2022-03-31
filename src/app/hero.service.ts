import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // Like getHeroes(), getHero() has an asynchronous signature. It returns a mock hero as an
  // Observable, using the RxJS of() function.

  // You'll be able to re-implement getHero() as a real Http request without having to
  // change the HeroDetailComponent that calls it.
  // gethero returns and ObservableHero (an observable of hero objects) rathn than an ob
  // observable of hero arrays
  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const url = `${this.heroesUrl}/${id}`;
    // const hero = HEROES.find(h => h.id === id)!;
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(hero);
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }


  /**
   * 
   * addHero() differs from updateHero() in two ways:
  
  It calls HttpClient.post() instead of put().
  It expects the server to generate an id for the new hero,
   which it returns in the Observable<Hero> to the caller.
   * @param hero 
   * @returns 
   */
  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }


  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))

    );
  }


  // of(HEROES) returns an Observable<Hero[]> 
  // that emits a single value, the array of mock heroes.
  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES);
  //   this.messageService.add('HeroService: fetched heroes');
  //   return heroes;
  // }


  /**
   * 
   * @returns In general, an observable can return multiple values over time. 
   * An observable from HttpClient always emits a single value and then completes, 
   * never to emit again.
   */
  // GET heroes from the server
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      //Now extend the observable result with the pipe() method and give it a catchError() operator.
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  /**
   * Define the heroesUrl of the form :base/:collectionName with the address of 
   * the heroes resource on the server. Here base is the resource to which requests 
   * are made, and 
   * collectionName is the heroes data object in the in-memory-data-service.ts.
   * 
   * 
   * 
   */
  private heroesUrl = 'api/heroes'; // URL to web api

  // This is a typical "service-in-service" scenario: you inject the MessageService into 
  // the HeroService which is injected into the HeroesComponent.
  constructor(
    private http: HttpClient,
    private messageService: MessageService) {


  }
}

