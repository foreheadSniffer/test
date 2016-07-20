import {EventEmitter, Injectable} from '@angular/core';
import {AppSettings} from './app.settings';

@Injectable()
export class AgamiService {
    
    emitter: EventEmitter<any> = new EventEmitter(true);
    constructor() {
    }
    upload = function(file, token, variants: Object = {"tiny":"369x246>","thumbnail":"75x50>","thumbnail_low":"180x120>","thumbnail_high":"270x180>","default":"570x380>","mobile_low":"640x426>","mobile_high":"960x640>","fullscreen":"1920x1280>","_preview":"110x68^"}) {
    let url = AppSettings.agami;
    let reader = new FileReader();
    reader.onload = (e) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = (e) => {
            let json = JSON.parse(e.currentTarget['responseText']);
            this.emitter.emit(json);
        };
        console.log(url)
        xhr.open('POST', `${url}/files?converts=${JSON.stringify(variants)}`, true);

        xhr.setRequestHeader('X-Access-Token', token);
        xhr.setRequestHeader('X-Original-Filename', encodeURIComponent(file.name));
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');

        let view = new Uint8Array(e.target['result']);

        try {
            xhr.send(view)
        } catch(e){
            xhr.send(view.buffer);
        }
    };
    reader.readAsArrayBuffer(file);
  }
}