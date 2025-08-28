'use server';

import { redirect } from 'next/navigation';

export default async function signOut() {
  // In a server action, we can redirect directly to the logout endpoint
  // The logout endpoint will handle clearing cookies and redirecting
  redirect('/api/auth/logout');
}
