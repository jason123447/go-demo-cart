import { Component } from '@angular/core';
import { NgMaterialModule } from '../../modules/ng-material/ng-material.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgMaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
