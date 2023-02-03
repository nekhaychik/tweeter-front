import { Component, OnInit } from '@angular/core';
import { ButtonAppearance, ButtonSize, Size } from '../enums';
import { AuthService } from '../public/services/auth-service/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private authService: AuthService) {}
  authUser = this.authService.user$;

  ngOnInit() {
    this.authService.user$.subscribe((val) => console.log(val))
  }
}
