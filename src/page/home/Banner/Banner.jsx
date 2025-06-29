import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import bannerImg1 from '../../../assets/banner/banner1.png';
import bannerImg2 from '../../../assets/banner/banner2.png';
import bannerImg3 from '../../../assets/banner/banner3.png';

function Banner() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-xl">
      <Carousel
        // autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={700}
      >
        <div>
          <img src={bannerImg1} alt="Banner 1" className="h-[450px] w-full object-cover" />
          <p className="legend bg-black/70 text-white text-lg">Fast & Reliable Delivery</p>
        </div>
        <div>
          <img src={bannerImg2} alt="Banner 2" className="h-[450px] w-full object-cover" />
          <p className="legend bg-black/70 text-white text-lg">Track Your Orders Easily</p>
        </div>
        <div>
          <img src={bannerImg3} alt="Banner 3" className="h-[450px] w-full object-cover" />
          <p className="legend bg-black/70 text-white text-lg">Trusted & Secure Service</p>
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
