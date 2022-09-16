import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  newTaskName: string = "";

  constructor(private local: LocalStorageService) { }

  ngOnInit(): void {
  }

  addTask() {
    if(this.newTaskName) {
      let newTask = new TaskModel;
      newTask.name = this.newTaskName;
      this.local.save(newTask);
      this.local.trigger.next(true);
      this.newTaskName = "";
    }
  }
}
