import db from '../../config/conn';
import async from 'async';

export const getAllCollection = (req,res)=>{
    let querySelectCollection = `
    SELECT cs.name,cs.slug,cs.id as collection_id,i.public_id,i.link,i.size 
from collections as cs
left join collection_image as ci on ci.id = (SELECT ci1.id from collection_image as ci1 where cs.id = ci1.collection_id order by ci1.id asc limit 1)
left join images as i on i.id = (SELECT i1.id from images as i1 where ci.image_id = i1.id order by i1.id asc limit 1)
group by cs.name,cs.slug,cs.id,i.public_id,i.link,i.size;`;

    let querySelectCollectionMobile = `
    SELECT cs.name,cs.slug,cs.id as collection_id,i.public_id,i.link,i.size 
from collections as cs
left join collection_image_mobile as ci on ci.id = (SELECT ci1.id from collection_image_mobile as ci1 where cs.id = ci1.collection_id order by ci1.id asc limit 1)
left join images_mobile as i on i.id = (SELECT i1.id from images_mobile as i1 where ci.image_mobile_id = i1.id order by i1.id asc limit 1)
group by cs.name,cs.slug,cs.id,i.public_id,i.link,i.size;`;
async.parallel({
    collection:function(cb){
        db.query(querySelectCollection, (err, result) => {
            cb(err, result);

        })
    },
    collection_mobile:function(cb){
        db.query(querySelectCollectionMobile,(err,result)=>{
            cb(err,result);
        })
    }
},function(err,result){
        if (err) return res.status(400).json(err)
        if (result.collection.length > 0 || result.collection_image.length > 0) {
            return res.status(200).json(result);
        }
 
        else {
            return res.status(400).json({ error: "isEmpty" });
        }
})

}