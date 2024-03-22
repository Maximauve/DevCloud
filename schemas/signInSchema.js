import { object, string } from 'yup';

const signInSchema = object({
	email: string().email().required(),
	password: string().required(),
});

export default signInSchema;