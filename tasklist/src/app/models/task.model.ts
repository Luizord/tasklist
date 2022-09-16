export class TaskModel {
    id!: number;
    name: string = "";
    status: TaskStatus = TaskStatus.TODO;
}

export enum TaskStatus {
    TODO,
    DONE,
    DELETED,
}