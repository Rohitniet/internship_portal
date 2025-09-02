import express, { response } from "express";
import z from "zod";
import { employerschema, employersignin, userschema, usersignin } from "./zod.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { studentrouter } from "./student_back.js";
import { employerroute } from "./employer.js";

dotenv.config();

const client = new PrismaClient();

const app = express();

app.use(express.json());

app.use("/student",studentrouter);
app.use("/employer",employerroute);










app.listen(3000);
