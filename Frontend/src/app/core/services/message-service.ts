import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessageAPI } from './models/messages.model';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
     constructor(private _http: HttpClient) {}
  private apiURL = 'http://localhost:3000/messages';
  getMessages() {
    return this._http.get<IMessageAPI[]>(this.apiURL);
  }
  addMessage(messagesData: IMessageAPI) {
    return this._http.post<IMessageAPI>(this.apiURL, messagesData);
  }
  markAsRead(id: string) {
    return this._http.put<IMessageAPI>(this.apiURL + '/' + id, {isRead: true});
  }
    markAsUnread(id: string) {
    return this._http.put<IMessageAPI>(this.apiURL + '/' + id, {isRead: false});
  }
  deleteMessage(id: string) {
    return this._http.delete(this.apiURL + '/' + id);
  }
}
