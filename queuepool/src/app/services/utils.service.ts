import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UtilsService {
    public static getApiURL() {
        return 'https://queuepool.herokuapp.com';
    }
}
