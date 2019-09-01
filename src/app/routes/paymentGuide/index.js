import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Page from '../../components/page';
class PaymentGuide extends Component {
    state={
        tabValue:0
    }

    handleChange = (e,value)=>{
        this.setState({
            tabValue:value
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <Page
                id="PaymentGuide"
                title="Payment Guide"
            >

            <div className={classes.paddingRoot}>
                <Grid container >
                    <Grid item md={12}>
                        <Grid container justify="center">
                            <Grid item md={10}>
                                <Typography variant="h1" className={classes.titlePaymentGuide}>
                                    Payment Guide
                                </Typography>
                                <Grid container direction="column" spacing={16}>
                                <Grid item xs={12}>
                                    <Typography>
                                        We use Midtrans as a payment system. <br/>  Source : 
                                        <a href="https://midtrans.com/payments/payment-channels" rel="noopener noreferrer" target="_blank">
                                        https://midtrans.com/payments/payment-channels
                                        </a>
                                       
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                           

                         
                                            <Paper style={{maxWidth:'100vw'}}
                                                >
                                                    <Tabs
                                                        value={this.state.tabValue}
                                                        onChange={this.handleChange}
                                                        indicatorColor="primary"
                                                        textColor="primary"
                                                        scrollable={true}
                                                        scrollButtons="auto"
                                                        variant={'scrollable'}
                                                    >
                                                        <Tab label="Credit Card" />
                                                        <Tab label="Virtual Account" />
                                                        <Tab label="Mandiri ClickPay" />
                                                        <Tab label="CIMB Clicks" />
                                                        <Tab label="e-Pay BRI" />
                                                        <Tab label="BCA KlikPay" />
                                                        <Tab label="Danamon Online Banking" />
                                                        <Tab label="Indomaret" />
                                                        <Tab label="GO-PAY" />
                                                    </Tabs>

                                                <Grid container direction="column">

                                                </Grid>

                                            </Paper>
                             
                                   
                                </Grid>
                            
                           
                                    {this.state.tabValue === 0 && (
                                        <Grid item xs={12}>
                                            <Card>
                                                <CardHeader

                                                    title={<Typography variant="h6">
                                                        Credit Card
                                                    </Typography>}
                                                    subheader={<Typography>
                                                        Pembayaran menggunakan kartu kredit/debit yang berlogo VISA/MasterCard/JCB/Amex,
                                                        dari semua Bank baik lokal maupun internasional.
                                            </Typography>}
                                                />
                                                <Divider />
                                                <CardContent>
                                                    <Grid container direction="row" spacing={8}>  
                                                        <Grid item md={6} xs={12}>
                                                                <ol>
                                                                    <li>
                                                                        Pilih pembayaran melalui Kartu.
                                                        </li>
                                                                    <li>
                                                                        Masukkan 16 angka nomor kartu disertai dengan expiration date dan CVV.
                                                        </li>
                                                                    <li>
                                                                        Pastikan detail pembayaran Anda telah benar untuk melanjutkan ke step 3D Secure.
                                                        </li>
                                                                    <li>
                                                                        One Time Password (OTP) akan dikirimkan ke nomor ponsel Anda yang terdaftar dengan kartu yang Anda gunakan.
                                                        </li>
                                                                    <li>
                                                                        Masukkan OTP yang Anda dapat ke halaman 3D Secure.
                                                        </li>
                                                                    <li>
                                                                        Pembayaran Anda dengan Kartu Kredit selesai.
                                                        </li>
                                                                </ol>
                                                        </Grid>
                                                        <Grid item md={6} xs={12}>
                                                                <iframe width="100%" title="credit-card" height="315" src="https://www.youtube.com/embed/ZAAQzjfRxls" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                        </Grid>
                                                    </Grid>
                                                

                                                </CardContent>
                     
                                            </Card>
                                        </Grid>
                                    ) }
                                    {this.state.tabValue === 1 && (
                                        <Grid item xs={12}>

                                            <Card>
                                                <CardHeader

                                                    title={<Typography variant="h6">
                                                        Virtual Account
                                                    </Typography>}
                                                    subheader={<Typography>
                                                        Layanan pembayaran transfer dari rekening lokal manapun
              melalui ATM Bersama/Prima/Alto. Difasilitasi oleh Bank Permata.
                                            </Typography>}
                                                />
                                                <Divider />
                                                <CardContent>
                                                    <Grid container direction="row" spacing={8}>
                                                        <Grid item md={6} xs={12}>
                                                                <ol>
                                                                    <li>
                                                                        Pilih pembayaran melalui Bank Transfer/Virtual Account.
                                                        </li>
                                                                    <li>
                                                                        Catat 16 digit nomor virtual account & nominal pembayaran Anda.
                                                        </li>
                                                                    <li>
                                                                        Gunakan ATM yang memiliki jaringan ATM Bersama/Prima/Alto untuk menyelesaikan pembayaran.
                                                        </li>
                                                                    <li>
                                                                        Masukkan PIN Anda.
                                                        </li>
                                                                    <li>
                                                                        Di menu utama pilih ‘Others’.
                                                        </li>
                                                                    <li>
                                                                        Pilih ‘Transfer’ lalu pilih ‘other bank account’.
                                                        </li>
                                                                    <li>
                                                                        Masukkan kode bank permata ‘013’ diikuti dengan 16 digit nomor virtual account.
                                                        </li>
                                                                    <li>
                                                                        Masukkan nominal pembayaran lalu pilih ‘Correct’.
                                                        </li>
                                                                    <li>
                                                                        Pastikan nominal pembayaran & nomor virtual account sudah benar terisi, lalu pilih ‘Correct’.
                                                        </li>
                                                                    <li>
                                                                        Pembayaran Anda dengan Virtual Account selesai.
                                                        </li>
                                                                </ol>
                                                        </Grid>
                                                            <Grid item md={6} xs={12}>
                                                                <iframe width="100%" title="virtual account" height="315" src="https://www.youtube.com/embed/OV2NaGPgszw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                            </Grid>
                                                    </Grid>
                                                  

                                                </CardContent>
                                        
                                            </Card>
                                        </Grid>
                                    ) }
                                    {this.state.tabValue === 2 && (
                                        <Grid item xs={12}>

                                            <Card>
                                                <CardHeader

                                                    title={<Typography variant="h6">
                                                        Mandiri ClickPay
                                                    </Typography>}
                                                    subheader={<Typography>
                                                        Layanan pembayaran internet banking dari Bank Mandiri.
                                                        Pembayaran dapat dilakukan dengan memasukkan
                                                        16 digit kartu mandiri debit dan token.
                                            </Typography>}
                                                />
                                                <Divider />
                                                <CardContent>
                                                        <Grid container direction="row" spacing={8}>
                                                            <Grid item md={6} xs={12}>
                                                                <ol>
                                                                    <li>
                                                                        Pilih pembayaran melalui mandiri clickpay.
                                                        </li>
                                                                    <li>
                                                                        Masukkan nomor kartu debit mandiri Anda.
                                                        </li>
                                                                    <li>
                                                                        Aktifkan token mandiri Anda, dengan memasukkan 6 digit pin.
                                                        </li>
                                                                    <li>
                                                                        Pilih APPLI 3, lalu masukkan input 1, input 2, & input 3 yang didapat dari halaman pembayaran mandiri clickpay Anda.
                                                        </li>
                                                                    <li>
                                                                        Setelah memasukkan ketiga input tersebut, token mandiri akan merespon dengan ‘challenge token’.
                                                        </li>
                                                                    <li>
                                                                        Masukkan challenge token lalu konfirmasi pembayaran Anda.
                                                        </li>
                                                                    <li>
                                                                        Pembayaran Anda dengan mandiri clickpay selesai.
                                                        </li>

                                                                </ol>

                                                            </Grid>
                                                      
                                                        </Grid>
                                             
                                                </CardContent>

                                            </Card>
                                        </Grid>
                                    )}
                                    {this.state.tabValue === 3 && (
                                        <Grid item xs={12}>

                                            <Card>
                                                <CardHeader

                                                    title={<Typography variant="h6">
                                                        CIMB Clicks
                                                    </Typography>}
                                                    subheader={<Typography>
                                                        Layanan pembayaran internet banking dari Bank CIMB.
        Pelanggan akan dihubungkan ke website CIMB Clicks untuk membayar.
                                            </Typography>}
                                                />
                                                <Divider />
                                                <CardContent>
                                                        <Grid container direction="row" spacing={8}>
                                                            <Grid item md={6} xs={12}>
                                                                <ol>
                                                                    <li>
                                                                        Pilih pembayaran melalui CIMB Clicks.
                                                        </li>
                                                                    <li>
                                                                        Cek ringkasan transaksi Anda, lalu klik ‘Proceed’.
                                                        </li>
                                                                    <li>
                                                                        Masukkan CIMB Clicks User ID dan klik ‘Submit’.
                                                        </li>
                                                                    <li>
                                                                        Pilih rekening asal untuk pembayaran lalu klik ‘Submit’.
                                                        </li>
                                                                    <li>
                                                                        Masukkan 6 digit Paycode yang dikirimkan ke nomor ponsel yang terdaftar untuk CIMB Clicks lalu klik ‘Submit’.
                                                       </li>
                                                                    <li>
                                                                        Pembayaran Anda dengan CIMB Clicks selesai.
                                                        </li>


                                                                </ol>
                                                            </Grid>
                                                            <Grid item md={6} xs={12}>
                                                                <iframe width="100%" title=" CIMB Clicks" height="315" src="https://www.youtube.com/embed/zitrnUQikcU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                            </Grid>
                                                        </Grid>
                                             

                                                </CardContent>
                                       
                                            </Card>
                                        </Grid>
                                    )}
                                   
                                    {this.state.tabValue === 4 && (
                                        <Grid item xs={12}>

                                            <Card>
                                                <CardHeader

                                                    title={<Typography variant="h6">
                                                        e-Pay BRI
                                                    </Typography>}
                                                    subheader={<Typography>
                                                        Layanan pembayaran internet banking dari BRI.
          Pelanggan akan dihubungkan ke website e-Pay BRI untuk membayar.
                                            </Typography>}
                                                />
                                                <Divider />
                                                <CardContent>
                                                        <Grid container direction="row" spacing={8}>
                                                            <Grid item md={6} xs={12}>
                                                                <ol>
                                                                    <li>
                                                                        Pilih pembayaran melalui e-Pay BRI.
                                                        </li>
                                                                    <li>
                                                                        Masukkan user ID dan password e-Pay BRI Anda dan klik ‘Submit’.
                                                        </li>
                                                                    <li>
                                                                        Masukkan password Anda dan 6 digit Paycode yang dikirimkan BRI ke nomor ponsel yang terdaftar untuk e-Pay BRI, lalu klik ‘Confirm’.
                                                        </li>
                                                                    <li>
                                                                        Pembayaran Anda dengan e-Pay BRI selesai.
                                                        </li>



                                                                </ol>
                                                            </Grid>
                                                            <Grid item md={6} xs={12}>
                                                                <iframe width="100%" title="e-Pay BRI" height="315" src="https://www.youtube.com/embed/5TNRyoaaCeI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                            </Grid>
                                                        </Grid>
                           

                                                </CardContent>
                                         
                                            </Card>
                                        </Grid>
                                    )}
                                   

                                    {this.state.tabValue === 5 && (
  <Grid item xs={12}>

                                        <Card>
                                            <CardHeader

                                                title={<Typography variant="h6">
                                                  BCA KlikPay
                                                    </Typography>}
                                                subheader={<Typography>
                                        Layanan pembayaran internet banking dari BCA.
            Pelanggan akan dihubungkan ke website BCA KlikPay untuk membayar.
                                            </Typography>}
                                            />
                                            <Divider />
                                            <CardContent>
                                                        <Grid container direction="row" spacing={8}>
                                                            <Grid item md={6} xs={12}>
              <ol>
                                                    <li>
                                                   Pilih pembayaran melalui BCA KlikPay.
        
                                                        </li>
                                                    <li>
                                                    Pastikan Anda rekening Anda sudah terdaftar untuk menggunakan fasilitas BCA KlikPay.
                                                        </li>
                                                    <li>
                                                      Pastikan saldo rekening Anda atau limit kartu kredit BCA Card Anda cukup untuk bertransaksi.
                                                        </li>
                                                    <li>
                                                    Masukkan alamat email & password BCA KlikPay Anda, beserta dengan captcha, lalu klik log in.
                                                        </li>
                                                        <li>
                                                           Pilih jenis pembayaran yang akan Anda gunakan.
                                                        </li>
                                                        <li>
                                                            Masukkan kode OTP yang dikirimkan ke nomor ponsel yang terdaftar di BCA KlikPay.
                                                        </li>
                                                        <li>
                                                            Pembayaran Anda dengan BCA KlikPay selesai.
                                                        </li>



                                                </ol>
                                                            </Grid>
                                                            <Grid item md={6} xs={12}>
                                                                <iframe width="100%" title="BCA KlikPay" height="315" src="https://www.youtube.com/embed/EcvV0DN8GTU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                            </Grid>
                                                        </Grid>
                                  

                                            </CardContent>
                                      
                                        </Card>
                                    </Grid>
                                    )}

                                    {this.state.tabValue === 6 && (
 <Grid item xs={12}>

                                        <Card>
                                            <CardHeader

                                                title={<Typography variant="h6">
                                                  Danamon Online Banking
                                                    </Typography>}
                                                subheader={<Typography>
                                                    Layanan pembayaran internet banking dari Bank Danamon.
Pelanggan akan dihubungkan ke website Danamon Online Banking untuk membayar.
                                            </Typography>}
                                            />
                                            <Divider />
                                            <CardContent>
                                         
                                                <ol>
                                                    <li>
                                                     Pilih pembayaran melalui Danamon Online Banking.
   
                                                        </li>
                                                    <li>
                                                      Masukkan User ID Danamon Online Banking dan pilih rekening asal untuk pembayaran.
                                                        </li>
                                                    <li>
                                                       Cek rincian informasi transaksi Anda, masukkan Kode Token, lalu tekan ‘lanjut’.
                                                        </li>
                                                    <li>
                                                      Konfirmasi transaksi pembayaran akan muncul. Simpan informasi referensi merchant dan referensi pembayaran.
                                                        </li>
                                                        <li>
                                                            Pembayaran Anda dengan Danamon Online Banking selesai.
                                                        </li>



                                                </ol>

                                            </CardContent>
                                   
                                        </Card>
                                    </Grid>
                                    )}
                                    {this.state.tabValue === 7 && (
<Grid item xs={12}>

                                        <Card>
                                            <CardHeader

                                                title={<Typography variant="h6">
                                                Indomaret
                                                    </Typography>}
                                                subheader={<Typography>
                                                Layanan pembayaran melalui gerai Indomaret di seluruh Indonesia. Pembayaran dapat dilakukan dengan tunai atau debit.
                                            </Typography>}
                                            />
                                            <Divider />
                                            <CardContent>
                                          
                                                <ol>
                                                    <li>
                                                   Pilih pembayaran melalui Indomaret.
     
        
                                                        </li>
                                                    <li>
                                                     Catat atau print kode pembayaran yang Anda dapat.
   
                                                        </li>
                                                    <li>
                                                      Bawa kode pembayaran tersebut ke gerai Indomaret, lalu berikan kode pembayaran tersebut ke kasir.
  
                                                        </li>
                                                    <li>
                                                      Kasir di Indomaret akan memasukkan kode pembayaran tersebut dan meminta Anda untuk membayar sejumlah nominal belanja Anda.
                                                        </li>
                                                        <li>
                                                          Pembayaran Anda melalui Indomaret selesai.
                                                        </li>



                                                </ol>

                                            </CardContent>
                                   
                                        </Card>
                                    </Grid>
                                    )}
                                    {this.state.tabValue === 8 && (
 <Grid item xs={12}>

                                        <Card>
                                            <CardHeader

                                                title={<Typography variant="h6">
                                                GO-PAY
                                                    </Typography>}
                                                subheader={<Typography>
                                             Layanan uang elektronik dengan menggunakan nomor ponsel yang terdaftar di aplikasi GO-JEK sebagai rekening.
       Pembayaran dapat langsung dilakukan melalui ponsel.
                                            </Typography>}
                                            />
                                            <Divider />
                                            <CardContent>
                                                        <Grid container direction="row" spacing={8}>
                                                            <Grid item md={6} xs={12}>
     <ol>
                                                    <Typography variant="subtitle1">
                                                        Mobile app:
                                                    </Typography>
                                                    <li>
                                                     Pilih pembayaran melalui GO-PAY.
      
                                                        </li>
                                                    <li>
                                                    Aplikasi GO-JEK Anda akan terbuka.
                                                        </li>
                                                    <li>
                                                      Lihat detail pembayaran pada aplikasi GO-JEK Anda dan tekan Pay.
                                                        </li>
                                                    <li>
                                                      Masukkan nomor pin GO-PAY Anda.
                                                        </li>
                                                        <li>
                                                       Pembayaran dengan menggunakan GO-PAY selesai.
                                                        </li>
                                                </ol>
                                                              
                                                            </Grid>
                                                            <Grid item md={6} xs={12}>
                                                                <iframe width="100%" title="GO-PAY" height="315" src="https://www.youtube.com/embed/fdOQeeckfSY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                    
                                                               
                                                            </Grid>
                                                            <Grid item md={6} xs={12}>
          <ol>
                                                    <Typography variant="subtitle1">
                                                       QR code:
                                                    </Typography>
                                                    <li>
                                                    Pilih pembayaran melalui GO-PAY.
    
          
                                                        </li>
                                                    <li>
                                                    Buka aplikasi GO-JEK dan tekan tombol Scan QR.
                                                        </li>
                                                    <li>
                                                      Scan kode QR yang muncul pada halaman pembayaran.
                                                        </li>
                                                    <li>
                                                      Lihat detail pembayaran dan tekan Pay.
  
                                                        </li>
                                                        <li>
                                            Masukkan nomor pin GO-PAY Anda.
                                                        </li>
                                                        <li>
                                                            Pembayaran dengan menggunakan GO-PAY selesai.

                                                        </li>



                                                </ol>
                                                            </Grid>

                                                            <Grid item md={6} xs={12}>  
                                                                <iframe width="100%" title="QR code" height="315" src="https://www.youtube.com/embed/axYdVeOCuFo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                            </Grid>

                                                           
                                                        </Grid>
                                           

                                            </CardContent>
                                     
                                        </Card>
                                    </Grid>
                              
                                  
                                    )}
                                
                 

                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
            </div>
            </Page>
        )
    }
}

PaymentGuide.propTypes = {
    classes: PropTypes.object.isRequired,
}


export default withStyles(styles, { name: "PaymentGuide" })(PaymentGuide);
