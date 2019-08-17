import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule
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
    MatSnackBarModule
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
    MatSnackBarModule
  ]
})
export class SharedModule {
}
