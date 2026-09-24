import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Award,
  XCircle,
  ChevronDown,
  MessageSquare,
} from "lucide-react";

const getProfile = async (id) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/ally-profile/get/public-profile/${id}`,
      { withCredentials: true }
    );
    return res.data.profileData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// get the reviews
const getRatingReviews=async(id)=>{
  try{
    const res=await axios.get(`${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/ratings/profile/reviews/${id}`,{withCredentials:true});
    return res.data.reviewsData;
  }catch(err){
    console.log(err);
    return null;
  }
}

/* shared glass surface style */
const glass =
  "bg-white/70 backdrop-blur-xl border border-[#90CAF9]/60 shadow-[0_8px_32px_rgba(13,71,161,0.08)]";

const Stars = ({ value = 0, size = "w-4 h-4" }) => (
  <div className="flex items-center gap-0.5" aria-label={`${value} out of 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        className={`${size} ${
          n <= Math.round(value)
            ? "text-[#2196F3] fill-[#2196F3]"
            : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

const InfoTile = ({ icon: Icon, label, children, href, className = "" }) => {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={`group flex items-start gap-3.5 rounded-2xl p-4 ${glass} ${
        href
          ? "transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2196F3]"
          : ""
      } ${className}`}
    >
      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#E3F2FD] border border-[#90CAF9] flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#0D47A1]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 mb-0.5">{label}</p>
        {children}
      </div>
    </Wrapper>
  );
};

const AllyPublicProfile = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { id } = useParams();
  //   console.log(id)

  // UI only: reviews stay hidden until the visitor asks for them
  const [showReviews, setShowReviews] = useState(false);

  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["allyPublicProfile", id],
    queryFn: () => getProfile(id),
    staleTime: 5 * 60 * 1000,
  });

  // get reviews
  const {data:reviewData,isPending:reviewPending,isFetching:reviewFetching,isError:isReviewError}=useQuery({
    queryKey:["allyProfileReviewsList",id],
    queryFn:()=>getRatingReviews(id),
    staleTime:5*60*1000,
    enabled: showReviews, // only fetch once the visitor opens the reviews
  });

  //   console.log(data);

  const fullName = `${data?.firstName ?? ""} ${data?.lastName ?? ""}`.trim();

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#E3F2FD]">
        {(isPending || isFetching) && (
          <div className="relative flex min-h-screen items-center justify-center px-4">
            <div
              className={`flex flex-col items-center gap-4 rounded-3xl px-10 py-8 ${glass}`}
              role="status"
            >
              <div className="w-11 h-11 rounded-full border-4 border-[#2196F3] border-t-transparent animate-spin"></div>
              <p className="text-sm font-medium text-gray-700">
                Loading profile…
              </p>
            </div>
          </div>
        )}

        {/* Error / not found */}
        {!isPending && !isFetching && (isError || !data) && (
          <div className="relative flex min-h-screen items-center justify-center px-4">
            <div
              className={`max-w-sm text-center rounded-3xl px-8 py-10 ${glass}`}
            >
              <XCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h1 className="text-lg font-semibold text-gray-900 mb-1">
                Profile unavailable
              </h1>
              <p className="text-sm text-gray-600">
                We couldn’t load this profile. Check the link or try again in a
                moment.
              </p>
            </div>
          </div>
        )}

        {!isPending && !isFetching && data && (
          <main className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 sm:pb-16">
            <div className="max-w-3xl mx-auto space-y-5">
              {/* Main Card */}
              <section className={`rounded-[2rem] ${glass} p-2 sm:p-3`}>
                {/* Header Section */}
                <div className="relative h-32 sm:h-44 rounded-[1.5rem] overflow-hidden bg-[#90CAF9]/50">
                  <div className="absolute -top-10 -right-8 w-40 h-40 rounded-full bg-white/40" />
                  <div className="absolute -bottom-16 left-10 w-44 h-44 rounded-full bg-[#2196F3]/20" />
                </div>

                {/* Profile Content */}
                <div className="relative px-4 sm:px-8 pb-6 sm:pb-8">
                  {/* Profile Photo - Overlapping header */}
                  <div className="relative z-10 flex justify-center -mt-14 sm:-mt-[4.5rem]">
                    <div className="relative">
                      <a
                        href={data?.userProfilePhotoUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="View full photo"
                        className="block rounded-full cursor-zoom-in transition hover:scale-[1.03] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2196F3]/50"
                      >
                        <img
                          src={data?.userProfilePhotoUrl}
                          alt={fullName || "Ally"}
                          className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover bg-white border-4 border-white shadow-lg ring-2 ring-[#90CAF9]"
                        />
                      </a>
                      <span className="absolute bottom-2 right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2196F3] border-4 border-white pointer-events-none" />
                    </div>
                  </div>

                  {/* Name and Bio */}
                  <div className="text-center mt-4">
                    <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0D47A1] capitalize">
                      {data?.firstName} {data?.lastName}
                    </h1>
                    {data?.description && (
                      <p className="mt-2 mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-gray-600">
                        {data.description}
                      </p>
                    )}
                  </div>

                  {/* Stats Card */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                    <div className="inline-flex items-center gap-3 rounded-full bg-white/80 border border-[#90CAF9]/60 px-4 py-2">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D47A1]" />
                      <span className="text-lg sm:text-xl font-semibold text-gray-900">
                        {data?.rating?.average?.toFixed(1)}
                      </span>
                      <Stars value={data?.rating?.average} />
                      <span className="text-xs sm:text-sm text-gray-500">
                        ({data?.rating?.count} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Reviews (collapsed until requested) */}
              <section className={`rounded-3xl ${glass} overflow-hidden`}>
                <button
                  type="button"
                  onClick={() => setShowReviews((s) => !s)}
                  aria-expanded={showReviews}
                  aria-controls="ally-reviews-panel"
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left transition hover:bg-[#E3F2FD]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2196F3]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#E3F2FD] border border-[#90CAF9] flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-[#0D47A1]" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                        Reviews
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {showReviews
                          ? "Tap to hide"
                          : `Tap to see what ${
                              data?.rating?.count ?? 0
                            } customer${
                              data?.rating?.count === 1 ? "" : "s"
                            } said`}
                      </p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#2196F3] shadow-sm flex items-center justify-center">
                    <ChevronDown
                      className={`w-5 h-5 text-white transition-transform duration-300 ${
                        showReviews ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                {showReviews && (
                  <div
                    id="ally-reviews-panel"
                    className="px-4 sm:px-5 pb-5 pt-1 border-t border-[#90CAF9]/50"
                  >
                    {reviewPending || reviewFetching ? (
                      <div className="space-y-3 pt-3" role="status">
                        {[0, 1].map((i) => (
                          <div
                            key={i}
                            className="h-24 rounded-2xl bg-[#E3F2FD] animate-pulse"
                          />
                        ))}
                      </div>
                    ) : isReviewError ? (
                      <p className="pt-3 text-sm text-gray-600">
                        Couldn’t load reviews. Close and reopen this section to
                        try again.
                      </p>
                    ) : reviewData?.length ? (
                      <div className="space-y-3 pt-3 max-h-[28rem] overflow-y-auto pr-1">
                        {reviewData.map((review) => (
                          <article
                            key={review._id}
                            className="rounded-2xl bg-white border border-[#90CAF9]/50 p-4"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#90CAF9]/50 text-[#0D47A1] text-sm font-semibold flex items-center justify-center uppercase">
                                  {review.fromUser?.firstName?.[0] ?? "?"}
                                </div>
                                <p className="font-medium text-gray-900 truncate">
                                  {review.fromUser?.firstName}{" "}
                                  {review.fromUser?.lastName}
                                </p>
                              </div>
                              <div className="flex-shrink-0 flex items-center gap-1.5">
                                <Stars
                                  value={review.rating}
                                  size="w-3.5 h-3.5"
                                />
                                <span className="text-xs font-semibold text-[#0D47A1]">
                                  {review.rating}/5
                                </span>
                              </div>
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-gray-600">
                              {review.review}
                            </p>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <p className="pt-3 text-sm text-gray-500">
                        No reviews yet.
                      </p>
                    )}
                  </div>
                )}
              </section>

              {/* Information Grid */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Email Card */}
                <InfoTile
                  icon={Mail}
                  label="Email Address"
                  href={data?.gmail ? `mailto:${data.gmail}` : undefined}
                >
                  <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                    {data?.gmail}
                  </p>
                </InfoTile>

                {/* Phone Card */}
                <InfoTile
                  icon={Phone}
                  label="Phone Number"
                  href={data?.phone ? `tel:${data.phone}` : undefined}
                >
                  <p className="text-sm sm:text-base font-medium text-gray-900">
                    {data?.phone}
                  </p>
                </InfoTile>

                {/* Location Card */}
                <InfoTile icon={MapPin} label="Location">
                  <p className="text-sm sm:text-base font-medium text-gray-900 capitalize">
                    {data?.addressDetails?.state}
                  </p>
                  <p className="text-sm sm:text-base font-medium text-gray-900 capitalize">
                    {data?.addressDetails?.city}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    PIN: {data?.addressDetails?.pinCode}
                  </p>
                </InfoTile>

                {/* Member Since Card */}
                <InfoTile icon={Calendar} label="Member Since">
                  <p className="text-sm sm:text-base font-medium text-gray-900">
                    {formatDate(data?.createdAt)}
                  </p>
                </InfoTile>
              </section>

              {/* Footer Info */}
              <div className="flex justify-center">
                <p
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-gray-500 ${glass}`}
                >
                  Age:{" "}
                  <span className="font-medium text-[#0D47A1]">
                    {data?.age} years
                  </span>
                </p>
              </div>
            </div>
          </main>
        )}
      </div>
    </>
  );
};

export default AllyPublicProfile;

/*
city,
pinCode
: 
"531162"
state
: 
"andhra pradesh"
[[Prototype]]
: 
Object
age
: 
18
createdAt
: 
"2026-01-03T05:22:45.537Z"
description
: 
"hello, i love to work"
firebaseUid
: 
"yB18KZ87FTWvsUKCExsUQ6q5exA3"
firstName
: 
"chandu"
gmail
: 
"chanduuppu0@gmail.com"
lastName
: 
"uppu"
phone
: 
"8184961533"
rating
: 
average
: 
0
count
: 
0
[[Prototype]]
: 
Object
updatedAt
: 
"2026-01-03T06:18:48.003Z"
userProfilePhotoUrl
: 
"https://res.cloudinary.com/dllvcgpsk/image/upload/v1767421127/taskopia/fjcwtlxjtsiai9nv1psh.jpg"
__v
: 
0
_id
: 
"6958a7a5b52a44240c334194"
*/