import passport from 'passport';
// import GoogleStrategy from 'passport-google-oauth20';
// import FacebookStrategy from 'passport-facebook';
// import moduleName from 'module'
import keys from './keys';
import db from './conn';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';

let querySelect = `SELECT 
    us.id,
    us.fullname,
    us.email,
    us.gender,
    us.phone_number,
    us.birthday
    from user as us 
    where us.id = ? `;
let querySelectEmail = `
SELECT 
    us.id,
    us.password,
    us.fullname,
    us.email,
    us.gender,
    us.phone_number,
    us.birthday
    from user as us 
    where us.email = ?
`;
passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((data, done) => {
    db.query(querySelect, [data.id], (err, ress) => {
        if (ress.length > 0) {
            done(null, ress[0])
        }

    })

})

passport.use('local-signup', new LocalStrategy(

    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) {
       
        let queryFindUser = `SELECT email from user where email = ?`;
        db.query(queryFindUser, [req.body.email], (err, result) => {

            if (err) return done(null,false, { error: true, message: "ERROR FROM REGISTER" }); 
            if (result.length > 0) {
                return done(null, false,{ error: true, message: "Email is already registered" }); 
            }
         
            if(result.length === 0){
                let queryInsert = 'INSERT into user set ?; ';
                // let querySelectUser = `INSERT `
                bcrypt.genSalt(10, (err, salt) => {
                    //10 adalah berapa banyak karakter
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        if (hash) {
                            let data ={
                                fullname:req.body.fullname,
                                email:req.body.email,
                                password:hash,
                                phone_number:req.body.phone_number
                            }
                            db.query(queryInsert, [data], (err, result) => {
                                if (err) return done(null, false, { error: true, message: "ERROR FROM REGISTER" });
                                if (result) {
                                  
                                    db.query(querySelect, [result.insertId], (err, ress) => {
                                        if (ress.length > 0) {
                                            return done(null, ress[0])
                                        } else {
                                            return done(null, false, { error: true, message: "error from register" });
                                        }

                                    })
                                }
                            })
                        }

                    });
                });
            }
        })


    }

));

passport.use(new LocalStrategy(
    function (email, password, done) {
  
        db.query(querySelectEmail, [email], (err, result) => {
    
            if (err) return done(err, null);
            if (result.length > 0) {
                let data = result[0];
                bcrypt.compare(password, data.password)
                    .then(isMatch => {
                        if (isMatch) {
                            return done(null, data);
                        } else {
                            return done(null, false, { message: 'Incorrect password.' });
                        }

                    })
                    .catch(err=>{
                         return done(null, false, { message: 'ERROR' });
                    })

            }
            if (result.length === 0) {
                return done(null, false, { message: 'Incorrect email.' });
            }


        })

    }
));

// passport.use(
//     new GoogleStrategy({
//         //options for the google strategy
//         callbackURL: keys.origin.redirectProvider + '/api/auth/google/redirect',
//         clientID: keys.google.clientID,
//         clientSecret: keys.google.clientSecret,
//         userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
//         passReqToCallback: true
//     }, (req,accessToken, refreshToken, profile, done) => {
        
//         req.session.dataUser = profile;
//         console.log(req.session);
//         let queryInsert = `INSERT INTO user set is_provider = 1, ?; INSERT INTO user_provider set user_id = (SELECT u.id from user as u order by id desc limit 1), ?;`;
//         let queryUpdate = `update user_provider set token = ? where providerId = '${profile.id}'`;
//         let queryFind = `SELECT 
//         us.id,
//         us.displayName,
//         us.email,
//         us.gender,
//         up.providerId,
//         up.token,
//         up.provider,
//         us.firstname,
//         us.lastname,
//         ui.birthday,
//         ui.phone_number
//         from user as us 
//         left join user_provider as up on us.id = up.user_id 
//         left join user_information as ui on us.id = ui.user_id
//         where up.providerId = '${profile.id}' and up.provider = '${profile.provider}' and us.is_provider = 1`;

//         let querySelect = `SELECT 
//     us.id,
//     us.displayName,
//     us.email,
//     us.gender,
//     up.providerId,
//     up.token,
//     up.provider,
//     us.firstname,
//     us.lastname,
//     ui.birthday,
//     ui.phone_number from user as us 
//     left join user_provider as up on us.id = up.user_id 
//     left join user_information as ui on us.id = ui.user_id
//     where us.id = ? and up.provider = ? and up.providerId = ?  and us.is_provider = 1`;
//     const querySelectAfterUpdate = `SELECT 
//     us.id,
//     us.displayName,
//     us.email,
//     us.gender,
//     up.providerId,
//     up.token,
//     up.provider,
//     us.firstname,
//     us.lastname,
//     ui.birthday,
//     ui.phone_number from user as us 
//     left join user_provider as up on us.id = up.user_id 
//     left join user_information as ui on us.id = ui.user_id
//     where up.provider = ? and up.providerId = ?  and us.is_provider = 1`;
//         let user = {
//             email: profile.emails[0].value,
//         }
//         if (profile.gender) user.gender = profile.gender;
//         if (profile.displayName) user.displayName = profile.displayName;
//         if (Object.keys(profile.name).length > 0) {
//             if (profile.name.familyName) user.lastname = profile.name.familyName;
//             if (profile.name.givenName) user.firstname = profile.name.givenName;
//         }

//         let user_provider = {
//             provider: profile.provider,
//             providerId: profile.id,
//             token: refreshToken ? refreshToken : accessToken
//         }
//         db.query(queryFind, (error, result) => {
            
//             if (error) return done(error);
//             if (result.length > 0) {
//                 console.log('user', result);
            
//                 db.query(queryUpdate, [user_provider.token], (err, ress)=>{
//                     console.log('res',ress);
//                     if (err) return done(err);
//                     if (ress.affectedRows > 0) {
//                         db.query(querySelectAfterUpdate, [profile.provider, profile.id], (err, ress) => {
//                             if (err) return done(err);
//                             if (ress.length > 0) {
//                                 return done(null, ress[0]);
//                             }

//                         })
//                     }
//                     if (ress.affectedRows === 0){
//                         return done(null, result[0]);
//                     }
//                 })
          
//             } else {

//                 db.query(queryInsert, [user, user_provider], (err, ress, fields) => {
//                     if (err) return done(err);
//                     if (ress) {
//                         db.query(querySelect, [ress[0].insertId, profile.provider, profile.id], (err, ress) => {
//                             if (err) return done(err);
//                             if (ress.length > 0) {
//                                 return done(null, ress[0]);
//                             }

//                         })
//                     }
//                 })
//             }
//         })







//     })

// );



// passport.use(new FacebookStrategy({
//     clientID: keys.facebook.clientID,
//     clientSecret: keys.facebook.clientSecret,
//     callbackURL: keys.origin.redirectProvider + '/api/auth/facebook/redirect',
//     profileFields: ['id', 'emails', 'name', 'birthday', 'location', 'gender', 'age_range', 'link', 'hometown']

// }, (accessToken, refreshToken, profile, done) => {
//     let payload = profile._json;
//     let user = {
//         email: payload.email
//     }
    
//     if (payload.gender) user.gender = payload.gender;
//     if (payload.displayName) user.displayName = payload.displayName;
//     if (payload.last_name) user.lastname = payload.last_name;
//     if (payload.first_name) user.firstname = payload.first_name;

//     let user_information = {};
//     if (payload.birthday) user_information.birthday = payload.birthday;
//     if (typeof payload.location !== "undefined" && typeof payload.location.name !== "undefined") {
//         user_information.location = payload.location.name;

//     }
//     if (typeof payload.age_range !== "undefined" && typeof payload.age_range.min !== "undefined") {
//         user_information.age = payload.age_range.min;
//     }

//     let user_provider = {
//         provider: profile.provider,
//         providerId: payload.id,
//         token: accessToken
//     }
//     let queryInsert = `INSERT INTO user set is_provider = 1, ?; INSERT INTO user_provider set user_id = (SELECT u.id from user as u order by id desc limit 1), ?;
//                        ${Object.keys(user_information).length > 0 ? `INSERT INTO user_information set user_id = (SELECT u.id from user as u order by id desc limit 1), ? ` : ''}`;
//     let queryFind = `SELECT 
//         us.id,
//         us.displayName,
//         us.email,
//         us.gender,
//         up.providerId,
//         up.token,
//         up.provider,
//         us.firstname,
//         us.lastname,
//         ui.birthday,
//         ui.phone_number
//         from user as us 
//         left join user_provider as up on us.id = up.user_id 
//         left join user_information as ui on us.id = ui.user_id
//         where up.providerId = '${profile.id}' and up.provider = '${profile.provider}' and us.is_provider = 1`;

//     let querySelect = `SELECT 
//     us.id,
//     us.displayName,
//     us.email,
//     us.gender,
//     up.providerId,
//     up.token,
//     up.provider,
//     us.firstname,
//     us.lastname,
//     ui.birthday,
//     ui.phone_number from user as us 
//     left join user_provider as up on us.id = up.user_id 
//     left join user_information as ui on us.id = ui.user_id
//     where us.id = ? and up.provider = ? and up.providerId = ? and up.token = ? and us.is_provider = 1`;

//     db.query(queryFind, (error, result) => {
//         if (error) return done(error);
//         if (result.length > 0) {
//             return done(null, result[0]);
//         } else {

//             db.query(queryInsert, [user, user_provider, user_information], (err, ress, fields) => {
//                 if (err) return done(err);
//                 if (ress) {
//                     db.query(querySelect, [ress[0].insertId, profile.provider, profile.id], (err, ress) => {
//                         if (err) return done(err);
//                         if (ress.length > 0) {
//                             return done(null, ress[0]);
//                         }

//                     })
//                 }
//             })
//         }
//     })







// })

// );
