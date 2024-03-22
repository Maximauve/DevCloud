import signUpSchema from '@/schemas/signUpSchema'
import { getOne, insertOne } from "@/services/db.service";
import Collections from "@/constants/Collections";
import bcrypt from 'bcrypt';

/**
 * @swagger
 * /api/auth/signUp:
 *   post:
 *     description: Endpoint which creates a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *         
 *     responses:
 *       201:
 *         description: Success Response - User created
 *       400:
 *         description: Bad Request Response
 *       405:
 *         description: Method not allowed Response
*/
const handler = async (req, res) => {
	switch (req.method) {
		case "POST":
			try {
				const user = await signUpSchema.validate(req.body)
				const userInDB = await getOne(Collections.USERS, { email: user.email });
				if (userInDB) {
					throw new Error("User already exists");
				}
				user.password = await bcrypt.hash(user.password, 10);
				const { confirmPassword, ...userData } = user;
				await insertOne(Collections.USERS, userData);
				res.status(201).json({ status: 201, message: "User created" });
			} catch (error) {
				console.error(error);
				res.status(400).json({ status: 400, message: error });
				return;
			}
			break;
		default:
			res.status(405).json({ status: 405, message: "Method not allowed" });
			break;
	}
}

export default handler;