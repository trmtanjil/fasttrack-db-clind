import React from "react";
import { useForm, Controller } from "react-hook-form";
import authImage from "../../../assets/agent-pending.png";
import useAuth from "../../../hoocks/useAuth";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hoocks/useAxiosSecure";

function BeARider() {
  const warehouseData = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      status: "pending",
    },
  });

  const selectedRegion = watch("region");
  const filteredDistricts = warehouseData
    .filter((item) => item.region === selectedRegion)
    .map((item) => item.district);

  const onSubmit = (data) => {
    const riderData = {
      ...data, // Spread all form fields directly
      status: data.status || "pending",
      appliedAt: new Date().toISOString(),
    };

    console.log(riderData);
    axiosSecure.post("/riders", riderData).then((res) => {
      if(res.data.insertedId){
          // SweetAlert for confirmation
      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        text: "Your rider application has been submitted successfully.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      }
    
    });

      reset();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-2">Be a Rider</h2>
        <p className="text-gray-500 mb-6">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              {...register("name")}
              readOnly
              className="p-3 rounded-lg border border-gray-300 w-full"
              placeholder="Name"
            />
            <input
              type="email"
              {...register("email")}
              readOnly
              className="p-3 rounded-lg border border-gray-300 w-full"
              placeholder="Email"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                {...register("age", { required: "Age is required" })}
                className="p-3 rounded-lg border border-gray-300 w-full"
                placeholder="Age"
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                {...register("phone", { required: "Phone number is required" })}
                className="p-3 rounded-lg border border-gray-300 w-full"
                placeholder="Phone Number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Controller
                name="region"
                control={control}
                rules={{ required: "Region is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="p-3 rounded-lg border border-gray-300 w-full"
                  >
                    <option className="text-black" value="">
                      Select Region
                    </option>
                    {[...new Set(warehouseData.map((item) => item.region))].map(
                      (region) => (
                        <option
                          className="text-black"
                          key={region}
                          value={region}
                        >
                          {region}
                        </option>
                      )
                    )}
                  </select>
                )}
              />
              {errors.region && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.region.message}
                </p>
              )}
            </div>

            <div>
              <Controller
                name="district"
                control={control}
                rules={{ required: "District is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="p-3 rounded-lg border border-gray-300 w-full"
                  >
                    <option className="text-black" value="">
                      Select District
                    </option>
                    {filteredDistricts.map((district) => (
                      <option
                        className="text-black"
                        key={district}
                        value={district}
                      >
                        {district}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.district && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.district.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                {...register("bikeBrand", {
                  required: "Bike Brand is required",
                })}
                className="p-3 rounded-lg border border-gray-300 w-full"
                placeholder="Bike Brand"
              />
              {errors.bikeBrand && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bikeBrand.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                {...register("bikeRegNumber", {
                  required: "Bike Registration Number is required",
                })}
                className="p-3 rounded-lg border border-gray-300 w-full"
                placeholder="Bike Registration Number"
              />
              {errors.bikeRegNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bikeRegNumber.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <input
              type="text"
              {...register("nidNumber", { required: "NID Number is required" })}
              className="p-3 rounded-lg border border-gray-300 w-full"
              placeholder="NID Number"
            />
            {errors.nidNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nidNumber.message}
              </p>
            )}
          </div>

          <input type="hidden" value="pending" {...register("status")} />

          <button type="submit" className="w-full mt-4 btn btn-primary">
            Continue
          </button>
        </form>
      </div>

      <div className="hidden md:block">
        <img
          src={authImage}
          alt="Rider Illustration"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

export default BeARider;
