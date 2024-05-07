import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-super-user',
  templateUrl: './super-user.page.html',
  styleUrls: ['./super-user.page.scss'],
})
export class SuperUserPage implements OnInit {
  users: any[] = [];
  userId: any;
  constructor(private userService: UserService,private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.fetchUsers();
    this.userId = this.userService.getUserDataFromToken();
    this.userId.image_base64;
  
  }
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
  fetchUsers(): void {
  this.userService.getUsers().subscribe(
    (users) => {
      // Log the received users' data to the console
      console.log('Received users:', users);

      // Assign the received users to the component property
      this.users = users;
    },
    (error) => {
      console.error('Error fetching users:', error);
    }
  );
}

deleteUser(userId: number): void {
  const confirmed = confirm('Are you sure you want to delete this user?');
  if (confirmed) {
    // Call your UserService method to delete the user
    this.userService.deleteUser(userId).subscribe(
      () => {
        // User deleted successfully, update the users list
        this.fetchUsers();
        console.log('User deleted successfully');
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}



}
