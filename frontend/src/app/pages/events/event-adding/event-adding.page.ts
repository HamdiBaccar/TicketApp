import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-event-adding',
  templateUrl: './event-adding.page.html',
  styleUrls: ['./event-adding.page.scss'],
})
export class EventAddingPage {
  events:any;
userId:any;
  constructor(private formBuilder: FormBuilder, private eventService: EventService,public userData :UserService,private router:Router) { }
  eventForm!: FormGroup;
  agreeTerms: boolean = false;
  imagePreview: string | ArrayBuffer | null = null;
  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      launch_time: ['', Validators.required],
      available_tickets: ['', Validators.required],
      ticket_unit_price: ['', Validators.required],
      eventType: ['public', Validators.required],
      eventLocation: ['online', Validators.required],
      date: ['', Validators.required],
      place: ['', Validators.required],
      eventCategory: ['Entertainment', Validators.required],
      ageCategory: ['All Ages', Validators.required],
      professionalField: ['All people are invited', Validators.required],
      agreeTerms: [false, Validators.requiredTrue],
      image_base64: [null],
    });

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

      // Read the file as a data URL (base64 encoded)
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
        organizer: userId.id, // Assuming organizer field corresponds to userId
        image_base64: this.imagePreview // Add the base64 image preview to the eventData
      };
      this.eventService.createEvent(eventData).subscribe(
        response => {
          console.log('Event created successfully:', response);
          // Handle successful event creation here
  
          // Fetch the latest events after successful event creation
          this.eventService.getEvents().subscribe(
            events => {
              this.events = events; // Update the events array with the latest events
            },
            error => {
              console.error('Error fetching events:', error);
            }
          );
        },
        error => {
          console.error('Error creating event:', error);
          if (error.error && error.error.errors) {
            console.log('Validation errors:', error.error.errors);
            // Iterate through the keys of the errors object and display each error message
            Object.keys(error.error.errors).forEach(key => {
              const errorMessage = error.error.errors[key][0]; // Get the first error message for each field
              console.log(`${key}: ${errorMessage}`);
              // Optionally, display the error message to the user
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
    this.router.navigate(['/featuredevents']);
  }
  
  

  discardEvent() {
    // Implement your discard event logic here
    console.log('Discarding event...');
  }

}


