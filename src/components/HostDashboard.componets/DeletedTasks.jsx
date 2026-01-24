import React, { useState } from "react";
import {
  Trash2,
  RotateCcw,
  Calendar,
  DollarSign,
  MapPin,
  Search,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getTasks = async () => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/tasks/get/all/tasks`,
      { withCredentials: true },
    );
    return res.data.tasks;
  } catch (err) {
    console.log(err);
    if (err.response?.status === 404) return [];
    throw err;
  }
};

const DeletedTasks = () => {
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["allyTasks"],
    queryFn: getTasks,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    enabled: true,
    placeholderData: null,
  });

  const tasks = data ? data?.filter((t) => t.isDeleted === true) : [];
  // console.log(tasks);
  return (
    <>
      {(isPending || isFetching) && (
        <div className="flex min-h-screen flex-col items-center justify-center h-40 space-y-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading ...</p>
        </div>
      )}
      {
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Deleted Tasks
                  </h1>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="p-4 bg-gray-200 rounded-full mb-4">
                  <Trash2 className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No deleted tasks found
                </h3>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task?._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                  >
                    {/* Task Card Header */}
                    <div className="p-6 flex items-start justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Image */}
                        {task?.attachments && (
                          <img
                            src={task?.attachments}
                            alt={task?.taskTitle}
                            className="w-20 h-20 rounded-lg object-cover shadow-sm"
                          />
                        )}

                        {/* Task Info */}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {task?.taskTitle}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-1 mb-3">
                            {task?.description}
                          </p>

                          {/* Meta Information */}
                          <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="font-semibold text-gray-900">
                                ₹{task?.budget.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4 text-blue-600" />
                              <span>{task?.address}</span>
                            </div>
                            {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-orange-600" />
                          <span>{task.daysDeleted} days ago</span>
                        </div> */}
                          </div>

                          {/* Deleted Badge */}
                          {/* <div className="mt-3 flex items-center gap-2">
                        <div className="px-3 py-1 bg-red-50 border border-red-200 rounded-full flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-red-600" />
                          <span className="text-xs font-medium text-red-700">
                            Deleted on {task.deletedAt}
                          </span>
                        </div>
                      </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default DeletedTasks;
