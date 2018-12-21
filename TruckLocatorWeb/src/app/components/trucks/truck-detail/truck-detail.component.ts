import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { EmployeeInfoComponent } from 'src/app/dialogs/employee-info/employee-info.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ITruck } from '../../../../models/truck';


@Component({
  selector: 'app-truck-detail',
  templateUrl: './truck-detail.component.html',
  styleUrls: ['./truck-detail.component.scss']
})

export class TruckDetailComponent implements OnInit {

  truckList: ITruck[];
  trucksControl = new FormControl();
  filteredTrucks: Observable<ITruck[]>;
  
  constructor(public dialog: MatDialog,
              public fbService: FirebaseService) { }

  private _filterTrucks(value: string): ITruck[] {
    const filterValue = value.toLowerCase();
    return this.truckList.filter(truck => truck.brand.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this.fbService.getTruckListReadable().subscribe(trucks => {
      this.truckList = trucks;
      this.filteredTrucks = this.trucksControl.valueChanges
      .pipe(startWith(''),
        map(inputText => inputText ? this._filterTrucks(inputText) : this.truckList)
      );
    });    
  }

  showInfo(index: number) {
    const dialogRef = this.dialog.open(EmployeeInfoComponent, {
      width: '500px',
      data: { employee: this.truckList[index] }
    });
  }

  showEdit(index: number) {
    const dialogRef = this.dialog.open(EmployeeInfoComponent, {
      width: '500px',
      data: { employee: this.truckList[index] }
    });
  }
  
  deleteTruck(index: number) {
    this.truckList.splice(index, 1);
  }
}
