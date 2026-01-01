import React, { useState } from "react";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/host-profile/edit/profile`,
        formData,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success("Profile Updated Successfully", { position: "top-left" });
      // console.log(res);
      queryClient.invalidateQueries(["hostProfileData"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error("something went wrong");
    },
  });
};

const UpdateProfile = ({ data }) => {
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

    createUpdate.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Update Profile</h2>
            <p className="text-slate-600 mt-2">Edit your profile information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    placeholder="Enter business name"
                    value={form.businessName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="gmail"
                    placeholder="Enter email address"
                    value={form.gmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                Address Details
              </h3>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Address
                  </label>
                  <textarea
                    name="address"
                    placeholder="Enter full address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      placeholder="Enter state"
                      value={form.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="6-digit PIN"
                      value={form.pincode}
                      onChange={handleChange}
                      maxLength="6"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Landmark
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    placeholder="Nearby landmark"
                    value={form.landmark}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Tell us about your business..."
                value={form.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400 resize-none"
              />
            </div>

            {/* Profile Photos */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                Profile Photos
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    User Profile Photo
                  </label>
                  <input
                    type="file"
                    name="userProfilePhotoUrl"
                    onChange={handleChange}
                    className="block w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    accept="image/*"
                  />
                  {/* {data?.profileData?.userProfilePhotoUrl && (
                    <p className="text-xs text-slate-500 mt-1">
                      Current: {data.profileData.userProfilePhotoUrl.split('/').pop()}
                    </p>
                  )} */}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Business Profile Photo
                  </label>
                  <input
                    type="file"
                    name="businessProfilePhotoUrl"
                    onChange={handleChange}
                    className="block w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    accept="image/*"
                  />
                  {/* {data?.profileData?.businessProfilePhotoUrl && (
                    <p className="text-xs text-slate-500 mt-1">
                      Current: {data.profileData.businessProfilePhotoUrl.split('/').pop()}
                    </p>
                  )} */}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-200">
              <button
                type="submit"
                disabled={createUpdate.isPending}
                className="w-full md:w-auto cursor-pointer px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {createUpdate.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Updating Profile...
                  </span>
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;