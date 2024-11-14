'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	BadRequestError,
	FormControls,
	InputInfo,
	UnauthorizedError
} from '@/utils/types'
import {
	emailConstrants,
	fullNameConstrants,
	getPasswordConstrants
} from '@/utils/validate'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const formSchema = z.object({
	email: emailConstrants(),
	fullname: fullNameConstrants(),
	password: getPasswordConstrants()
})

export type FormSchema = z.infer<typeof formSchema>

const formControls: FormControls<FormSchema> = ['fullname', 'email', 'password']

const inputInfos: InputInfo<FormSchema> = {
	email: {
		label: 'Email',
		placeholder: 'name@gmail.com',
		type: 'email'
	},
	password: {
		label: 'Password',
		placeholder: '********',
		type: 'password'
	},
	fullname: {
		label: 'Fullname',
		placeholder: 'JoeDoe',
		type: 'text'
	}
}
interface Props {
	action?: (
		formData: FormSchema
	) => Promise<void | UnauthorizedError | BadRequestError>
}
export function FormRegister(props: Props) {
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [rootError, setRootError] = useState<null | string>(null)
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			fullname: ''
		}
	})

	async function onSubmit(data: FormSchema) {
		setIsSubmitting(true)
		try {
			const errors = await props.action?.(data)
			if (errors && errors.statusCode === 400) {
				errors.message.forEach(error => {
					const field = formControls.find(c => c === error.field)
					if (field) {
						form.setError(field, {
							message: error.error
						})
					}
				})
			}
			if (errors?.statusCode === 401) {
				setRootError(errors.message)
			}
		} finally {
			setIsSubmitting(false)
		}
	}

	function onClickChangeForm() {
		router.push('/login')
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6"
				noValidate
			>
				{rootError && (
					<p className="text-[0.8rem] font-medium text-destructive p-4 bg-red-100 rounded-lg">
						{rootError}
					</p>
				)}
				{formControls.map(key => (
					<FormField
						key={key}
						control={form.control}
						name={key}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{inputInfos[key].label}</FormLabel>
								<FormControl>
									<Input
										placeholder={
											inputInfos[key].placeholder
										}
										className="text-lg"
										type={inputInfos[key].type}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
				<Button
					type="submit"
					className="w-full"
					disabled={isSubmitting}
				>
					Submit
				</Button>
				<Button
					type="button"
					variant={'ghost'}
					className="w-full"
					onClick={onClickChangeForm}
				>
					Change To Login
				</Button>
			</form>
		</Form>
	)
}
