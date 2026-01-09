'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signInWithProvider(provider: 'github' | 'google') {
  const supabase = await createClient()
  const headerList = await headers()
  const origin = headerList.get('origin')
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: provider === 'google' ? {
        access_type: 'offline',
        prompt: 'consent',
      } : {},
    },
  })

  if (error) {
    console.error(`${provider} auth error:`, error.message)
    return redirect('/login?error=auth-failed')
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Logout error:', error.message)
  }
  redirect('/login')
}