'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { authServerUrl } from './constant'

export async function logoutAction() {
	const requestCookie = await cookies()
	const token = requestCookie.get('token')
	requestCookie.delete('token')
	fetch(authServerUrl + '/auth/logout', {
		headers: {
			Authorization: 'Bearer ' + token?.value
		},
		method: 'POST'
	})
	return redirect('/login')
}
