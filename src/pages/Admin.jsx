import React from 'react';
import Helmet from '../Helmet/Helmet';
import { Container, Col, Row } from 'reactstrap';
import ProductModal from '../components/ProductModal';
import { useEffect } from 'react';
import { getAllProducts } from '../api/product';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { productDataActions } from '../redux/slices/productDataSlices'
import { deleteProduct } from '../api/product';
import Header from '../components/Header';
import { baseUrl } from '../api/url';

export default function Admin() {
  // const [products,setProducts] = useState([]);
  const dispatch =useDispatch()
  const products = useSelector((state)=>state.productData.products)
  const [editData,setEditData]=useState(null)

  console.log("products with state",products,useSelector((state)=>state))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result= await getAllProducts();
        if(result){
          dispatch(productDataActions.getProducts(result));
        }
        
        // setProducts(result)
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
  
    fetchData();
  }, [dispatch]);
  console.log("product data",products)

  const _handleDeleteProduct= async(id) =>{
    const data = await deleteProduct(id)
    if(data?.success){
      dispatch(productDataActions.getProducts(data?.payload))
    }
  }
  const _handleEditProduct=async(data)=>{
    setEditData(data)
  }

  return (
    <div style={{background:'#ededed'}}>
    <Header></Header>
    <div style={{marginTop:'20px'}}>
      
      <Helmet title={'Admin'} >
        <section className=''>
          <Container>
          <h3>Product Lists
          <i class="bi bi-plus-square-fill"
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal"
           style={{marginLeft:'10px',cursor:'pointer',color:'#07162e'}}></i>
          </h3>
            <Row>
              <ProductModal editData={editData} setEditData={setEditData}/>
            </Row>
            <Row>
              <Col lg='12'>
                <table className='table table-bordered mt-4'>
                  <thead>
                    <tr>
                      <th className='text-center' style={{background:'#07162e',color:'white'}}>No.</th>
                      <th className='text-center' style={{background:'#07162e',color:'white'}}>Image</th>
                      <th className='text-center' style={{background:'#07162e',color:'white'}}>Product Name</th>
                      <th className='text-center' style={{background:'#07162e',color:'white'}}>Price</th>
                      {/* <th className='text-center' style={{background:'#07162e',color:'white'}}>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    
                    {
                      products?.length > 0 ? products.map((product,index)=>{
                        return <tr>
                          <td style={{textAlign:'center',verticalAlign:'middle'}}>{index+1}</td>
                          <td style={{textAlign:'center',verticalAlign:'middle'}}><img src={baseUrl+product?.imgUrl} alt="" style={{width:'70px',height:'50px',borderRadius:'10px',objectFit:'cover'}} /></td>
                          <td style={{textAlign:'center',verticalAlign:'middle'}}>{product?.productName}</td>
                          <td style={{textAlign:'center',verticalAlign:'middle'}}>{product?.price+" $"}</td>
                          {/* <td style={{textAlign:'center',verticalAlign:'middle'}}>
                            <div style={{display:'flex',gap:'25px',justifyContent:'center'}}>
                            <i class="bi bi-trash-fill" style={{color:'red',cursor:'pointer'}} onClick={()=>_handleDeleteProduct(product?._id)}></i>
                            <i class="bi bi-pencil-square" data-bs-toggle="modal" 
          data-bs-target="#exampleModal" style={{cursor:'pointer',color:'#07162e'}} onClick={()=>_handleEditProduct(product)}></i>
                            </div>
                          </td> */}
                        </tr>
                      }) : 
                      <tr>
                        <td style={{textAlign:'center'}} colSpan={4}>There is no data in table</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
    </div>
  );
}
