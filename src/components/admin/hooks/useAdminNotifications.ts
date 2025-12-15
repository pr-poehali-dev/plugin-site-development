import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const ADMIN_URL = 'https://functions.poehali.dev/d4678b1c-2acd-40bb-b8c5-cefe8d14fad4';

export const useAdminNotifications = (currentUserId: number, isInitialLoad: boolean) => {
  const { toast } = useToast();
  const [adminNotifications, setAdminNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCounts, setNotificationCounts] = useState<Record<string, number>>({
    balance_topup: 0,
    verification_request: 0,
    withdrawal_request: 0,
    escrow_dispute: 0
  });

  const fetchAdminNotifications = async () => {
    try {
      const response = await fetch(`${ADMIN_URL}?action=admin_notifications`, {
        headers: { 'X-User-Id': currentUserId.toString() }
      });
      const data = await response.json();
      if (data.success) {
        const unreadNotifications = (data.notifications || []).filter(
          (notif: any) => !notif.is_read
        );
        
        const prevCount = adminNotifications.length;
        const newCount = unreadNotifications.length;
        
        if (newCount > prevCount && !isInitialLoad) {
          const newNotifs = unreadNotifications.slice(0, newCount - prevCount);
          newNotifs.forEach((notif: any) => {
            toast({
              title: notif.title,
              description: notif.message,
              duration: 6000
            });
          });
        }
        
        setAdminNotifications(unreadNotifications);
        
        const counts = {
          balance_topup: 0,
          verification_request: 0,
          withdrawal_request: 0,
          escrow_dispute: 0
        };
        
        unreadNotifications.forEach((notif: any) => {
          if (notif.type in counts) {
            counts[notif.type as keyof typeof counts]++;
          }
        });
        
        setNotificationCounts(counts);
      }
    } catch (error) {
      console.error('Ошибка загрузки админ-уведомлений:', error);
    }
  };

  const markNotificationsRead = async () => {
    try {
      await fetch(ADMIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': currentUserId.toString()
        },
        body: JSON.stringify({
          action: 'mark_admin_notifications_read'
        })
      });
      setAdminNotifications([]);
      fetchAdminNotifications();
    } catch (error) {
      console.error('Ошибка отметки админ-уведомлений:', error);
    }
  };

  return {
    adminNotifications,
    showNotifications,
    setShowNotifications,
    notificationCounts,
    fetchAdminNotifications,
    markNotificationsRead
  };
};
