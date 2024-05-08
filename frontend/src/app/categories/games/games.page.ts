import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  events: any[] = [];
  userId :any;
  constructor(private eventService: EventService, private router:Router, private UserService: UserService) { }

  ngOnInit(): void {
    this.fetchGamesEvents();
    this.userId = this.UserService.getUserDataFromToken();
    this.userId.image_base64;
  }

  fetchGamesEvents(): void {
    this.eventService.getEventsByCategory('games')
      .subscribe(
        (events: any[]) => {
          this.events = events;
        },
        (error: any) => {
          console.error('Error fetching games events:', error);
        }
      );
  }

  navigateToEventDetails(eventId: number) {
    this.router.navigate(['/event-details', eventId]); // Navigate to event-details page with event ID
  }

}
