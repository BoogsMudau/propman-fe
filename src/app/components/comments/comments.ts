import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Inject, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IonicModule } from '@ionic/angular';
import { SupabaseService } from '../../services/supabase.service';
import { Comment } from '../../state/comments/comment.model';
import { Store } from '@ngrx/store';
import { User } from '../../state/user/user.model';
import { selectUser } from '../../state/user/user.selector';
import { formatTimestamp } from '../../services/format-time.service';
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
  postId!: string;
  store = inject(Store);
  comments: Comment[] = [];
  newComment = '';
  currUser: User | null = null;
  user$ = this.store.select(selectUser);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Comments>,
    private supabase: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {
    this.postId = data.postId;
  }

  async addComment() {
    if (this.newComment.trim()) {
      this.comments.push({ creatorName: 'You', comment: this.newComment, postId: this.postId });
      const { error } = await this.supabase.getClient().from('comments').insert({
        comment: this.newComment,
        creatorName: this.currUser?.name,
        postId: this.postId,
      });
    }
  }

  formatTimestamp(timestamp: string | Date) {
    return formatTimestamp(timestamp);
  }

  onCancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      console.log(user, 'ff');
      this.currUser = user;
    });

    this.supabase
      .getClient()
      .from('comments')
      .select()
      .eq('postId', this.postId)
      .then((res) => {
        this.comments = res.data as Comment[];
        this.cdr.detectChanges();
      });
  }
}
