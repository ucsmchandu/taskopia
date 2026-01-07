import React from "react";
import { CircleCheckBig } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
const getAppliedTasks = async () => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/application/tasks/applications/me`,
      { withCredentials: true }
    );
    return res.data.tasks;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const AllyHistory = () => {
  const {
    data: applications,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["allyAppliedTasks"],
    queryFn: getAppliedTasks,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnReconnect: true,
    enabled: true,
  });
  const getCompletedTasks = applications?.filter(
    (t) => t.status === "completed"
  );
  // console.log(getCompletedTasks);

  return (
    <>
      {(isPending || isFetching) && (
        <div className="flex flex-col items-center justify-center h-40 space-y-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading your Tasks...</p>
        </div>
      )}
      {!isPending &&
        !isFetching &&
        (getCompletedTasks?.length === 0 || !getCompletedTasks)&& (
          <div className="flex flex-col justify-center items-center">
            <p className="text-xl sm:text-2xl text-gray-500 italic mt-30">
              Nothing here yet — check back soon!
            </p>

            <Link
              to="/job/listings"
              className="text-sm w-fit mt-6 px-4 py-2 rounded-2xl font-medium bg-blue-600 text-white"
            >
              Apply Task
            </Link>
          </div>
        )}
      {!isPending && !isFetching && getCompletedTasks?.length > 0 && (
        <>
          <div className="mt-10 flex flex-col gap-6">
            {/* card-1 */}
            <div className="flex border justify-between  p-6 rounded-xl border-gray-200 shadow-md hover:shadow-lg bg-white transition">
              <div className="flex gap-6 items-center">
                <CircleCheckBig color="green" />
                <div className="">
                  <p>Data Entry Project</p>
                  <p className="text-sm text-gray-400">Task assigned</p>
                </div>
              </div>
              <div>
                <p>$100</p>
                <p className="text-sm text-gray-400">1/10/2023</p>
              </div>
            </div>
            {/* card-2 */}
            <div className="flex border justify-between  p-6 rounded-xl border-gray-200 shadow-md hover:shadow-lg bg-white transition">
              <div className="flex gap-6 items-center">
                <CircleCheckBig color="green" />
                <div className="">
                  <p>Data Entry Project</p>
                  <p className="text-sm text-gray-400">Task assigned</p>
                </div>
              </div>
              <div>
                <p>$100</p>
                <p className="text-sm text-gray-400">1/10/2023</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllyHistory;
