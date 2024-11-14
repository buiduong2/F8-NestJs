import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { FormRegister } from './FormRegister'
import { register } from '../actions/register'
export default function Home() {
	return (
		<div className="max-w-sm w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<Card>
				<CardHeader className="text-center mb-5 w-4/5 mx-auto">
					<CardTitle>
						<h1 className="text-2xl font-semibold">
							Create an account
						</h1>
					</CardTitle>
					<CardDescription>
						<p className="text-lg text-muted-foreground">
							Enter your email below to create your account
						</p>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<FormRegister action={register} />
				</CardContent>
			</Card>
		</div>
	)
}
