import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Store,
  CheckCircle,
  XCircle,
  User,
} from "lucide-react";

const getProfile = async (id) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/host-profile/get/public-profile/${id}`,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const HostPublicProfile = () => {
  const businessData = {
    firstName: "Chandu",
    lastName: "Uppu",
    businessName: "Fruits Shop",
    gmail: "chanduuppu0@gmail.com",
    phone: "9000813729",
    description: "hello,\nI sell fruits for reasonable prices",
    addressDetails: {
      address: "sanghivalasa",
      city: "vizag",
      landMark: "near anits college",
      pinCode: "531162",
      state: "andhra pradesh",
    },
    businessProfilePhotoUrl:
      "https://res.cloudinary.com/dllvcgpsk/image/upload/v1766898818/taskopia/lesepixvyankhqtnzy6g.jpg",
    userProfilePhotoUrl:
      "https://res.cloudinary.com/dllvcgpsk/image/upload/v1766898818/taskopia/w8mqllilwpniqwnrmt9e.jpg",
    rating: {
      average: 0,
      count: 0,
    },
    status: "active",
    adminVerify: false,
    createdAt: "2025-12-28T05:13:39.092Z",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { id } = useParams();
  // console.log(id);
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["hostPublicProfile", id],
    queryFn: () => getProfile(id),
    staleTime: 5 * 60 * 1000,
  });

  // console.log(data);

  return (
    <>
      {(isPending || isFetching) && (
        <div className="flex flex-col min-h-screen items-center justify-center h-40 space-y-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading...</p>
        </div>
      )}
      {!isPending && !isFetching && (
        <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mt-15">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Banner Image */}
              <div className="relative h-48 sm:h-56 bg-gray-200">
                <img
                  src={businessData.businessProfilePhotoUrl}
                  alt="Business Banner"
                  className="w-full h-full object-cover"
                />

                {/* Status Badge on Banner */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-sm ${
                      businessData.status === "active"
                        ? "bg-white/90 text-green-700"
                        : "bg-white/90 text-gray-700"
                    }`}
                  >
                    {businessData.status === "active" ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5" />
                    )}
                    {businessData.status.charAt(0).toUpperCase() +
                      businessData.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Profile Section */}
              <div className="px-6 sm:px-8 pb-8">
                {/* Profile Picture Overlapping Banner */}
                <div className="flex justify-center -mt-16 sm:-mt-20 mb-6">
                  <div className="relative">
                    <img
                      src={businessData.userProfilePhotoUrl}
                      alt={`${businessData.firstName} ${businessData.lastName}`}
                      className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-xl object-cover bg-white"
                    />
                  </div>
                </div>

                {/* Business Name & Owner */}
                <div className="text-center mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize mb-2">
                    {businessData.businessName}
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {businessData.firstName} {businessData.lastName}
                  </p>
                </div>

                {/* Description */}
                <div className="text-center mb-8 max-w-2xl mx-auto">
                  <p className="text-gray-600 text-sm sm:text-base whitespace-pre-line">
                    {businessData.description}
                  </p>
                </div>

                {/* Rating & Verification Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="text-lg font-semibold text-gray-900">
                      {businessData.rating.average.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({businessData.rating.count})
                    </span>
                  </div>

                  {/* <div
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  businessData.adminVerify
                    ? "bg-green-50 text-green-700"
                    : "bg-orange-50 text-orange-700"
                }`}
              >
                {businessData.adminVerify ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Admin Verified</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Verification Pending
                    </span>
                  </>
                )}
              </div> */}
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white rounded-lg">
                      <Mail className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">Email</p>
                      <p className="text-sm sm:text-base text-gray-900 font-medium truncate">
                        {businessData.gmail}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white rounded-lg">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                      <p className="text-sm sm:text-base text-gray-900 font-medium">
                        {businessData.phone}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white rounded-lg mt-1">
                      <MapPin className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Address</p>
                      <p className="text-sm sm:text-base text-gray-900 font-medium capitalize mb-1">
                        {businessData.addressDetails.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        {businessData.addressDetails.landMark}
                      </p>
                      <p className="text-sm text-gray-600 capitalize">
                        {businessData.addressDetails.city},{" "}
                        {businessData.addressDetails.state} -{" "}
                        {businessData.addressDetails.pinCode}
                      </p>
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">
                        Member Since
                      </p>
                      <p className="text-sm sm:text-base text-gray-900 font-medium">
                        {formatDate(businessData.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HostPublicProfile;
