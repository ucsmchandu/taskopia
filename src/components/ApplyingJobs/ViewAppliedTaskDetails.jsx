import React from "react";
import { Calendar, MapPin, Clock, User, FileText, Mail } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// to get the task details
const getTaskDetails = async (id) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/application/tasks/application/details/me/${id}`,
      { withCredentials: true }
    );
    return res.data.tasks;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return null;
  }
};

// to cancel the application
const useCancelApplication = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_BACKEND_BASE
        }/taskopia/u1/api/application/tasks/application/${id}/cancel`,
        {},
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success("Task is cancelled Successfully");
      console.log(res);
      queryClient.invalidateQueries(["allyAppliedTasks"]);
      queryClient.invalidateQueries(["allyAppliedTaskDetails"]);
      navigate("/applied-tasks");
    },
    onError: (err) => {
      console.log(err);
      toast.error(`${err?.response?.data?.message}`);
    },
  });
};

const AppliedTasksPage = () => {
  const { taskId } = useParams();
  //   console.log(taskId);
  const createCancelApplication = useCancelApplication();

  const {
    data: tasks,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["allyAppliedTaskDetails", taskId],
    queryFn: () => getTaskDetails(taskId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    enabled: true,
    placeholderData: null,
  });
  // console.log(tasks);

  const statusColors = {
    applied: "bg-blue-50 text-blue-700 border-blue-200",
    accepted: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    completed: "bg-gray-50 text-gray-700 border-gray-200",
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const cancelApplication = () => {
    const cfrm = confirm("Are you want to withdraw the application ?");
    if (cfrm) {
      createCancelApplication.mutate(tasks?._id);
    } else return;
  };

  return (
    <>
      {(isPending || isFetching) && (
        <div className="flex min-h-screen flex-col items-center justify-center h-40 space-y-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading your Tasks...</p>
        </div>
      )}
      {!isPending && !isFetching && !isError && !tasks && (
        <div className="flex min-h-screen flex-col justify-center items-center">
          <p className="text-xl sm:text-2xl text-gray-500 italic mt-30">
            Nothing here yet - Apply for tasks!
          </p>

          <Link
            to="/job/listings"
            className="text-sm w-fit mt-6 px-4 py-2 rounded-2xl font-medium bg-blue-600 text-white"
          >
            Apply Task
          </Link>
        </div>
      )}

      {!isPending && !isFetching && !isError && tasks && (
        <div className="min-h-screen mt-20 bg-gray-50">
          {/* Header */}
          <div className="bg-white border-b">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Applied Tasks
              </h1>
              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Track your task applications
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div
              key={tasks?._id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6"
            >
              {/* Header Section */}
              <div className="border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                      {tasks?.task?.taskTitle}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-xs sm:text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-md border border-gray-200">
                        {tasks?.task?.taskCategory}
                      </span>
                      <span
                        className={`text-xs border-gray-300 sm:text-sm font-medium px-3 py-1 rounded-md border`}
                      >
                        {tasks?.task?.urgency}
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">
                      ₹{tasks?.task?.budget}
                    </div>
                    <div className="text-sm text-gray-500">Budget</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span className="text-xs sm:text-sm">
                      Applied {formatDate(tasks?.createdAt)}
                    </span>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-md border ${
                      statusColors[tasks?.status]
                    } inline-flex w-fit`}
                  >
                    <span className="text-xs sm:text-sm font-medium capitalize">
                      {tasks?.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                    Task Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {tasks?.task?.description}
                  </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                  {/* Left Column - Host Info */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                      Host Information
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-sm sm:text-base">
                          {tasks?.host?.firstName[0]}
                          {tasks?.host?.lastName[0]}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm sm:text-base">
                            {tasks?.host?.firstName} {tasks?.host?.lastName}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            Task Host
                          </div>
                        </div>
                        <div className="ml-4 hover:scale-105 transition ease-in-out w-fit">
                          <Link 
                          to={`/host/public/profile/${tasks?.host?._id}`}
                          className=" px-2 py-2 shadow-md p-1 rounded-lg text-sm cursor-pointer text-white bg-orange-500">
                            View Profile
                          </Link>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 space-y-3">
                        <div className="flex items-start gap-3 text-xs sm:text-sm">
                          <MapPin
                            size={16}
                            className="text-gray-400 mt-0.5 flex-shrink-0"
                          />
                          <div className="text-gray-600">
                            <div>{tasks?.host?.addressDetails?.address}</div>
                            <div>
                              {tasks?.host?.addressDetails?.city},{" "}
                              {tasks?.host?.addressDetails?.state} -{" "}
                              {tasks?.host?.addressDetails?.pinCode}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {tasks?.host?.addressDetails?.landMark}
                            </div>
                          </div>
                        </div>

                        {tasks?.task?.email && (
                          <div className="flex items-center gap-3 text-xs sm:text-sm">
                            <Mail
                              size={16}
                              className="text-gray-400 flex-shrink-0"
                            />
                            <span className="text-gray-600 break-all">
                              {tasks?.task?.email}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Task Details */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                      Task Details
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-xs sm:text-sm text-gray-600">
                          Working Hours
                        </span>
                        <span className="font-medium text-gray-900 text-sm sm:text-base">
                          {tasks?.task?.workingHours} hour(s)
                        </span>
                      </div>

                      {/* <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-xs sm:text-sm text-gray-600">
                          Total Applicants
                        </span>
                        <span className="font-medium text-gray-900 text-sm sm:text-base">
                          {tasks?.task?.tasksCount}
                        </span>
                      </div> */}

                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-xs sm:text-sm text-gray-600">
                          Start Date
                        </span>
                        <span className="font-medium text-gray-900 text-sm sm:text-base">
                          {formatDate(tasks?.task?.startingDate)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-xs sm:text-sm text-gray-600">
                          End Date
                        </span>
                        <span className="font-medium text-gray-900 text-sm sm:text-base">
                          {formatDate(tasks?.task?.endingDate)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <span className="text-xs sm:text-sm text-gray-600">
                          Task Status
                        </span>
                        <span className="font-medium text-gray-900 capitalize text-sm sm:text-base">
                          {tasks?.task?.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cover Message */}
                {tasks.coverMessage && (
                  <div className="mb-6 sm:mb-8 bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-5">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                      Your Cover Message
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 italic">
                      "{tasks?.coverMessage}"
                    </p>
                  </div>
                )}

                {/* Attachment */}
                {tasks?.task?.attachments && (
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                      Task Attachment
                    </h3>
                    <img
                      src={tasks?.task?.attachments}
                      alt="Task attachment"
                      className="w-full h-60 sm:h-80 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
                  {tasks?.status === "applied" ||
                  tasks?.status === "accepted" ? (
                    <>
                      <button
                        disabled={createCancelApplication.isPending}
                        onClick={cancelApplication}
                        className="flex-1 bg-red-600 cursor-pointer hover:bg-red-500 text-white font-medium py-3 px-6 rounded-lg transition-colors text-sm sm:text-base"
                      >
                        {createCancelApplication.isPending ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg
                              className="animate-spin h-5 w-5"
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
                            Canceling...
                          </span>
                        ) : (
                          "Cancel Application"
                        )}
                      </button>
                    </>
                  ) : (
                    <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors text-sm sm:text-base">
                      {tasks?.status}
                    </button>
                  )}

                  {/* <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors text-sm sm:text-base">
                    Contact Host
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppliedTasksPage;
