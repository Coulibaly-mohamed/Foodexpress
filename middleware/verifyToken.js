import jwt from 'jsonwebtoken'
import mongoose from 'mongoose' 



//generate Token
export const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d', // le token expire après 7 jours
  });

  return token;
};

// Méthode de contrôle de validité d'un token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(" ")[1]
        
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).json("Token is not valid!")
            req.user = user
            next()
        })
    } else {
        return res.status(401).json("You are not authenticated!")
    }
}

// Autorise l'accès uniquement si l'utilisateur est lui-même ou un admin
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        const isAdmin = req.user.role === 'admin'
        const isOwner = req.params.id === req.user.id

        if (isAdmin || isOwner) {
            next()
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    })
}

// Niveau d'autorisation 'admin', possède tous les droits sur l'application
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next()
        } else {
            res.status(403).json("You are not allowed to do that!")
        }
    })
}

export {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}
