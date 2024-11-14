interface Payload {
	sub: number
	email: string
	iat: number
	exp: number
}

export function getPayload(jwt: string): Payload {
	return JSON.parse(atob(jwt.split('.')[1]))
}
