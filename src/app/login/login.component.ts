import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { MenuNavbarComponent } from '../menu-navbar/menu-navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MenuNavbarComponent,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    const { username, password } = this.userForm.value;
    this.authService.login(username, password).subscribe({
      next: (user) => {
        this._snackBar.open('Login successful!', 'Close', { duration: 2000 });
        this.router.navigate(['/']); // Navigate to the home page or another route
      },
      error: (err) => {
        this._snackBar.open('Login failed: ' + err.error, 'Close', { duration: 3000 });
      }
    });
  }
}
