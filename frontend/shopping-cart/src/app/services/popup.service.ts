import { ComponentType } from '@angular/cdk/portal';
import { Component, inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  constructor(
  ) { }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 3500,
      verticalPosition: 'top'
    });
  }

  openDialog<T, R = any>(comp: ComponentType<T>, config?: MatDialogConfig): MatDialogRef<T, R> {
    const dialogRef = this.dialog.open(comp, {
      panelClass: 'app-mat-dialog',
      minWidth: 500,
      minHeight: 430,
      hasBackdrop: true,
      ...config
    });

    return dialogRef;
  }
}
