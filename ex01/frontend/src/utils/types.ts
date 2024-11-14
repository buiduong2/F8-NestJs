interface Error {
	statusCode: number
}

export interface UnauthorizedError extends Error {
	statusCode: 401
	message: string
}

export interface BadRequestError extends Error {
	statusCode: 400
	message: {
		field: string
		error: string
	}[]
}

export type FormControls<T> = Array<keyof T>

export type InputInfo<T> = Record<
	keyof T,
	{
		placeholder: string
		type: string
		label: string
	}
>

export type UserProfile = {
	email: string
	fullname: string
	id: number
}
