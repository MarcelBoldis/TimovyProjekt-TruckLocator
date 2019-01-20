import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatExpansionModule, MatInputModule, MatCardModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { MatFileUploadModule } from 'angular-material-fileupload';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatSliderModule, DateAdapter} from '@angular/material';
import {MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatExpansionModule, MatNativeDateModule,
            MatIconModule, MatSnackBarModule, MatDialogModule, MatDividerModule, MatMenuModule, MatDatepickerModule, MatListModule,
            MatInputModule, MatCardModule, MatAutocompleteModule, MatSelectModule, MatFileUploadModule, MatMomentDateModule, MatTabsModule, MatProgressSpinnerModule  ],
  exports: [CommonModule, BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatExpansionModule, MatNativeDateModule,
            MatIconModule, MatSnackBarModule, MatDialogModule, MatDividerModule, MatMenuModule, MatDatepickerModule, MatListModule,
            MatInputModule, MatCardModule, MatAutocompleteModule, MatSelectModule, MatFileUploadModule, MatMomentDateModule, MatTabsModule, MatProgressSpinnerModule  ],
  declarations: [],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class MaterialModule { }
