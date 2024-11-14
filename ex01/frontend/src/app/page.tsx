import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { UserProfile } from '@/utils/types'
import { redirect } from 'next/navigation'
import { authServerUrl } from './actions/constant'
import { logoutAction } from './actions/logout'
import { cookies } from 'next/headers'

export default async function Home() {
	const c = await cookies()

	const res = await fetch(authServerUrl + '/auth/profile', {
		headers: {
			Authorization: 'Bearer ' + c.get('token')?.value
		}
	})

	if (!res.ok) {
		return redirect('/api/logout')
	}

	const user: UserProfile = await res.json()
	return (
		<div className="max-w-sm w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<Card>
				<CardHeader className="text-center mb-5 w-4/5 mx-auto">
					<CardTitle>
						<h1 className="text-2xl font-semibold">Xin Chào</h1>
					</CardTitle>
					<CardDescription>
						<p className="text-lg text-muted-foreground">
							{user.fullname}
						</p>
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<form action={logoutAction} className="w-full">
						<Button className="w-full">Logout</Button>
					</form>
				</CardFooter>
			</Card>
		</div>
	)
}
