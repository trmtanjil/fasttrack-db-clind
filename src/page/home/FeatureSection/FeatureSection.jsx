import React from 'react';
import liveTracking from '../../../assets/live-tracking.png';
import safeDelivery from '../../../assets/safe-delivery.png';
import tinyDelivery from '../../../assets/tiny-deliveryman.png';

const data = [
  {
    id: 1,
    image: liveTracking,
    title: "Live Tracking",
    description: "Track your parcel in real-time from pickup to delivery point.",
  },
  {
    id: 2,
    image: safeDelivery,
    title: "Safe Delivery",
    description: "Your products are handled with utmost care and security.",
  },
  {
    id: 3,
    image: tinyDelivery,
    title: "Fast Delivery",
    description: "We ensure quick and reliable delivery with our active riders.",
  },
];

const FeatureSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      {data.map((item) => (
        <div key={item.id} className="flex bg-white shadow-md rounded-xl overflow-hidden">
          {/* Image Section - 20% */}
          <div className="w-[20%] bg-gray-50 flex items-center justify-center p-4">
            <img src={item.image} alt={item.title} className="w-full h-auto object-contain" />
          </div>

          {/* Text Section - 80% */}
          <div className="w-[80%] p-6 flex items-start gap-4">
            {/* Dashed Divider */}
            <div className="w-1 h-full border-l border-dashed border-gray-400 mt-1"></div>

            {/* Content */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureSection;
