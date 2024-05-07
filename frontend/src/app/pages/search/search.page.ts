import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  userId: any;
  events: any[] = []; // Assuming you have an array of events
  filteredEvents: any[] = []; // Array to store filtered events
  searchTerm: string = ''; // Variable to store search term
  currentDate: Date;
  constructor(public UserService: UserService,private eventService: EventService,private router:Router) {this.currentDate = new Date(); }
  
  
  

  ngOnInit() {
    this.userId = this.UserService.getUserDataFromToken();
    this.userId.image_base64;
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
    });
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
