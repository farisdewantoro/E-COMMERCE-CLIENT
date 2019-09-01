import db from '../../config/conn';
import async from 'async';



export const getAllLookbook = (req,res)=>{
    let querySelectLookbook = `SELECT lb.name,lb.slug,lb.id as lookbook_id,i.public_id,i.link,i.size 
from lookbooks as lb
left join lookbook_image as li on li.id = (SELECT li1.id from lookbook_image as li1 where lb.id = li1.lookbook_id order by li1.id asc limit 1)
left join images as i on i.id = (SELECT i1.id from images as i1 where li.image_id = i1.id order by i1.id asc limit 1)
group by lb.name,i.public_id,i.link
order by lb.created_at desc`;

    db.query(querySelectLookbook,(err,result)=>{
        if(err) return res.status(400).json(err);
        if(result.length > 0){
            return res.status(200).json(result);
        }
    })

}

export const getDetailLookbook = (req,res)=>{
    let slug = req.params.slug.replace(/[-].*/g, "");
    let id = req.params.slug.replace(/^(.*)(-)/g, "");
    if (typeof slug === "undefined" || typeof id === "undefined" || id === '' || slug === '' || id == null || slug == null){
        return res.status(400).json({errors:"IS EMPTY "})
    }
  

    let queryFindLookbook = `SELECT * from lookbooks where id = ${id}`;
    let queryFindLookbookImage = `
    SELECT li.id,i.public_id,i.link 
    from lookbook_image as li 
    left join images as i on li.image_id = i.id 
    where li.lookbook_id = ${id}
    order by li.created_at asc`;

    async.parallel({
        lookbook:function(callback){
            db.query(queryFindLookbook,(err,result)=>{
               callback(err,result);
            })
        },
        lookbook_image:function(callback){
            db.query(queryFindLookbookImage,(err,result)=>{
                callback(err,result);
            })
        }
    },function(err,result){
        if(err) return res.status(400).json(err);
        if(result){
            return res.status(200).json(result);
        }
    })

    


}