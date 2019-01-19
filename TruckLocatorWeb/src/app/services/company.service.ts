import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private company: string = '';
  constructor() { }

  setCompany(company: string) {
    this.company = company;
  }
  getCompany() {
    return this.company;
  }
}
