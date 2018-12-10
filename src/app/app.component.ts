import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    router: Router
  ) {
    this.authService.user$.subscribe(user => {
      if (!user) return;

      this.userService.save(user);
      const returnUrl = localStorage.getItem('returnUrl');

      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
