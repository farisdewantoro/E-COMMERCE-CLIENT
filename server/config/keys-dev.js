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
        url:"https://hammerstout-client.herokuapp.com",
        redirectProvider: "https://hammerstout-admin.herokuapp.com/", //DEV
        // redirectProvider: "http://localhost:3000", //PROD LOCAL
        redirectLogin:"https://hammerstout-client.herokuapp.com/sign-in",
        redirect:"https://hammerstout-client.herokuapp.com/carts",
        redictProfile:"https://hammerstout-client.herokuapp.com/my-account",
        confirmPay:"https://hammerstout-client.herokuapp.com/confirm-payment"
    },
    rajaongkir: {
        key: process.env.RAJA_ONGKIR_KEY,
        originId: 23,
        name: "bandung",
    },
    rajasms: {
        key: process.env.RAJA_SMS,
        username: process.env.RAJA_SMS_USERNAME
    },
    midtrans: {
        url: "https://api.sandbox.midtrans.com",
        id: process.env.MIDTRANS_ID,
        clientKey: process.env.MIDTRANS_CLIENT_KEY,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        isProduction: false
    },
    mode:{
        active:true,
        key:"2DCtkGVe-x6789jifmqs53v%^&@$6sbgg05u3fkbcDuDxDDqwzD2xc--23kv,df594.0ut79s41qi0lhg"
    },
    instagram: {
        access_token: instagramKey.access_token,
        clientID: process.env.INSTAGRAM_ID,
        clientSecret: process.env.INSTAGRAM_SECRET,
        redirect: 'https://hammerstout-admin.herokuapp.com/api/instagram/refresh/token'
    },
    database: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE
    }
};






