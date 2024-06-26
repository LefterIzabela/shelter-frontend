import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { loginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    { path: 'animal/:type', component: AnimalListComponent, canActivate: [loginGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', component: HomeComponent },
    { path: 'contact-us', component: ContactUsComponent }
];
