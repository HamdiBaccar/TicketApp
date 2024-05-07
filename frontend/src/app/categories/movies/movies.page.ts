import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
userId :any;
  events: any[] = [];

  constructor(private eventService: EventService, private router:Router,public UserService: UserService) { }

  ngOnInit(): void {
    this.fetchMoviesEvents();
    this.userId = this.UserService.getUserDataFromToken();
    this.userId.image_base64;
  }

  fetchMoviesEvents(): void {
    this.eventService.getEventsByCategory('movies')
      .subscribe(
        (events: any[]) => {
          this.events = events;
        },
        (error: any) => {
          console.error('Error fetching movies events:', error);
        }
      );
  }

  navigateToEventDetails(eventId: number) {
    this.router.navigate(['/event-details', eventId]); // Navigate to event-details page with event ID
  }


}
