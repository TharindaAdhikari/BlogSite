import express from "express";
import { register, login, logout } from "../controllers/auth.js";

const router = express.Router();

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Auth:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *            description: enter your username
 *            example: andi17x
 *          password:
 *            type: string
 *            description: enter your password
 *            example: adminpassword12
 *          email:
 *            type: string
 *            description: enter your email
 *            example: andi@gmail.com
 */

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: Register user
 *    description: Register User
 *    responses:
 *      200:
 *        description: Register single user.
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                description:
 *                  type: string
 *                  example: User created!
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Auth'
 * 
 */
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;

