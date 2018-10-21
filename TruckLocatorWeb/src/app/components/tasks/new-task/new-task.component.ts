import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  drivers = [];

  constructor() { }

  ngOnInit() {
    this.drivers.push({name: 'Marek Blaha'}, {name: 'Jano Breza'}, {name: 'Jano Breza'}, {name: 'Julia Fekete'});
  }



}
