'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GuestRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isGuest = localStorage.getItem('pepform_guest_mode');
      if (isGuest === 'true') {
        router.push('/dashboard-guest');
      }
    }
  }, [router]);

  return null;
}
