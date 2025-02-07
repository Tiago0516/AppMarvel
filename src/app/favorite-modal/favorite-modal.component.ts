import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-favorite-modal',
  templateUrl: './favorite-modal.component.html',
  styleUrl: './favorite-modal.component.css'
})
export class FavoriteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<FavoriteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
