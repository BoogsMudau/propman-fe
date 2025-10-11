// community-updates.service.ts
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CommunityUpdate } from './community-update.model';

@Injectable({ providedIn: 'root' })
export class CommunityUpdatesService {
  getUpdates() {
    const mockUpdates: CommunityUpdate[] = [
      {
        title: 'Update 1',
        description: 'Description 1',
        date: '2023-08-01',
        image: 'https://picsum.photos/200/300',
        creator: 'John Doe',
      },
      {
        title: 'Update 2',
        description: 'Description 2',
        date: '2023-08-02',
        image: 'https://picsum.photos/200/300',
        creator: 'Jane Smith',
      },
    ];
    return of(mockUpdates).pipe(delay(1000));
  }

  createUpdate(update: CommunityUpdate) {
    return of(update).pipe(delay(1000));
  }
}
