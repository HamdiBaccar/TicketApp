import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-featuredevents',
  templateUrl: './featuredevents.page.html',
  styleUrls: ['./featuredevents.page.scss'],
})
export class FeaturedeventsPage implements OnInit {
  filteredEvents: any[] = []; // Array to store filtered events
  searchTerm: string = '';
  events: any[] = [];
  userId: any;
  constructor(private eventService: EventService, private router: Router,private UserService : UserService) {}

  ngOnInit(): void {
    this.fetchEvents();
    this.userId = this.UserService.getUserDataFromToken();
    this.userId.image_base64;
  }

  fetchEvents(): void {
    this.eventService.getEvents()
      .subscribe(
        (events: any[]) => {
          this.events = events;
          console.log('Events:', this.events);
        },
        (error: any) => {
          console.error('Error fetching events:', error);
        }
      );
  }

  navigateToEventDetails(event: any): void {
    this.router.navigate(['/event-details',event.id], { state: { event } });
  }
  filterEvents() {
    if (!this.searchTerm.trim()) {
      this.filteredEvents = []; // Clear filtered events when search term is empty
      return;
    }

    const searchTermLowerCase = this.searchTerm.toLowerCase();
    this.filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(searchTermLowerCase)
    );
  }
  selectEvent(event: any) {
    // Handle the selected event here
    console.log('Selected Event:', event);
    this.router.navigate(['/event-details',event.id], { state: { event } });
  }

}
