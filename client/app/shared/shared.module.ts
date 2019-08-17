import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule, MatToolbarModule, MatMenuModule, MatDividerModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompareValidatorDirective } from './validators/compare-validator/compare-validator.directive';

@NgModule({
  declarations: [
    CompareValidatorDirective
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    CompareValidatorDirective,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule
  ]
})
export class SharedModule {
}
