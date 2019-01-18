import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { NewTruckComponent } from 'src/app/dialogs/new-truck/new-truck.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ITruck } from '../../../../models/truck';
import {AngularFireDatabase} from 'angularfire2/database';
import { CompanyService } from 'src/app/services/company.service';


@Component({
  selector: 'app-truck-detail',
  templateUrl: './truck-detail.component.html',
  styleUrls: ['./truck-detail.component.scss']
})

export class TruckDetailComponent implements OnInit {
  company: string = '';
  truckList: ITruck[];
  trucksControl = new FormControl();
  filteredTrucks: Observable<ITruck[]>;
  truckMetadataList: any = [];

  constructor(public dialog: MatDialog,
              public fbService: FirebaseService,
              private af: AngularFireDatabase,
              public companyService: CompanyService) {
  }

  private _filterTrucks(value: string): ITruck[] {
    const filterValue = value.toLowerCase();
    return this.truckList.filter(truck => truck.brand.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this.company = this.companyService.getCompany();
    this.fbService.getTruckListReadable().subscribe(trucks => {
      this.truckList = trucks;
      this.filteredTrucks = this.trucksControl.valueChanges
        .pipe(startWith(''),
          map(inputText => inputText ? this._filterTrucks(inputText) : this.truckList)
        );
    });

    this.fbService.getTruckListMetadata().subscribe(trucks => {
      this.truckMetadataList = trucks;
    });
  }

  showInfo(index: number) {
    const dialogRef = this.dialog.open(NewTruckComponent, {
      width: '50%',
      data: {
        data: this.truckList[index],
        edit: false
      }
    });
  }

  showEdit(index: number) {
    const dialogRef = this.dialog.open(NewTruckComponent, {
      width: '50%',
      data: {
        data: this.truckList[index],
        edit: true,
        clickedIndex: this.truckMetadataList[index].key
      }
    });
  }

  deleteTruck(index: number) {
    const specificKey = this.truckMetadataList[index].key;
    this.af.object(`${this.company}/historyData/Trucks/${specificKey}`).set(this.truckList[index]);
    this.af.object(`${this.company}/Trucks/${specificKey}`).remove();
  }
}
