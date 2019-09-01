// add this file to .gitignore
import instagramKey from './instagram.json';
export default  {
    google:{
        clientID: "888048154617-0hauahb913ftvmocigbbgdg5t104rut3.apps.googleusercontent.com",
        clientSecret: 'Jy8fOcnNSu9OdA5FqWfTVFKc'
    },
    facebook:{
        clientID: "2353590754664028",
        clientSecret:"fc2d9afea09585c7cd6ea75db8d8a378"
    },
    session:{
        cookieKey:"iCtkGVe0-15asd12315sax-xJkLm2K2220XlkD",
        name:"hammerstout_s",
        secret:"iCtkGVe0-4FKIGgBopL2QUM9K-jIK9miZhQExxxx2xuxxxx",
        maxAge: 24 * 60 * 60 * 1000
    },
    jwt:{
        secretOrPrivateKey:"AAAABB3L-X59kbcuqwzxc--23kv,df594.41239zsc92231",
        secretOrPrivateKey2: "2DCtkGVe-jifmqs53v6sbgg05u3fkbcDuDxDDqwzD2xc--23kv,df594.0ut79s41qi0lhg",
        secretOrPrivateKey3: "X59kbcuqwzxc-VcMFhXkPjVaIjz--23kv,df594.df594xxx",
        expiresIn:'2d' 
    },
    origin:{
        url:"http://localhost:3000",
        redirectProvider:"http://localhost:5000", //DEV
        // redirectProvider: "http://localhost:3000", //PROD LOCAL
        redirectLogin:"http://localhost:3000/sign-in",
        redirect:"http://localhost:3000/carts",
        redictProfile:"http://localhost:3000/my-account",
        confirmPay:"https://hammerstoutdenim.com/confirm-payment"
    },
    rajaongkir:{
        key:"850129b7327c8206f3875333eb281f0e",
        originId: 23,
        name: "bandung",
    },
    rajasms:{
        key:"457f38ca6a3265ff7ee62df327d70854",
        username:"hammerstoutdenim"
    },
    midtrans:{
        url:"https://api.sandbox.midtrans.com",
        id:"G592798515",
        clientKey:"SB-Mid-client-HrVL5cJ4IYBDkfhy",
        serverKey:"SB-Mid-server-pLVZ9unirbj5FOCqTf9qIBM4",
        isProduction:false
        // url: "https://api.midtrans.com",
        // id: "G592798515",
        // clientKey: "Mid-client-Wn88s0ecuXz5VQoE",
        // serverKey: "Mid-server-JKiiGZJ6mH39aIrEZGCLjWWA",
        // isProduction:true
    },
    mode:{
        active:true,
        key:"2DCtkGVe-x6789jifmqs53v%^&@$6sbgg05u3fkbcDuDxDDqwzD2xc--23kv,df594.0ut79s41qi0lhg"
    },
    instagram:{
        access_token: instagramKey.access_token,
        clientID:'02fb6221724249ef9df4af191679b6f9',
        clientSecret:'ef08d2d4b38a47939d6ebd7167ba49e6',
        redirect:'http://localhost:5000/api/instagram/refresh/token'
    },
    database: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'hammerst_hammer'
    }
};