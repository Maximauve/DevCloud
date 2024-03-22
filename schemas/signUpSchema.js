import { object, string, ref } from 'yup';

const signUpSchema = object({
	firstName: string().required(),
	lastName: string().required(),
	email: string().email().required(),
	password: string().required(),
	confirmPassword: string().equals([ref('password')], 'Passwords must match').required(),
});

export default signUpSchema;