import React from 'react'
import Banner from '../Banner/Banner'
import ServiceSection from '../Services/ServiceSection'
import BrandSlider from '../BrandSlider/BrandSlider'
import FeatureSection from '../FeatureSection/FeatureSection'
import Merchant from '../Marchent/Marchent'

function Home() {
  return (
    <div>
        <Banner></Banner>
        <ServiceSection></ServiceSection>
        <BrandSlider></BrandSlider>
        <FeatureSection></FeatureSection>
        <Merchant></Merchant>
    </div>
  )
}

export default Home