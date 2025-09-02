import express, { response, Router } from "express";
import z from "zod";
import { employerschema, employersignin, userschema, usersignin } from "./zod.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { upload } from "./middleware/file_upload.js";
import { jwtmiddleware } from "./middleware/jwtmiddleware.js";
dotenv.config();
const client = new PrismaClient();
export const studentrouter = Router();
studentrouter.post("/signup", async (req, res) => {
    const pass = await userschema.parse(req.body);
    if (!pass) {
        res.status(400).json({
            message: "wrong inputs",
        });
    }
    const name = pass.name;
    const email = pass.email;
    const hashpass = await bcrypt.hash(pass.password, 5);
    try {
        await client.student.create({
            data: {
                name,
                email,
                password: hashpass,
            },
        });
        res.json({
            message: "you have signed up",
        });
    }
    catch (e) {
        console.log("wrong input");
    }
});
studentrouter.post("/signin", async (req, res) => {
    const pass = await usersignin.parse(req.body);
    const secret = process.env.jwt_secret;
    const email = pass.email;
    const password = pass.password;
    if (!secret) {
        return;
    }
    const user = await client.student.findFirst({
        where: {
            email,
        },
    });
    if (!user) {
        res.json("user does not exist");
        return;
    }
    const passres = await bcrypt.compare(password, user?.password);
    if (!passres) {
        res.json("wrong password");
    }
    const token = jwt.sign({
        id: user.id,
    }, secret);
    res.json({
        token,
    });
});
studentrouter.post("/resume", jwtmiddleware, upload.single("resume"), async (req, res) => {
});
//# sourceMappingURL=student_back.js.map