import React, { useEffect } from 'react'
import { toPng } from 'html-to-image';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useRef } from 'react';


export default function VouncherModal({editData,setEditData}) {

  const voucherRef = useRef();
  const totalAmount=useSelector((state)=>state.item.totalAmount)
  const cartItems=useSelector((state)=>state.item.cartItems)
  const userName=useSelector(state=>state.auth?.userName)
  console.log("userName",useSelector(state=>state.auth?.user?.email))
  const email = useSelector(state=>state.auth?.user?.email)
  const InvoiceDate =  moment(new Date()).format(
    "DD/MM/YYYY")

  const handleDownload = () => {
    if (voucherRef.current === null) {
      return;
    }

    toPng(voucherRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'voucher.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error capturing the voucher image:', error);
      });
  };
  // const editData = store.props
 
  return (
<>
<div class="modal fade" id="vouncherModal" tabindex="-1" role="dialog" 
aria-labelledby="vouncherModalLabel" aria-hidden="false">
  <div class="modal-dialog modal-lg"  role="document">
    <div class="modal-content" style={{background:'#f5f5f5'}}>
      <div class="modal-header" style={{color:'white'}}>
        <h5 class="modal-title" id="vouncherModalLabel" style={{color:'black'}}>Preview Vouncher</h5>
        <div className='cart_button' onClick={handleDownload}>Download Voucher</div>
      </div>
      <div class="modal-body" style={{overflow:'scroll hidden'}}>
      <div ref={voucherRef} style={styles.voucher}>
        <h3 style={{fontWeight:'bold',textAlign:'start'}}>Shop.com Vouncher</h3>
        <div style={{margin:'40px 0px',textAlign:'start'}}>
              <div>Shop.com</div>
              <div>ShopAdmin99@gmail.com</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'end'}}>
          <div style={{textAlign:'start'}}>
            <div style={{fontWeight:'bold',marginBottom:'10px'}}>Bill to:</div>
            <div>{userName}</div>
            <div>{email}</div>
          </div>
          <div>
            <div style={{display:'flex'}}><div style={{fontWeight:'bold'}}>Invoice Number : </div><div style={{marginLeft:'5px'}}>VC2897</div> </div>
            <div style={{display:'flex'}}><div style={{fontWeight:'bold'}}>Invoice Date : </div><div style={{marginLeft:'5px'}}>{InvoiceDate}</div> </div>
          </div>
        </div>
        
        <table className='table-bordered' style={{width:'100%',marginTop:'30px'}}>
          <tr style={{background:'#07162e',color:'white'}}>
            <th style={{padding:'10px 0px'}}>Product Name</th>
            <th style={{padding:'10px 0px'}}>Quantity</th>
            <th style={{padding:'10px 0px'}}>Price Per Unit</th>
            <th style={{padding:'10px 0px'}}>Amount</th>

          </tr>
          {
            cartItems?.length > 0 ? cartItems?.map((v)=>(
              <tr >
                  <td style={{padding:'10px 0px'}}>{v.productName}</td>
                  <td style={{padding:'10px 0px'}}>{v.quantity}</td>
                  <td style={{padding:'10px 0px'}}>{v.price}$</td>
                  <td style={{padding:'10px 0px'}}>{v.price * v.quantity}$</td>

              </tr>
            )) : null
          }
          <tr>
            <th style={{borderBottom:'none'}}></th>
            <th style={{borderBottom:'none'}}></th>
            <th style={{fontWeight:'bold',borderBottom:'none',padding:'20px 0px 10px 0px'}}>Subtotal</th>
            <th style={{fontWeight:'bold',borderBottom:'none'}}>{totalAmount}$</th>
          </tr>
          <tr>
            <th style={{borderBottom:'none',borderTop:'none'}}></th>
            <th style={{borderBottom:'none',borderTop:'none'}}></th>

            <th style={{fontWeight:'bold',borderBottom:'none',borderTop:'none',padding:'10px'}}>Tax</th>
            <th style={{fontWeight:'bold',borderBottom:'none',borderTop:'none'}}>0.00 $</th>
          </tr>
          <tr>
            <th style={{borderBottom:'none',borderTop:'none'}}></th>
            <th style={{borderBottom:'none',borderTop:'none'}}></th>

            <th style={{fontWeight:'bold',borderBottom:'none',borderTop:'none',padding:'10px'}}>Fees/discounts</th>
            <th style={{fontWeight:'bold',borderBottom:'none',borderTop:'none'}}>0.00 $</th>
          </tr>
          <tr>
            <th style={{borderBottom:'none',borderTop:'none'}}></th>
            <th style={{borderBottom:'none',borderTop:'none'}}></th>

            <th style={{fontWeight:'bold',borderBottom:'none',borderTop:'none',padding:'10px',background:'#07162e',color:'white'}}>Total</th>
            <th style={{fontWeight:'bold',borderBottom:'none',borderTop:'none',background:'#07162e',color:'white'}}>{totalAmount}$</th>
          </tr>
        </table>
      </div>
      
      </div>
    </div>
  </div>
</div>
</>
  )
}

const styles = {
  voucher: {
    width: '766px',
    // overFlow:'scroll hidden',
    // height: '800px',
    border: '1px solid #000',
    padding: '20px',
    textAlign: 'center',
    background:'white'
  },
};
