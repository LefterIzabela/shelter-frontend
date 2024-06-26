import { Component } from '@angular/core';
import { MenuNavbarComponent } from '../menu-navbar/menu-navbar.component';
import { ImageCarouselComponent } from '../image-carousel/image-carousel.component';
import { InfoCardComponent } from '../info-card/info-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuNavbarComponent, ImageCarouselComponent, InfoCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
