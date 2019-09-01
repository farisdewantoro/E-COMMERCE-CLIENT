import db from '../../config/conn';
import keys from '../../config/keys';
import jwt from 'jsonwebtoken';
import async from 'async';
import { validationRegister, ValidationUpdateProfile, ValidationUpdateAddress, ValidationLogin} from './validation';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import axios from 'axios';
export const getUser = (req,res)=>{
    if(req.user){
        return res.status(200).json(req.user);
    }else{
        return res.status(400).json('CANT FIND USER');
    }
    
}
export const loginUser = (req,res,next)=>{

    const { errors, isValid } = ValidationLogin(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }


    passport.authenticate('local', function (err, user, info) {

        if (err) { return next(err); }
        if (!user) { return res.status(400).json({message:info.message}) }
        req.login(user, function (err) {
            if (err) { return next(err); }
            if (user) {
                let payload = { user };
                jwt.sign(
                    payload,
                    keys.jwt.secretOrPrivateKey,
                    {
                        expiresIn: keys.jwt.expiresIn
                    }, (err, token) => {
                        let redirectURL ='my-account';
                        if (req.session.carts) {
                            redirectURL ='/carts';
                        }
                        if(req.body.redirect){
                            redirectURL = req.body.redirect;
                        }
                        return res.status(200).json({ user: token, redirectURL: redirectURL });
                    });
            }
        });
    
      


    })(req, res, next);
}



export const getUserInfo = (req,res)=>{
    if(req.user){


    let querySelect = `SELECT 
    us.id,
    us.fullname,
    us.email,
    us.gender,
    us.phone_number,
    us.birthday
    from user as us 
    where us.id = '${req.user.id}' `;
    
        db.query(querySelect,(error,result)=>{
        if(error)return res.status(400).json({error:true,message:"ERROR FROM GET USER INFO"});
        if(result.length >0 ){
            let payload={user:result[0]};
            jwt.sign(
                payload,
                keys.jwt.secretOrPrivateKey,
                {
                    expiresIn: keys.jwt.expiresIn
                }, (err, token) => {
                    if(err) return res.status(400).json(err);
                    return res.status(200).json(token);
                    
                    // return res.redirect(keys.origin.url + "?token=" + token);
                });
           
        }
        if(result.length === 0){
            return res.status(400).json({error:true,message:"NO DETECTED USER",isAuth:false});
        }
    })
    }else{
        return res.status(400).json({ error: true, message: "NO DETECTED USER", isAuth: false });
    }
}


// export const googleRedirect = (req,res)=>{
//     if(req.user){
//         if(req.session.carts){
//             return res.redirect(keys.origin.redirect);
//         }
//         return res.redirect(keys.origin.redictProfile);
//     }else{
//         return res.status(400).json('INVALID');
//     }
// }

// export const facebookRedirect = (req,res)=>{
//     if (req.user) {
//         if (req.session.carts) {
//             return res.redirect(keys.origin.redirect);
//         }
//         return res.redirect(keys.origin.redictProfile);
//     }else{
//         return res.status(400).json('INVALID');
//     }
// }

export const registerUser = (req,res,next)=>{
   
    const { errors, isValid } = validationRegister(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }


    passport.authenticate('local-signup', function (err, user, info) {
 
        if (err) { return next(err); }
        if (!user) { return res.status(400).json({ message: info.message }) }
        if(user){
            req.login(user, function (err) {
                if (err) { return next(err); }
                if (user) {

                    let payload = { user };
                    jwt.sign(
                        payload,
                        keys.jwt.secretOrPrivateKey,
                        {
                            expiresIn: keys.jwt.expiresIn
                        }, (err, token) => {
                            let redirectURL = 'my-account';
                            if (req.session.carts) {
                                redirectURL = '/carts';
                            }
                            if (req.body.redirect){
                                redirectURL=req.body.redirect
                            }
                            return res.status(200).json({ user: token, redirectURL: redirectURL });
                        });
                }
            });
        }
    })(req, res, next);


}

export const updateProfile =(req,res)=>{
  
    const { errors, isValid } = ValidationUpdateProfile(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    let queryUpdate = `UPDATE 
    user set ? 
    where id = ${req.user.id}; `;

    let querySelectUser = `SELECT 
    us.id,
    us.fullname,
    us.email,
    us.gender,
    us.phone_number,
    us.birthday
    from user as us 
    where us.id = '${req.user.id}' `;
    if (req.body.birthday) req.body.birthday = new Date(req.body.birthday);

    async.parallel({
        checkuser:function(callback){
            db.query(querySelectUser,(err,result)=>{
                if(result.length > 0){
                    db.query(queryUpdate, [req.body],(err,result)=>{
                        callback(err,result);
                    })
                }
                if(err){
                    callback(err,null);
                }
            })
        }
    },function(err,result){
        if(err){
            return res.status(400).json({ error: true, message: "ERROR FROM GET USER"});
        }
        if(result){
            db.query(querySelectUser, (err, result) => {
                if(err){
                    return res.status(400).json({ error: true, message: "ERROR FROM GET USER", err: err });
                }
                if(result.length > 0){
                    let user = result[0];
                    let payload = { user };
                    let token_user = jwt.sign(payload, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });

                    return res.status(200).json({ user, token_user });
                }
                if(result.length ===0){
                    return res.status(400).json({ error: true, message: "ERROR FROM GET USER" });
                }
            })

        }
    })

  
}

export const updateAddress = (req,res)=>{
 
    const { errors, isValid } = ValidationUpdateAddress(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    let data ={
        address: req.body.address,
        postcode: req.body.postcode,
        province_id: req.body.province_id.value,
        regency_id: req.body.regency_id.value,
        district_id: req.body.district_id.value,
        village_id: req.body.village_id.value
    }

    let queryFindAddressUser = `SELECT 
    ua.province_id,
    ua.regency_id,
    ua.district_id,
    ua.village_id,
    ua.address,
    ua.postcode,
    p.name as province_name,
    r.name as regency_name,
    d.name as district_name,
    v.name as village_name
    from user_address as ua 
    left join provinces as p on ua.province_id = p.id
    left join regencies as r on ua.regency_id = r.id
    left join districts as d on ua.district_id = d.id
    left join villages as v on ua.village_id = v.id
    where ua.user_id = ${req.user.id} `;

    let queryFindAddress = `SELECT ua.id from user_address as ua where ua.user_id =${req.user.id} `;
    let queryUpdateAddress = `UPDATE user_address set ? where user_id = ${req.user.id}`;
    let queryInsertAddress = `INSERT INTO user_address set user_id = ${req.user.id}, ?`;



    db.query(queryFindAddress,(error,result)=>{
        if(error)return res.status(400).json({error:true,message:"ERROR FROM FIND ANDDRESS"});
        if(result.length > 0){
            db.query(queryUpdateAddress,[data],(err,result)=>{
                    if(err)return res.status(400).json({error:true,message:"ERROR FROM UPDATE ADDRESS"});
                    if (result){
                        db.query(queryFindAddressUser,(error,result)=>{
                            if (error) return res.status(400).json(error);
                            if(result.length > 0){
                                 let resultData =result[0];
                                let payload = { resultData};
                                let token_a = jwt.sign(payload,keys.jwt.secretOrPrivateKey,{expiresIn:keys.jwt.expiresIn});


                                let notification = {
                                    error: false,
                                    message: "ADDRESS HAS BEEN UPDATED",
                                    notification: true
                                }
                                return res.status(200).json({ address: resultData, token_a, notification: notification});
                            }
                        })
                    }
                })        
        }
        if (result.length === 0){
            db.query(queryInsertAddress,[data], (err, result) => {
                if (err) return res.status(400).json(err);
                if (result) {
                    db.query(queryFindAddressUser, (error, result) => {
                        if (error) return res.status(400).json({ error: true, message: "ERROR FROM FIND ADDRESS AFTER INSERTED" });
                        if(result.length > 0){
                            let resultData = result[0];
                            let payload = { resultData };
                            let token_a = jwt.sign(payload, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });

                            let notification ={
                                error:false,
                                message:"ADDRESS HAS BEEN CREATED",
                                notification: true
                            }
                            return res.status(200).json({ address: resultData, token_a, notification: notification });
                        }
                    })
                }
            }) 
        }
  
    })
}

export const getUserAdddress =(req,res)=>{

    let queryFindAddressUser = `SELECT 
    ua.province_id,
    ua.regency_id,
    ua.district_id,
    ua.village_id,
    ua.address,
    ua.postcode,
    p.name as province_name,
    r.name as regency_name,
    d.name as district_name,
    v.name as village_name
    from user_address as ua 
    left join provinces as p on ua.province_id = p.id
    left join regencies as r on ua.regency_id = r.id
    left join districts as d on ua.district_id = d.id
    left join villages as v on ua.village_id = v.id
    where ua.user_id = ${req.user.id} `;

    db.query(queryFindAddressUser,(err,result)=>{
        if(err){
            req.logout();
            req.session.destroy(function (err) {
                // cannot access session here
            })
            return res.status(400).json({ error: true, message: "CANT FIND ANY USER " });
        }
        if(result.length > 0){
           let resultData = result[0];
            let payload = { resultData };
            let token_a = jwt.sign(payload, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
            return res.status(200).json({ address: resultData, token_a });
        }
        if(result.length === 0){
            return res.status(400).json({ error: false, message: "CANT FIND ANY USER ADDRESS" });
        }
    })
   
}
export const logout = (req,res)=>{
    req.logout();
    // res.clearCookie("hammerstout_ss");
    req.session.destroy(function (err) {
        // cannot access session here
    })
    return res.status(200).json("LOGOUT");
}