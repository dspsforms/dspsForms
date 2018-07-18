import { Http , Headers, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AjaxService {

    constructor( public _http: Http) {}

    // returns an Observable<json object>
    get(url: string): Observable<Object> {
      return this._http.get(url)
        .pipe(map(response =>  response.json()));
    }

  post(url: string, data: any): Observable<Object> {
    console.log("sending data", data); // JSON.stringify(data)
      return this._http.post(
                            url,
                            data,
        // { withCredentials: true }
      )
        .pipe(map(response =>  response.json() ));
    }

    // "Content-type", "application/x-www-form-urlencoded"
    postWithoutCredentials(url: string, data: any): Observable<Object> {

        const headers = new Headers();
        headers.append("Content-type", "application/x-www-form-urlencoded");
        headers.append('Accept', 'text/json');
        const opts: RequestOptionsArgs = {
            headers: headers,
            withCredentials: true
        };

        this._http.post(url, data, opts).subscribe(
            response => {
                console.log("success", response);
            },
            error => {
                console.log("error", error);
            },
            () => {
                console.log("completed");
            }
        );

      return this._http.post(url, data, opts)
        .pipe(map(
            response => {
                console.log(response);
                try {
                    return response.json();
                } catch (err) { console.log(err); return response; }


            }));
    }

    put(url: string, data: any): Observable<Object> {
        return this._http.put(url, JSON.stringify(data))
            .pipe(map(response => response.json()));
    }

    delete(url: string): Observable<Object> {
        return this._http.delete(url)
            .pipe(map(response => response.json()));
    }

}
