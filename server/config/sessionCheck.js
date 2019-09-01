import keys from '../config/keys';
import db from './conn';
import UAparser from 'ua-parser-js';
import jwt from 'jsonwebtoken';
import async from 'async';
export const ensureSession = (req, res, next) => {
    if(!req.sessionID || typeof req.sessionID === "undefined" ||  req.sessionID == '' || req.sessionID == null){
        return res.status(400).json({ error: true, session: false, message: "YOU SESSION HAS BEEN EXPIRED" });
    }
     if (req.sessionID) {
        return next();
    }
    if(!req.sessionID){
        return res.status(400).json({ error: true, session: false, message: "YOU SESSION HAS BEEN EXPIRED" });
     
    }

  

    
}