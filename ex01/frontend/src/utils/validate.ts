import { z } from 'zod'

const toErrorUtil = (message: string) => ({ message })

const getMinMessage = (property: string, value: number) =>
	toErrorUtil(`${property} must be at least ${value} characters`)

const getMaxMessage = (property: string, value: number) =>
	toErrorUtil(`${property} cannot be longer than ${value} characters`)

const getRequireMessage = (property: string) =>
	toErrorUtil(`Please provide an ${property}`)

export const emailConstrants = () =>
	z
		.string(getRequireMessage('Email'))
		.min(2, getMinMessage('Email', 2))
		.max(50, getMaxMessage('Email', 50))
		.email(
			'Enter a correct email address in the format: example@domain.com.'
		)

export const fullNameConstrants = () =>
	z
		.string(getRequireMessage('Fullname'))
		.min(3, getMinMessage('Fullname', 3))
		.max(50, getMaxMessage('Fullname', 50))

export const getPasswordConstrants = () =>
	z
		.string(getRequireMessage('Password'))
		.min(6, getMinMessage('Password', 6))
		.max(50, getMaxMessage('Password', 50))
