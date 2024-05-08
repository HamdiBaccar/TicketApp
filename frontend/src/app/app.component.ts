import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  user: any
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(){
    this.user = this.userService.getUserDataFromToken()
    this.user.image_base64
  }

  navigateToEventDetails(event: any): void {
    this.router.navigate(['/event-details',event.id], { state: { event } });
  }
}
