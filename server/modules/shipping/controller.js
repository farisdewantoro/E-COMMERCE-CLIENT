import db from '../../config/conn';
import keys from '../../config/keys';
import jwt from 'jsonwebtoken';
import qs from 'querystring';
import request from 'request';
import axios from 'axios';
import async from 'async';
export const checkCost =(req,res)=>{

    async.parallel({
        provinceID:function(callback){
            axios.get("https://pro.rajaongkir.com/api/province", { headers: { "key": keys.rajaongkir.key, "content-type": "application/x-www-form-urlencoded" } })
            .then(result => {
                let province = req.body.province_id.label;
                let dataProvince = result.data.rajaongkir.results.filter((r, i) => r.province.toLowerCase() === province.toLowerCase());
                callback(null, dataProvince)
            }).catch(err => {
                let notification = {
                    error: false,
                    message: "ADDRESS NOT FOUND",
                    notification: true
                }
                    callback(notification, null);
                
            });
        },
        cityID:function(callback){
            axios.get("https://pro.rajaongkir.com/api/city", { headers: { "key": keys.rajaongkir.key, "content-type": "application/x-www-form-urlencoded" } })
                .then(result => {
                    let data = req.body.regency_id.label;
                    let city = data.toLowerCase().replace(/(kota+\s|kabupaten+\s|kota|kabupaten)/g, "");
                    let type = data.toLowerCase().match(/(kota|kabupaten)/g).toString();

                    let dataCity = result.data.rajaongkir.results.filter((r, i) => (r.city_name.toLowerCase() === city) && (r.type.toLowerCase() === type)  );
                    callback(null, dataCity)
                }).catch(err => {
                    let notification = {
                        error: false,
                        message: "ADDRESS NOT FOUND",
                        notification: true
                    }
                        callback(notification, null);
                    
                  
                    
                });
        }
    },function(err,results){
        
            if (err) {
                return res.status(400).json(err);
            }
            if(results.provinceID.length > 0 && results.cityID.length > 0 ){
                   axios({
        method:"POST",
        url: "https://pro.rajaongkir.com/api/cost",
        headers:{
            "key": keys.rajaongkir.key, 
            "content-type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify({
            origin:keys.rajaongkir.originId,
            originType:'city',
            destination:results.cityID[0].city_id,
            destinationType:'city',
            courier:"jne:jnt",
            weight: 1000,
        })
    }).then(result=>{
        
        return res.json(result.data.rajaongkir);
    }).catch(err=>{
 
        if(err.response){
            let notification = {
                error: false,
                message: "ERROR FROM SHIPPING",
                notification: false
            }
            return res.status(400).json({ notification: notification });
        }
   
    })
               
    }else{
                let notification = {
                    error: true,
                    message: "Location is not available",
                    notification: true
                }
                let errors={
                    user:{}
                }
                errors.user.regency_id = 'Location is not available';
                return res.status(400).json({ user: errors.user,notification: notification });
    }
    });
  
 
  
    
}