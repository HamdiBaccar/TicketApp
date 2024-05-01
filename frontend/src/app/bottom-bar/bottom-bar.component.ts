import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss'],
})
export class BottomBarComponent implements OnInit {
  currentRoute: string = '';

  constructor(private router: Router) {
    this.updateActiveRoute(); // Initialize currentRoute based on the initial route
    this.router.events.subscribe(() => {
      this.updateActiveRoute(); // Update currentRoute when route changes
    });
  }

  ngOnInit() {}

  navigateTo(route: string): void {
    if (this.currentRoute !== route) {
      this.router.navigate([`/${route}`]);
    }
  }

  updateActiveRoute(): void {
    const currentUrlTree = this.router.parseUrl(this.router.url);
    this.currentRoute = currentUrlTree.root.children['primary'] ? currentUrlTree.root.children['primary'].segments[0].path : '';
  }
}
