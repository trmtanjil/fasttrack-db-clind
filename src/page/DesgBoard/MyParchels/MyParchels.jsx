import React from 'react';
import useAuth from '../../../hoocks/useAuth';
import useAxiosSecure from '../../../hoocks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

function MyParcels() {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ['my-parcels', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this parcel?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`)
          .then(res => {
              if (res.data.deletedCount > 0) {
                  Swal.fire(
                      'Deleted!',
                      'Parcel has been deleted successfully.',
                      'success'
                    );
                    console.log(res.data)
              refetch();
            }
          })
          .catch(err => {
            Swal.fire('Error!', 'Failed to delete parcel.', 'error');
            console.error(err);
          });
      }
    });
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">📦 My Parcels ({parcels.length})</h2>

      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Cost (৳)</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="tooltip" data-tip={parcel.title}>
                    <span className="inline-block max-w-[120px] truncate">{parcel.title}</span>
                  </div>
                </td>
                <td className="capitalize">{parcel.type}</td>
                <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                <td>৳ {parcel.cost}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${parcel.payment_status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2">
                  <Link to={`/parcel-details/${parcel._id}`} className="btn btn-xs btn-info">View</Link>
                  <Link to={`/payment/${parcel._id}`} className="btn btn-xs btn-success">Pay</Link>
                 <Link>
                  <button onClick={() => handleDelete(parcel?._id)} className="btn btn-xs btn-error">Delete</button>
                 </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyParcels;
