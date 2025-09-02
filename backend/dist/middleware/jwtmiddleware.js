import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { json } from "zod";
dotenv.config();
export async function jwtmiddleware(req, res, next) {
    const secret = process.env.jwt_secret;
    console.log(secret);
    if (!secret) {
        return;
    }
    const token = req.headers["token"];
    if (typeof token !== "string") {
        return res.status(401).json({ message: "No token provided" });
    }
    console.log("into jwt auth");
    const idvery = jwt.verify(token, secret);
    if (idvery === "string") {
        return;
    }
    //@ts-ignore
    console.log(idvery.id);
    if (!idvery) {
        res.json({
            message: "user is not authenticated login again"
        });
    }
    else {
        //@ts-ignore
        req.id = idvery.id;
        next();
    }
}
//# sourceMappingURL=jwtmiddleware.js.map