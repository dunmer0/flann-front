import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './core/main-component/main-component';

@Component({
  selector: 'app-root',
  imports: [ MainComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('flann-front');
}
