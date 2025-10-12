import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-comments',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
})
export class Comments implements OnInit {
  @Input() postId!: string;
  comments: any[] = [];
  newComment = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Comments>
  ) {
    this.comments = data.comments || [];
  }

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push({ user: 'You', text: this.newComment });
      this.newComment = '';
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
