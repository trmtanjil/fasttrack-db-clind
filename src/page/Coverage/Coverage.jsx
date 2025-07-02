import React from 'react';
import DistrictMap from './DistrictMap';
import { useLoaderData } from 'react-router';

const Coverage = () => {

    const serviceCenters = useLoaderData()

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <h2 className="text-3xl font-bold text-center">
        We are available in <span className="text-primary">64 districts</span>
      </h2>

      {/* Map */}
      <DistrictMap serviceCenters={serviceCenters}/>
    </div>
  );
};

export default Coverage;
