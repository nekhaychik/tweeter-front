import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @Input()
  public user: User | null = null;
}
