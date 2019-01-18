import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private company: string = 'UPC';
  constructor() { }

  setCompany(company: string) {
    alert(company);
    this.company = company;
  }
  getCompany() {
    return this.company;
  }
}
