import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
})
export class EducationPage implements OnInit {
  userId: any;
  events: any[] = [];

  constructor(private eventService: EventService, private router:Router,private UserService:UserService) { }


  ngOnInit(): void {
    this.fetchEducationEvents();
    this.userId = this.UserService.getUserDataFromToken();
    this.userId.image_base64;
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
