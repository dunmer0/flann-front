import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-component',
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.css',
})
export class ButtonComponent {
  private router = inject(Router);
  componentName = input<string>('');

  goToComponent(something: string) {
    this.router.navigate([`/${something}`]);
  }
}
