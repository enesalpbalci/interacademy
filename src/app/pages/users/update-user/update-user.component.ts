import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';
import { FacilityModule } from '../../facility/facility.module';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.userService.getUserById(id).subscribe({
            next: (response) => {},
          });
        }
      },
    });
  }

  updateContract() {
    // this.userService
    //   .updateUser(this.userDetails.id, this.userDetails)
    //   .subscribe({
    //     next: (user) => {
    //       this.route.navigate(['users/']);
    //     },
    //   });
  }
}
