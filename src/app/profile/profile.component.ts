import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User;
  constructor(private userService: UserService){

  }
  ngOnInit(): void {
    this.userService.user.subscribe(user=>this.user=user);

  }

}
