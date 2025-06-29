import React from 'react';
import {
  FaTruckMoving,
  FaGlobeAsia,
  FaBoxes,
  FaMoneyCheckAlt,
  FaWarehouse,
  FaUndo,
} from 'react-icons/fa';

const services = [
  {
    id: 1,
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaTruckMoving className="text-5xl text-blue-600 mx-auto" />,
  },
  {
    id: 2,
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaGlobeAsia className="text-5xl text-green-600 mx-auto" />,
  },
  {
    id: 3,
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <FaBoxes className="text-5xl text-yellow-600 mx-auto" />,
  },
  {
    id: 4,
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaMoneyCheckAlt className="text-5xl text-purple-600 mx-auto" />,
  },
  {
    id: 5,
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: <FaWarehouse className="text-5xl text-pink-600 mx-auto" />,
  },
  {
    id: 6,
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <FaUndo className="text-5xl text-red-600 mx-auto" />,
  },
];

function ServiceSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
          <p className="text-gray-500 mt-2">
            We offer a complete delivery experience from start to finish
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="card bg-base-100 shadow-md p-5">
              <div className="text-center mb-4">{service.icon}</div>
              <div className="card-body items-center text-center">
                <h3 className="card-title text-lg font-semibold">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceSection;
