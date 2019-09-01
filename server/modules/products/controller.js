import db from '../../config/conn';
import { validationParamCategory } from './validation';
import async from 'async';
import qs from 'query-string';
export const getProductHiglight = (req, res) => {
  
    let orderByQuery = `order by ifnull(pd.discount_value,p.regular_price) asc`;
    let queryString;
    if (req.params.category === "newarrivals") {
        orderByQuery = `order by p.id desc`
    } 
    if (typeof req.params.category !== "undefined" && req.params.category !== "newarrivals") {
        queryString = `where c.slug = '${req.params.category}'`
    }

    let query = `select p.id,p.name,p.slug,p.description,p.regular_price,pc.product_id,
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
left join product_discount as pd on pd.id = 
(SELECT pd1.id from product_discount as pd1 where p.id = pd1.product_id and now() between pd1.valid_from and pd1.valid_until)
left join product_image as pi on pi.id = (SELECT pi1.id from product_image as pi1 where pi1.product_id = p.id order by pi1.product_id asc limit 1)
left join images as i on pi.image_id = i.id 
${(typeof queryString !== "undefined" && typeof queryParams == "undefined") ? queryString: ''} ${orderByQuery}
limit 8
`

    db.query(query, (err, results, fields) => {
        if (err)
            return res.status(400).json(err)

        return res
            .status(200)
            .json(results);
    })

}

function renderQueryBanner(table1,table2,table3,field1,field2,slug){
    return `
    SELECT
        i.public_id,i.link
        from ${table1} as cd
        left join ${table2} as cibd  on cd.id = cibd.${field1}
        left join ${table3} as i on cibd.${field2} = i.id
        where cd.slug = '${slug}'
    `
}

export const getProduct = (req, res) => {

    let offset = 0;
    let perPage = 16;

       let queryBannerDesktop,
         queryBannerMobile,
        queryBannerPromoDesktop,
        queryBannerPromoMobile;




    let queryParams;
    let params;
    let colorQuery = [];
    let priceQuery;
    let orderByQuery = `order by ifnull(pd.discount_value,p.regular_price) asc`;
    let querySearch;
    // if(req.query.)
    let queryString;
    let queryWhereSelect;
    
    let wrapperParams =[];
  

    if (typeof req.params.tag !== "undefined" && req.params.tag !== "newarrivals"){
        wrapperParams.push(` ctt.slug = '${req.params.tag}'`);
        queryBannerDesktop = renderQueryBanner(
            'category_tag',
            'category_image_banner_tag',
            'images',
            'category_tag_id',
            'image_id',
            req.params.tag
            );

        queryBannerMobile = renderQueryBanner(
            'category_tag',
            'category_image_banner_tag',
            'images_mobile',
            'category_tag_id',
            'image_mobile_id',
            req.params.tag);

        queryBannerPromoDesktop = renderQueryBanner(
            'category_tag',
            'category_image_promo_tag',
            'images',
            'category_tag_id',
            'image_id',
            req.params.tag);

        queryBannerPromoMobile = renderQueryBanner(
            'category_tag',
            'category_image_promo_tag',
            'images_mobile',
            'category_tag_id',
            'image_mobile_id',
            req.params.tag);
        
    }
    if(typeof req.params.category !== 'undefined'){
        wrapperParams.push(` c.slug = '${req.params.category}'`);
        queryBannerDesktop = renderQueryBanner(
            'categories',
            'category_image_banner',
            'images',
            'category_id',
            'image_id',
            req.params.category);

        queryBannerMobile = renderQueryBanner(
            'categories',
            'category_image_banner',
            'images_mobile',
            'category_id',
            'image_mobile_id',
            req.params.category);

        queryBannerPromoDesktop = renderQueryBanner(
            'categories',
            'category_image_promo',
            'images',
            'category_id',
            'image_id',
            req.params.category);

        queryBannerPromoMobile = renderQueryBanner(
            'categories',
            'category_image_promo',
            'images_mobile',
            'category_id',
            'image_mobile_id',
            req.params.category);
    }
    if(typeof req.params.type !== "undefined"){
        wrapperParams.push(` ct.slug = '${req.params.type}'`);
        queryBannerDesktop = renderQueryBanner(
            'category_type',
            'category_image_banner_type',
            'images',
            'category_type_id',
            'image_id',
            req.params.type);

        queryBannerMobile = renderQueryBanner(
            'category_type',
            'category_image_banner_type',
            'images_mobile',
            'category_type_id',
            'image_mobile_id',
            req.params.type);

        queryBannerPromoDesktop = renderQueryBanner(
            'category_type',
            'category_image_promo_type',
            'images',
            'category_type_id',
            'image_id',
            req.params.type);

        queryBannerPromoMobile = renderQueryBanner(
            'category_type',
            'category_image_promo_type',
            'images_mobile',
            'category_type_id',
            'image_mobile_id',
            req.params.type);
    }
    if (typeof req.params.collection !== "undefined" && typeof req.params.category === "undefined" ){
        wrapperParams.push(` col.slug = '${req.params.collection}'`);
    }
      
    
    if ((req.params.tag === "newarrivals" || !req.params.tag) && !req.params.collection) {
        orderByQuery = `order by p.id desc`;
        if (!req.params.tag){
            req.params.tag = 'all';
        }
       
        queryBannerDesktop = renderQueryBanner(
            'category_default', 
            'category_image_banner_default', 
            'images', 
            'category_default_id',
            'image_id',
            req.params.tag);

        queryBannerMobile = renderQueryBanner(
            'category_default', 
            'category_image_banner_default', 
            'images_mobile', 
            'category_default_id', 
            'image_mobile_id', 
            req.params.tag);

        queryBannerPromoDesktop = renderQueryBanner(
            'category_default',
            'category_image_promo_default',
            'images',
            'category_default_id',
            'image_id',
            req.params.tag);

        queryBannerPromoMobile = renderQueryBanner(
            'category_default',
            'category_image_promo_default',
            'images_mobile',
            'category_default_id',
            'image_mobile_id',
            req.params.tag);
  

    } 

    if (wrapperParams.length > 0){
        queryWhereSelect = wrapperParams.toString().replace(/[,]/g, ' and ');
    }
    
   

    if (Object.keys(req.query).length > 0) {

        // console.log(qs.parse(req.query.filter));
        // return res.status(200).json(qs.parse(req.query.filter))
        params = qs.parse(req.query.filter);
        
        if(typeof params.page !== "undefined" && params.page > 0){
            offset = (params.page-1) * perPage;
           
        }

        let reqParams;
        if (params.search !== '' && typeof params.search !== "undefined") {
            reqParams = params
                .search
                .toLowerCase()
                .replace(/\s+/g, '');

                      querySearch = `
        p.slug like '%${reqParams}%' 
        or c.slug like '%${reqParams}%'
        or p.name like '%${reqParams}%'
        or pv.original_color like '%${reqParams}%'
        or ct.slug like '%${reqParams}%'
        or ctt.slug like '%${reqParams}%'    
        `
        //     querySearch = `p.slug like '%${reqParams}%' 
        // or c.slug like '%${reqParams}%'
        // or p.name like '%${reqParams}%'
        // or pv.original_color like '%${reqParams}%'
        // or pv.type like '%${reqParams}%'
        // `
            queryString = ` ${querySearch}`
        }
        if (typeof params.color !== "undefined" && params.color instanceof Array && params.color.length > 0) {
            params
                .color
                .forEach((c, i) => {
                    colorQuery.push(`pv.hex_color = '${c}' `)
                });
            colorQuery = colorQuery
                .toString()
                .replace(/[,]/g, " or ");
          
        }
        if(typeof params.color !== "undefined" && typeof params.color === "string"){
            colorQuery.push(`pv.hex_color = '${params.color}' `)
            colorQuery = colorQuery
                .toString()
                .replace(/[,]/g, " or ");
        }
     
        
        if (typeof params.orderBy !== "undefined") {
            switch (params.orderBy) {
                case "newest-product":
                    orderByQuery = `order by p.id desc`
                    break;
                case "oldest-product":
                    orderByQuery = `order by p.id asc`
                    break;
                case "highest-price":
                    orderByQuery = `order by ifnull(pd.discount_value,p.regular_price) desc`
                    break;
                case "lowest-price":
                    orderByQuery = `order by ifnull(pd.discount_value,p.regular_price) asc`
                    break;
                default:
                    return
            }
        }

        if (typeof params.price !== "undefined") {
            switch (params.price) {
                case "under200k":
                    priceQuery = `IF (pd.discount_value,pd.discount_value,p.regular_price) <= 200000`
                    break;
                case "idr100k-300k":
                    priceQuery = `ifnull(pd.discount_value,p.regular_price) between 100000 and 300000`
                    break;
                case "idr300k-500k":
                    priceQuery = `ifnull(pd.discount_value,p.regular_price) between 300000 and 500000`
                    break;
                case "above500k":
                    priceQuery = `ifnull(pd.discount_value,p.regular_price) >= 500000`
                    break;
                default:
                    return
            }
       
        }

        if (typeof colorQuery === "undefined" || colorQuery.length === 0 && typeof priceQuery !== "undefined") {
            queryParams = `where  ${priceQuery} `;
        }
        if (typeof colorQuery !== "undefined" && colorQuery.length > 0 && typeof priceQuery === "undefined") {
            queryParams = `where  ${colorQuery.length > 1 ? `(${colorQuery})` : colorQuery} `;
        }
        if (typeof colorQuery !== "undefined" && colorQuery.length > 0 && typeof priceQuery !== "undefined") {
            queryParams = `where  ${colorQuery.length > 1 ? `(${colorQuery})` : colorQuery}  and ${priceQuery} `;
        }
     

    }
 

    let query = `select p.id,p.name,p.slug,p.description,p.regular_price,pc.product_id,
c.slug as category_slug,
IF(sum(pa.stock) > 0,'true','false') as availability,
pv.hex_color,pv.original_color,
pd.discount_percentage,pd.discount_value,
ct.name as category_type,
ct.slug as category_type_slug,
i.public_id,i.link,
ctt.name as category_tag,
ctt.slug as category_tag_slug,
col.id as collection_id,
col.slug as collection_slug,
col.name as collection_name
from products as p 
left join product_category as pc on p.id = pc.product_id 
left join categories as c on pc.category_id = c.id 
left join category_attribute as ca on c.id = ca.category_id 
left join category_tag as ctt on ca.category_tag_id = ctt.id
left join product_variant as pv on p.id = pv.product_id
left join category_type as ct on pv.category_type_id = ct.id
left join product_discount as pd on pd.id = 
(SELECT pd1.id from product_discount as pd1 where p.id = pd1.product_id and now() between pd1.valid_from and pd1.valid_until)
left join product_image as pi on pi.id = (SELECT pi1.id from product_image as pi1 where pi1.product_id = p.id order by pi1.product_id asc limit 1)
left join images as i on pi.image_id = i.id 
left join product_attribute as pa on p.id = pa.product_id
left join product_collection as pco on p.id = pco.product_id
left join collections as col on pco.collection_id = col.id
${typeof queryParams !== "undefined" ? queryParams
            : ''} 
${(typeof queryString !== "undefined" && typeof queryParams !== "undefined"  )
                ? `and (${queryString})`
                : ''} 
${(typeof queryString !== "undefined"  && typeof queryParams == "undefined")
            ? `where ${queryString}`
            : ''} 

${(typeof queryString == "undefined" && typeof queryWhereSelect !== "undefined" && typeof queryParams == "undefined" )
        ? `where ${queryWhereSelect}` : '' }
${(typeof queryString == "undefined" && typeof queryWhereSelect !== "undefined" && typeof queryParams !== "undefined")
            ? `and ${queryWhereSelect}` : '' }
group by p.id
    ${orderByQuery}

limit ${perPage} offset ${offset}  
`;

    let queryCountTotal = `select count(*) as totalPage
from products as p 
left join product_category as pc on p.id = pc.product_id 
left join categories as c on pc.category_id = c.id 
left join category_attribute as ca on c.id = ca.category_id 
left join category_tag as ctt on ca.category_tag_id = ctt.id
left join product_variant as pv on p.id = pv.product_id
left join category_type as ct on pv.category_type_id = ct.id
left join product_discount as pd on pd.id = 
(SELECT pd1.id from product_discount as pd1 where p.id = pd1.product_id and now() between pd1.valid_from and pd1.valid_until)
left join product_image as pi on pi.id = (SELECT pi1.id from product_image as pi1 where pi1.product_id = p.id order by pi1.product_id asc limit 1)
left join images as i on pi.image_id = i.id 
left join product_collection as pco on p.id = pco.product_id
left join collections as col on pco.collection_id = col.id
${typeof queryParams !== "undefined" ? queryParams
            : ''} 
${(typeof queryString !== "undefined" && typeof queryParams !== "undefined")
            ? `and (${queryString})`
            : ''} 
${(typeof queryString !== "undefined"  && typeof queryParams == "undefined")
            ? `where ${queryString}`
            : ''} 

${(typeof queryString == "undefined" && typeof queryWhereSelect !== "undefined" && typeof queryParams == "undefined")
            ? `where ${queryWhereSelect}` : ''}
${(typeof queryString == "undefined" && typeof queryWhereSelect !== "undefined" && typeof queryParams !== "undefined")
            ? `and ${queryWhereSelect}` : ''}
    ${orderByQuery}
`;

const queryCollection = `SELECT 
co.name,
co.slug,
co.id,
i.public_id,i.link
from collections as co
left join collection_image as coi on co.id = coi.collection_id
left join images as i on coi.image_id = i.id 
where co.slug = '${req.params.collection}'`;

const queryCollectionMobile = `SELECT 
co.name,
co.slug,
co.id,
i.public_id,i.link
from collections as co
left join collection_image_mobile as coi on co.id = coi.collection_id
left join images_mobile as i on coi.image_mobile_id = i.id 
where co.slug = '${req.params.collection}'`;
 
    async.parallel({
        
        product:function(callback){
            db.query(query, (err, result) => {
             
                callback(err,result);
            })
        },
        banner_desktop:function(callback){
            if (queryBannerDesktop){
                db.query(queryBannerDesktop,(err,result)=>{
              
                    callback(err,result);
                })
            }else{
                callback(null,[]);
            }
        },
        banner_mobile:function(callback){
            if (queryBannerMobile) {
                db.query(queryBannerMobile, (err, result) => {
                    callback(err, result);
                })
            } else {
                callback(null, []);
            }
        },
        banner_promo_desktop:function(callback){
            if (queryBannerPromoDesktop) {
                db.query(queryBannerPromoDesktop, (err, result) => {
                    callback(err, result);
                })
            } else {
                callback(null, []);
            }
        },
        banner_promo_mobile: function (callback) {
            if (queryBannerPromoMobile) {
                db.query(queryBannerPromoMobile, (err, result) => {
                    callback(err, result);
                })
            } else {
                callback(null, []);
            }
        },
        pagination:function(callback){
            db.query(queryCountTotal,(err,result)=>{
            
                if(err){
                    callback(err, null); 
                }
                if(result.length > 0){
                    let total_page = Math.ceil(result[0].totalPage / perPage);
                    let current_page = result[0].totalPage / perPage;
                    let data = {
                        total_page: total_page,
                        current_page: (offset/perPage)+1,
                        perPage: perPage,
                        results: result[0].totalPage
                    }
                    callback(err, data);
                }
                if(result.length === 0){
                    let data = {
                        total_page: 0,
                        current_page: offset + 1,
                        perPage: perPage,
                        results: 0
                    }
                    callback(err, data); 
                }
               
            })
        },
        collection:function(callback){
            if(typeof req.params.collection !== "undefined"){
                db.query(queryCollection, (err, result) => {
                    
                    callback(err, result);
                })
                
            }
            if (typeof req.params.collection === "undefined"){
                callback(null,null)
            }
          
        },
        collection_mobile:function(callback){
            if (typeof req.params.collection !== "undefined") {
                db.query(queryCollectionMobile, (err, result) => {

                    callback(err, result);
                })

            }
            if (typeof req.params.collection === "undefined") {
                callback(null, null)
            }
           
        }
    },function(err,result){
         
            if (err) {
                let notification = {
                    error: true,
                    message: "There is an error !",
                    notification: true
                }
                return res.status(400).json(err);
           
            }
            if (result) {
                return res.status(200).json(result);
            }  
    })


}



export const getProductDetail = (req, res) => {
    let wrapperParams = [];

    if (typeof req.params.tag !== "undefined" && req.params.tag !== "newarrivals") {
        wrapperParams.push(` ctt.slug = '${req.params.tag}'`);
    }
    if (typeof req.params.category !== 'undefined') {
        wrapperParams.push(` c.slug = '${req.params.category}'`);
    }
    if (typeof req.params.type !== "undefined") {
        wrapperParams.push(` ct.slug = '${req.params.type}'`);
    }
    if (typeof req.params.collection !== "undefined" && typeof req.params.category === "undefined") {
        wrapperParams.push(` col.slug = '${req.params.collection}'`);
    }
    wrapperParams= wrapperParams.toString().replace(/[,]/g, ' and ');
  
let queryImage = `Select i.link,i.public_id
             from images as i 
             left join product_image as pi on i.id = pi.image_id 
             left join products as p on pi.product_id = p.id
             left join product_variant as pv on p.id = pv.product_id
             where pi.product_id = ${req.params.id} and p.slug = '${req.params.slug}' and pi.product_variant_id= pv.id;`;

let querySize = `select pa.id,pa.size,pa.stock from product_attribute as pa 
left join product_variant as pv on pa.product_id = pv.product_id 
where pa.product_id =${req.params.id};`;

let queryRelatedVariant = `select p.id as product_id,p.slug,
c.slug as category_slug,pv.id as product_variant_id,pc.id as category_id,i.link,i.public_id
from products as p 
left join product_category as pc on p.id = pc.product_id 
left join categories as c on pc.category_id = c.id 
left join product_variant as pv on p.id = pv.product_id
left join product_image as pi on pi.id = (SELECT pi1.id from product_image as pi1 where pi1.product_variant_id = pv.id order by pi1.id asc limit 1)
 left join images as i on pi.image_id = i.id 
 where ${wrapperParams} and p.slug = '${req.params.slug}';`;

    let queryRelatedProductType = `select p.id as product_id,p.slug,p.name,p.regular_price,pd.discount_percentage,pd.discount_value,
c.slug as category_slug,i.link,i.public_id,
ct.name as category_type,ct.slug as category_type_slug
from products as p 
left join product_category as pc on p.id = pc.product_id 
left join categories as c on pc.category_id = c.id 
left join product_variant as pv on p.id = pv.product_id
left join category_type as ct on pv.category_type_id = ct.id
left join product_discount as pd on pd.id = 
(SELECT pd1.id from product_discount as pd1 where p.id = pd1.product_id and now() between pd1.valid_from and pd1.valid_until)
left join product_image as pi on pi.id = (SELECT pi1.id from product_image as pi1 where pi1.product_variant_id = pv.id order by pi1.id asc limit 1)
 left join images as i on pi.image_id = i.id 
 where c.slug = '${req.params.category}' order by p.slug = '${req.params.slug}' AND pv.category_type_id like (SELECT pv1.category_type_id from product_variant as pv1 where pv1.product_id = ${req.params.id}) desc limit 4;`

  let query = `select p.id as product_id,p.name,p.slug,p.description,p.regular_price,pc.product_id,
c.slug as category_slug,
pv.hex_color,pv.original_color,pv.id as product_variant_id,
ct.name as category_type,ct.slug as category_type_slug,
IF(sum(pa.stock) > 0,'true','false') as availability,
pd.discount_percentage,pd.discount_value
from products as p 
left join product_category as pc on p.id = pc.product_id 
left join categories as c on pc.category_id = c.id 
left join product_variant as pv on p.id = pv.product_id
left join category_type as ct on pv.category_type_id = ct.id
left join product_attribute as pa on p.id = pa.product_id
left join product_discount as pd on pd.id = 
(SELECT pd1.id from product_discount as pd1 where p.id = pd1.product_id and now() between pd1.valid_from and pd1.valid_until)
 where c.slug = '${req.params.category}' and p.id = ${req.params.id} and p.slug = '${req.params.slug}' 
group by p.name,p.slug,p.description,p.regular_price,pc.product_id,
category_slug,category_type,category_type_slug,
pv.hex_color,pv.original_color,
pd.discount_percentage,pd.discount_value;
`;

let querySelectProductSize = `SELECT 
s.name,s.description,
i.link,i.public_id
from product_size as ps 
left join sizing as s on ps.sizing_id = s.id 
left join images as i on s.image_id = i.id 
where ps.product_id =${req.params.id} `;
    async.parallel({
        dataProduct: function (callback) {
            db.query(query,(err,result)=>{
                callback(err,result);
            })
         },
        dataImage:function(callback){
            db.query(queryImage,(err,result)=>{
                callback(err,result);
            })
        },
        dataSize:function(callback){
            db.query(querySize,(err,result)=>{
                callback(err,result);
            })
        },
        dataRelatedVariant:function(callback){
            db.query(queryRelatedVariant,(err,result)=>{
                callback(err,result);
            })
        },
        dataRelatedProductType:function(callback){
            db.query(queryRelatedProductType,(err,result)=>{
                callback(err,result);
            })
        },
        dataProductSizing:function(callback){
            db.query(querySelectProductSize,(err,result)=>{
                callback(err, result);
            })
        }
    },function(err,result){
            if (err) {
                let notification = {
                    error: true,
                    message: "There is an error !",
                    notification: true
                }
                return res.status(400).json({ notification: notification });
            }
            if(result){
                return res.status(200).json(result);
            } else {
                let notification = {
                    error: true,
                    message: "There is an error !",
                    notification: true
                }
                return res.status(400).json({ notification: notification });
            }
    })
   

}