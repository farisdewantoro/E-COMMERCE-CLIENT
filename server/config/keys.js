// add this file to .gitignore
import dev from './keys-dev';
import production from './keys-production';

let keys = dev;
// if(process.env.NODE_ENV !== "production"){
//     keys = dev;
// }
// if (process.env.NODE_ENV == "production") {
//     keys = production;
// }


export default keys;

// {
//     google:{
//         clientID:"888048154617-0ut79s41qi0lhgjimqs53v6sbgg05u3f.apps.googleusercontent.com",
//         clientSecret:'b-VcMFhXkPjVaIjz-DGQ74Fg'
//     },
//     facebook:{
//         clientID: "2353590754664028",
//         clientSecret:"fc2d9afea09585c7cd6ea75db8d8a378"
//     },
//     session:{
//         cookieKey:"iCtkGVe0-15asd12315sax-xJkLm2K2220XlkD",
//         name:"hammerstout_s",
//         secret:"iCtkGVe0-4FKIGgBopL2QUM9K-jIK9miZhQExxxx2xuxxxx",
//         maxAge: 24 * 60 * 60 * 1000
//     },
//     jwt:{
//         secretOrPrivateKey:"AAAABB3L-X59kbcuqwzxc--23kv,df594.41239zsc92231",
//         secretOrPrivateKey2: "2DCtkGVe-jifmqs53v6sbgg05u3fkbcDuDxDDqwzD2xc--23kv,df594.0ut79s41qi0lhg",
//         secretOrPrivateKey3: "X59kbcuqwzxc-VcMFhXkPjVaIjz--23kv,df594.df594xxx",
//         expiresIn:'2d' 
//     },
//     origin:{
//         url:"http://localhost:3000",
//         redirectLogin:"http://localhost:3000/sign-in",
//         redirect:"http://localhost:3000/carts",
//         redictProfile:"http://localhost:3000/my-account"
//     },
//     rajaongkir:{
//         key:"3f4cc0fa24db6da8c472a8476ee4ebec",
//         originId: 23,
//         name: "bandung"
//     },
//     rajasms:{
//         key:"733971d3cc7be00606f19397327c2839",
//         username:"farisdewantoro"
//     },
//     midtrans:{
//         url:"https://api.sandbox.midtrans.com",
//         id:"G592798515",
//         clientKey:"SB-Mid-client-HrVL5cJ4IYBDkfhy",
//         serverKey:"SB-Mid-server-pLVZ9unirbj5FOCqTf9qIBM4"
//     },
//     instagram:{
//         access_token:'4349263588.1677ed0.2961079b3f7e4edea6130da9e50dd3fd',
//         clientID:'02fb6221724249ef9df4af191679b6f9',
//         clientSecret:'ef08d2d4b38a47939d6ebd7167ba49e6'
//     },
//     database: {
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'hammerst_hammer'
//     }
// };