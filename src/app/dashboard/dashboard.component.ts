import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // The template presents a grid of hero name links.

  //   The * ngFor repeater creates as many links as are in the component's heroes array.
  // The links are styled as colored blocks by the dashboard.component.css.
  // The links don't go anywhere yet but they will shortly.
  // The class is similar to the HeroesComponent class.

  // It defines a heroes array property.
  // The constructor expects Angular to inject the HeroService into a private heroService property.
  // The ngOnInit() lifecycle hook calls getHeroes().


  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  // This getHeroes() returns the sliced list of heroes at positions 1 and 5,
  // returning only four of the Top Heroes(2nd, 3rd, 4th, and 5th).

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}
