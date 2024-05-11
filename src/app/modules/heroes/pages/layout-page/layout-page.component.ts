import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/auth/interfaces/user.interface';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }



  get user() {
    return this.authService.currentUser;
  }

  public sidebarItems = [
    { label: 'List', icon: 'label', url: './list' },
    { label: 'Add', icon: 'add', url: './new-hero' },
    { label: 'Search', icon: 'search', url: './search' },
  ]



  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
