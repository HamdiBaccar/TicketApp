import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-event-adding',
  templateUrl: './event-adding.page.html',
  styleUrls: ['./event-adding.page.scss'],
})
export class EventAddingPage implements OnInit {
  events: any;
  userId: any;
  hostedEventsDetails: any;
  hostedEvents: any;
  constructor(private UserService: UserService, private formBuilder: FormBuilder, private eventService: EventService, public userData: UserService, private router: Router) { }
  eventForm!: FormGroup;
  agreeTerms: boolean = false;
  imagePreview: string | ArrayBuffer | null = null;

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/user') {
        // Reload the page
        window.location.reload();
      }
    });
    /***************************************************/
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      launch_time: ['', Validators.required],
      available_tickets: ['', Validators.required],
      ticket_unit_price: ['', Validators.required],
      date: ['', Validators.required],
      category: ['meet', Validators.required],
      age_category: ['everyone', Validators.required],
      agreeTerms: [false, Validators.requiredTrue],
      image_base64: [null],
    });
    /***************************************************/
  }



  onFileSelected(event: any): void {
    const file: File = event.target.files[0]; // Get the selected file
    if (file) {
      // Create a FileReader object
      const reader: FileReader = new FileReader();

      // Set up the onload event handler
      reader.onload = () => {
        // When the file is loaded, set the base64 image preview
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  submitEvent() {
    console.log('Submit event button clicked');
    console.log('Form validity:', this.eventForm.valid);

    const userId = this.userData.getUserDataFromToken();
    console.log('user data :', userId);

    if (this.eventForm.valid && userId) {
      const eventData = {
        ...this.eventForm.value,
        organizer: userId.id,
        image_base64: this.imagePreview
      };

      this.eventService.createEvent(eventData).subscribe(
        response => {
          console.log('Event created successfully:', response);
          // Optionally, you can perform any additional actions after event creation here
        },
        error => {
          console.error('Error creating event:', error);
          if (error.error && error.error.errors) {
            console.log('Validation errors:', error.error.errors);
            Object.keys(error.error.errors).forEach(key => {
              const errorMessage = error.error.errors[key][0];
              console.log(`${key}: ${errorMessage}`);
            });
          } else {
            console.error('Unexpected error occurred:', error);
          }
        }
      );
    } else {
      Object.keys(this.eventForm.controls).forEach(field => {
        const control = this.eventForm.get(field);
        if (control) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
    this.router.navigate(['/user']);

  }


  discardEvent() {
    // Implement your discard event logic here
    console.log('Discarding event...');
  }
}