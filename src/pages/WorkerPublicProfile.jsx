import React from "react";
import { PhoneCall,Mail,MapPin,X,Check,Hourglass } from "lucide-react";
const WorkerPublicProfile = ({
  userprofileurl,
  firstname,
  lastname,
  phone,
  skills = [],
  gmail,
  avaliability,
  rating,
  description,
  addressdetails,
}) => {
  return (
    <div className="max-w-3xl mx-auto mt-30 bg-white border border-gray-200 shadow-md rounded-2xl p-6">
      {/* Profile Photo */}
      <div className="flex justify-center mb-5">
        <img
          src={userprofileurl}
          alt="User"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-sm"
        />
      </div>

      {/* Name */}
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        {firstname} {lastname}
      </h2>

      {/* Rating */}
      <div className="flex justify-center items-center gap-2 mt-2">
        <span className="text-yellow-500 text-xl">⭐</span>
        <p className="text-gray-700 font-medium text-lg">{rating}</p>
      </div>

      {/* Contact Info */}
      <div className="mt-6 bg-gray-100 p-4 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Contact Information
        </h3>
        <p className="text-gray-600">
          <PhoneCall size={18} /> <span className="font-medium">{phone}</span>
        </p>
        <p className="text-gray-600">
          <Mail size={18}/> <span className="font-medium">{gmail}</span>
        </p>
        <p className="text-gray-600">
          <MapPin/> <span className="font-medium">{addressdetails}</span>
        </p>

        <p className="text-gray-600 mt-1">
          <Hourglass size={18} /> <span className="font-medium">{avaliability}</span>
        </p>
      </div>

      {/* Skills Section */}
      <div className="mt-6 bg-blue-50 p-4 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Skills
        </h3>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No skills added</p>
        )}
      </div>

      {/* About Section */}
      <div className="mt-6 bg-green-50 p-4 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          About
        </h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default WorkerPublicProfile;
