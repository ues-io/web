
declare module "@uesio/app/bots/listener/uesio/web/request_demo" {

	type Params = {
		firstname: string
		lastname: string
		email: string
		phone: string
		companyname: string
		comments?: string
	}

	export type {
		Params
	}
}