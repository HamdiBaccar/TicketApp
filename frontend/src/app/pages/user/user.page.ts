import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  userId:any;
  hostedEvents:any;
  events: any[] = [];
  hostedEventsDetails: any[]=[];
  user:any;
  constructor(private eventService:EventService ,private authService: AuthService,public UserService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userId = this.UserService.getUserDataFromToken()?.id ?? null;
    this.user = this.UserService.getUserDataFromToken();
    this.user.image_base64;
    if (this.userId !== null) {
      this.eventService.getEvents().subscribe(
        (events: any[]) => {
          // Filter events based on the current userId.id as organizer
          this.events = events.filter(event => event.organizer === this.userId);
          console.log('Filtered events:', this.events);

          // Fetch hosted events for the current user
          this.UserService.getHostedEventsByUserId(this.userId).subscribe(
            (hostedEvents: any) => {
              // Store hosted events IDs
              this.hostedEvents = hostedEvents.hosted_events;
              console.log('Hosted events IDs:', this.hostedEvents);

              // Filter events details based on hosted event IDs
              this.filterHostedEvents();
            },
            error => {
              console.error('Error fetching hosted events:', error);
            }
          );
        },
        error => {
          console.error('Error fetching events:', error);
        }
      );
    }
  }

  filterHostedEvents(): void {
    // Filter events details based on hosted event IDs
    this.hostedEventsDetails = this.events.filter(event => this.hostedEvents.includes(event.id));
    console.log('Hosted Events Details:', this.hostedEventsDetails);
  }


  onLogout() {
    this.authService.logout().subscribe(
      response => {
        console.log('Logged out successfully',response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Logout failed', error);
      }
    );
  }
  navigateToEventDetails(event: any): void {
    this.router.navigate(['/event-details',event.id], { state: { event } });
  }




}
