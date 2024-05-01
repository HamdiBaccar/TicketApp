import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
})
export class EducationPage implements OnInit {

  events: any[] = [];

  constructor(private eventService: EventService, private router:Router) { }


  ngOnInit(): void {
    this.fetchEducationEvents();
  }

  fetchEducationEvents(): void {
    this.eventService.getEventsByCategory('education')
      .subscribe(
        (events: any[]) => {
          this.events = events;
        },
        (error: any) => {
          console.error('Error fetching education events:', error);
        }
      );
  }

  navigateToEventDetails(eventId: number) {
    this.router.navigate(['/event-details', eventId]); // Navigate to event-details page with event ID
  }

}
