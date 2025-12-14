import { requestCache } from './requestCache';

const NOTIFICATIONS_URL = 'https://functions.poehali.dev/6c968792-7d48-41a9-af0a-c92adb047acb';
const CACHE_DURATION = 30000;
const MIN_UPDATE_INTERVAL = 30000;

interface NotificationCounts {
  notifications: number;
  messages: number;
  adminNotifications?: number;
}

class NotificationsCache {
  constructor() {
    requestCache.registerConfig('notifications', {
      ttl: CACHE_DURATION,
      minInterval: MIN_UPDATE_INTERVAL
    });
  }

  subscribe(callback: (counts: NotificationCounts) => void): () => void {
    return requestCache.subscribe('notifications', callback);
  }

  async getCounts(userId: number, userRole: string, force: boolean = false): Promise<NotificationCounts | null> {
    return requestCache.get(
      'notifications',
      () => this.fetchCounts(userId, userRole),
      force
    );
  }

  private async fetchCounts(userId: number, userRole: string): Promise<NotificationCounts | null> {
    try {
      const requests = [
        fetch(`${NOTIFICATIONS_URL}?action=notifications`, {
          headers: { 'X-User-Id': userId.toString() }
        }),
        fetch(`${NOTIFICATIONS_URL}?action=messages`, {
          headers: { 'X-User-Id': userId.toString() }
        })
      ];

      if (userRole === 'admin') {
        const ADMIN_URL = 'https://functions.poehali.dev/d4678b1c-2acd-40bb-b8c5-cefe8d14fad4';
        requests.push(
          fetch(`${ADMIN_URL}?action=admin_notifications_unread_count`, {
            headers: { 'X-User-Id': userId.toString() }
          })
        );
      }

      const responses = await Promise.all(requests);
      const [notifRes, msgRes, adminNotifRes] = responses;

      if (notifRes.ok && msgRes.ok) {
        const notifData = await notifRes.json();
        const msgData = await msgRes.json();
        
        const counts: NotificationCounts = {
          notifications: notifData.unread_count || 0,
          messages: msgData.unread_count || 0
        };

        if (adminNotifRes && adminNotifRes.ok) {
          const adminNotifData = await adminNotifRes.json();
          counts.adminNotifications = adminNotifData.unread_count || 0;
        }

        return counts;
      }
      return null;
    } catch (error) {
      console.error('[NotificationsCache] Fetch error:', error);
      return null;
    }
  }

  triggerUpdate(userId: number, userRole: string) {
    requestCache.refresh('notifications', () => this.fetchCounts(userId, userRole));
  }

  clearCache() {
    requestCache.invalidate('notifications');
  }
}

export const notificationsCache = new NotificationsCache();

export function triggerNotificationUpdate(userId: number, userRole: string) {
  notificationsCache.triggerUpdate(userId, userRole);
}