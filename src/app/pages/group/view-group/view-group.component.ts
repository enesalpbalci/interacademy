import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/models/group.interface';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.css']
})
export class ViewGroupComponent implements OnInit {


  group:Group
  constructor(private activatedRoute:ActivatedRoute, private groupService:GroupService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.groupService.getGroupById(params['id']).subscribe((data) => {
        this.group = data;
      });
    });
  }

}
