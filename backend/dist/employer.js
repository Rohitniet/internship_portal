import express, { response, Router } from "express";
import z from "zod";
import { employerschema, employersignin, userschema, usersignin } from "./zod.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { studentrouter } from "./student_back.js";
dotenv.config();
const client = new PrismaClient();
export const employerroute = Router();
employerroute.post("/signup", async (req, res) => {
    const pass = await employerschema.parse(req.body);
    if (!pass) {
        res.status(400).json({
            message: "wrong inputs",
        });
    }
    const companyName = pass.companyname;
    const email = pass.email;
    const hashpass = await bcrypt.hash(pass.password, 5);
    try {
        await client.employer.create({
            data: {
                companyName,
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
employerroute.post("/signin", async (req, res) => {
    const pass = await employersignin.parse(req.body);
    const secret = process.env.jwt_secret;
    const email = pass.email;
    const password = pass.password;
    if (!secret) {
        return;
    }
    const user = await client.employer.findFirst({
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
//# sourceMappingURL=employer.js.map