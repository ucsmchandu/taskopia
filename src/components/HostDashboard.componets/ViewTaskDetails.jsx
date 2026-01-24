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
  Calendar,
  Clock,
  MapPin,
  Mail,
  Briefcase,
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
      // console.log(res);
      queryClient.invalidateQueries(["hostTaskData"]);
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
  // query here
  const {
    data: task,
    isPending,
    isFetching,
    isError,
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

  console.log(task);
  // formatting the date
  const formatDate = (dateString) => {
    // console.log(id)
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  //   deleting the task
  const handleDelete = () => {
    const cfrm = confirm("Are you sure about to delete the task?");
    if (cfrm) {
      createDelete.mutate(task._id);
      // console.log("hello");
    } else return;
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

      {!isPending && !isFetching && (
        <>
          <div
            className={`min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 ${
              showModel ? "blur-sm pointer-events-none" : ""
            }`}
          >
            <div className="max-w-4xl mx-auto mt-20">
              {/* Header */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                    {task.urgency}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                    {task.status}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                    {task.taskCategory}
                  </span>
                </div>

                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                  {task.taskTitle}
                </h1>

                <p className="text-2xl font-semibold text-blue-500">
                  ₹{task.budget}
                </p>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {task.description}
                </p>
              </div>

              {/* Attachment */}
              {task.attachments && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Attachment
                  </h2>
                  <img
                    src={task.attachments}
                    alt="Task attachment"
                    className="w-full rounded-lg border pointer-events-none border-gray-200"
                  />
                </div>
              )}

              {/* Task Details */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Task Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1 flex flex-row gap-1">
                      <Calendar size={18} />
                      <span>Start Date</span>
                    </p>
                    <p className="text-gray-900">
                      {formatDate(task.startingDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1 flex flex-row gap-1">
                      <Calendar size={18} />
                      <span>End Date</span>
                    </p>
                    <p className="text-gray-900">
                      {formatDate(task.endingDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1 flex flex-row gap-1">
                      <Clock size={18} />
                      <span>Working Hours</span>
                    </p>
                    <p className="text-gray-900">{task.workingHours} hours</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1 flex flex-row gap-1">
                      <MapPin size={18} />
                      <span>Location</span>
                    </p>
                    <p className="text-gray-900">{task.address}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1 flex flex-row gap-1">
                      <Users size={18} />
                      <span>Applications</span>
                    </p>
                    <p className="text-gray-900">{task.applicationsCount}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1 flex flex-row gap-1">
                      <Briefcase size={18} />
                      <span>Status</span>
                    </p>
                    <p className="text-gray-900">
                      {task.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1 flex flex-row gap-1">
                    <Mail size={18} />
                    <span>Email</span>
                  </p>
                  <p className="text-gray-900">{task.email}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => setShowModel(true)}
                  className="flex-1 flex cursor-pointer flex-row justify-center items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Pencil size={18} /> <span>Edit Task</span>
                </button>

                <Link
                  to={`/task/${task._id}/applications`}
                  className="flex-1 flex cursor-pointer flex-row justify-center items-center gap-2 px-6 py-3 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Users size={18} />
                  Applications ({task.applicationsCount})
                </Link>

                {task?.isDeleted === false && !task?.assignedAlly  && (
                  <button
                    onClick={handleDelete}
                    disabled={createDelete.isPending}
                    className="px-6 py-3 text-sm font-medium text-white bg-red-600 border rounded-lg hover:bg-red-500 cursor-pointer transition-colors"
                  >
                    {createDelete.isPending ? (
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
                        Deleting..
                      </span>
                    ) : (
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Trash2 size={18} />
                        Delete
                      </div>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {showModel && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <div
                className="absolute inset-0 bg-white/10 "
                onClick={() => setShowModel(false)}
              />

              <div
                className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 z-10 relative
                    max-h-[90vh] overflow-auto"
              >
                <button
                  className="absolute top-3 right-3 cursor-pointer bg-red-300 p-0.5 rounded-4xl px-2 text-red-500 hover:"
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
