import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-event-adding',
  templateUrl: './event-adding.page.html',
  styleUrls: ['./event-adding.page.scss'],
})
export class EventAddingPage {

  constructor(private formBuilder: FormBuilder, private eventService: EventService) { }
  eventForm!: FormGroup;
  agreeTerms: boolean = false;
  imagePreview!: string;

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      launchTime: ['', Validators.required],
      availableTickets: ['', Validators.required],
      ticketPrice: ['', Validators.required],
      eventType: ['public', Validators.required],
      eventLocation: ['online', Validators.required],
      startDate: ['', Validators.required],
      place: ['', Validators.required],
      eventCategory: ['Entertainment', Validators.required],
      ageCategory: ['All Ages', Validators.required],
      professionalField: ['All people are invited', Validators.required],
      agreeTerms: [false, Validators.requiredTrue],
      eventImage: [null]
    });

  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  submitEvent() {
    console.log('Submit event button clicked');
    console.log('Form validity:', this.eventForm.valid);
    if (this.eventForm.valid) {

      this.eventService.createEvent(this.eventForm.value).subscribe(
        response => {
          console.log('Event created successfully:', response);
        },
        error => {
    // Handle error
    console.error('Error creating event:', error.error.message);
    // Optionally, display an error message to the user
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
  }

  discardEvent() {
    // Implement your discard event logic here
    console.log('Discarding event...');
  }

}


