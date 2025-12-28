import React, { useState } from "react";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_BACKEND_BASE
        }/taskopia/u1/api/host-profile/edit/profile`,
        formData,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success("Profile Updated Successfully", { position: "top-left" });
      console.log(res);
      queryClient.invalidateQueries(["hostProfileData"]);
    },
    onError: () => {
      console.log(err);
      toast.error("some thing went wrong");
    },
  });
};

const UpdateProfile = ({ data }) => {
  // console.log(data)
  const createUpdate = useUpdateProfile();

  const [form, setForm] = useState({
    userProfilePhotoUrl: null,
    businessProfilePhotoUrl: null,
    firstName: data?.profileData?.firstName || "",
    lastName: data?.profileData?.lastName || "",
    businessName: data?.profileData?.businessName || "",
    phone: data?.profileData?.phone || "",
    gmail: data?.profileData?.gmail || "",
    state: data?.profileData?.addressDetails?.state || "",
    city: data?.profileData?.addressDetails?.city || "",
    pincode: data?.profileData?.addressDetails?.pinCode || "",
    address: data?.profileData?.addressDetails?.address || "",
    landmark: data?.profileData?.addressDetails?.landMark || "",
    description: data?.profileData?.description || "",
  });

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("businessName", form.businessName);
    formData.append("phone", form.phone);
    formData.append("gmail", form.gmail);
    formData.append("state", form.state);
    formData.append("city", form.city);
    formData.append("pincode", form.pincode);
    formData.append("address", form.address);
    formData.append("landmark", form.landmark);
    formData.append("description", form.description);
    formData.append("userProfilePhotoUrl", form.userProfilePhotoUrl);
    formData.append("businessProfilePhotoUrl", form.businessProfilePhotoUrl);

    //  const formObject = Object.fromEntries(formData.entries());
    // console.log(formObject);

    createUpdate.mutate(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center sm:text-left">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Business Name */}
        <input
          type="text"
          name="businessName"
          placeholder="Business Name"
          value={form.businessName}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        {/* Email & Phone */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            name="gmail"
            placeholder="Email"
            value={form.gmail}
            onChange={handleChange}
            className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Address */}
        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 "
        />

        {/* City, State, Pincode */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="text"
            name="pincode"
            placeholder="PIN Code"
            value={form.pincode}
            onChange={handleChange}
            className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Landmark */}
        <input
          type="text"
          name="landmark"
          placeholder="Landmark"
          value={form.landmark}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
        />

        {/* Profile Photos */}
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex-1 flex flex-col">
            User Profile Photo:
            <input
              type="file"
              name="userProfilePhotoUrl"
              onChange={handleChange}
              className="mt-1"
            />
          </label>
          <label className="flex-1 flex flex-col">
            Business Profile Photo:
            <input
              type="file"
              name="businessProfilePhotoUrl"
              onChange={handleChange}
              className="mt-1"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-teal-500 text-white p-2 rounded hover:bg-teal-600 transition"
        >
          {createUpdate.isPending ? "Updating...":"Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
