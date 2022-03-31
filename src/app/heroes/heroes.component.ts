import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {




  // selectedHero?: Hero;

  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };

  heroes: Hero[] = [];

  // Injecting the HeroService
  constructor(private heroService: HeroService,
    private messageService: MessageService) {

  }
  // call getHeroes() inside the ngOnInit
  //  lifecycle hook and let Angular call ngOnInit() 
  // at an appropriate time after constructing a HeroesComponent instance.
  ngOnInit(): void {
    this.getHeroes();
  }

  // onSelect(hero: Hero): void {
  //   // this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }


  // Create a method to retrieve the heroes from the service.
  //   The new version waits for the Observable to emit the array of 
  // heroes—which could happen now or several minutes from now.
  // The subscribe() method passes the emitted array to the callback, 
  // which sets the component's heroes property.

  // This asynchronous approach will work when the HeroService requests 
  // heroes from the server.
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }


  /**
   * When the given name is non-blank, the handler creates a Hero-like object from the 
   * name (it's only missing the id) and passes it to the services addHero() method.

When addHero() saves successfully, the subscribe() callback receives the new hero and 
pushes it into to the heroes list for display.
   * 
   */

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}
