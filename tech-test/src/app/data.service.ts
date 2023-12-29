import { Injectable } from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {
  data: Observable<number> | null;
  constructor() {
    this.data = new Observable<number>((observer) => {
      setInterval(() => {
        observer.next(Math.random());
      }, 2000);
    });
  }

  getData() {
    return this.data;
  }
}
