import React from "react";
import { PhoneCall,Mail,MapPin,X,Check,Star} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// TODO : need to change the id variable, to be placed in props
const ProfileCard = ({
  // profileId,
}) => {
  const profileId="692dceb1f086a803f47e3f7d"
  //get the profile details using mongo id
  const {data,isLoading,isError,refetch}=useQuery({
    queryKey:['randomOwnerProfile',profileId],
    queryFn:async()=>{
      const res= await axios.get(`http://localhost:3000/taskopia/u1/api/owner-profile/get/public-profile/${profileId}`);
      return res.data.profileData;
    },
    enabled:!!profileId
  })
  console.log(data);
  return (
  <>
  {
    isLoading ? (
       <div className="fixed inset-0 flex justify-center items-center bg-white/60 backdrop-blur-sm z-[9999]">
    <div className="h-12 w-12 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
  </div>
    ):(
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8  mt-30 mb-6 border border-gray-200">
      {/* Photos */}
      <div className="flex items-center justify-center gap-8 mb-6">
        <img
          src={data.userProfilePhotoUrl}
          alt="User"
          className="w-28 h-28 rounded-full object-cover border-2 border-blue-200"
        />
        <img
          src={data.businessProfilePhotoUrl}
          alt="Business"
          className="w-28 h-28 rounded-full object-cover border-2 border-green-200"
        />
      </div>

      {/* Name & Business */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        {data.firstName} {data.lastName}
      </h2>
      <p className="text-lg text-gray-500 text-center">{data.businessName}</p>

      {/* Rating & Reviews */}
      <div className="flex justify-center items-center gap-2 mt-3">
        <span className="text-yellow-500 text-xl"><Star/></span>
        <p className="text-gray-700 text-lg font-medium">{data.rating.average}</p>
        <p className="text-gray-500 text-sm">({data.rating.count} reviews)</p>
      </div>

      {/* Contact Section */}
      <div className="mt-6 bg-gray-100 flex flex-col gap-3 p-4 rounded-xl">
        <h3 className="text-md font-semibold text-gray-700 ">
          Contact Information
        </h3>
        <p className="text-gray-600 flex flex-row items-center gap-4">
          <PhoneCall size={18} /> <span className="font-medium text-black">{data.phone}</span>
        </p>
        <p className="text-gray-600 flex flex-row items-center gap-4">
          <Mail size={18}/> <span className="font-medium text-black">{data.gmail}</span>
        </p>
        <p className="text-gray-600 ">
          <MapPin size={18} /> <span className="font-medium text-black ">{data.addressDetails[0].state},{data.addressDetails[0].city},{data.addressDetails[0].address},{data.addressDetails[0].landMark}</span>
        </p>
      </div>

      {/* About Business */}
      <div className="mt-6 bg-blue-50 p-4 rounded-xl">
        <h3 className="text-md font-semibold text-gray-700 mb-2">
          About Business
        </h3>
        <p className="text-gray-600 leading-relaxed">{data.description}</p>
      </div>

      {/* Admin Verification */}
      <div className="flex justify-center mt-6">
        {data.adminVerify ? (
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
    )
  }
  </>
  );
};

export default ProfileCard;
