import db from '../../config/conn';
import {validationCreateCategory} from './validation';
import async from 'async';
export const getAllCategory = (req,res)=>{
    let querySelectCategory = `SELECT c.name,c.slug,ca.category_tag_id from categories as c 
    left join category_attribute as ca on c.id = ca.category_id 
    left join category_tag as ct on ca.category_tag_id = c.id`;
    let querySelectCategoryTag = `SELECT ct.name,ct.slug from category_tag`;
    async.parallel({
        category:function(callback){
            db.query(querySelectCategory, (err, result) => {
                callback(err,result);
            })
        },
        category_tag:function(callback){
            db.query(querySelectCategoryTag, (err, result) => {
                callback(err, result);
            })
        }
    },function(err,result){
        if(err) return res.status(400).json(err);
        if(result){
            return res.status(200).json(result);
        }
    })
  

}

