import React, { Component } from 'react'
import axios from 'axios';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    FormHelperText
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import qs from 'query-string';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Page from '../../components/page';
class TrackShipment extends Component {
    constructor(){
        super();
        this.state={
            resi:{},
            order_id:'',
            loading:false,
            error:{}
        }
    }
componentDidMount(){
    let query = qs.parse(this.props.location.search);
    if (query && query.order_id){
        this.setState({
            order_id: query.order_id,
            loading:true
        });

        axios.post('/api/v1/track/order-id', {id:query.order_id})
            .then(res => {
                this.setState({
                    resi: res.data.rajaongkir,
                    loading: false,
                    errors: ''
                });
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    this.setState({
                        loading: false,
                        errors: err.response.data
                    });
                } else {
                    this.setState({
                        loading: false
                    });
                }
            });
    }
}

handlerOnChange = (e)=>{
    this.setState({
        order_id:e.target.value
    });
}
 
  onSubmit = (e)=>{
      e.preventDefault();
      this.setState({  
          loading: true
      });
      const order_id = this.state.order_id;
      axios.post('/api/v1/track/order-id',{id:order_id})
        .then(res=>{
    
            this.setState({
                resi:res.data.rajaongkir,
                loading: false,
                errors:''
            });
        })
        .catch(err=>{
           
            if(err.response && err.response.data){
                this.setState({
                    loading: false,
                    errors:err.response.data
                });
            }else{
                this.setState({
                    loading: false
                });
            }
       
        });
  }

  render() {
      const { resi, order_id, loading,errors} = this.state;
    const {classes} = this.props;
  
    return (
        <Page
            title="Track Shipment"
            id="trackShipment"
        >
      <div className={classes.root}>
        <Grid container justify="center" direction="row" >
            <Grid item md={10} xs={12}>
                <Grid container direction="column" spacing={32}>
                    <Grid item  xs={12}>
                         <Typography variant="h1" className={classes.titleTracker}>
                            SHIPMENT TRACKER
                        </Typography>
                            <Typography className={classes.childTracker}>
                                Track your order by entering the details bellow.
                        </Typography>
                    </Grid>
                    <Grid item  xs={12}>
                        <Grid container direction="row" justify="center">
                            <Grid item md={6} xs={12}>
                            <form onSubmit={this.onSubmit}>
                                    <Paper className={classes.rootSearch} elevation={2}>
                                            <InputBase className={classes.input} placeholder="Your order code  " value={order_id} onChange={this.handlerOnChange}/>
                                        <IconButton className={classes.iconButton} type="submit" aria-label="Search">
                                            <SearchIcon />
                                        </IconButton>
                                      
                                    </Paper>
                                    {errors && errors.message  && (
                                        <FormHelperText error>
                                                {errors.message}
                                        </FormHelperText>
                                    )}

                                        {resi.status && resi.status.code && resi.status.description && resi.status.code === 400 && (
                                            <FormHelperText error>
                                                {'NOT FOUND  '}
                                            </FormHelperText>
                                    )}
                                    
                            </form>
                            </Grid>
                        </Grid>
                    </Grid>
                
                                    {resi.result && (
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                            <div>
                                                <div className="table-responsive">
                                                <table className="table">
                                                    <caption style={{ textAlign: 'left', padding: '2px' }} className={classes.textTitle}>
                                                        Informasi Pengiriman
                                                    </caption>

                                                    {resi.result.details && resi.result.summary && (
                                                        <tbody>


                                                            <tr>
                                                                <td >No Resi </td>
                                                                <td>: {resi.result.summary.waybill_number}</td>
                                                            </tr>
                                                            <tr>
                                                                <td >Status </td>
                                                                <td>: {resi.result.summary.status}</td>
                                                            </tr>
                                                            <tr>
                                                                <td >Service </td>
                                                                <td>: {resi.result.summary.service_code}</td>
                                                            </tr>
                                                            <tr>
                                                                <td >Dikirim tanggal	 </td>
                                                                <td>: {resi.result.summary.waybill_date}</td>
                                                            </tr>
                                                            <tr>
                                                                <td >Dikirim oleh	 </td>
                                                                <td>: {resi.result.summary.shipper_name} -{resi.result.summary.origin}</td>
                                                            </tr>
                                                            <tr>
                                                                <td >Dikirim ke	 </td>
                                                                <td>: {resi.result.summary.receiver_name} - {resi.result.summary.destination}</td>
                                                            </tr>

                                                            <tr>
                                                                <td >Alamat pengiriman 1	 </td>
                                                                <td>: {resi.result.details.receiver_address1}</td>
                                                            </tr>
                                                            <tr>
                                                                <td >Alamat pengiriman 2	 </td>
                                                                <td>: {resi.result.details.receiver_address2}</td>
                                                            </tr>
                                                            <tr>
                                                                <td >Alamat pengiriman 3	 </td>
                                                                <td>: {resi.result.details.receiver_address3}</td>
                                                            </tr>


                                                        </tbody>
                                                    )}




                                                </table>
                                                </div>

                                                {resi.result.delivery_status && (
                                                <div className="table-responsive">
                                                <table className="table">
                                                        <caption style={{ textAlign: 'left', padding: '2px' }} className={classes.textTitle}>
                                                            Delivery Status
                             </caption>
                                                        <tbody>
                                                            <tr>
                                                                <td >Status </td>
                                                                <td>: {resi.result.delivery_status.status}</td>
                                                            </tr>
                                                            <tr>
                                                                <td >Penerima paket kiriman </td>
                                                                <td>: {resi.result.delivery_status.pod_receiver}</td>
                                                            </tr>
                                                            <tr>
                                                                <td >Tanggal paket kiriman diterima</td>
                                                                <td>:  {resi.result.delivery_status.pod_date}</td>
                                                            </tr>
                                                            <tr>
                                                                <td >Waktu/Jam paket kiriman diterima</td>
                                                                <td>:  {resi.result.delivery_status.pod_time}</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                    </div>
                                                )}
                                                {resi.result.manifest && resi.result.manifest instanceof Array && (
                                                <div className="table-responsive">
                                                <table className="table">
                                                        <caption style={{ textAlign: 'left', padding: '2px' }} className={classes.textTitle}>
                                                            Delivery Time
                                                     </caption>
                                                        <thead>
                                                            <th  style={{textAlign:"left"}}> Tanggal </th>
                                                            <th >Keterangan</th>
                                                        </thead>
                                                        <tbody>
                                                            {resi.result.manifest.map(m => {
                                                                return (
                                                                    <tr key={m.manifest_code}>
                                                                        <td > {m.manifest_date} : {m.manifest_time}</td>
                                                          
                                                                        <td > {m.city_name+' - '} {m.manifest_description}</td>
                                                                    </tr>
                                                                )
                                                            })}



                                                        </tbody>
                                                    </table>
                                                    </div>

                                                )}




                                            </div>


                                    </CardContent>
                                </Card>
                            </Grid>
                                    )}
                 
                        
                        <Dialog fullScreen open={loading}>

                            <Grid container justify="center" alignItems="center" direction="column" style={{ height: "100%" }}>

                                <CircularProgress className={classes.progress} />
                                <Typography className={classes.normalText} style={{ margin: "20px 0" }}>Please wait Loading..</Typography>
                            </Grid>

                        </Dialog>
                </Grid>
            </Grid>
        </Grid>
      </div>
        </Page>
    )
  }
}


TrackShipment.propTypes={
    classes:PropTypes.object.isRequired
}

export default withStyles(styles)(TrackShipment);
