import db from '../../config/conn';

export const getAll = (req,res)=>{
    const querySelectSizing = `SELECT 
    s.name,
    s.id,
    s.description,
    s.image_id,
    i.public_id,i.link
    from sizing as s 
    left join images as i on s.image_id = i.id
    order by id desc`;
    
    db.query(querySelectSizing,(err,result)=>{
        if (err) return res.status(400).json('THERE IS AN ERROR');
        if (result.length > 0) {
            return res.status(200).json(result);
        }
        if(result.length === 0){
            return res.status(400).json('NO DATA');
        }
    })
}