import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {

  isAuthenticated = signal(false);

  constructor(private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe((auth: boolean) => {
      this.isAuthenticated.set(auth);
    });
  }

  handleSignUp(): void {
    this.authService.loginWithRedirect({
      appState: {
        target: "/myTrips",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  }

}
