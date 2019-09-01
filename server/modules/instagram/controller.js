import axios from 'axios';
import keys from '../../config/keys';
import fs from 'fs';
import path from 'path';
import request from 'request';
export const getMediaRecent = (req,res)=>{
    axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${keys.instagram.access_token}`)
        .then(result=>{
            let imageInstagram = result.data.data.filter((d,i)=> i < 8).map(r=>{
                return{
                    images:r.images,
                    caption:r.caption,
                    link:r.link
                }
                  
                
            });
            return res.status(200).json(imageInstagram);
        })
        .catch(err=>{

            return res.status(400).json(err.response.data);
        });

}

export const refreshToken = (req,res)=>{

    if(req.query.code){
        let dataBody ={
            client_id:keys.instagram.clientID,
            client_secret: keys.instagram.clientSecret,
            grant_type:"authorization_code",
            redirect_uri:keys.instagram.redirect,
            code:req.query.code
        };
        request.post({ url: 'https://api.instagram.com/oauth/access_token', form: dataBody }, function (err, httpResponse, body){
           if(httpResponse){
               let result = httpResponse.toJSON().body;
           
               result = JSON.parse(result);
               if (!result.access_token) {
                   return res.status(400).json('FAILED !');
               }
             
       let instagram = {
           access_token: result.access_token
        };
        instagram = JSON.stringify(instagram);
        fs.writeFile(path.resolve(__dirname,'../../config/instagram.json'),instagram,'utf8',function(err){
            if(err){
                return res.status(400).json('FAILED !');
            }
        });
        return res.status(200).json('INSTAGRAM NOW IS ACTIVED');
           }else{
               return res.status(400).json('FAILED !');
           }
        })
        // axios.post('https://api.instagram.com/oauth/access_token', dataBody,{
        //     headers:{
        //         'Content-Type':'application/x-www-form-urlencoded'
        //     }
        // })
        //     .then(result=>{
        //         console.log(result);
        //         if(result.data){
        //             console.log(result.data);
        //         }
        //     })
        //     .catch(err=>{
        //         console.log(err.config.headers);
        //         console.log(err.response.data)
        //     })
        // let instagram = {
        //     access_token: req.query.code
        // };
        // instagram = JSON.stringify(instagram);
        // fs.writeFileSync(path.resolve(__dirname,'../../config/instagram.json'),instagram,'utf8');
        // return res.status(200).json('INSTAGRAM NOW IS ACTIVED');
    }
}