import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useSelector,useDispatch } from 'react-redux';
import { baseUrl } from '../api/url';

const Voucher = () => {
  const voucherRef = useRef();
  const cartItems=useSelector((state)=>state.item.cartItems)
  const userId=useSelector((state)=>state.auth.userId)

  const handleDownloadPDF = async () => {
    if (voucherRef.current === null) {
      return;
    }
  
    try {
      // Render the voucher content to a canvas
      const canvas = await html2canvas(voucherRef.current, { scale: 2 });
  
      // Log canvas details for debugging
      console.log('Canvas:', canvas);
  
      const imgData = canvas.toDataURL('image/png');
      console.log('Image Data:', imgData); // Log the image data for debugging
  
      // Create a new jsPDF instance
      const pdf = new jsPDF('portrait', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = imgProps.width;
      const imgHeight = imgProps.height;
  
      const ratio = imgWidth / pdfWidth;
      const totalPages = Math.ceil(imgHeight / (pdfHeight * ratio));
  
      // Log the image properties and pages details
      console.log('Image Properties:', imgProps);
      console.log('Total Pages:', totalPages);
  
      for (let i = 0; i < totalPages; i++) {
        const srcY = i * pdfHeight * ratio;
        const srcHeight = Math.min(pdfHeight * ratio, imgHeight - srcY);
  
        const canvasPage = document.createElement('canvas');
        canvasPage.width = imgWidth;
        canvasPage.height = srcHeight;
  
        const ctx = canvasPage.getContext('2d');
        ctx.drawImage(
          canvas,
          0, srcY, imgWidth, srcHeight,
          0, 0, imgWidth, srcHeight
        );
  
        const imgDataPage = canvasPage.toDataURL('image/png');
        console.log('Page Image Data:', imgDataPage); // Log the page image data for debugging
  
        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgDataPage, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
  
      pdf.save('voucher.pdf');
    } catch (error) {
      console.error('Error capturing the voucher image:', error);
    }
  };
  
  

  return (
    <div>
      <div ref={voucherRef} style={styles.voucher}>
        <h1>Voucher</h1>
        <img src="/logo192.png" alt="" />
        {/* <table className='table table-borderless my-5'>
                    <thead>
                      <tr>
                        <th className='text-center' style={{background:'#07162e',color:'white'}}>Image</th>
                        <th className='text-center' style={{background:'#07162e',color:'white'}}>Product Name</th>
                        <th className='text-center' style={{background:'#07162e',color:'white'}}>Quantity</th>
                        <th className='text-center' style={{background:'#07162e',color:'white'}}>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                          cartItems.length > 0 ? 
                          cartItems.map((item,index)=>(
                            <>
                           <Tr item={item} userId={userId}></Tr>
                           {
                            index == cartItems.length - 1 ? 
                            <tr>
                          
      <td className='text-center' style={{verticalAlign:'middle',fontSize:'26px',fontWeight:'bold'}}>
        Total
        </td>
      <td className='text-center' style={{verticalAlign:'middle'}}>
        <img src="/logo192.png" alt="" />
      </td>
      <td className='text-center' style={{verticalAlign:'middle'}}>
        </td>
      <td className='text-center' style={{verticalAlign:'middle',fontSize:'26px',fontWeight:'bold'}}>$8790</td>
    </tr> : null
                           }
                           
                           </>
                          )) 
                          : <tr className='text-center'>
                            <td colSpan={4}>There is no products in your cart</td>
                          </tr>
                        }
                      
                    </tbody>
                  </table> */}
        {/* Add more content here to test multi-page PDF */}
      </div>
      <button onClick={handleDownloadPDF}>Download Voucher as PDF</button>
    </div>
  );
  
};
const Tr=({item,userId})=>{
  
    // const dispatch=useDispatch()
    // const deleteHandler=()=>{
    // //  const data={
    // //   id:item.id,
    // //   ownerId:item.ownerId
    // //  }
    //   deleteFromCart(item.id,userId)
    //   dispatch(cartActions.deleteItem(item.id))
    // }
    // const plusItem=(item)=>{
    //   dispatch(cartActions.addItem(item))
    // }
    // const minusItem=(item)=>{
    //   dispatch(cartActions.removeItem(item))
    // }
    return(
      <tr>
                          
      <td className='text-center' style={{verticalAlign:'middle',borderBottom:'1px solid #7f7f7f'}}>
        <img src={baseUrl+item.imgUrl} className='cart_image' alt="" />
        </td>
      <td className='text-center' style={{verticalAlign:'middle',borderBottom:'1px solid #7f7f7f'}}>{item.productName}</td>
      <td className='text-center' style={{verticalAlign:'middle',borderBottom:'1px solid #7f7f7f'}}>
        <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
        x {item.quantity}
        </div>
        
  
        </td>
      <td className='text-center' style={{verticalAlign:'middle',borderBottom:'1px solid #7f7f7f'}}>${item.price}</td>
    </tr>
    )
    
  }

const styles = {
  voucher: {
    width: '210mm', // A4 width
    minHeight: '297mm', // A4 height
    border: '1px solid #000',
    padding: '20px',
    textAlign: 'center',
  },
};

export default Voucher;
