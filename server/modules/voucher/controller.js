import db from '../../config/conn';
import isEmpty from '../../../validations/is-empty';
export const checkVoucherDiscount = (req,res)=>{
    if (isEmpty(req.body.code)){
        const notification = {
            error: true,
            message: "There is an error !",
            notification: true
        }
        return res.status(400).json({ notification: notification });
    }

    const queryCheckVoucher = `SELECT name,id,description,voucher_type_id,value from vouchers where 
    id = '${req.body.code}' and max_uses > 0 and NOW() between valid_from and valid_until `;

    db.query(queryCheckVoucher,(err,result)=>{
        if(err){
            const notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            return res.status(400).json({ notification: notification });
        }
        if(result.length > 0){
            const notification = {
                error: false,
                message: "Succeed add a voucher",
                notification: true
            }
            return res.status(200).json({ notification: notification,data:result[0] });
        }
        if(result.length == 0){
            const notification = {
                error: true,
                message: "Invalid voucher !",
                notification: true
            }
            return res.status(400).json({ notification: notification });
        }
    })

}