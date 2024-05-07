import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-art',
  templateUrl: './art.page.html',
  styleUrls: ['./art.page.scss'],
})
export class ArtPage implements OnInit {
userId : any;
  events: any[] = [];

  constructor(private eventService: EventService, private router:Router,public UserService: UserService) { }

  ngOnInit(): void {
    this.fetchArtEvents();
    this.userId = this.UserService.getUserDataFromToken();
    this.userId.image_base64;
  }

  fetchArtEvents(): void {
    this.eventService.getEventsByCategory('art')
      .subscribe(
        (events: any[]) => {
          this.events = events;
        },
        (error: any) => {
          console.error('Error fetching art events:', error);
        }
      );
  }

  navigateToEventDetails(eventId: number) {
    this.router.navigate(['/event-details', eventId]); // Navigate to event-details page with event ID
  }

}
