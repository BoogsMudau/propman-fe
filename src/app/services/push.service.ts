import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class PushService {
  readonly VAPID_PUBLIC_KEY =
    'BC9w5RUr28mMLDuTCxuZAFHI9scck2kAXBlLahZKgq8UfQbnYW-hg7mgrpTT8mBKlyA5xFnYOwn0Y7qGaQVfv24';

  constructor(private swPush: SwPush, private supabase: SupabaseService) {}

  async subscribeToNotifications(userId: string) {
    console.log(this.swPush);
    if (!this.swPush.isEnabled) {
      console.warn('Push notifications not enabled or supported.');
      return;
    }

    try {
      const sub = await this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      });

      console.log(JSON.stringify(sub.toJSON()), 'take');

      // Save subscription to Supabase

      //check if token is there first
      const { error: mineError, data } = await this.supabase
        .getClient()
        .from('pushTokens')
        .select('*')
        .eq('userId', userId);
      console.log(data, 'token data');
      if (data?.length) {
        console.log('token already exists');
        return;
      }
      const { error: supabaseError } = await this.supabase.getClient().from('pushTokens').upsert({
        userId,
        subscription: sub.toJSON(),
      });

      if (supabaseError) console.error('Error saving subscription', supabaseError);
      else console.log('Push subscription saved:', sub);
    } catch (err) {
      console.error('Could not subscribe to notifications', err);
    }
  }
}
