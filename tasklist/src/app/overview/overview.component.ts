import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  tasks!: TaskModel[];

  constructor(private local: LocalStorageService) {
    this.getTasks();
  }

  ngOnInit(): void {
    this.local.trigger.subscribe(() => {
      this.getTasks();
    });
  }

  parseTask(task: any): TaskModel {
    return JSON.parse(task);
  }

  getTasks() {
    this.tasks = JSON.parse(this.local.get("tasks")!);
  }
}
