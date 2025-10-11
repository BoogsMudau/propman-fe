import { Component, Input } from '@angular/core';
import { CommunityUpdate } from '../../state/community-updates/community-update.model';

@Component({
  selector: 'app-update-card',
  imports: [],
  templateUrl: './update-card.html',
  styleUrl: './update-card.scss',
})
export class UpdateCard {
  @Input() update!: CommunityUpdate;
}
