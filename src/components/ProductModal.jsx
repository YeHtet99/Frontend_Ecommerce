import React, { useEffect } from 'react'
import { useState } from 'react';
import { createProduct,updateProduct } from '../api/product';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { productDataActions } from '../redux/slices/productDataSlices';
export const baseUrl= "http://localhost:8080/"


export default function ProductModal({editData,setEditData}) {
  // const editData = store.props
  const categories=[
    {value:'trend',label:'Trend'},
    {value:'best-sales',label:'Best Sales'},
    {value:'popular',label:'Popular'},
    {value:'new-arrivals',label:'New Arrivals'}
  ]
    const [formState, setFormState] = useState({
        file: null,
        productName: '',
        price : '',
        description : ''
      });
    const [categoryName,setCategoryName] = useState('')
      useEffect(()=>{
        if(editData){
          setFormState({
            file:editData?.originalFileName,
            productName: editData?.productName,
            price : editData?.price,
            description : editData?.description
          })
          setCategoryName(editData.category)
        }
      },[editData])
      const dispatch =useDispatch()

      const handleChange = (event) => {
        console.log("event change")
        const { name, value, files } = event.target;
        console.log("files",files)
        if (name === 'file') {
          setFormState((prevState) => ({
            ...prevState,
            [name]: files[0]
          }));
        } else {
          setFormState((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
      };

      const handleSelectChange=(e)=>{
        setCategoryName(e.value)
      }

      const handleSubmit=async (e) =>{
        e.preventDefault()
        const {file,
            productName,
            // categoryName ,
            price ,
            description } = formState
            let formData = new FormData();
            const cookies = new Cookies();
            const userId = cookies.get('userId')
            formData.append("file",file);
            formData.append("productName",productName);
            formData.append("categoryName",categoryName);
            formData.append("price",price);
            formData.append("description",description);
            formData.append("userId",userId);
            const data = await createProduct(formData)
            console.log("data of data",data)
            if(data.success){
              console.log("success condition")
              dispatch(productDataActions.getProducts(data.payload));
            }
            

        console.log("form state",formState)
      }

      const handleUpdate = async (e) =>{
        e.preventDefault()
        const {file,
            productName,
            // categoryName ,
            price ,
            description } = formState
            let formData = new FormData();
            const cookies = new Cookies();
            const userId = cookies.get('userId')
            if(typeof file == 'object'){
              formData.append("file",file);
            }
            formData.append("productName",productName);
            formData.append("categoryName",categoryName);
            formData.append("price",price);
            formData.append("description",description);
            formData.append("userId",userId);
            const data = await updateProduct(formData,editData?._id)
            console.log("data of data",data)
            if(data?.success){
              console.log("success condition")
              dispatch(productDataActions.getProducts(data.payload));
            }
      }

      const handleClearData = () => {
        setFormState({
          file: null,
          productName: '',
          price : '',
          description : ''
        })
        setCategoryName('')
        setEditData(null)
        console.log("after clear",editData,formState,categoryName)
      }

      console.log("edit data",editData)

      console.log("condition for file",(typeof formState.file == null || typeof formState.file == 'string'),typeof formState.file)

  return (
<>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" 
data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="false">
  <div class="modal-dialog"  role="document">
    <div class="modal-content" style={{background:'#f5f5f5'}}>
      <div class="modal-header" style={{color:'white'}}>
        <h5 class="modal-title" id="exampleModalLabel" style={{color:'black'}}>{editData ? 'Update' : 'Create'} Product</h5>
        <i class="bi bi-x-lg" data-bs-dismiss="modal" onClick={handleClearData}
                aria-label="Close" style={{cursor:'pointer',color:'black'}}></i>
        {/* <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> */}
      </div>
      <div class="modal-body">
      <input type="text" className='form-control mb-4' name="productName"
      value={formState.productName} 
      onChange={handleChange} 
      placeholder='Product Name' />
      {/* {
        (typeof formState.file == 'object') ? <input type="file"
        // id="productFileUpload"
         className='form-control mb-4' 
        onChange={handleChange} 
        name='file'
        placeholder='br nyar'
        minLength={1} accept="image/png, image/gif, image/jpeg , image/jpg"  /> :  */}
        
      <div className='form-control' style={{padding:'20px',display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',marginBottom:'20px'}}>
        <label htmlFor="productFileUpload">
        {
          typeof formState.file == 'object' ? null : 
          <img src={baseUrl+editData?.imgUrl} alt="" style={{width:'100px',height:'70px',borderRadius:'10px',objectFit:'cover'}} />
        }
        <input type="file"
        id="productFileUpload"
        style={{display:`${typeof formState.file == 'object' ? 'block' : 'none'}`}}
         className='form-control' 
        onChange={handleChange} 
        name='file'
        minLength={1} accept="image/png, image/gif, image/jpeg , image/jpg"  />
        </label>
      </div>

      {/* }               */}
              <Select
                value={categories?.filter((v)=>v?.value == categoryName)}
                onChange={handleSelectChange}
                name="categoryName"
                options={categories}
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
                    color:'black',
                    marginBottom:'20px'
                  }),
                }}
              />

      <input type="text" className='form-control mb-4' name="description" 
     value={formState.description} 
     onChange={handleChange}  
      placeholder='Description' />
      <input type="number" className='form-control mb-4' name="price" 
     value={formState.price} 
     onChange={handleChange}  
      placeholder='Price' />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="productModalCancel" data-bs-dismiss="modal" aria-label="Close" onClick={handleClearData}>Close</button>
        <button type="button" class="btn btn-primary" onClick={editData ? handleUpdate : handleSubmit}>{editData ? 'Update' : 'Save'}</button>
      </div>
    </div>
  </div>
</div>
{/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}
</>
  )
}
