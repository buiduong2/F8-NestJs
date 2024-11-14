'use server'

import { redirect } from 'next/navigation'
import { FormSchema } from '../login/FormLogin'
import { authServerUrl } from './constant'
import { cookies } from 'next/headers'
import { getPayload } from '@/utils/utils'

export async function login(data: FormSchema) {
	const res = await fetch(authServerUrl + '/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})



	if (res.ok) {
		const result = await res.json()
		const token = result.access_token
		const payload = getPayload(token)
		;(await cookies()).set('token', token, {
			httpOnly: true,
			expires: payload.exp * 1000
		})

		return redirect('/')
	} else if (res.status === 400) {
		return await res.json()
	}


	return res.json()
}
