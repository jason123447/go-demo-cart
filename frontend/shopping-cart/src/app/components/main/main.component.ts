import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgMaterialModule } from '../../modules/ng-material/ng-material.module';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgMaterialModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
