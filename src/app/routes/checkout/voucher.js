import React from 'react'
import PropTypes from 'prop-types'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Divider,
    FormControl,
    InputBase
} from '@material-ui/core';

const Voucher = props => {
    const { classes, voucherData, handlerSubmitVoucher, handlerChangeVoucher, vouchers} = props;
    console.log(vouchers.voucher)
    return (
    <div>
          <Grid item>
                <Card>
                        <Grid container >
                        <Typography variant="h1" className={classes.titleBilling}>
                                VOUCHER
                </Typography>
                        </Grid>

                        <Divider />
                    <CardContent>
                        <Grid container>
                            <FormControl className={classes.margin} fullWidth>
                                <InputBase
                                disabled={Object.keys(vouchers.voucher).length > 0 ? true:false}
                                fullWidth
                                    id="voucher"
                                    placeholder="Voucher Code"
                                    value={voucherData}
                                    classes={{
                                        root: classes.bootstrapRoot,
                                        input: classes.bootstrapInput,
                                    }}
                                    onChange={handlerChangeVoucher}
                                />
                            </FormControl>
                          
                        </Grid>
                      
                            <div style={{ margin: "25px 0" }}>
                                <Button variant="contained" fullWidth color="primary" 
                                disabled={vouchers.loading || Object.keys(vouchers.voucher).length > 0}
                                onClick={handlerSubmitVoucher}>
                                    APPLY VOUCHER
                            </Button>
                            </div>
                    </CardContent>
                </Card>
            </Grid>
    </div>
  )
}

Voucher.propTypes = {
    classes:PropTypes.object.isRequired,
    handlerChangeVoucher:PropTypes.func.isRequired,
    handlerSubmitVoucher:PropTypes.func.isRequired,
    vouchers:PropTypes.object.isRequired
}

export default Voucher
