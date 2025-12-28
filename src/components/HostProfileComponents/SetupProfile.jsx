import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async(formData) => {
      const res =await axios.post(
        `${
          import.meta.env.VITE_BACKEND_BASE
        }/taskopia/u1/api/host-profile/upload/profile`,
        formData,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success("Profile Submitted Successfully", { position: "top-left" });
      console.log(res);
      queryClient.invalidateQueries(["hostProfileData"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error("something went wrong");
    },
  });
};

const SetupProfile = () => {
  const createProfile = useCreateProfile();

  const [form, setForm] = useState({
    userProfilePhotoUrl: null,
    businessProfilePhotoUrl: null,
    firstName: "",
    lastName: "",
    businessName: "",
    phone: "",
    gmail: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    landmark: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      setForm((p) => ({ ...p, [name]: files[0] || null }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const err = {};

    if (form.firstName.length < 3) err.firstName = "Min 3 characters";
    if (!form.lastName) err.lastName = "Required";
    if (!form.businessName) err.businessName = "Required";
    if (form.pincode.length !== 6) err.pincode = "PIN must be 6 digits";
    if (form.description.length < 5) err.description = "Min 5 characters";
    if (!form.userProfilePhotoUrl) err.userProfilePhotoUrl = "Upload a photo";
    if (!form.businessProfilePhotoUrl)
      err.businessProfilePhotoUrl = "Upload a photo";

    setErrors(err);
    if (Object.keys(err).length) return;

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

    // const formObject = Object.fromEntries(formData.entries());
    // console.log(formObject);

    createProfile.mutate(formData);
  };

  return (
    <form onSubmit={submit} className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Host Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">User Profile Photo</label>
          <input
            type="file"
            name="userProfilePhotoUrl"
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border px-3 py-2"
            accept="image/*"
          />
          {errors.userProfilePhotoUrl && (
            <p className="text-xs text-red-500 mt-1">
              {errors.userProfilePhotoUrl}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Business Profile Photo</label>
          <input
            type="file"
            name="businessProfilePhotoUrl"
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border px-3 py-2"
            accept="image/*"
          />
          {errors.businessProfilePhotoUrl && (
            <p className="text-xs text-red-500 mt-1">
              {errors.businessProfilePhotoUrl}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border px-3 py-2"
          />
          {errors.firstName && (
            <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border px-3 py-2"
          />
          {errors.lastName && (
            <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Business Name</label>
          <input
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border px-3 py-2"
          />
          {errors.businessName && (
            <p className="text-xs text-red-500 mt-1">{errors.businessName}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            name="gmail"
            value={form.gmail}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border px-3 py-2"
          />
        </div>
      </div>

      <div className="rounded-2xl border p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">State</label>
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">PIN Code</label>
          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border px-3 py-2"
          />
          {errors.pincode && (
            <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">landmark</label>
          <input
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-xl border px-3 py-2"
          rows={4}
        />
        {errors.description && (
          <p className="text-xs text-red-500 mt-1">{errors.description}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-5 py-2 rounded-2xl shadow bg-gray-900 text-white"
      >
        {createProfile.isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default SetupProfile;
