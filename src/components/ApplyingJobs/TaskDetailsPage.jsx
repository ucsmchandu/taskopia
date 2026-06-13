import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Languages, Star } from "lucide-react";
import { toast } from "react-toastify";

const translationLanguages = [
  { label: "Telugu - తెలుగు", value: "Telugu" },
  { label: "Hindi - हिन्दी", value: "Hindi" },
  { label: "Tamil - தமிழ்", value: "Tamil" },
  { label: "Kannada - ಕನ್ನಡ", value: "Kannada" },
  { label: "Malayalam - മലയാളം", value: "Malayalam" },
  { label: "Other", value: "other" },
];

const getTask = async (id) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/tasks/get/task/${id}`,
      { withCredentials: true },
    );
    return res.data.task;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// to check the task was applied or not
const getConfirmCheckApplication = async (id) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/application/tasks/${id}/my-application`,
      { withCredentials: true },
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [selectedTranslationLanguage, setSelectedTranslationLanguage] =
    useState("Telugu");
  const [customTranslationLanguage, setCustomTranslationLanguage] =
    useState("");
  const [translatedDescription, setTranslatedDescription] = useState("");
  const [translatedLanguageName, setTranslatedLanguageName] = useState("");
  const [translationError, setTranslationError] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  // console.log(taskId);

  const {
    data: task,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["fullTaskDetails", taskId],
    queryFn: () => getTask(taskId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    enabled: true,
    placeholderData: null,
  });

  const {
    data: checkApply,
    isPending: pending,
    isFetching: fetching,
    isError: Error,
  } = useQuery({
    queryKey: ["checkAllyApplyTask", taskId],
    queryFn: () => getConfirmCheckApplication(taskId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    enabled: true,
    placeholderData: null,
  });
  // console.log(task)
  console.log(checkApply);
  // console.log(Error)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTranslatedText = (data) => {
    return data?.translatedText || "";
  };

  const handleTranslateDescription = async () => {
    const description = task?.description?.trim();
    const language =
      selectedTranslationLanguage === "other"
        ? customTranslationLanguage.trim()
        : selectedTranslationLanguage;

    if (!description) {
      toast.error("No task description available to translate");
      return;
    }

    if (!language) {
      toast.error("Please enter a language to translate into");
      return;
    }

    setIsTranslating(true);
    setTranslationError("");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE}/taskopia/ai/api/translate-task`,
        {
          taskDescription: description,
          requestedLanguage:language,
        },
        { withCredentials: true },
      );

      const translatedText = getTranslatedText(data);

      if (!translatedText) {
        setTranslationError("Translation was not available. Please try again.");
        toast.error("Translation was not available");
        return;
      }

      setTranslatedDescription(translatedText);
      setTranslatedLanguageName(language);
    } catch (err) {
      console.log(err);
      const highDemandMessage =
        '{"error":{"code":503,"message":"This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.","status":"UNAVAILABLE"}}';
      const details = err?.response?.data?.details;
      const detailsText =
        typeof details === "string" ? details : JSON.stringify(details);

      if (detailsText === highDemandMessage) {
        const message =
          "Currently our model facing high traffic, please try again after some time.";
        setTranslationError(message);
        toast.error(message);
        return;
      }

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to translate task description";

      setTranslationError(message);
      toast.error(message);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <>
      {(isPending || isFetching) && (
        <div className="flex flex-col min-h-screen items-center justify-center h-40 space-y-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading</p>
        </div>
      )}

      {!isPending && !isFetching && !task && (
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl sm:text-2xl text-gray-500 text-center italic mt-30">
            Nothing here yet, check back soon!
          </p>
          <button className="text-sm w-fit cursor-pointer mt-6 px-4 py-2 rounded-2xl font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition">
            Post Task
          </button>
        </div>
      )}

      {!isPending && !isFetching && task && (
        <>
          <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b mt-25 border-gray-200">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Link
                  to="/job/listings"
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm mb-4 flex items-center gap-2"
                >
                  ← Back to Tasks
                </Link>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {task?.taskTitle}
                </h1>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Image */}
                  {task.attachments && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                      <img
                        src={task?.attachments}
                        alt="Task attachment"
                        className="w-full h-64 sm:h-96 object-cover"
                      />
                    </div>
                  )}

                  {/* Description */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                    <div className="flex flex-col gap-3 mb-4">
                      <h2 className="text-xl font-bold text-gray-900">
                        Description
                      </h2>
                      <div className="flex flex-col gap-2 w-full sm:flex-row sm:flex-wrap sm:items-center">
                        <select
                          value={selectedTranslationLanguage}
                          onChange={(e) => {
                            setSelectedTranslationLanguage(e.target.value);
                            setTranslationError("");
                          }}
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:ring-1 focus:ring-gray-500 sm:w-48"
                        >
                          {translationLanguages.map((language) => (
                            <option key={language.value} value={language.value}>
                              {language.label}
                            </option>
                          ))}
                        </select>
                        {selectedTranslationLanguage === "other" && (
                          <input
                            type="text"
                            value={customTranslationLanguage}
                            onChange={(e) =>
                              setCustomTranslationLanguage(e.target.value)
                            }
                            placeholder="Enter language"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:ring-1 focus:ring-gray-500 sm:w-44"
                          />
                        )}
                        <button
                          type="button"
                          onClick={handleTranslateDescription}
                          disabled={isTranslating}
                          className="inline-flex cursor-pointer w-full items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                          {isTranslating ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg
                                className="h-4 w-4 animate-spin"
                                viewBox="0 0 24 24"
                              >
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
                              Translating...
                            </span>
                          ) : (
                            <>
                              <Languages size={16} />
                              {translatedDescription
                                ? "Translate Again"
                                : "Translate"}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line break-words">
                      {task?.description}
                    </p>
                    {translatedDescription && (
                      <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                        <p className="mb-2 text-sm font-semibold text-emerald-800">
                          Translated Description
                          {translatedLanguageName
                            ? ` (${translatedLanguageName})`
                            : ""}
                        </p>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {translatedDescription}
                        </p>
                      </div>
                    )}
                    {translationError && (
                      <p className="mt-3 text-sm text-red-600">
                        {translationError}
                      </p>
                    )}
                  </div>

                  {/* Timeline & Hours */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Project Timeline
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Start Date</p>
                        <p className="text-gray-900 font-semibold">
                          {formatDate(task?.startingDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">End Date</p>
                        <p className="text-gray-900 font-semibold">
                          {formatDate(task?.endingDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">
                          Working Hours
                        </p>
                        <p className="text-gray-900 font-semibold">
                          {task?.workingHours} / day
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Urgency</p>
                        <span
                          className={`inline-block px-3 py-1 border-gray-300 rounded-lg text-sm font-semibold border`}
                        >
                          {task?.urgency}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Location & Contact */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Location & Contact
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        {/* <span className="text-xl mt-0.5"></span> */}
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Location</p>
                          <p className="text-gray-900">{task?.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        {/* <span className="text-xl mt-0.5"></span> */}
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Email</p>
                          <p className="text-gray-900">{task?.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Budget & Apply */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-30">
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-2">Budget</p>
                      <p className="text-4xl font-bold text-emerald-600">
                        ₹{task?.budget.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {(pending || fetching) && (
                      <div className="flex flex-col items-center justify-center h-40 space-y-2">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-700 font-semibold">Loading</p>
                      </div>
                    )}
                    {!pending && !fetching && checkApply?.applied ? (
                      <button className="w-full cursor-pointer py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg">
                        Already Applied
                      </button>
                    ) : (
                      <Link to={`/apply/job/${taskId}`}>
                        <button className="w-full cursor-pointer py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg">
                          Apply for This Task
                        </button>
                      </Link>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 text-center">
                        By applying, you agree to our terms and conditions
                      </p>
                    </div>
                  </div>

                  {/* Host Information */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Posted By
                    </h3>

                    <div className="flex items-center gap-4 mb-4">
                      {/* <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-xl">
                  {task?.createdBy?.firstName}
                  {task?.createdBy?.lastName}
                </div> */}
                      <div className="flex gap-6">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {task?.createdBy?.firstName}{" "}
                            {task?.createdBy?.lastName}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-amber-500">
                              <Star size={16} />
                            </span>
                            <span className="font-semibold text-gray-900">
                              {task?.createdBy?.rating.average}
                            </span>
                            <span className="text-gray-500 text-sm">/5.0</span>
                          </div>
                        </div>

                        <div>
                          <Link
                            to={`/host/public/profile/${task?.createdBy?._id}`}
                            className="text-sm bg-orange-400 text-white p-1 px-2 rounded-lg shadow-lg hover:scale-105 cursor-pointer transition ease-in-out"
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* <button 
                    
                    // className="w-full py-2.5 border-2 border-gray-900 text-gray-900 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      Contact Host
                    </button> */}
                  </div>

                  {/* Category */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      Category
                    </h3>
                    <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                      {task?.taskCategory}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TaskDetailsPage;
