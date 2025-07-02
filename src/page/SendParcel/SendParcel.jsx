import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2"; // SweetAlert2 import
import useAuth from "../../hoocks/useAuth";
import { useLoaderData } from "react-router";

function SendParcel() {
  const warehouseData = useLoaderData(); // warehouse data with region & covered_area
  const { user } = useAuth();

  const [cost, setCost] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);
  const [senderRegion, setSenderRegion] = useState("");
  const [receiverRegion, setReceiverRegion] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const watchType = watch("type");

  const isWithinCity = senderRegion && receiverRegion && senderRegion === receiverRegion;

  const calculateCost = (type, weight = 0, withinCity = true) => {
    if (type === "document") {
      return withinCity ? 60 : 80;
    } else {
      if (weight <= 3) {
        return withinCity ? 110 : 150;
      } else {
        const extraWeight = weight - 3;
        return withinCity
          ? 110 + extraWeight * 40
          : 150 + extraWeight * 40 + 40;
      }
    }
  };

  const onSubmit = (data) => {
    const deliveryCost = calculateCost(
      data.type,
      Number(data.weight || 0),
      isWithinCity
    );
    setCost(deliveryCost);
    setSubmittedData({
      ...data,
      creation_date: new Date().toISOString(),
      cost: deliveryCost
    });

    // Show SweetAlert with pricing breakdown
    Swal.fire({
      title: 'Confirm Delivery Cost',
      html: `
        <p><strong>Parcel Type:</strong> ${data.type}</p>
        <p><strong>Weight:</strong> ${data.weight || 0} kg</p>
        <p><strong>Delivery Area:</strong> ${isWithinCity ? 'Within City' : 'Outside City/District'}</p>
        <hr/>
        <h3>Estimated Cost: ৳${deliveryCost}</h3>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Success!',
          'Parcel information saved successfully!',
          'success'
        );
        // এখানে তুমি ডাটা সেভ বা অন্য যেকোনো কাজ করতে পারো
        console.log("Saving Parcel Data:", submittedData);
      }
    });
  };

  const uniqueRegions = [...new Set(warehouseData.map((item) => item.region))];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-800 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-1">Send a Parcel</h2>
      <p className="text-gray-600 mb-6">Please fill out the following details</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* --- Parcel Info --- */}
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold mb-4 text-lg">Parcel Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Title */}
            <div className="md:col-span-3">
              <label className="label">Parcel Title</label>
              <input
                {...register("title", { required: true })}
                className="input input-bordered w-full"
                placeholder="Parcel Title"
              />
              {errors.title && (
                <p className="text-error text-sm mt-1">Title is required</p>
              )}
            </div>

            {/* Type (radio) */}
            <div className="md:col-span-3">
              <label className="label">Parcel Type</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="document"
                    {...register("type", { required: true })}
                    className="radio radio-primary"
                  />
                  Document
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="non-document"
                    {...register("type", { required: true })}
                    className="radio radio-primary"
                  />
                  Non-Document
                </label>
              </div>
              {errors.type && (
                <p className="text-error text-sm mt-1">Parcel type is required</p>
              )}
            </div>

            {/* Weight */}
            {watchType === "non-document" && (
              <div className="md:col-span-3">
                <label className="label">Weight (kg)</label>
                <input
                  {...register("weight", { required: watchType === "non-document" })}
                  type="number"
                  step="0.1"
                  min="0"
                  className="input input-bordered w-full"
                  placeholder="Weight"
                />
                {errors.weight && (
                  <p className="text-error text-sm mt-1">Weight is required for Non-Document</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* --- Sender & Receiver --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Sender Info */}
          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-4 text-lg">Sender Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                defaultValue={user?.displayName || ""}
                className="input input-bordered w-full"
                readOnly
              />
              <input
                {...register("sender_contact", { required: true })}
                className="input input-bordered w-full"
                placeholder="Sender Contact"
              />

              <select
                {...register("sender_region", { required: true })}
                onChange={(e) => setSenderRegion(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region, idx) => (
                  <option key={idx} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              <select
                {...register("sender_center", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {warehouseData
                  .find((item) => item.region === senderRegion)
                  ?.covered_area.map((center, idx) => (
                    <option key={idx} value={center}>
                      {center}
                    </option>
                  ))}
              </select>

              <input
                {...register("sender_address", { required: true })}
                className="input input-bordered w-full"
                placeholder="Sender Address"
              />

              <textarea
                {...register("sender_instruction")}
                className="textarea textarea-bordered w-full"
                placeholder="Pickup Instructions (optional)"
              />
            </div>
          </div>

          {/* Receiver Info */}
          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-4 text-lg">Receiver Info</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                {...register("receiver_name", { required: true })}
                className="input input-bordered w-full"
                placeholder="Receiver Name"
              />
              <input
                {...register("receiver_contact", { required: true })}
                className="input input-bordered w-full"
                placeholder="Receiver Contact"
              />

              <select
                {...register("receiver_region", { required: true })}
                onChange={(e) => setReceiverRegion(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region, idx) => (
                  <option key={idx} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              <select
                {...register("receiver_center", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {warehouseData
                  .find((item) => item.region === receiverRegion)
                  ?.covered_area.map((center, idx) => (
                    <option key={idx} value={center}>
                      {center}
                    </option>
                  ))}
              </select>

              <input
                {...register("receiver_address", { required: true })}
                className="input input-bordered w-full"
                placeholder="Receiver Address"
              />

              <textarea
                {...register("receiver_instruction")}
                className="textarea textarea-bordered w-full"
                placeholder="Delivery Instructions (optional)"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full mt-6">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SendParcel;
