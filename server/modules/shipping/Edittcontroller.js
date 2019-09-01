import db from '../../config/conn';
import keys from '../../config/keys';
import jwt from 'jsonwebtoken';
import qs from 'querystring';
import request from 'request';
import axios from 'axios';
import async from 'async';
export const checkCost =(req,res)=>{
    var options = {
        "method": "POST",
        "hostname": "api.rajaongkir.com",
        "port": null,
        "path": "/starter/cost",
        "headers": {
            "key": "mykey",
            "content-type": "application/x-www-form-urlencoded"
        }
    };
    async.parallel({
        provinceID:function(callback){
            axios.get("https://api.rajaongkir.com/pro/province", { headers: { "key": keys.rajaongkir.key, "content-type": "application/x-www-form-urlencoded" } })
            .then(result => {
                let province = req.body.province_id.label;
                let dataProvince = result.data.rajaongkir.results.filter((r, i) => r.province.toLowerCase() === province.toLowerCase());
                callback(null, dataProvince)
            }).catch(err => {
                console.log(err);
                // if(err){
                //     let notification = {
                //         error: false,
                //         message: "ADDRESS NOT FOUND",
                //         notification: false
                //     }
                //     callback(notification, null);
                // }
              
            });
        },
        cityID:function(callback){
            axios.get("https://api.rajaongkir.com/pro/city", { headers: { "key": keys.rajaongkir.key, "content-type": "application/x-www-form-urlencoded" } })
                .then(result => {
                    let data = req.body.regency_id.label;
                    let city = data.toLowerCase().replace(/(kota+\s|kabupaten+\s|kota|kabupaten)/g, "");
                    let type = data.toLowerCase().match(/(kota|kabupaten)/g).toString();

                    let dataCity = result.data.rajaongkir.results.filter((r, i) => (r.city_name.toLowerCase() === city) && (r.type.toLowerCase() === type)  );
                    callback(null, dataCity)
                }).catch(err => {
                    console.log(err);
                    // if (err) {
                    //     let notification = {
                    //         error: false,
                    //         message: "ADDRESS NOT FOUND",
                    //         notification: false
                    //     }
                    //     callback(notification, null);
                    // }
                });
        }
        // originCity:function(callback){
        //     axios.get("https://api.rajaongkir.com/starter/city", { headers: { "key": keys.rajaongkir.key, "content-type": "application/x-www-form-urlencoded" } })
        //         .then(result => {
        //             let data = 'kota bandung';
        //             let city = data.toLowerCase().replace(/(kota+\s|kabupaten+\s|kota|kabupaten)/g, "");
        //             let type = data.toLowerCase().match(/(kota|kabupaten)/g).toString();

        //             let originCity = result.data.rajaongkir.results.filter((r, i) => (r.city_name.toLowerCase() === city) && (r.type.toLowerCase() === type));
        //             callback(null, originCity)
        //         }).catch(err => {
        //             let notification = {
        //                 error: false,
        //                 message: "ADDRESS NOT FOUND",
        //                 notification: false
        //             }
        //             callback(notification, null);
        //         });
        // }
    },function(err,results){
        
            if (err) {
                return res.status(400).json(err);
            }
            else if(results.provinceID.length > 0 && results.cityID.length > 0 ){
         
                async.parallel({
                    jne:function(cb){
                        axios({
                            method: "POST",
                            url: "https://api.rajaongkir.com/pro/cost",
                            headers: {
                                "key": keys.rajaongkir.key,
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: qs.stringify({
                                origin: keys.rajaongkir.originId,
                                destination: results.cityID[0].city_id,
                                courier: "jne",
                                weight: 1000,
                            })
                        }).then(result => {
                            cb(null, result.data.rajaongkir.results)
                        }).catch(err => {
                            let notification = {
                                error: false,
                                message: "ERROR FROM SHIPPING",
                                notification: false
                       
                            }
                            if(err){
                                cb(err.response.data, null)
                            }
                        })  
                    },
                    tiki:function(cb){
                        axios({
                            method: "POST",
                            url: "https://api.rajaongkir.com/pro/cost",
                            headers: {
                                "key": keys.rajaongkir.key,
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: qs.stringify({
                                origin: keys.rajaongkir.originId,
                                destination: results.cityID[0].city_id,
                                courier: "tiki",
                                weight: 1000,
                            })
                        }).then(result => {
                            cb(null, result.data.rajaongkir.results)
                        }).catch(err => {
                            let notification = {
                                error: false,
                                message: "ERROR FROM SHIPPING",
                                notification: false

                            }
                            if (err) {
                                cb(err.response.data, null)
                            }
                        })  
                    },
                    pos:function(cb){
                        axios({
                            method: "POST",
                            url: "https://api.rajaongkir.com/pro/cost",
                            headers: {
                                "key": keys.rajaongkir.key,
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: qs.stringify({
                                origin: keys.rajaongkir.originId,
                                destination: results.cityID[0].city_id,
                                courier: "pos",
                                weight: 1000,
                            })
                        }).then(result => {
                            cb(null, result.data.rajaongkir.results)
                        }).catch(err => {
                            let notification = {
                                error: false,
                                message: "ERROR FROM SHIPPING",
                                notification: false
                            }
                            if (err) {
                                cb(err.response.data, null)
                            }
                        })  
                    }

                },function(error,hasil){
                        let notification = {
                            error: false,
                            message: "ERROR FROM SHIPPING",
                            notification: false

                        }
                        if (error) res.status(400).json(error);
                        if(hasil){
                            return res.status(200).json(hasil);
                        }
                })
    
    
    
    }else{
                let notification = {
                    error: true,
                    message: "Location is not available",
                    notification: true
                }
                return res.status(400).json({ notification: notification });
    }
    });
  
    // console.log(getProvinceId());
  
    //   return res.json(getProvinceId());
 
 

    // axios(options, qs.stringify({
    //     origin: '501',
    //     destination: '114',
    //     weight: 1700,
    //     courier: 'jne'
    // })).then(result=>{
    //     res.json(result);
    // })
  
  
    
}