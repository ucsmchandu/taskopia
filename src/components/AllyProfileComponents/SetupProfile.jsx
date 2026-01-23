import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContextApi/AuthContext";

const useCreateProfile = (onProfileCreated) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_BASE
        }/taskopia/u1/api/ally-profile/upload/profile`,
        formData,
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success("Profile Submitted Successfully", { position: "top-left" });
      console.log(res);
      queryClient.invalidateQueries(["allyProfile"]);

      // the arrow function that called after successful of this api
      onProfileCreated?.();
    },
    onError: (err) => {
      console.log(err);
      console.log(err.message);
      toast.error("Something Went Wrong");
    },
  });
};

// to update the user setup profile
const useCreateUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/auth/update/user`,
        {},
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success("Profile setup completed");
      console.log(res);
      queryClient.invalidateQueries(["authData"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error("something went wrong");
    },
  });
};

const SetupProfile = () => {
  const { currentUser, loading } = useAuth();
  if (loading)
    return (
      <>
        <div className="flex flex-col items-center min-h-screen justify-center h-40 space-y-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading...</p>
        </div>
      </>
    );
  const createUpdateUser = useCreateUpdateUser();
  const createProfile = useCreateProfile(() => {
    createUpdateUser.mutate();
  });

  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      toast.warning("Geolocation is not supported in this browser");
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.log("Error getting the location :", error);
          return;
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      toast.warning("Please allow the location to move further");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);
  // console.log(userLocation.latitude);

  const [form, setForm] = useState({
    userProfilePhotoUrl: null,
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    gmail: currentUser?.email || "",
    state: "",
    city: "",
    pinCode: "",
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
    if (!userLocation?.latitude || !userLocation?.longitude) {
      toast.warning("Please allow the location to move further");
      return;
    }

    if (form.firstName.length < 3) err.firstName = "Min 3 characters";
    if (!form.lastName) err.lastName = "Required";
    if (form.age < 18) err.age = "Age must be 18+";
    if (!/^(?:\+91)?[9876]\d{9}$/.test(form.phone)) err.phone = "Invalid phone";
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.gmail))
      err.gmail = "Invalid email";
    if (form.pinCode.length !== 6) err.pinCode = "PIN must be 6 digits";
    if (form.description.length < 5) err.description = "Min 5 characters";
    if (!form.userProfilePhotoUrl) err.userProfilePhotoUrl = "Upload photo";

    setErrors(err);
    if (Object.keys(err).length) return;

    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("age", form.age);
    formData.append("phone", form.phone);
    formData.append("gmail", form.gmail);
    formData.append("state", form.state);
    formData.append("pinCode", form.pinCode);
    formData.append("city", form.city);
    formData.append("description", form.description);
    formData.append("userProfilePhotoUrl", form.userProfilePhotoUrl);
    formData.append("latitude", userLocation.latitude);
    formData.append("longitude", userLocation.longitude);

    // const formObject = Object.fromEntries(formData.entries());
    // console.log(formObject);
    createProfile.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4">
      <form onSubmit={submit} className="max-w-4xl mx-auto mt-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 space-y-8">
          <div className="border-b border-slate-200 pb-6">
            <h1 className="text-3xl font-bold text-slate-900">
              User Profile Setup
            </h1>
            <p className="text-slate-600 mt-2">
              Fill your details carefully — it only takes a minute.
            </p>
          </div>

          {/* PHOTO */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Profile Photo
            </label>
            <input
              type="file"
              name="userProfilePhotoUrl"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-slate-300 rounded-xl"
            />
            {errors.userProfilePhotoUrl && (
              <p className="text-xs text-red-600">
                {errors.userProfilePhotoUrl}
              </p>
            )}
          </div>

          {/* PERSONAL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstName && (
                <p className="text-xs text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Last Name
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.lastName && (
                <p className="text-xs text-red-600">{errors.lastName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Age
              </label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.age && (
                <p className="text-xs text-red-600">{errors.age}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && (
                <p className="text-xs text-red-600">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                name="gmail"
                type="email"
                value={form.gmail}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.gmail && (
                <p className="text-xs text-red-600">{errors.gmail}</p>
              )}
            </div>
          </div>

          {/* LOCATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                State
              </label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                City
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                PIN Code
              </label>
              <input
                name="pinCode"
                value={form.pinCode}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.pinCode && (
                <p className="text-xs text-red-600">{errors.pinCode}</p>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              rows={5}
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300"
              placeholder="Tell us something about you..."
            />
            {errors.description && (
              <p className="text-xs text-red-600">{errors.description}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={createProfile.isPending}
            className="w-full cursor-pointer md:w-auto px-8 py-4 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
          >
            {createProfile.isPending ? (
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
                Saving Profile...
              </span>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetupProfile;
