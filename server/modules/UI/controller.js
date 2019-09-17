import db from '../../config/conn';
import async from 'async';


export const getContentHome = (req,res)=>{
    let querySelectSlider = `SELECT 
    si.id,i.public_id,i.link,
    si.link as redirect
    from slider_image as si
    left join images as i on si.image_id = i.id`;

   let querySelectCategories = `SELECT 
   c.name as category,
   c.slug as category_slug,
   ctt.name as category_tag
   from categories as c
   left join category_attribute as ca on c.id = ca.category_id
   left join category_tag as ctt on ca.category_tag_id = ctt.id`;
   let querySelectCategoryTag = `SELECT 
   ctt.name as category_tag, ctt.slug as category_tag_slug
   from category_tag as ctt order by ctt.created_at asc`;
   let querySelectCategoryType = `SELECT
   ct.name as category_type,
   ct.slug as category_type_slug,
   c.name as category
   from category_type as ct
   left join categories as c on ct.category_id = c.id`;
   let querySelectCollection = `SELECT
   c.name,
   c.slug,
   c.id as collection_id,
   i.public_id,i.link,
   i.id as image_id
   from collections as c 
   left join collection_image as ci on ci.id = (SELECT ci1.id from collection_image as ci1 where ci1.collection_id = c.id order by ci1.id asc limit 1)
   left join images as i on ci.image_id = i.id 
   order by c.created_at desc `;

   let querySelectColor = `select distinct original_color,hex_color from product_variant `;
    let querySelectSliderMobile =`
        SELECT 
    si.id,i.public_id,i.link,
    si.link as redirect
    from slider_image_mobile as si
    left join images_mobile as i on si.image_mobile_id = i.id
    `;
    const querySelectNewArrivals = `
      select p.id,p.name,p.slug,p.description,p.regular_price,pc.product_id,
      IF(sum(pa.stock) > 0,'true','false') as availability,
c.slug as category_slug,
ct.name as category_type,
ct.slug as category_type_slug,
pv.hex_color,pv.original_color,
pd.discount_percentage,pd.discount_value,
i.public_id,i.link
from products as p 
left join product_category as pc on p.id = pc.product_id 
left join categories as c on pc.category_id = c.id 
left join product_variant as pv on p.id = pv.product_id
left join category_type as ct on pv.category_type_id = ct.id
left join product_attribute as pa on p.id = pa.product_id
left join product_discount as pd on pd.id = 
(SELECT pd1.id from product_discount as pd1 where p.id = pd1.product_id and now() between pd1.valid_from and pd1.valid_until)
left join product_image as pi on pi.id = (SELECT pi1.id from product_image as pi1 where pi1.product_id = p.id order by pi1.product_id asc limit 1)
left join images as i on pi.image_id = i.id 
group by p.id,p.name,p.slug,p.description,p.regular_price,pc.product_id,
category_slug,
category_type,
category_type_slug,
pv.hex_color,pv.original_color,
pd.discount_percentage,pd.discount_value,
i.public_id,i.link
order by p.created_at desc limit 8

    `;

    const querySelectProductRecommend = `
select p.id,p.name,p.slug,p.description,p.regular_price,pc.product_id,
IF(sum(pa.stock) > 0,'true','false') as availability,
c.slug as category_slug,
ct.name as category_type,
ct.slug as category_type_slug,
pv.hex_color,pv.original_color,
pd.discount_percentage,pd.discount_value,
i.public_id,i.link
from product_recommendation as pr
left join products as p on pr.product_id = p.id 
left join product_category as pc on p.id = pc.product_id 
left join categories as c on pc.category_id = c.id 
left join product_variant as pv on p.id = pv.product_id
left join category_type as ct on pv.category_type_id = ct.id
left join product_attribute as pa on p.id = pa.product_id
left join product_discount as pd on pd.id = 
(SELECT pd1.id from product_discount as pd1 where p.id = pd1.product_id and now() between pd1.valid_from and pd1.valid_until)
left join product_image as pi on pi.id = (SELECT pi1.id from product_image as pi1 where pi1.product_id = p.id order by pi1.product_id asc limit 1)
left join images as i on pi.image_id = i.id 
group by p.id,p.name,p.slug,p.description,p.regular_price,pc.product_id,category_slug,
category_type,
category_type_slug,
pv.hex_color,pv.original_color,
pd.discount_percentage,pd.discount_value,
i.public_id,i.link
order by p.created_at desc limit 8`
async.parallel({
    slider:function(callback){
        db.query(querySelectSlider,(err,result)=>{
            callback(err,result);
        })
    },
    slider_mobile:function(callback){
        db.query(querySelectSliderMobile,(err,result)=>{
            callback(err, result);
        })
    },  
    category:function(callback){
        db.query(querySelectCategories,(err,result)=>{
            callback(err,result)
        })
    },
    category_tag:function(callback){
        db.query(querySelectCategoryTag,(err,result)=>{
            callback(err,result)
        })
    },
    category_type: function (callback) {
        db.query(querySelectCategoryType, (err, result) => {
            callback(err, result)
        })
    },
    collection:function(callback){
        db.query(querySelectCollection,(err,result)=>{
            callback(err,result);
        })
    },
    product_color:function(callback){
        db.query(querySelectColor,(err,result)=>{
            callback(err,result);
        })
    },
    newarrivals:function(callback){
        db.query(querySelectNewArrivals, (err, result) => {
            callback(err, result);
        })
    },
    product_recommendation:function(callback){
        db.query(querySelectProductRecommend,(err,result)=>{
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
