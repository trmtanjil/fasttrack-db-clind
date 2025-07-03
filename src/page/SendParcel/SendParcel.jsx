import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hoocks/useAuth";
import { useLoaderData,  } from "react-router";
import useAxiosSecure from "../../hoocks/useAxiosSecure";


const generateTrackingId = () => {
  const prefix = 'plc';

  const now = new Date();
  const year = now.getFullYear(); // 2025
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 03
  const day = String(now.getDate()).padStart(2, '0'); // 08
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';
  for (let i = 0; i < 3; i++) {
    randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `${prefix}-${year}${month}-${day}${randomPart}`; 
};



function SendParcel() {
  const warehouseData = useLoaderData();
  const { user } = useAuth();
  const axiosSecure =useAxiosSecure()
  // const navigate = useNavigate();

  const [cost, setCost] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);
  const [senderRegion, setSenderRegion] = useState("");
  const [receiverRegion, setReceiverRegion] = useState("");

  console.log(cost,submittedData)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchType = watch("type");

  const isWithinCity = senderRegion && receiverRegion && senderRegion === receiverRegion;

  const calculateBreakdown = (type, weight = 0, withinCity = true) => {
    let base = 0;
    let extraWeight = 0;
    let extraOutCity = 0;

    if (type === "document") {
      base = withinCity ? 60 : 80;
    } else {
      if (weight <= 3) {
        base = withinCity ? 110 : 150;
      } else {
        const over = weight - 3;
        extraWeight = over * 40;
        base = withinCity ? 110 : 150;
        if (!withinCity) extraOutCity = 40;
      }
    }

    const total = base + extraWeight + extraOutCity;
    return { base, extraWeight, extraOutCity, total };
  };

  const onSubmit = (data) => {
  const weight = Number(data.weight || 0);
  const { base, extraWeight, extraOutCity, total } = calculateBreakdown(
    data.type,
    weight,
    isWithinCity
  );

  setCost(total);
  const parcelData = {
    ...data,
    created_by: user.email,
    delivery_status: 'not_collected',
    payment_status: 'unpaid',
    creation_date: new Date().toISOString(),
    tracking_Id: generateTrackingId(),
    cost: total,
  };

  setSubmittedData(parcelData);

  Swal.fire({
    title: "Confirm Parcel Details",
    html: `
      <div style="text-align:left">
        <p><strong>Parcel Type:</strong> ${data.type}</p>
        <p><strong>Weight:</strong> ${weight} kg</p>
        <p><strong>Delivery Area:</strong> ${isWithinCity ? "Within City" : "Outside City"}</p>
        <hr/>
        <p><strong>Base Charge:</strong> ৳${base}</p>
        <p><strong>Extra Weight:</strong> ৳${extraWeight}</p>
        <p><strong>Outside City Extra:</strong> ৳${extraOutCity}</p>
        <hr/>
        <h3><strong>Total Cost:</strong> ৳${total}</h3>
      </div>
    `,
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "✅ Confirm & Payment",
    cancelButtonText: "✏️ Edit Info",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Success!", "Parcel information saved successfully!", "success");
      console.log("Saving Parcel Data:", parcelData);

      // Save parcel data to the server
      axiosSecure.post('/parcels', parcelData)
        .then(res => {
          console.log(res.data);
          if (res.data.insertedId) {
            // Redirect to payment page with insertedId
            // navigate(`/payment/${res.data.insertedId}`);
          }
        })
        .catch(error => {
          console.error("Error saving parcel:", error);
          Swal.fire("Error!", "Failed to save parcel data.", "error");
        });
    }
  });
};


  const uniqueRegions = [...new Set(warehouseData.map((item) => item.region))];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-800 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-1">Send a Parcel</h2>
      <p className="text-gray-600 mb-6">Please fill out the following details</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold mb-4 text-lg">Parcel Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="label">Parcel Title</label>
              <input
                {...register("title", { required: true })}
                className="input input-bordered w-full"
                placeholder="Parcel Title"
              />
              {errors.title && <p className="text-error text-sm">Title is required</p>}
            </div>

            <div className="md:col-span-3">
              <label className="label">Parcel Type</label>
              <div className="flex gap-6">
                {['document', 'non-document'].map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={type}
                      {...register("type", { required: true })}
                      className="radio radio-primary"
                    />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                ))}
              </div>
              {errors.type && <p className="text-error text-sm">Type is required</p>}
            </div>

            {watchType === "non-document" && (
              <div className="md:col-span-3">
                <label className="label">Weight (kg)</label>
                <input
                  {...register("weight", { required: true })}
                  type="number"
                  step="0.1"
                  min="0"
                  className="input input-bordered w-full"
                  placeholder="Weight"
                />
                {errors.weight && <p className="text-error text-sm">Weight required</p>}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-4 text-lg">Sender Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <input defaultValue={user?.displayName || ""} className="input input-bordered w-full" readOnly />
              <input {...register("sender_contact", { required: true })} className="input input-bordered w-full" placeholder="Sender Contact" />
              <select {...register("sender_region", { required: true })} onChange={(e) => setSenderRegion(e.target.value)} className="select select-bordered w-full">
                <option value="">Select Region</option>
                {uniqueRegions.map((region, idx) => (
                  <option key={idx} value={region}>{region}</option>
                ))}
              </select>
              <select {...register("sender_center", { required: true })} className="select select-bordered w-full">
                <option value="">Select Service Center</option>
                {warehouseData.find((item) => item.region === senderRegion)?.covered_area.map((center, idx) => (
                  <option key={idx} value={center}>{center}</option>
                ))}
              </select>
              <input {...register("sender_address", { required: true })} className="input input-bordered w-full" placeholder="Sender Address" />
              <textarea {...register("sender_instruction")} className="textarea textarea-bordered w-full" placeholder="Pickup Instructions (optional)" />
            </div>
          </div>

          {/* Receiver Info */}
          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-4 text-lg">Receiver Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <input {...register("receiver_name", { required: true })} className="input input-bordered w-full" placeholder="Receiver Name" />
              <input {...register("receiver_contact", { required: true })} className="input input-bordered w-full" placeholder="Receiver Contact" />
              <select {...register("receiver_region", { required: true })} onChange={(e) => setReceiverRegion(e.target.value)} className="select select-bordered w-full">
                <option value="">Select Region</option>
                {uniqueRegions.map((region, idx) => (
                  <option key={idx} value={region}>{region}</option>
                ))}
              </select>
              <select {...register("receiver_center", { required: true })} className="select select-bordered w-full">
                <option value="">Select Service Center</option>
                {warehouseData.find((item) => item.region === receiverRegion)?.covered_area.map((center, idx) => (
                  <option key={idx} value={center}>{center}</option>
                ))}
              </select>
              <input {...register("receiver_address", { required: true })} className="input input-bordered w-full" placeholder="Receiver Address" />
              <textarea {...register("receiver_instruction")} className="textarea textarea-bordered w-full" placeholder="Delivery Instructions (optional)" />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SendParcel;
