export class UserModel {
	user_name: string;
	email: string;
	zipcode: string;
	dob: Date;

	constructor(obj: any = null) {
		if (obj != null) {
			Object.assign(this, obj);
		}
	}
}