import React from 'react'
import { Container } from 'reactstrap'
import '../style/common-section.css'


export default function Commonsection({title}) {
  return (
    <section className='common_section_container'>
        <Container >
            <h1>{title}</h1>
        </Container>
    </section>
  )
}
