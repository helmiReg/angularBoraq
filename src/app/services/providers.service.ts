import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  public baseUrl = 'http://localhost:8080'
  constructor(private http:HttpClient) { }

  getAll = (params: any) => {
    if(params.name && params.name !== '' && params.sortBy){
      return this.http.get(this.baseUrl + `/provider`, { params: new HttpParams().set('page', params.page).set('size', params.size).set('name', params.name).set('sortBy', params.sortBy).set('sortDirection', params.sortDirection) });
    }else if(params.sortBy && params.sortDirection) {
      return this.http.get(this.baseUrl + `/provider`, { params: new HttpParams().set('page', params.page).set('size', params.size).set('sortBy', params.sortBy).set('sortDirection', params.sortDirection) });

    }else if(params.name) {
      return this.http.get(this.baseUrl + `/provider`, { params: new HttpParams().set('page', params.page).set('size', params.size).set('name', params.name)});
    }else
    return this.http.get(this.baseUrl + `/provider/all`, { params: new HttpParams().set('page', params.page).set('size', params.size) });
  };

  soldeTotal = () => {
    return this.http.get(this.baseUrl + `/provider/totalSolde`);
  };
  get = (id: any) => {
    return this.http.get(this.baseUrl + `/provider/${id}`);
  };

  create = (data: any) => {
    console.log("provider=====",data);
    return this.http.post(this.baseUrl + "/provider/add", data);
  };

  update = (id: any, data: any) => {
    return this.http.put(this.baseUrl + `/provider/${id}`, data);
  };

  remove = (id: any) => {
    return this.http.delete(this.baseUrl + `/provider/${id}`);
  };

  findByName = (name: any) => {
    return this.http.get(this.baseUrl + `/provider?name=${name}`);
  };
}
