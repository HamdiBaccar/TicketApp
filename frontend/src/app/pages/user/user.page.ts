import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
userId:any;
  constructor(private authService: AuthService,public UserService:UserService,private router:Router) { }
  onLogout() {
    this.authService.logout().subscribe(
      response => {
        // Handle successful logout response
        console.log('Logged out successfully',response);
        this.router.navigate(['/login']);
      },
      error => {
        // Handle error response
        console.error('Logout failed', error);
        // Handle error case, e.g., display error message to the user
      }
    );
  }
  ngOnInit() {
    this.userId = this.UserService.getUserDataFromToken();
  }

}
