import db from '../../config/conn';
import UAparser from 'ua-parser-js'
import jwt from 'jsonwebtoken';
import keys from '../../config/keys';
export const addToCart = (req,res) =>{

    if(req.sessionID || req.user){

    
    let queryCheckCart = `select crt.id from carts as crt where crt.session_id = '${req.sessionID}'`;
    let queryCheckCartList = `select ci.product_id,ci.product_variant_id,ci.product_attribute_id from cart_items as ci where cart_id = (select crt.id from carts as crt where crt.session_id = '${req.sessionID}') and ci.product_id = ${req.body.product_id} and ci.product_variant_id = ${req.body.product_variant_id} and ci.product_attribute_id = ${req.body.product_attribute_id}`;


    let queryAddToCart = `INSERT INTO carts (session_id,active) values ('${req.sessionID}',1)`;
    let queryAddCartList = `INSERT INTO cart_items (product_id,product_variant_id,product_attribute_id,cart_id,quantity) SELECT ${req.body.product_id},${req.body.product_variant_id},${req.body.product_attribute_id},(SELECT crt.id  from carts as crt where crt.session_id = '${req.sessionID}'),1 where (select pa.stock from product_attribute as pa where pa.id = ${req.body.product_attribute_id}) >= 1 `;

    let queryInsertAll = `${queryAddToCart}; ${queryAddCartList};`;

    let queryUpdateCartList = `UPDATE cart_items as ci set ci.quantity = ci.quantity+1 where 
    ci.cart_id = (select crt.id from carts as crt where crt.session_id = '${req.sessionID}') and ci.product_id = ${req.body.product_id} and ci.product_variant_id = ${req.body.product_variant_id} and ci.product_attribute_id = ${req.body.product_attribute_id} and (select pa.stock from product_attribute as pa where pa.id = ${req.body.product_attribute_id}) >= ci.quantity+1 `;

    let queryFindCartList =`select 
    ci.id as cart_items_id,
    p.name as product_name,
    p.slug as product_slug,
    p.description,
    p.regular_price,
    c.name as category_name,
    c.slug,
    ct.name as category_type,
    ct.slug as category_type_slug,
    pd.discount_percentage,
    pd.discount_value,
    p.id as product_id,
    pa.id as product_attribute_id,
    pv.id as product_variant_id,
i.link,i.public_id,pa.size,pa.stock,crt.active as cart_status,ci.quantity from products as p 
left join product_category as pc on p.id = pc.product_id 
left join categories as c on pc.category_id = c.id 
left join product_variant as pv on p.id = pv.product_id
left join category_type as ct on pv.category_type_id = ct.id
left join product_discount as pd on pd.id = 
(SELECT pd1.id from product_discount as pd1 where p.id = pd1.product_id and now() between pd1.valid_from and pd1.valid_until)
left join product_image as pi on pi.id = (SELECT pi1.id from product_image as pi1 where pi1.product_id = p.id order by pi1.product_id asc limit 1)
left join images as i on pi.image_id = i.id 
left join product_attribute as pa on p.id = pa.product_id and pv.id = pa.product_variant_id
left join cart_items as ci on pv.id = ci.product_variant_id and p.id = ci.product_id and pa.id = ci.product_attribute_id
left join carts as crt on ci.cart_id = (SELECT crt1.id from carts as crt1 where crt1.session_id = '${req.sessionID}' 
) where crt.session_id = '${req.sessionID}' and ci.quantity <= pa.stock
`;


    let queryChecking = `${queryCheckCart}; ${queryCheckCartList}; ${queryFindCartList};`;


    db.query(queryChecking,(error,result)=>{
        if(error) return res.status(400).json(error);
        if(result[0].length > 0){
            let payload = {
                cart_id: result[0][0].id
            }
            let dataToken = jwt.sign(payload, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
            req.session.carts = dataToken;
            // res.cookie("hammerstout_ss", dataToken, { sameSite: true });
        }
        if(result[0].length > 0 && result[1].length === 0 && result[2].length < 15){
            db.query(queryAddCartList,(error,result)=>{
                if (error) return res.status(400).json(error);
                if (result) {
                    db.query(queryFindCartList, (error, result) => {
                        if (error) return res.status(400).json(error);
                        if (result.length > 0) {
                        let token_cart = {
                                result
                            };

                         

                            let notification = {
                                error: false,
                                message: "ADDED TO YOUR CART.",
                                notification: true
                            }
                            let token_c = jwt.sign(token_cart, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
                            return res.status(200).json({ cart_list: result, status: 'OK', notification: notification, token_c});
                        }
                    })
                
                }
            })
        }
        if (result[0].length === 0 && result[1].length === 0 && result[2].length < 15){
            db.query(queryInsertAll,(error,result)=>{
                if (error) return res.status(400).json(error);
                
                if (result[0].affectedRows > 0 && result[1].affectedRows > 0){
                    let payload = {
                        cart_id: result[0].insertId
                    }
                    let dataToken = jwt.sign(payload, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
                    // res.cookie("hammerstout_ss", dataToken, { sameSite: true });
                    req.session.carts = dataToken;
                            db.query(queryFindCartList, (error, result) => {
                                if (error) return res.status(400).json(error);
                                if (result.length > 0) {
                               let token_cart = {
                                        result
                                    };
                                    let notification = {
                                        error: false,
                                        message: "ADDED TO YOUR CART.",
                                        notification: true
                                    }
                                    let token_c = jwt.sign(token_cart, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
                                    return res.status(200).json({ cart_list: result, status: 'OK', notification: notification, token_c});
                                }
                            })   
                        }
                 if (result[0].affectedRows === 0){
                    let notification = {
                        error: true,
                        message: "ERROR CART",
                        notification: true
                    }
                    return res.status(400).json({ notification: notification });
                        }
                 if (result[1].affectedRows === 0){
                    let notification = {
                        error: true,
                        message: "IS OUT OF STOCK !",
                        notification: true
                    }
                     return res.status(400).json({ stock:'OUT OF STOCK !',notification: notification});
                        }
            })
        }
         if (result[0].length > 0 && result[1].length > 0 ){
            db.query(queryUpdateCartList,(error,result)=>{
                if (error) return res.status(400).json(error);
                  
                if (result.affectedRows > 0){
                    db.query(queryFindCartList, (error, result) => {
                        if (error) return res.status(400).json(error);
                        if (result.length > 0) {
                           let token_cart = {
                                result
                            };
                            let notification = {
                                error: false,
                                message: "ADDED TO YOUR CART.",
                                notification: true
                            }
                            let token_c = jwt.sign(token_cart, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
                            return res.status(200).json({ cart_list: result, status: 'OK', notification: notification, token_c});
                        }
                    }) 
                }
                else if (result.affectedRows === 0) {
                    let notification = {
                        error: true,
                        message: "IS OUT OF STOCK !",
                        notification: true
                    }
                    return res.status(400).json({ stock: 'OUT OF STOCK !',notification: notification });
                }
            })
        } if ( result[0].length > 0 && result[2].length >= 15 ){
            let notification = {
                error: true,
                message: "Already the maximum limit",
                notification: true
            }
            return res.status(400).json({ notification: notification });
        }
        // else{
        //     let notification = {
        //         error: true,
        //         message: "ERROR FROM CART",
        //         notification: true
        //     }
        //     return res.status(400).json({ notification: notification });
        // }
    })
    }else{
        let notification = {
            error: true,
            message: "ERROR FROM CART",
            notification: true
        }
        return res.status(400).json({ notification: notification });
    }  
}  

export const updateCart = (req,res)=>{
    if(req.sessionID || req.user){
    
    let queryCheckCart = `select ci.id,crt.id as cart_id,ci.product_attribute_id,ci.product_id,ci.product_variant_id,ci.quantity from carts as crt 
    LEFT JOIN cart_items as ci on crt.id = ci.cart_id
    where crt.session_id = '${req.sessionID}' and ci.id = ${req.body.cart_items_id}
    group by ci.id,cart_id,ci.product_attribute_id,ci.product_id,ci.product_variant_id,ci.quantity`;


    let queryUpdateCartList = `UPDATE cart_items as ci set ci.quantity = ${req.body.quantity} where 
    ci.cart_id = (select crt.id from carts as crt where crt.session_id = '${req.sessionID}') and ci.id = ${req.body.cart_items_id}  and (select pa.stock from product_attribute as pa where pa.id = ci.product_attribute_id) >= ${req.body.quantity} `;
    
    let queryFindCartList = `select 
    ci.id as cart_items_id,
    p.name as product_name,
    p.slug as product_slug,
    p.description,
    p.regular_price,
    c.name as category_name,
    c.slug,
        ct.name as category_type,
    ct.slug as category_type_slug,
    pd.discount_percentage,
    pd.discount_value,
      p.id as product_id,
    pa.id as product_attribute_id,
    pv.id as product_variant_id,
i.link,i.public_id,pa.size,pa.stock,crt.active as cart_status,ci.quantity from products as p 
left join product_category as pc on p.id = pc.product_id 
left join categories as c on pc.category_id = c.id 
left join product_variant as pv on p.id = pv.product_id
left join category_type as ct on pv.category_type_id = ct.id
left join product_discount as pd on pd.id = 
(SELECT pd1.id from product_discount as pd1 where p.id = pd1.product_id and now() between pd1.valid_from and pd1.valid_until)
left join product_image as pi on pi.id = (SELECT pi1.id from product_image as pi1 where pi1.product_id = p.id order by pi1.product_id asc limit 1)
left join images as i on pi.image_id = i.id 
left join product_attribute as pa on p.id = pa.product_id and pv.id = pa.product_variant_id
left join cart_items as ci on pv.id = ci.product_variant_id and p.id = ci.product_id and pa.id = ci.product_attribute_id
left join carts as crt on ci.cart_id = (SELECT crt1.id from carts as crt1 where crt1.session_id = '${req.sessionID}' 
) where crt.session_id = '${req.sessionID}' and ci.quantity <= pa.stock
`;


 
        db.query(queryCheckCart,(error,result)=>{
        if(error) return res.status(400).json(error);
        if(result.length > 0){
                const payload = {
                    cart_id: result[0].id
                 }
                const dataToken = jwt.sign(payload, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
                res.cookie("hammerstout_ss", dataToken, { sameSite: true });
                req.session.carts=dataToken;
     
            db.query(queryUpdateCartList,(error,result)=>{
                if (error) return res.status(400).json(error);
                if(result.affectedRows !== 0){
                    db.query(queryFindCartList,(error,result)=>{
                        if (error) return res.status(400).json(error);
                        if (result.length > 0) {
                            let token_cart = {
                                result
                            };
                            let token_c = jwt.sign(token_cart, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
                            return res.status(200).json({ cart_list: result, status: 'OK', notification: true, token_c});
                        }
                    })
                   
                }
                 if(result.affectedRows == 0){
                    db.query(queryFindCartList, (error, result) => {
                        if (error) return res.status(400).json(error);
                        if (result.length > 0) {
                         
                            let token_cart = {
                                result
                            };
                            let token_c = jwt.sign(token_cart, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
                            return res.status(200).json({ cart_list: result, status: 'OK', notification: true, token_c });
                        }
                    })
                }
            })
        }
    })
    }else{
        let notification = {
            error: true,
            message: "ERROR FROM CART",
            notification: true
        }
        return res.status(400).json({ notification: notification });
    }
}




export const deleteCart = (req,res)=>{
   if(req.sessionID || req.user){

  
    
    let queryDelete = `DELETE FROM cart_items  where id = ${req.params.cart_item_id}`;
    let queryFindCartList = `select 
    ci.id as cart_items_id,
    p.name as product_name,
    p.slug as product_slug,
    p.id as product_id,
    pa.id as product_attribute_id,
    pv.id as product_variant_id,
    p.description,
    p.regular_price,
    c.name as category_name,
    c.slug,
     c.slug,
        ct.name as category_type,
    pd.discount_percentage,
    pd.discount_value,
i.link,
i.public_id,
pa.size,pa.stock,crt.active as cart_status,ci.quantity from products as p 
left join product_category as pc on p.id = pc.product_id 
left join categories as c on pc.category_id = c.id 
left join product_variant as pv on p.id = pv.product_id
left join category_type as ct on pv.category_type_id = ct.id
left join product_discount as pd on pd.id = 
(SELECT pd1.id from product_discount as pd1 where p.id = pd1.product_id and now() between pd1.valid_from and pd1.valid_until)
left join product_image as pi on pi.id = (SELECT pi1.id from product_image as pi1 where pi1.product_id = p.id order by pi1.product_id asc limit 1)
left join images as i on pi.image_id = i.id 
left join product_attribute as pa on p.id = pa.product_id and pv.id = pa.product_variant_id
left join cart_items as ci on pv.id = ci.product_variant_id and p.id = ci.product_id and pa.id = ci.product_attribute_id
left join carts as crt on ci.cart_id = (SELECT crt1.id from carts as crt1 where crt1.session_id = '${req.sessionID}' 
) where crt.session_id = '${req.sessionID}' and ci.quantity <= pa.stock
`;
       db.query(queryDelete, (error, result) => {
           if (error) return res.status(400).json(error);
           if (result.affectedRows !== 0) {
               db.query(queryFindCartList, (error, result) => {
                   if (error) return res.status(400).json(error);
                   if (result.length > 0) {
                    let token_cart = {
                           result
                       };
                       let token_c = jwt.sign(token_cart, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
                       return res.status(200).json({ cart_list: result, status: 'OK', notification: true, token_c });
                   } else {
                       let token_cart = {
                           result
                       };
                       let token_c = jwt.sign(token_cart, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
                       return res.status(200).json({ cart_list: result, status: 'OK', notification: true, token_c });
                   }
               })
           }
       })



   }else {
       let notification = {
           error: true,
           message: "ERROR FROM CART",
           notification: true
       }
       return res.status(400).json({ notification: notification });
   }
}