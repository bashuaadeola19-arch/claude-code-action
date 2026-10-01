import { createAuthClient } from '@neondatabase/auth/next'

export const authClient = createAuthClient()

export const { signIn, signUp, signOut, useSession } = authClient

export function authErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message
  return 'We could not complete that request. Please check your details and try again.'
}
