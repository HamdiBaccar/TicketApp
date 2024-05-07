import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      age: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      phone: [''],
      image_base64: [null],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        // Set the base64 image string to the 'image' form control
        this.registerForm.patchValue({
          image_base64: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }
  registerUser() {
    console.log('Register button clicked');
    console.log('Form validity:', this.registerForm.valid);
    const registerData = {
      ...this.registerForm.value,
      image_base64:this.imagePreview
    }
    if (this.registerForm.valid) {
      this.authService.register(registerData).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/login'], { state: { imagePreview: this.imagePreview } });
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    } else {
      Object.keys(this.registerForm.controls).forEach(field => {
        const control = this.registerForm.get(field);
        if (control) {
          control.markAsTouched({ onlySelf: true });
        }
      });
      
    }
  }
}
