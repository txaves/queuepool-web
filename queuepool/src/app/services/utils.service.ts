import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UtilsService {
    public static getApiURL() {
        return 'http://queuepool.fr.openode.io';
    }
}
