import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable()
export class QueueService {
    static URL_QUEUE_BASE = `${UtilsService.getApiURL()}/queues`;

    constructor(private http: HttpClient) {}

    public getQueues(): Observable<HttpResponse<any>> {
        return this.http.get<any>(QueueService.URL_QUEUE_BASE, { observe: 'response' });
    }

    public sendNames(queueName: string, players: any): Observable<HttpResponse<any>> {
        return this.http.post(`${QueueService.URL_QUEUE_BASE}/${queueName}`, players, { observe: 'response' });
    }

    public deletePlayer(queueName: string, playerId: any): Observable<HttpResponse<any>> {
        return this.http.request('delete', `${QueueService.URL_QUEUE_BASE}/${queueName}`,
        { body: { playerId: playerId }, observe: 'response' });
    }
}
