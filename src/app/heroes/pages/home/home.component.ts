import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/auth/interfaces/usuario.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  constructor(private router:Router,
              private authService: AuthService) { }

  get auth() {    
    return this.authService.auth;
  }
                
  ngOnInit(): void {
  }

  logout(): void {
    this.router.navigate(['./auth']);
  }

}
