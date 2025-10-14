import { Component, Input, NgZone } from '@angular/core';
import { CommunityUpdate } from '../../state/community-updates/community-update.model';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Comments } from '../comments/comments';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { formatTimestamp } from '../../services/format-time.service';

@Component({
  selector: 'app-update-card',
  imports: [CommonModule, IonicModule, MatDialogModule],
  templateUrl: './update-card.html',
  styleUrl: './update-card.scss',
})
export class UpdateCard {
  @Input() update!: CommunityUpdate;
  showComments = false;

  constructor(private dialog: MatDialog) {}

  openComments(update: CommunityUpdate) {
    console.log(update);
    this.dialog.open(Comments, {
      width: '100%', // full width
      maxWidth: '100%',
      height: '60vh', // 60% of viewport height
      position: { bottom: '0' }, // align to bottom
      panelClass: 'bottom-sheet-dialog',
      data: {
        postId: update.id,
      },
    });
  }

  formatTimestamp(timestamp: string | Date) {
    return formatTimestamp(timestamp);
  }
}
