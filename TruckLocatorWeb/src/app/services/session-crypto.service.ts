import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

import { AES } from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class SessionCryptoService {

  constructor() { }

  encriptPlainText(text: string, key: string){
    return AES.encrypt(text, key).toString();  
  }

  getPlainText(enc: string, key:string): string{
    let decrypted = AES.decrypt(enc, key);
    return decrypted.toString(CryptoJS.enc.Utf8)
  }

  
}
