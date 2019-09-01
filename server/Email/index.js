import nodemailer from 'nodemailer';
import EmailTemplate from 'email-templates';
import path from 'path';

let auth = {
    user: `order@hammerstoutdenim.com`, // generated ethereal user
    pass: `hammerstout26` // generated ethereal password
}

const transporter = nodemailer.createTransport({
        host: "hammerstoutdenim.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: auth.user, // generated ethereal user
            pass: auth.pass // generated ethereal password
        }
    });




 const  sendEmail = (obj) =>{
 return transporter.sendMail(obj);

}

const loadTemplate = (templateName,contexts)=>{
    let email = new EmailTemplate({
        views: {
            root:path.join(__dirname, 'templates'),
        },
        message: {
            from: '"HAMMERSTOUTDENIM" <order@hammerstoutdenim.com>'
        },
    
    });
    return Promise.all(contexts.map((c)=>{
     return new Promise((resv,rej)=>{
         email.renderAll(templateName,c)
             .then(res => {
                 resv({
                     email:res,
                     context:c
                 });
             })
        })
    }));
}


export default {
    loadTemplate,
    auth,
    sendEmail
}

// loadTemplate('welcome',users).then(res=>{
//     if(res){
//     let info = res.map((res2) => {
//        return sendEmail({
//             to: res2.context.email,
//             from: '"Hammer" <farisdewantoro@hammerstoutdenim.com>',
//             subject: res2.email.subject,
//             html: res2.email.html
//         });
//     });
//     return Promise.all(info).then((res)=>{
//         console.log(res);
//     }).catch((err)=>{
//         console.log(err);
//     })

//     }
// });





