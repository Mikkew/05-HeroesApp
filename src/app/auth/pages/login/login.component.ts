import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,
              private authServices: AuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authServices.login()
      .subscribe(console.log);
    
      this.router.navigate(['./heroes']);
  }

}
