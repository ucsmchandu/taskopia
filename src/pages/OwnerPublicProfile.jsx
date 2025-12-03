import React from "react";
import { PhoneCall,Mail,MapPin,X,Check} from "lucide-react";
const ProfileCard = ({
  userProfilePhotoUrl,
  businessProfilePhotoUrl,
  firstName,
  lastName,
  businessName,
  phone,
  gmail,
  adminVerify,
  rating,
  reviews,
  addressDetails,
  description,
}) => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6  mt-30 border border-gray-200">
      {/* Photos */}
      <div className="flex items-center justify-center gap-8 mb-6">
        <img
          src={userProfilePhotoUrl}
          alt="User"
          className="w-28 h-28 rounded-full object-cover border-2 border-blue-200"
        />
        <img
          src={businessProfilePhotoUrl}
          alt="Business"
          className="w-28 h-28 rounded-full object-cover border-2 border-green-200"
        />
      </div>

      {/* Name & Business */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        {firstName} {lastName}
      </h2>
      <p className="text-lg text-gray-500 text-center">{businessName}</p>

      {/* Rating & Reviews */}
      <div className="flex justify-center items-center gap-2 mt-3">
        <span className="text-yellow-500 text-xl">⭐</span>
        <p className="text-gray-700 text-lg font-medium">{rating}</p>
        <p className="text-gray-500 text-sm">({reviews} reviews)</p>
      </div>

      {/* Contact Section */}
      <div className="mt-6 bg-gray-100 flex flex-col gap-3 p-4 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-700 ">
          Contact Information
        </h3>
        <p className="text-gray-600">
          <PhoneCall size={18} /> <span className="font-medium">{phone}</span>
        </p>
        <p className="text-gray-600">
          <Mail size={18}/> <span className="font-medium">{gmail}</span>
        </p>
        <p className="text-gray-600">
          <MapPin size={18} /> <span className="font-medium">{addressDetails}</span>
        </p>
      </div>

      {/* About Business */}
      <div className="mt-6 bg-blue-50 p-4 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          About Business
        </h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Admin Verification */}
      <div className="flex justify-center mt-6">
        {adminVerify ? (
          <span className="flex flex-row justify-center items-center gap-3 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium shadow-sm">
            <Check size={18} /> Verified User
          </span>
        ) : (
          <span className="bg-red-100 text-red-700 px-4 py-2 flex flex-row justify-center items-center gap-2 rounded-full font-medium shadow-sm">
            <X size={17} /> Not Verified
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
