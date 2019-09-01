import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import Page from '../../components/page';
class ReturnPolicy extends Component {
  
    render() {
        const { classes } = this.props;
        return (
            <Page
                title="Return Policy"
                id="ReturnPolicy"
            >
                
            <div className={classes.paddingRoot}>
                <Grid container >
                    <Grid item md={12}>
                        <Grid container justify="center">
                            <Grid item md={10}>
                                <Typography variant="h1" className={classes.titleReturnPolicy}>
                                    Return Policy
                                </Typography>
                                <Grid container direction="row" spacing={16}>
                                
                                    <ul className={classes.listReturnPolicy}>
                                        <Typography variant="subheading" className={classes.titleName}>
                                            KEBIJAKAN PENGEMBALIAN DANA
                                         </Typography>
                                         
                                        <li>
                                        Barang harus dikembalikan dalam waktu kurang dari 3 hari setelah penerimaan.
                                    </li>
                                        <li>
                                        Barang harus memiliki tag asli seperti yang disertakan saat penerimaan.
                                    </li>
                                    <li>
                                       Kami berhak untuk menolak pengembalian dana atau penukaran apabila telah ada perubahan bentuk pada barang, terjadi kerusakan, dicuci, atau ketidaklengkapan tag asli yang disertakan.
                                    </li>
                                    <li>
                                        Kami tidak menjamin penukaran atau pengembalian dana untuk barang yang tidak memenuhi kriteria pengembalian. Jika anda menerima produk yang mengalami kerusakan atau cacat pada saat menerima pengiriman silahkan memberikan pemberitahuan terlebih dahulu dalam waktu paling lambat 2 hari setelah anda menerima produk melalui email order@hammerstoutdenim.com sebelum mengirim barang kembali.
                                    </li>
                                    <li>
Anda dapat menggunakan jasa pengiriman lain untuk pengembalian barang. Untuk memastikan kami menerima barang yang anda kirim silahkan meminta nomor pelacakan dari pengirim dan konfirmasikan kepada pihak kami melalui email order@hammerstoutdenim.com beserta nomor KONFIRMASI PEMBAYARAN anda.
                                    </li>
                                    <li>
Kemas kembali barang pengembalian anda dengan aman.
                                    </li>
                                    <li>
                                      	Kirim barang pengembalian anda ke alamat: HAMMERSTOUT Jl Sari Indah IV No 19, Babakan Sari, Kiaracondong, Bandung.
                                    </li>
                                    <li>
                                       Barang baru akan di kirim setelah kami menerima barang penukaran anda dan mengkonfirmasi pengembalian atau penukaran anda.
         
                                    </li>
                                    <li>
                                        Kami tidak bertanggungjawab atas kehilangan barang pengembalian saat pengiriman kembali.
                                    </li>
                                    <li>
                                       Biaya pengiriman awal tidak dapat dikembalikan.
                                    </li>
                                    </ul>
                               

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

ReturnPolicy.propTypes = {
    classes: PropTypes.object.isRequired,
}


export default compose(connect(null,null), withStyles(styles, { name: "ReturnPolicy" }))(ReturnPolicy);
