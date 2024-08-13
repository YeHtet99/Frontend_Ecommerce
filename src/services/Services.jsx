import React from 'react'
import { Container,Row,Col } from 'reactstrap'
import ServicesData from '../assets/data/serviceData'
import '../services/services.css'
export default function Services() {
  return (
    <div style={{marginTop:30}}>
        <section className='services'>
            <Container>
                <Row>
                    {
                        ServicesData.map((item,index)=>(
                            <Col lg='3' md='4'>
                            <div className='service_details' 
                            style={{
                                // background:`${item.bg}`
                                background:'#f5f5f5',
                                border:'1px solid #dddd'
                                }}>
                                <span className='service_icon' >
                                <i style={{fontWeight:"lighter"}} class={item.icon}></i>
                                </span>
                                <span style={{display:'flex',flexDirection:'column'}}>
                                    <div style={{fontSize:'24px',fontWeight:'bold',color:'black'}}>{item.title}</div>
                                    <div style={{fontSize:'16px',color:'black'}}>{item.subtitle}</div>
                                </span>
                            </div>
                        </Col>
                        ))
                    }
                    
                </Row>
            </Container>
        </section>
    </div>
  )
}
