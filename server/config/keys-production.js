// add this file to .gitignore
import instagramKey from './instagram.json';
export default {
    google: {
        clientID: "1066262252537-9k2ju0c1iuifkjlmtf33mi7b53jl5hbp.apps.googleusercontent.com",
        clientSecret: '-7WBqU0ePK8dHK00hAPg1zw-'
    },
    facebook: {
        clientID: "364630457710524",
        clientSecret: "f7401af34857feb4ccb15c6e69aad42f"
    },
    session: {
        cookieKey: "iCtkGVe0-15asd12315sax-xJkLm2K2220XlkD",
        name: "hammerstout_s",
        secret: "iCtkGVe0-4FKIGgBopL2QUM9K-jIK9miZhQExxxx2xuxxxx",
        maxAge: 24 * 60 * 60 * 1000
    },
    jwt: {
        secretOrPrivateKey: "AAAABB3L-X59kbcuqwzxc--23kv,df594.41239zsc92231",
        secretOrPrivateKey2: "2DCtkGVe-jifmqs53v6sbgg05u3fkbcDuDxDDqwzD2xc--23kv,df594.0ut79s41qi0lhg",
        secretOrPrivateKey3: "X59kbcuqwzxc-VcMFhXkPjVaIjz--23kv,df594.df594xxx",
        expiresIn: '2d'
    },
    origin: {
        url:"https://hammerstoutdenim.com",
        redirectProvider:"https://hammerstoutdenim.com",
        redirectLogin: "https://hammerstoutdenim.com/sign-in",
        redirect: "https://hammerstoutdenim.com/carts",
        redictProfile: "https://hammerstoutdenim.com/my-account"
    },
    rajaongkir: {
        key: "850129b7327c8206f3875333eb281f0e",
        originId: 23,
        name: "bandung"
    },
    rajasms: {
        key: "457f38ca6a3265ff7ee62df327d70854",
        username: "hammerstoutdenim"
    },
    midtrans: {
        url: "https://api.midtrans.com",
        id: "G592798515",
        clientKey: "Mid-client-Wn88s0ecuXz5VQoE",
        serverKey: "Mid-server-JKiiGZJ6mH39aIrEZGCLjWWA",
        isProduction: true
    },
    instagram: {
        access_token: instagramKey.access_token,
        clientID: '02fb6221724249ef9df4af191679b6f9',
        clientSecret: 'ef08d2d4b38a47939d6ebd7167ba49e6'
    },
    database: {
        host:'localhost',
        user:'hammerst_denim',
        password:'6!5jat!e8iLQ',
        database:'hammerst_hammer',
    },
    mode: {
        active: true,
        key: "2DCtkGVe-x6789jifmqs53v%^&@$6sbgg05u3fkbcDuDxDDqwzD2xc--23kv,df594.0ut79s41qi0lhg"
    }
};