import React from 'react';
import Marquee from 'react-fast-marquee';

import amazon from '../../../assets/brands/amazon.png';
import amazonVector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import start from '../../../assets/brands/start.png';
import startPeople from '../../../assets/brands/start-people 1.png';

const logos = [
  amazon,
  amazonVector,
  casio,
  moonstar,
  randstad,
  start,
  startPeople,
];

function BrandSlider() {
  return (
    <div className="py-10 bg-white">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          We've helped thousands of sales teams
        </h2>
      </div>

      <Marquee
        speed={50}
        pauseOnHover={true}
        gradient={false}
      >
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`brand-${index}`}
            className="h-4 w-auto mx-8 object-contain"
          />
        ))}
      </Marquee>
    </div>
  );
}

export default BrandSlider;
