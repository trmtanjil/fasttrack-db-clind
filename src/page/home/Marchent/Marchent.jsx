import React from 'react';
import { Link } from 'react-router';
import bgImage from '../../../assets/be-a-merchant-bg.png'; // 📷 replace with your real background image
import parcelImage from '../../../assets/location-merchant.png'; // 📦 right side image

const Merchant = () => {
  return (
    <div data-aos="zoom-in-down"
      className="rounded-2xl overflow-hidden my-10"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-14 text-white">
        {/* Left Text */}
        <div className="md:w-1/2 space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold">
            Merchant and Customer Satisfaction <br /> is Our First Priority
          </h2>
          <p className="text-sm md:text-base text-primary">
            We offer the lowest delivery charges with the highest value along with
            100% safety of your product. Profast courier delivers your parcels in
            every corner of Bangladesh right on time.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/become-merchant"
              className="bg-green-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-green-300 transition"
            >
              Become a Merchant
            </Link>
            <Link
              to="/earn-with-us"
              className="border border-green-300 px-5 py-2 rounded-full hover:bg-green-100 text-green-200 font-semibold transition"
            >
              Earn with Profast Courier
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={parcelImage}
            alt="Parcel Graphic"
            className="w-64 h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Merchant;
