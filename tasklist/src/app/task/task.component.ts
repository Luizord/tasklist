import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskModel, TaskStatus } from '../models/task.model';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input()
  task!: TaskModel;

  @Output()
  savechange = new EventEmitter<TaskModel>();

  checkboxValue: boolean = false;

  constructor(private local: LocalStorageService) { }

  ngOnInit(): void {
    this.checkboxValue = this.task.status === TaskStatus.TODO ? false : true;
  }

  changeTaskState() {
    this.checkboxValue ? this.task.status = TaskStatus.DONE : this.task.status = TaskStatus.TODO;
    this.saveToLocal();
  }

  deleteTask() {
    this.task.status = TaskStatus.DELETED;
    this.saveToLocal();
  }

  saveToLocal() {
    this.local.update(this.task);
    this.local.trigger.next(true);
  }

}
