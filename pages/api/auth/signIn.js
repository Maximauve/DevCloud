import signInSchema from '@/schemas/signInSchema'
import { getOne, insertOne } from "@/services/db.service";
import Collections from "@/constants/Collections";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * @swagger
 * /api/auth/signIn:
 *   post:
 *     description: Endpoint which logs a user in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *         
 *     responses:
 *       200:
 *         description: Success Response - User is logged in
 *       403:
 *         description: Unauthorized Request Response
 *       405:
 *         description: Method not allowed Response
*/
const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        const user = await signInSchema.validate(req.body)
        const userInDB = await getOne(Collections.USERS, { email: user.email });
        if (!userInDB) {
          throw new Error("Invalid credentials");
        }
        if (!await bcrypt.compare(user.password, userInDB.password)) {
          throw new Error("Invalid credentials");
        }
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const data = { username: userInDB.firstName, token }

        res.status(200).json({ status: 200, message: "Successfully logged in", ...data });
      } catch (error) {
        console.error(error);
        res.status(403).json({ status: 403, message: error.message });
        return;
      }
      break;
    default:
      res.status(405).json({ status: 405, message: "Method not allowed" });
      break;
  }
}

export default handler;