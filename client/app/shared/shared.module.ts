import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatMenuModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatTableModule,
  MatTooltipModule, MatTabsModule, MatSelectModule
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
    MatDividerModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    MatTabsModule,
    MatSelectModule
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
    MatDividerModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    MatTabsModule,
    MatSelectModule
  ]
})
export class SharedModule {
}
