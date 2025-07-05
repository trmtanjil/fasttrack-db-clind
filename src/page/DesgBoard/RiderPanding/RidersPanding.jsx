import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hoocks/useAxiosSecure';
import LoadingId from '../../Loading/Loading';
 
function RidersPendingWithQuery() {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: riders = [], refetch ,isPending} = useQuery({
    queryKey: ['pendingRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/pending');
      return res.data;
    }
  });
  console.log(riders)

  const handleDecision = (id, decision) => {
    console.log(id, decision)
    Swal.fire({
      title: `Are you sure to ${decision}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${decision}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/riders/${id}`, { status: decision });
          Swal.fire('Success', `Rider ${decision}d successfully`, 'success');
          refetch(); 
          setShowModal(false);
        } catch (err) {
          Swal.fire('Error', 'Something went wrong', 'error',err);
        }
      }
    });
  };

  if(isPending){
    return <LoadingId></LoadingId>
  }
  const handleOpenModal = (rider) => {
    setSelectedRider(rider);
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setSelectedRider(null);
    setShowModal(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Pending Riders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">District</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {riders.map(rider => (
              <tr key={rider._id} className="border-b">
                <td className="py-3 px-4">{rider.name}</td>
                <td className="py-3 px-4">{rider.email}</td>
                <td className="py-3 px-4">{rider.phone}</td>
                <td className="py-3 px-4">{rider.district}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                    onClick={() => handleOpenModal(rider)}
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDecision(rider._id, 'approved')}
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecision(rider._id, 'rejected')}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedRider && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Rider Application Details</h3>
            <p><strong>Name:</strong> {selectedRider.name}</p>
            <p><strong>Email:</strong> {selectedRider.email}</p>
            <p><strong>Phone:</strong> {selectedRider.phone}</p>
            <p><strong>Age:</strong> {selectedRider.age}</p>
            <p><strong>Region:</strong> {selectedRider.region}</p>
            <p><strong>District:</strong> {selectedRider.district}</p>
            <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</p>
            <p><strong>Bike Reg No:</strong> {selectedRider.bikeRegNumber}</p>
            <p><strong>NID:</strong> {selectedRider.nidNumber}</p>
            <p><strong>Applied At:</strong> {new Date(selectedRider.appliedAt).toLocaleString()}</p>

            <div className="flex justify-end gap-4 mt-6">
              <button onClick={handleCloseModal} className="border border-gray-400 px-4 py-2 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RidersPendingWithQuery;
