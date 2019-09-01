import db from '../../config/conn';
import keys from '../../config/keys';
import jwt from 'jsonwebtoken';
import async from 'async';
export const findOptionAddress =(req,res)=>{
    let queryGetAllProvinces = `SELECT * FROM provinces`;
    let queryFindRegency = `SELECT * from regencies where province_id = ? `;
    let queryFindDistricts = `SELECT * from districts where regency_id = ? `;
    let queryfindVillages = `SELECT * from villages where district_id = ? `;
    if(req.body){
        let data = req.body;
        async.parallel({
            province:function(callback){
                db.query(queryGetAllProvinces, (err, result) => {
                    callback(err,result);
                })
            },
            regency: function (callback){
                if (data.province_id){
                    db.query(queryFindRegency, [data.province_id], (err, result) => {
                        callback(err, result);
                    })
                }else{
                    callback(null,[])
                }
           
            },
            district:function(callback){
                if (data.regency_id) {
                    db.query(queryFindDistricts, [data.regency_id], (err, result) => {
                        callback(err, result);
                    })
                } else {
                    callback(null, [])
                }

            },
            village:function(callback){
                if (data.district_id) {
                    db.query(queryfindVillages, [data.district_id], (err, result) => {
                        callback(err, result);
                    })
                } else {
                    callback(null, [])
                }
            }
        },function(err,result){
            if(err){
                return res.status(400).json('CANT FIND ADDRESS');
            }
            if(result){
                return res.status(200).json(result);
            }
        })
    }else{
        return res.status(400).json('CANT FIND ADDRESS');
    }
}

export const getProvinces =(req,res)=>{
    let queryGetAllProvinces = `SELECT * FROM provinces`;
    db.query(queryGetAllProvinces,(err,result)=>{
        if(err)return res.status(400).json(err);
        if(result.length > 0){
            return res.status(200).json(result);
        }
    })
}

export const findCity =(req,res)=>{
    let queryFindRegency = `SELECT * from regencies where province_id = '${req.body.value}' `;
    db.query(queryFindRegency,(err,result)=>{
        if(err)return res.status(400).json(err);
        if(result.length > 0){
            return res.status(200).json(result);
        }
    })
}
export const findDistricts = (req, res) => {
    let queryFindDistricts = `SELECT * from districts where regency_id = '${req.body.value}' `;
    db.query(queryFindDistricts, (err, result) => {
        if (err) return res.status(400).json(err);
        if (result.length > 0) {
            return res.status(200).json(result);
        }
    })
}
export const findVillages = (req, res) => {
    let queryfindVillages = `SELECT * from villages where district_id = '${req.body.value}' `;
    db.query(queryfindVillages, (err, result) => {
        if (err) return res.status(400).json(err);
        if (result.length > 0) {
            return res.status(200).json(result);
        }
    })
}
