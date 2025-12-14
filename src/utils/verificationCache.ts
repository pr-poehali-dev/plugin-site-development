import { requestCache } from './requestCache';

interface VerificationStatus {
  is_verified: boolean;
  request: {
    id: number;
    status: string;
    admin_comment: string | null;
    created_at: string;
    reviewed_at: string | null;
  } | null;
}

type VerificationListener = (status: VerificationStatus | null) => void;

class VerificationCacheManager {
  private VERIFICATION_URL = 'https://functions.poehali.dev/e0d94580-497a-452f-9044-0ef1b2ff42c8';
  
  constructor() {
    requestCache.registerConfig('verification', {
      ttl: 30000,
      minInterval: 30000
    });
  }

  subscribe(userId: number, listener: VerificationListener) {
    return requestCache.subscribe(`verification:${userId}`, listener);
  }

  getCached(userId: number): VerificationStatus | null {
    return requestCache.getCached(`verification:${userId}`);
  }

  async fetchStatus(userId: number, forceRefresh: boolean = false): Promise<VerificationStatus | null> {
    const cacheKey = `verification:${userId}`;
    
    if (!requestCache.getCached(cacheKey)) {
      requestCache.registerConfig(cacheKey, {
        ttl: 30000,
        minInterval: 30000
      });
    }

    return requestCache.get(
      cacheKey,
      async () => {
        try {
          const response = await fetch(`${this.VERIFICATION_URL}?action=status`, {
            headers: {
              'X-User-Id': userId.toString()
            }
          });
          return await response.json();
        } catch (error) {
          console.error('Ошибка загрузки статуса верификации:', error);
          return null;
        }
      },
      forceRefresh
    );
  }

  invalidate(userId: number) {
    return requestCache.refresh(`verification:${userId}`, async () => {
      try {
        const response = await fetch(`${this.VERIFICATION_URL}?action=status`, {
          headers: {
            'X-User-Id': userId.toString()
          }
        });
        return await response.json();
      } catch (error) {
        console.error('Ошибка загрузки статуса верификации:', error);
        return null;
      }
    });
  }

  clear(userId: number) {
    requestCache.invalidate(`verification:${userId}`);
  }
}

export const verificationCache = new VerificationCacheManager();

export const triggerVerificationCheck = (userId: number) => {
  return verificationCache.invalidate(userId);
};