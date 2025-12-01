import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContextApi/AuthContext";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// this place holder is used when the actual image is not loaded
const Placeholder = ({ className = "h-20 w-20 rounded-full bg-gray-200" }) => (
  <div
    className={className + " flex items-center justify-center text-gray-400"}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.303.544 6.121 1.504M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  </div>
);


const OwnerProfile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Profile state (console-only save)
  const [profile, setProfile] = useState({
    // firebaseUid: currentUser?.uid || "",
    userProfilePhotoUrl: currentUser?.photoURL || null,
    businessProfilePhotoUrl: null, // user supplied
    firstName: currentUser?.displayName?.split?.(" ")?.[0] || "",
    lastName: currentUser?.displayName?.split?.(" ")?.[1] || "",
    businessName: "",
    phone: "",
    gmail: currentUser?.email || "",
    adminVerify: false,
    rating: 4.8,
    reviews: 12,
    state: "",
    city: "",
    pincode: "",
    address: "",
    landmark: "",
    status: "Active",
    description: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  // used for mobile modal animation (mounted -> animate up)
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isEdit) {
      // small delay to allow CSS transition
      requestAnimationFrame(() => setModalVisible(true));
      // prevent body scroll while modal is open
      document.body.style.overflow = "hidden";
    } else {
      setModalVisible(false);
      document.body.style.overflow = "";
    }
    // cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isEdit]);

  // Image upload  (uses given key names)
  const handleImageUpload = (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // const url = URL.createObjectURL(file);
    setProfile((p) => ({ ...p, [key]: file }));
  };

  // image preview this is used to preview the image on the div container
  const getPreview=(image)=>{
    if(!image) return null;
    return typeof image==="string" ? image:URL.createObjectURL(image);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
      setProfile((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData=new FormData();
    formData.append("firebaseUid",currentUser?.uid);
    formData.append("userProfilePhotoUrl",profile.userProfilePhotoUrl ? profile.userProfilePhotoUrl:null);
    formData.append("businessProfilePhotoUrl",profile.businessProfilePhotoUrl ? profile.businessProfilePhotoUrl : null);
    formData.append("firstName",profile.firstName);
    formData.append("lastName",profile.lastName);
    formData.append("businessName",profile.businessName);
    formData.append("phone",profile.phone);
    formData.append("gmail",profile.gmail);
    formData.append("state",profile.state);
    formData.append("city",profile.city);
    formData.append("pincode",profile.pincode);
    formData.append("address",profile.address);
    formData.append("landmark",profile.landmark);
    formData.append("description",profile.description);
    // console.log("Profile payload (console-only):", formData);
    try{
      // TODO : change the api after backend deployment
      const res=await axios.post("http://localhost:3000/taskopia/u1/api/owner-profile/upload/profile",formData);
      // console.log(res);
    }catch(err){
      console.log(err);
      console.log(err.message);
      return;
    }
    // close with animation
    setModalVisible(false);
    // small delay to allow slide-down animation, then unmount modal
    setTimeout(() => setIsEdit(false), 240);
  };

  const logout = async () => {
    const ok = confirm("Are you sure you want to logout?");
    if (!ok) return;
    await auth.signOut();
    navigate("/");
  };

  // helper: render star string (max 5)
  const renderStars = (r) => {
    const n = Math.round(Math.max(0, Math.min(5, r || 0)));
    return "★".repeat(n) + "☆".repeat(5 - n);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white pb-24">
      {/* header */}
      <header className="">
        <div className="w-full ">
          <div className="relative rounded-b-2xl shadow-md">
            <div className="h-[160px] sm:h-[200px] md:h-[240px] lg:h-[280px] ">
              {/* background overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-sky-200 to-white/70" />
              {/* banner content centered */}
              <div className="relative mt-25 md:mt-15 max-w-6xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-12">
                <div className="flex  items-center justify-center gap-4 md:gap-6 ">
                  <div className="flex-shrink-0">
                    {profile?.businessProfilePhotoUrl ? (
                      <img
                        src={profile?.businessProfilePhotoUrl}
                        alt="business"
                        className="h-20 w-20 sm:h-24 sm:w-24 md:h-38 md:w-38 rounded-2xl object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-2xl border-4 border-white shadow-lg overflow-hidden">
                        <Placeholder className="h-full w-full rounded-2xl" />
                      </div>
                    )}
                  </div>

                  <div className="text-left">
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-sky-900">
                      {profile.businessName || "Your Business Name"}
                    </h1>
                    <p className="text-xs sm:text-sm text-sky-700/80 mt-1">
                      {profile.city || "City"}, {profile.state || "State"}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2 items-center">
                      <div className="inline-flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full shadow-sm">
                        <div className="text-yellow-500 text-sm">
                          {renderStars(profile.rating)}
                        </div>
                        <span className="text-sm text-sky-800 font-medium">
                          {profile.rating} · {profile.reviews} reviews
                        </span>
                      </div>
                      {profile.adminVerify ? (
                        <span className="inline-flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full text-sm text-sky-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-green-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full text-sm text-sky-600">
                          Not Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Desktop Edit button */}
                <div className="ml-auto hidden md:block">
                  <button
                    onClick={() => setIsEdit(true)}
                    className="bg-sky-700 cursor-pointer hover:bg-sky-800 text-white px-4 py-2 rounded-lg shadow-md"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* main content */}
      <main className="max-w-6xl mx-auto mt-20 px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* left*/}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div>
                  {profile.userProfilePhotoUrl ? (
                    <img
                      src={profile.userProfilePhotoUrl}
                      alt="owner"
                      className="h-20 w-20 rounded-full object-cover border"
                    />
                  ) : (
                    <Placeholder className="h-20 w-20 rounded-full" />
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-sky-900">
                    {profile.firstName || "First"} {profile.lastName || "Last"}
                  </h3>
                  <p className="text-sm text-sky-700/80">
                    {profile.gmail || "email@example.com"}
                  </p>
                  <p className="text-sm text-sky-700/60 mt-1">
                    {profile.phone || "—"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-sky-500">Status</p>
                  <div className="mt-1 inline-flex items-center gap-2">
                    {/* <span className="text-sm font-medium text-sky-800">{profile.status}</span> */}
                    <span className="text-xs px-2 py-1 rounded-full bg-sky-50 text-sky-700">
                      {profile.status}
                    </span>
                  </div>
                </div>

                <div className="w-full sm:w-auto">
                  <button
                    onClick={logout}
                    className="w-full cursor-pointer sm:w-auto bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm shadow-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <h4 className="text-sm font-semibold text-sky-800 mb-3">
                Business Stats
              </h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-sky-50">
                  <p className="text-xs text-sky-500">Jobs</p>
                  <p className="text-lg font-bold text-sky-700">15</p>
                </div>
                <div className="p-3 rounded-lg bg-sky-50">
                  <p className="text-xs text-sky-500">Active</p>
                  <p className="text-lg font-bold text-sky-700">3</p>
                </div>
                <div className="p-3 rounded-lg bg-sky-50">
                  <p className="text-xs text-sky-500">Hires</p>
                  <p className="text-lg font-bold text-sky-700">12</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <h4 className="text-sm font-semibold text-sky-800 mb-2">
                Contact
              </h4>
              <p className="text-sm text-sky-700">
                Phone:{" "}
                <span className="font-medium">{profile.phone || "—"}</span>
              </p>
              <p className="text-sm text-sky-700 mt-1">
                Email:{" "}
                <span className="font-medium">{profile.gmail || "—"}</span>
              </p>
              <p className="text-sm text-sky-700 mt-1">
                Pincode:{" "}
                <span className="font-medium">{profile.pincode || "—"}</span>
              </p>
            </div>
          </aside>

          {/* middle and right */}
          <section className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-sky-900 mb-2">
                    About the Business
                  </h3>
                  <p className="text-sky-700/90 leading-relaxed text-sm sm:text-base">
                    {profile.description ||
                      "Add a short, compelling description about your business. What services do you provide and what's your core value?"}
                  </p>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    <span className="text-sm bg-sky-50 px-3 py-1 rounded-full text-sky-700">
                      Service Provider
                    </span>
                    <span className="text-sm bg-sky-50 px-3 py-1 rounded-full text-sky-700">
                      Hiring Now
                    </span>
                    <span className="text-sm bg-sky-50 px-3 py-1 rounded-full text-sky-700">
                      Small Business
                    </span>
                  </div>
                </div>

                {/* On narrower screens, edit button is in banner or FAB; keep small CTA here for large screens */}
                <div className="hidden lg:flex lg:items-start">
                  <button
                    onClick={() => setIsEdit(true)}
                    className="bg-sky-700 cursor-pointer hover:bg-sky-800 text-white px-4 py-2 rounded-lg shadow-md"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-sky-900 mb-3">
                Address
              </h3>
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-sky-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 21s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sky-700 leading-relaxed text-sm sm:text-base">
                    {profile.address || "No address set yet."}
                    {profile.landmark ? (
                      <span className="text-sky-500">
                        {" "}
                        — {profile.landmark}
                      </span>
                    ) : null}
                  </p>
                  <p className="text-sm text-sky-600 mt-2">
                    {profile.city && profile.state
                      ? `${profile.city}, ${profile.state} - ${
                          profile.pincode || ""
                        }`
                      : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-sky-900 mb-3">
                Latest Reviews
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-sky-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center border text-sky-500">
                        R
                      </div>
                      <div>
                        <p className="font-semibold text-sky-800">Ravi</p>
                        <p className="text-xs text-sky-600">2 weeks ago</p>
                      </div>
                    </div>
                    <div className="text-yellow-500 text-sm">★★★★★</div>
                  </div>
                  <p className="mt-2 text-sky-700 text-sm">
                    Great experience hiring — punctual and well organized.
                  </p>
                </div>

                <div className="p-4 bg-sky-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center border text-sky-500">
                        C
                      </div>
                      <div>
                        <p className="font-semibold text-sky-800">Chandu</p>
                        <p className="text-xs text-sky-600">1 month ago</p>
                      </div>
                    </div>
                    <div className="text-yellow-500 text-sm">★★★★☆</div>
                  </div>
                  <p className="mt-2 text-sky-700 text-sm">
                    Good communication and fair pay.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* MOBILE FAB (visible on small screens) */}
      <button
        onClick={() => setIsEdit(true)}
        className="fixed right-6 bottom-6 cursor-pointer  md:hidden bg-sky-700 hover:bg-sky-800 text-white p-4 rounded-full shadow-lg z-30"
        aria-label="Edit profile"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.454.263l-4 1a1 1 0 01-1.213-1.213l1-4a1 1 0 01.263-.454l9.9-9.9a2 2 0 012.828 0z" />
        </svg>
      </button>

      {/* edit */}
      {isEdit && (
        <div className="fixed inset-0 z-40">
          {/* backdrop */}
          <div
            className={`absolute inset-0 bg-white/30 backdrop-blur-sm transition-opacity duration-300 ease-out ${
              modalVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => {
              // close with animation
              setModalVisible(false);
              setTimeout(() => setIsEdit(false), 200);
            }}
          />

          {/* modal container */}
          <div className="absolute p-2 md:w-full top-1/4 bottom-0 right-0 left-0 md:inset-0 md:top-32 flex justify-center">
            <form
              onSubmit={handleSubmit}
              className={`w-full md:w-3/4 lg:w-2/3 bg-white rounded-t-2xl md:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6
          transform transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          ${
            modalVisible
              ? "translate-y-0 opacity-100 md:scale-100"
              : "translate-y-full opacity-0 md:scale-95"
          }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-sky-900">
                  Edit Profile
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setModalVisible(false);
                    setTimeout(() => setIsEdit(false), 200);
                  }}
                  className="text-sky-600 cursor-pointer hover:text-sky-800"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-sky-600 mb-1">
                    Owner Photo
                  </label>
                  <div className="flex items-center gap-3">
                    {profile.userProfilePhotoUrl ? (
                      <img
                        src={getPreview(profile.userProfilePhotoUrl)}
                        alt="owner"
                        className="h-16 w-16 rounded-full object-cover border"
                      />
                    ) : (
                      <Placeholder className="h-16 w-16 rounded-full" />
                    )}
                    <label className="text-sm text-sky-700 cursor-pointer bg-sky-50 px-3 py-1 rounded">
                      Upload
                      <input
                      name="userProfilePhotoUrl"
                        onChange={(e)=>handleImageUpload(e,"userProfilePhotoUrl")}
                        accept="image/*"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-sky-600 mb-1">
                    Business Photo
                  </label>
                  <div className="flex items-center gap-3">
                    {profile.businessProfilePhotoUrl ? (
                      <img
                        src={getPreview(profile.businessProfilePhotoUrl)}
                        alt="business"
                        className="h-16 w-16 rounded-lg object-cover border"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-lg border bg-sky-50 flex items-center justify-center text-sky-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M7 3h10l1 4H6l1-4z"
                          />
                        </svg>
                      </div>
                    )}
                    <label className="text-sm text-sky-700 cursor-pointer bg-sky-50 px-3 py-1 rounded">
                      Upload
                      <input
                      name="businessProfilePhotoUrl"
                        onChange={(e)=>handleImageUpload(e,"businessProfilePhotoUrl")}
                        accept="image/*"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <input
                  name="businessName"
                  value={profile.businessName}
                  onChange={handleChange}
                  placeholder="Business Name"
                  className="border rounded px-3 py-2 outline-none"
                />
                <input
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="border rounded px-3 py-2 outline-none"
                />
                <input
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="border rounded px-3 py-2 outline-none"
                />
                <input
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="border rounded px-3 py-2 outline-none"
                />
                <input
                  name="gmail"
                  value={profile.gmail}
                  onChange={handleChange}
                  placeholder="Gmail"
                  className="border rounded px-3 py-2 outline-none"
                />
                <input
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border rounded px-3 py-2 outline-none"
                />
                <input
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="border rounded px-3 py-2 outline-none"
                />
                <input
                  name="pincode"
                  value={profile.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="border rounded px-3 py-2 outline-none"
                />

                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  placeholder="Full Address"
                  className="col-span-1 sm:col-span-2 border rounded px-3 py-2 outline-none"
                />
                <input
                  name="landmark"
                  value={profile.landmark}
                  onChange={handleChange}
                  placeholder="Landmark"
                  className="border rounded px-3 py-2 outline-none col-span-1 sm:col-span-2"
                />
                <textarea
                  name="description"
                  value={profile.description}
                  onChange={handleChange}
                  placeholder="Business Description"
                  className="col-span-1 sm:col-span-2 border rounded px-3 py-2 outline-none h-28"
                />
              </div>

              <div className="mt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setModalVisible(false);
                    setTimeout(() => setIsEdit(false), 200);
                  }}
                  className="px-4 py-2 cursor-pointer rounded bg-gray-100 text-sky-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 cursor-pointer py-2 rounded bg-sky-700 text-white shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerProfile;
