import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient, useMutation } from "@tanstack/react-query";

// update the profile
const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_BACKEND_BASE
        }/taskopia/u1/api/ally-profile/edit/profile`,
        formData,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success("Profile Updated SuccessFully", { position: "top-left" });
      console.log(res);
      queryClient.invalidateQueries(["allyProfile"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error("something went wrong");
    },
  });
};

const UpdateProfile = ({ data }) => {
  // console.log(data)
  const createUpdate = useUpdateProfile();
  const [form, setForm] = useState({
    userProfilePhotoUrl: null,
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    age: data?.age || "",
    phone: data?.phone || "",
    gmail: data?.gmail || "",
    state: data?.addressDetails?.state || "",
    city: data?.addressDetails?.city || "",
    pinCode: data?.addressDetails?.pinCode || "",
    description: data?.description || "",
  });

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("age", form.age);
    formData.append("phone", form.phone);
    formData.append("gmail", form.gmail);
    formData.append("state", form.state);
    formData.append("city", form.city);
    formData.append("pinCode", form.pinCode);
    formData.append("description", form.description);
    formData.append("userProfilePhotoUrl", form.userProfilePhotoUrl);

    // const formObject = Object.fromEntries(formData.entries());
    // console.log(formObject);
    createUpdate.mutate(formData);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Update Profile
            </h2>
            <p className="text-slate-600 mt-2">Edit your profile information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="number"
                  name="age"
                  required
                  placeholder="Age"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                name="gmail"
                required
                placeholder="Email"
                value={form.gmail}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                name="city"
                required
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="state"
                required
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="pinCode"
                required
                placeholder="PIN Code"
                value={form.pinCode}
                maxLength="6"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <textarea
              name="description"
              placeholder="Tell us about your business..."
              value={form.description}
              required
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
            />

            {/* Photo */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Profile Photo
              </label>
              <input
                type="file"
                name="userProfilePhotoUrl"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm border border-slate-300 rounded-xl px-4 py-3"
              />
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-slate-200">
              <button
                type="submit"
                disabled={createUpdate.isPending}
                className="px-8 py-4 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg"
              >
                {createUpdate.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
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
