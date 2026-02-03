import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import UpdateTask from "./UpdateTask";
import { useNavigate } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

// get the tasks
const getTask = async (id) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/tasks/get/task/${id}`,
    );
    return res.data.task;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// delete the task
const useDeletingTask = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_BACKEND_BASE
        }/taskopia/u1/api/tasks/delete/task/${id}`,
        {},
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success("Task Deleted");
      queryClient.invalidateQueries(["hostTaskData"]);
      queryClient.invalidateQueries(["notifications"])
      navigate("/host/dashboard");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Something went Wrong");
      return null;
    },
  });
};

const ViewTaskDetails = () => {
  const createDelete = useDeletingTask();
  const [showModel, setShowModel] = useState(false);
  const { id } = useParams();
  
  const {
    data: task,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["singleTask", id],
    queryFn: () => getTask(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    enabled: true,
    placeholderData: null,
  });
  // console.log(task)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDelete = () => {
    const cfrm = confirm("Are you sure about to delete the task?");
    if (cfrm) {
      createDelete.mutate(task._id);
    }
  };

  return (
    <>
      {(isPending || isFetching) && (
        <div className="flex flex-col min-h-screen items-center justify-center space-y-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 text-sm sm:text-base font-semibold">Loading</p>
        </div>
      )}

      {!isPending && !isFetching && !task && (
        <div className="flex flex-col justify-center items-center min-h-screen">
          <p className="text-lg sm:text-2xl text-gray-500 text-center italic px-4">
            Nothing here yet, check back soon!
          </p>
          <button className="text-xs sm:text-sm w-fit cursor-pointer mt-6 px-4 py-2 rounded-2xl font-medium bg-blue-600 text-white hover:bg-blue-700 transition">
            Post Task
          </button>
        </div>
      )}

      {!isPending && !isFetching && task && (
        <>
          <div
            className={`min-h-screen bg-white py-6 sm:py-8 px-3 sm:px-6 lg:px-8 ${
              showModel ? "blur-sm pointer-events-none" : ""
            }`}
          >
            <div className="max-w-4xl mx-auto mt-16 sm:mt-20">
              {/* Header */}
              <div className="border-b border-gray-200 pb-4 sm:pb-6 mb-6 sm:mb-8">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                    {task.urgency}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                    {task.status}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                    {task.taskCategory}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3 break-words">
                  {task.taskTitle}
                </h1>

                <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                  ₹{task.budget}
                </p>
              </div>

              {/* Description */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wide">
                  Description
                </h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {task.description}
                </p>
              </div>

              {/* Attachment */}
              {task.attachments && (
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wide">
                    Attachment
                  </h2>
                  <img
                    src={task.attachments}
                    alt="Task attachment"
                    className="w-full rounded border border-gray-200 max-h-96 object-cover"
                  />
                </div>
              )}

              {/* Task Details */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 sm:mb-4 uppercase tracking-wide">
                  Task Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Start Date</p>
                    <p className="text-sm sm:text-base text-gray-900">{formatDate(task.startingDate)}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">End Date</p>
                    <p className="text-sm sm:text-base text-gray-900">{formatDate(task.endingDate)}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Working Hours</p>
                    <p className="text-sm sm:text-base text-gray-900">{task.workingHours} hours</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Location</p>
                    <p className="text-sm sm:text-base text-gray-900 break-words">{task.address}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Applications</p>
                    <p className="text-sm sm:text-base text-gray-900">{task.applicationsCount}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Task Status</p>
                    <p className="text-sm sm:text-base text-gray-900">
                      {task.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>

                  {task.postRemovingDate && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Post Removing Date</p>
                      <p className="text-sm sm:text-base text-gray-900">{formatDate(task.postRemovingDate)}</p>
                    </div>
                  )}

                  {task.expiredAt && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Expired At</p>
                      <p className="text-sm sm:text-base text-gray-900">{formatDate(task.expiredAt)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline Section */}
              {task.status === "completed" && (
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 sm:mb-4 uppercase tracking-wide">
                    Completion Timeline
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    {task.completionRequestedAt && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Completion Requested</p>
                        <p className="text-sm sm:text-base text-gray-900">{formatDate(task.completionRequestedAt)}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(task.completionRequestedAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </p>
                      </div>
                    )}

                    {task.completedAt && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Completed On</p>
                        <p className="text-sm sm:text-base text-gray-900">{formatDate(task.completedAt)}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(task.completedAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="mb-6 sm:mb-8 border-t border-gray-200 pt-6 sm:pt-8">
                <h2 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wide">
                  Contact
                </h2>
                <p className="text-sm sm:text-base text-gray-900 break-words">{task.email}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                <button
                  onClick={() => setShowModel(true)}
                  className="flex cursor-pointer flex-row justify-center items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-gray-900 rounded hover:bg-gray-800 transition-colors flex-1 sm:flex-none"
                >
                  <Pencil size={16} /> 
                  <span>Edit</span>
                </button>

                <Link
                  to={`/task/${task._id}/applications`}
                  className="flex cursor-pointer flex-row justify-center items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex-1 sm:flex-none"
                >
                  <Users size={16} />
                  <span>Applications ({task.applicationsCount})</span>
                </Link>

                {task?.isDeleted === false && !task?.assignedAlly && (
                  <button
                    onClick={handleDelete}
                    disabled={createDelete.isPending}
                    className="px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 cursor-pointer transition-colors disabled:opacity-60 flex-1 sm:flex-none"
                  >
                    {createDelete.isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
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
                        <span>Deleting</span>
                      </span>
                    ) : (
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </div>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {showModel && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
              <div
                className="absolute inset-0 bg-black/20"
                onClick={() => setShowModel(false)}
              />

              <div
                className="bg-white rounded shadow-lg w-full max-w-3xl p-4 sm:p-6 z-10 relative max-h-[90vh] overflow-auto"
              >
                <button
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 cursor-pointer text-gray-400 hover:text-gray-600 text-xl"
                  onClick={() => setShowModel(false)}
                >
                  ✕
                </button>
                <UpdateTask data={task} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ViewTaskDetails;