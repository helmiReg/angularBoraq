import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Provider} from "../models/provider";
import {Page} from "../models/page";
@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  public baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getAll = (params: { page: number; size: number; name?: string; sortBy?:string; sortDirection?: string }) => {
 let httpParams = new HttpParams().set('page', params.page).set('size', params.size);
 if(params.name) {
   httpParams = httpParams.set('name', params.name);
 }
 if(params.sortBy) {
   httpParams = httpParams.set('sortBy', params.sortBy);
 }
 if(params.sortDirection) {
   httpParams = httpParams.set('sortDirection', params.sortDirection);
 }
    return this.http.get<Page<Provider>>(this.baseUrl + `/provider`,{ params: httpParams});
  };

  soldeTotal = () => {
    return this.http.get(this.baseUrl + `/provider/totalSolde`);
  };
  get = (id: any) => {
    return this.http.get(this.baseUrl + `/provider/${id}`);
  };

  create (data: any) {
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
