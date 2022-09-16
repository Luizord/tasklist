import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskModel } from 'src/app/models/task.model';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    public trigger: BehaviorSubject<boolean>;

    constructor() {
        this.trigger = new BehaviorSubject(true);
    }

    public save(task: TaskModel, key: string = "tasks") {
        let existingData: any[];
        existingData = JSON.parse(localStorage.getItem(key)!);
        existingData!.length > 0 ? task.id = JSON.parse(existingData![existingData.length - 1])['id'] + 1 : task.id = 0;
        const jsonData = JSON.stringify(task);
        existingData!.push(jsonData);
        localStorage.setItem(key, JSON.stringify(existingData!));
    }

    public update(task: TaskModel, key: string = "tasks") {
        let existingData: any[];
        existingData = JSON.parse(localStorage.getItem(key)!);
        let updateTaskIndex = existingData.findIndex(x => JSON.parse(x).id === task.id);
        existingData[updateTaskIndex] = JSON.stringify(task);
        localStorage.setItem(key, JSON.stringify(existingData!));
    }

    public create(key: string, data: string) {
        localStorage.setItem(key, data);
    }

    public get(key: string) {
        return localStorage.getItem(key);
    }

    public delete(key: string) {
        localStorage.removeItem(key);
    }

    public clear() {
        localStorage.clear();
    }
}