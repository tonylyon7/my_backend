import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({id}, "sjnuenbcjsdubeubcsdjfrgjrtlgjrtgmkkltmilk",{
        expiresIn: "1d"
    })
}

// Heroku
// const generateToken = (id) => {
//     return jwt.sign({id}, process.env.JWT_SECRET,{
//         expiresIn: "1d"
//     })
// }
export {generateToken}