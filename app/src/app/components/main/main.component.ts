import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  imports: [
    TableComponent,
    MatToolbarModule,
    MatSidenavModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent { }