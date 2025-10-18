import { Component, inject, Input, NgZone } from '@angular/core';
import { CommunityUpdate } from '../../state/community-updates/community-update.model';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Comments } from '../comments/comments';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { formatTimestamp } from '../../services/format-time.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/user/user.selector';
import { Router } from '@angular/router';
import { Tag } from '../tag/tag';
import { MaintenanceCardService } from '../../services/maitenance-card.service';

@Component({
  selector: 'app-update-card',
  imports: [CommonModule, IonicModule, MatDialogModule, Tag],
  templateUrl: './update-card.html',
  styleUrl: './update-card.scss',
})
export class UpdateCard {
  @Input() update: any;
  @Input() type: 'update' | 'maintenance' = 'update';

  private store = inject(Store);
  user$ = this.store.select(selectUser);

  showComments = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private cardService: MaintenanceCardService
  ) {}

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

  handleClick() {
    this.user$.subscribe((user) => {
      if (user?.role !== 'admin') {
        this.router.navigate(['tabs', 'resolve'], {
          state: { maintenanceLog: this.update },
        });
      }
    });
  }

  formatTimestamp(timestamp: string | Date) {
    return formatTimestamp(timestamp);
  }
}
