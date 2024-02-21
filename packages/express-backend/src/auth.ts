import jwt from "jsonwebtoken";

export function generateAccessToken(username: string) {
    console.log("Generating token for", username);
    return new Promise((resolve, reject) => {
        jwt.sign(
            { username: username }, 
            process.env.TOKEN_SECRET, 
            {expiresIn: '1d'}, 
            (error, token) => {
                if (error) reject(error);
                else resolve(token);
            }
        );
    });
}
