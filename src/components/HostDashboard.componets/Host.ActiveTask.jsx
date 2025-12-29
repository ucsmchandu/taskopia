import React from "react";
import {
  CheckCheck,
  BotMessageSquare,
  UserRoundPen,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const getActiveTasks = async () => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/tasks/get/all/tasks`,
      { withCredentials: true }
    );
    return res.data.tasks;
  } catch (err) {
    console.log(err);
    if (err.response?.status === 404) return null;
    throw err;
  }
};

const HostActiveTasks = () => {
  const {
    data: tasks,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["hostTasksData"],
    queryFn: getActiveTasks,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    enabled: true,
    placeholderData: null,
  });

  // console.log(tasks);

  const navigate = useNavigate();
  const logout = async () => {
    const userConfirmation = confirm("are you want to logout?");
    if (userConfirmation) {
      queryClient.clear();
      await auth.signOut();
      navigate("/");
    }
    return;
  };
  return (
    <>
      {!tasks && (isPending || isFetching) ? (
        <div className="flex flex-col items-center justify-center h-40 space-y-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading your Tasks...</p>
        </div>
      ) : (
        <>
          <div className="mt-10 text-gray-800 px-4 sm:px-6 lg:px-0">
            {/* heading */}
            <div className="mt-6">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Current Task
              </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-6">
              <div className="flex-1 flex flex-col gap-6">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 hover:shadow-lg transition-shadow"
                  >
                    {/* Top section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <div className="flex gap-2">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                          {task.urgency}
                        </span>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                          {task?.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-semibold text-gray-900">
                          ₹{task.budget}
                        </p>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      {task.taskTitle}
                    </h3>

                    {/* Bottom section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Start:</span>{" "}
                          {task.startingDate.split("T")[0]}
                        </p>
                        <p>
                          <span className="font-medium">Due:</span>{" "}
                          {task.endingDate.split("T")[0]}
                        </p>
                      </div>
                      <button className="w-full cursor-pointer sm:w-auto px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="md:w-64 w-full border border-gray-300 p-4 sm:p-6  bg-gradient-to-t from-[#aac0c8] to-[#98D8EF] rounded-xl shadow-sm self-start md:self-auto">
                <h1 className="text-lg sm:text-2xl font-semibold">
                  Quick Actions
                </h1>

                <div className="flex flex-col mt-4 gap-3">
                  <Link
                    to="/profile/host"
                    className="flex gap-3 items-center border border-gray-200 shadow-lg rounded-xl w-full p-2 text-sm cursor-pointer hover:bg-gray-100 transition"
                  >
                    <UserRoundPen size={18} />{" "}
                    <span className="truncate text-black">Update Profile</span>
                  </Link>

                  <Link
                    to=""
                    className="flex gap-3 items-center border border-gray-200 shadow-lg rounded-xl w-full p-2 text-sm cursor-pointer hover:bg-gray-100 transition"
                  >
                    <BotMessageSquare size={18} />{" "}
                    <span className="truncate text-black">AI</span>
                  </Link>

                  <Link
                    to="/post/job"
                    className="flex gap-3 items-center border border-gray-200 shadow-lg rounded-xl w-full p-2 text-sm cursor-pointer hover:bg-gray-100 transition"
                  >
                    <CheckCheck size={18} />{" "}
                    <span className="truncate text-black">Post a Task</span>
                  </Link>

                  <button
                    onClick={() => logout()}
                    className="flex gap-3 text-white items-center bg-red-500 rounded-xl w-full p-2 text-sm cursor-pointer hover:bg-red-600 transition"
                  >
                    <LogOut size={18} />{" "}
                    <span className="truncate text-white">Logout</span>
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HostActiveTasks;
