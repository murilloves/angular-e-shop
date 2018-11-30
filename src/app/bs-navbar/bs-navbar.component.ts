import { AuthService } from '../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {
  constructor(public authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }
}
