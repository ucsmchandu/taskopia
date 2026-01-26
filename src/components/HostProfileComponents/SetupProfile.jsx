import { useState } from "react";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContextApi/AuthContext";
import { useQuery } from "@tanstack/react-query";

const useCreateProfile = (onProfileCreated) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_BASE
        }/taskopia/u1/api/host-profile/upload/profile`,
        formData,
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success("Profile Submitted Successfully", { position: "top-left" });
      console.log(res);
      queryClient.invalidateQueries(["hostProfileData"]);
      queryClient.invalidateQueries(["notifications"])
      // the arrow function that called after successful of this api
      onProfileCreated?.();
    },
    onError: (err) => {
      console.log(err);
      toast.error("something went wrong");
    },
  });
};

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
      queryClient.invalidateQueries(["notifications"])
    },
    onError: (err) => {
      console.log(err);
      toast.error("something went wrong");
    },
  });
};

// get the location by reverse geocoding
const getLocationName = async (lat, lng) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const SetupProfile = () => {
  const { currentUser, loading } = useAuth();
  const [locationError, setLocationError] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  if (loading)
    return (
      <>
        <div className="flex flex-col min-h-screen items-center justify-center h-40 space-y-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading...</p>
        </div>
      </>
    );

  // get the location form the api
  const {
    data: locationName,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [
      "allyLocationName",
      userLocation.latitude,
      userLocation.longitude,
    ],
    queryFn: () =>
      getLocationName(userLocation.latitude, userLocation.longitude),
    staleTime: 6 * 60 * 60 * 1000, //6 hours
    gcTime: 24 * 60 * 60 * 1000, //24 hours
    refetchOnWindowFocus: false,
    enabled: !!userLocation.latitude && !!userLocation.longitude,
  });

  // console.log(locat/ionName);

  // mutations
  const createUpdateUser = useCreateUpdateUser();
  const createProfile = useCreateProfile(() => {
    createUpdateUser.mutate();
  });

  const [form, setForm] = useState({
    userProfilePhotoUrl: null,
    businessProfilePhotoUrl: null,
    firstName: "",
    lastName: "",
    businessName: "",
    phone: "",
    gmail: currentUser?.email || "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    landmark: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  // get the location coords
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
          setLocationError(true);
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

  // update form with locationname data when it becomes available
  useEffect(() => {
    if (locationName?.address) {
      setForm((prev) => ({
        ...prev,
        state: locationName?.address?.state || "",
        city: locationName?.address?.town || locationName?.address?.city || "",
        pincode: locationName?.address?.postcode || "",
        address: locationName?.display_name || "",
      }));
    }
  }, [locationName]);

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

  if (locationError) {
    return (
      <div className="flex min-h-screen justify-center items-center h-60">
        <p className="text-gray-600 font-medium">
          Location access denied. Enable location to see nearby tasks.
        </p>
      </div>
    );
  }

  return (
    <>
      {(isPending || isFetching) && (
        <div className="flex flex-col min-h-screen items-center justify-center h-40 space-y-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading Location...</p>
        </div>
      )}
      {
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4">
          <form onSubmit={submit} className="max-w-4xl mx-auto mt-20">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 space-y-8">
              <div className="border-b border-slate-200 pb-6">
                <h1 className="text-3xl font-bold text-slate-900">
                  Host Profile Setup
                </h1>
                <p className="text-slate-600 mt-2">
                  Complete your profile to get started
                </p>
              </div>

              {/* Photo Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    User Profile Photo
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="userProfilePhotoUrl"
                      onChange={handleChange}
                      className="block w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      accept="image/*"
                    />
                  </div>
                  {errors.userProfilePhotoUrl && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                      <span></span> {errors.userProfilePhotoUrl}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Business Profile Photo
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="businessProfilePhotoUrl"
                      onChange={handleChange}
                      className="block w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      accept="image/*"
                    />
                  </div>
                  {errors.businessProfilePhotoUrl && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                      <span></span> {errors.businessProfilePhotoUrl}
                    </p>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                      placeholder="Enter first name"
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                        <span></span> {errors.firstName}
                      </p>
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                        <span></span> {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Business Name
                    </label>
                    <input
                      name="businessName"
                      value={form.businessName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                      placeholder="Enter business name"
                    />
                    {errors.businessName && (
                      <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                        <span></span> {errors.businessName}
                      </p>
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Email
                    </label>
                    <input
                      name="gmail"
                      type="email"
                      value={form.gmail}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  Address Details
                </h2>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        State
                      </label>
                      <input
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                        placeholder="Enter state"
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
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                        placeholder="Enter city"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        PIN Code
                      </label>
                      <input
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                        placeholder="6-digit PIN code"
                        maxLength="6"
                      />
                      {errors.pincode && (
                        <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                          <span></span> {errors.pincode}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Landmark
                      </label>
                      <input
                        name="landmark"
                        value={form.landmark}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                        placeholder="Nearby landmark"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Address
                      </label>
                      <input
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                        placeholder="Enter full address"
                      />
                    </div>
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
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400 resize-none"
                  rows={5}
                  placeholder="Tell us about your business..."
                />
                {errors.description && (
                  <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                    <span></span> {errors.description}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={createProfile.isPending}
                  className="w-full cursor-pointer md:w-auto px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
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
            </div>
          </form>
        </div>
      }
    </>
  );
};

export default SetupProfile;
