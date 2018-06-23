import { Component, OnInit } from '@angular/core';

import { PassengerDashboardService } from '../../passenger-dashboard.service';

import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  template: `
    <div>
      <img [src]="logo">
      <passenger-count [items]="passengers"></passenger-count>
      <div *ngFor="let passenger of passengers;">
        {{ passenger.fullName }}
      </div>
      <passenger-detail 
        *ngFor="let passenger of passengers;"
        [detail]="passenger"
        (edit)="handleEdit($event)"
        (remove)="handleRemove($event)">
      </passenger-detail>
    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  logo: string = 'img/logo.svg';
  passengers: Passenger[];

  constructor(private passengerService: PassengerDashboardService) { }


  ngOnInit() {
    this.passengerService.getPassengers()
      .subscribe((passengers: Passenger[]) => this.passengers = passengers);
  }

  handleEdit(event: Passenger) {
    this.passengers = this.passengers.map((passenger: Passenger) => {
      if (passenger.id === event.id) {
        passenger = Object.assign({}, passenger, event);
      }
      return passenger;
    })
  }

  handleRemove(event: Passenger) {
    this.passengers = this.passengers.filter(
      (passenger: Passenger) => passenger.id !== event.id
    );
  }
}