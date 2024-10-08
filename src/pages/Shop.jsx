import React from 'react'
import Helmet from '../Helmet/Helmet'
import Commonsection from '../UI/Commonsection'
import { Container,Col,Row } from 'reactstrap'
import Select from 'react-select';
import { useState } from 'react';
// import products from '../assets/data/products';
import { useSelector } from 'react-redux';
import ProductList from '../UI/ProductList';
import Header from '../components/Header';

export default function Shop() {
  const now_year=new Date().getFullYear()
  const products = useSelector((state)=>state.productData.products)

  console.log("products in shop",products)

  const categoryList=[
    {value:'all',label:'All'},
    {value:'trend',label:'Trend'},
    {value:'best-sales',label:'Best Sales'},
    {value:'popular',label:'Popular'},
    {value:'new-arrivals',label:'New Arrivals'}
  ]
  const PriceList=[
    {
      value:1,label:'High Price To Low Price'
    },
    {
      value:2,label:'Low Price To High Price'
    }
  ]
  const [filterCategory,setFilterCategory]=useState(products)
  const [selectedCategory,setSelectedCategory]=useState({value:'all',label:'All'})
  const [filterPrice,setFilterPrice]=useState(products)
  const [selectedPrice,setSelectedPrice]=useState(null)
  const [selecteSearch,setSelectedSearch]=useState('')
  // const handleCategoryList=(e)=>{
  //   if(e!=undefined){
  //     setSelectedCategory(e)
  //   }
  //   const categoryFilter=e.label
  //   console.log("selected====>",e)
  //   if(categoryFilter == 'sofa'){
  //     console.log("sofa=====>")
  //     const filterProducts=products.filter(item =>item.category == categoryFilter)
  //     console.log("filter products",filterProducts)
  //     setFilterCategory(filterProducts)
  //     // setSelectedCategory(e)
  //   }else if(categoryFilter == 'mobile'){
  //     const filterProducts=products.filter(item =>item.category == categoryFilter)
  //     setFilterCategory(filterProducts)
  //     // setSelectedCategory(e)
  //   }else if(categoryFilter == 'chair'){
  //     const filterProducts=products.filter(item =>item.category == categoryFilter)
  //     setFilterCategory(filterProducts)
  //     // setSelectedCategory(e)
  //   }else if(categoryFilter == 'watch'){
  //     const filterProducts=products.filter(item =>item.category == categoryFilter)
  //     setFilterCategory(filterProducts)
  //     // setSelectedCategory(e)
  //   }else if(categoryFilter == 'wireless'){
  //     const filterProducts=products.filter(item =>item.category == categoryFilter)
  //     setFilterCategory(filterProducts)
  //     // setSelectedCategory(e)
  //   }else{
  //     // const filterProducts=products.filter(item =>item.category == categoryFilter)
  //     setFilterCategory(products)
  //   }
  // }
  const handleCategoryList=(e)=>{
    setSelectedCategory(e)
    if(e.value == 'all' || e.value == ''){
      setFilterCategory(products)
      setSelectedPrice(null)
    }else{
      const filterProducts=products?.filter(item =>item.category == e.value)
      console.log("filter products",filterProducts)
      setFilterCategory(filterProducts)
      setSelectedPrice(null)
    }
    
  }
  const handlePriceList=(e)=>{
    console.log("handle price",e,filterCategory)
    setSelectedPrice(e)
    if(e?.value == 1){
      // console.log("filterPrice",filterCategory && filterCategory?.sort((a,b)=>b.price-a.price))
      const filterPrice = filterCategory ? filterCategory?.slice()?.sort((a,b)=>b.price-a.price) : []
      
    setFilterCategory(filterPrice)
    }else{
      const filterPrice = filterCategory ? filterCategory?.slice()?.sort((a,b)=>a.price-b.price) : []
    setFilterCategory(filterPrice)
    }
    
  }
  const handleSearch=(e)=>{
    console.log(e.target.value)
    let searchText=e.target.value
    setSelectedSearch(e.target.value)
    const searchItem=products?.filter(item => item.productName.toLowerCase().includes(searchText.toLowerCase()))
    console.log(searchItem)
    setFilterCategory(searchItem)
  }
  const stickyStyle = {
    position: "sticky",
    bottom: 0,
    right: 0,
    background:"#07162e",
    // height:"300px"
  };
  const normalStyle={
    background:"#07162e",
    // height:"300px"
  }

  const stickyCondition = filterCategory?.length === 0 ? stickyStyle : normalStyle;
  console.log("style======>,fasfasf",stickyCondition)
  return (
    <div>
      <Header></Header>
      <Helmet title={'Shop'}>
        <Commonsection title={"Products"}></Commonsection>
        <section className=''>
          <Container>
            <Row >
              <Col lg='3' md='3' className='my-4'>
              <Select
                value={selectedCategory}
                onChange={handleCategoryList}
                options={categoryList}
                placeholder='Select Category'
                className='react-select-container'
                 classNamePrefix="react-select"
                 styles={{
                  container: (base) => ({
                    ...base,
                    // backgroundColor: 'black',
                    // color:'white'
                   
                  }),
                  control: (base) => ({
                    ...base,
                    backgroundColor: 'white',
                    color:'black'
                  }),
                }}
              />
              </Col>
              <Col lg='3' md='3' className='my-4'>
              <Select
                value={selectedPrice}
                onChange={handlePriceList}
                options={PriceList}
                placeholder='Select Price'
                className='react-select-container'
                 classNamePrefix="react-select"
                 styles={{
                  container: (base) => ({
                    ...base,
                   
                  }),
                  control: (base) => ({
                    ...base,
                    backgroundColor: 'white',
                    color:'black'
                  }),
                }}
              />
              </Col>
              <Col lg='6' md='6' className='my-4'>
                <input type="text" className='form-control' placeholder='Search....' value={selecteSearch} onChange={handleSearch} />
              </Col>
            </Row>
            <Row>
              {
                filterCategory.length == 0 ? <h3 className='text-center'>No Products are found</h3> : 
                <ProductList data={filterCategory}></ProductList>
              }
            
            </Row>
          </Container>
        </section>
        <section 
        className='footer' 
        // style={{position:"sticky",bottom:0,right:0}}
        style={stickyCondition}
        >
            <Container>
            <Row>
                <Col lg='4' md='6' sm='12'>
                  <h5 className='mb-3 mt-4 text-white'>Shop.com</h5>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, fuga molestias vero reiciendis quibusdam quia illum pariatur tempore consequuntur adipisci expedita harum cum ipsa velit soluta cupiditate, aliquid accusamus maxime.</p>

                </Col>
                <Col lg='2' md='6' sm='12'>
                  <h5 className='mb-3 mt-4 text-white'>Top Brands</h5>
                  <div style={{lineHeight:2}}>
                  <p>I Phone</p>
                  <p>Xiaomi</p>
                  <p>Huawei</p>
                  <p>Vivo</p>
                  <p>Oppo</p>
                  </div>

                </Col>
                <Col lg='2' md='6' sm='12'>
                  <h5 className='mb-3 mt-4 text-white' >Useful Links</h5>
                  <div style={{lineHeight:2}}>
                    <p>Shop</p>
                    <p>Cart</p>
                    <p>Login</p>
                    <p>Register</p>
                  </div>
                  

                </Col>
                <Col lg='4' md='6' sm='12'>
                  <h5 className='mb-3 mt-4 text-white'>Contact</h5>
                  <div style={{lineHeight:2}}>
                    <p>
                    <i class="ri-map-pin-2-fill"></i> Chan Aye Thar Zan,Mandalay
                    </p>
                    <p>
                    <i class="ri-phone-fill"></i> +95953453345
                    </p>
                    <p>
                    <i class="ri-mail-line"></i> yemyinthtet99999@gmail.com
                    </p>
                  </div>
                 
                </Col>
                <Col lg='12'>
                  <p className='text-center mt-5 mb-3'>Copyright {now_year} developed by YMH</p>
                </Col>
              </Row>
            </Container>
          </section>
      </Helmet>
    </div>
  )
}
