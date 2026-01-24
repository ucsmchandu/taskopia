import React, { useState, useEffect } from "react";
import {
  HouseIcon,
  Search,
  List,
  UserRound,
  MapPin,
  Sparkles,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// to get the filtered tasks
const getTasks = async ({ sort, lat, lng, distance, search }) => {
  const params = {};

  if (sort) params.sort = sort;
  if (search) params.search = search;
  if (lat !== undefined && lng !== undefined) {
    params.lat = Number(lat);
    params.lng = Number(lng);
    params.distance = distance || 5;
  }

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/tasks/get/all/active/tasks`,
      {
        params,
        withCredentials: true,
      },
    );

    return res.data.tasks || [];
  } catch (err) {
    if (err.response?.status === 404) return [];
    throw err;
  }
};

const JobListings = () => {
  const [sort, setSort] = useState("newest");
  const [coords, setCoords] = useState(null);
  const [search, setSearch] = useState("");
  const [locationError, setLocationError] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const isNearby = sort === "nearby";

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // get the coords only when the user click on nearby
  useEffect(() => {
    if (!isNearby) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        setCoords(null);
        setLocationError(true);
      },
    );
  }, [isNearby]);

  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["allyTasks", sort, coords?.lat, coords?.lng, debouncedSearch],
    queryFn: () =>
      getTasks({
        sort: isNearby ? undefined : sort,
        lat: isNearby ? coords?.lat : undefined,
        lng: isNearby ? coords?.lng : undefined,
        distance: 5,
        search: debouncedSearch,
      }),
    enabled: !isNearby || !!coords,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  });

  const tasks = data ? data.filter((t) => t.isDeleted === false) : [];

  if (isError) {
    return (
      <div className="flex min-h-screen justify-center items-center h-60">
        <p className="text-red-500 font-semibold text-lg">
          Failed to load tasks. Please try again.
        </p>
      </div>
    );
  }

  if (isNearby && locationError) {
    return (
      <div className="flex min-h-screen justify-center items-center h-60">
        <p className="text-gray-600 font-medium">
          Location access denied. Enable location to see nearby tasks.
        </p>
      </div>
    );
  }

  const baseBtn =
    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200";
  const activeBtn = "bg-gray-900 text-white shadow-md";
  const inactiveBtn = "bg-gray-100 text-gray-600 hover:bg-gray-200";
  // const disabledBtn = "bg-gray-200 text-gray-400 cursor-not-allowed";

  return (
    <div className="m-6 mt-30 min-h-screen flex flex-row gap-10">
      <div className="w-64 hidden md:block">
        <div className="flex flex-col gap-3 sticky top-30 bg-white shadow-sm p-5 rounded-xl">
          <Link className="flex gap-4 p-2 hover:bg-gray-100 rounded-lg" to="/">
            <HouseIcon size={20} /> Home
          </Link>
          <Link
            className="flex gap-4 p-2 hover:bg-gray-100 rounded-lg"
            to="/ally/dashboard"
          >
            <List size={20} /> Dashboard
          </Link>
          <Link
            className="flex gap-4 p-2 hover:bg-gray-100 rounded-lg"
            to="/profile/ally"
          >
            <UserRound size={20} /> Profile
          </Link>
        </div>
      </div>

      <div className="w-full">
        <input
          type="text"
          placeholder="Search by title or description…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border w-full p-3 rounded-lg bg-gray-100"
        />

        <div className="flex flex-wrap gap-3 mt-5">
          <button
            // disabled={!coords}
            onClick={() => setSort("nearby")}
            className={`cursor-pointer ${baseBtn} ${
              sort === "nearby" ? activeBtn : inactiveBtn
            }`}
          >
            <MapPin size={16} />
            Nearby
          </button>

          <button
            onClick={() => setSort("newest")}
            className={`cursor-pointer ${baseBtn} ${
              sort === "newest" ? activeBtn : inactiveBtn
            }`}
          >
            <Sparkles size={16} />
            Newest
          </button>

          <button
            onClick={() => setSort("highestPaying")}
            className={`cursor-pointer ${baseBtn} ${
              sort === "highestPaying" ? activeBtn : inactiveBtn
            }`}
          >
            <TrendingUp size={16} />
            Highest Pay
          </button>

          <button
            onClick={() => setSort("urgent")}
            className={`cursor-pointer ${baseBtn} ${
              sort === "urgent" ? activeBtn : inactiveBtn
            }`}
          >
            <AlertCircle size={16} />
            Urgent
          </button>
        </div>

        <h1 className="text-2xl font-semibold mt-10 text-gray-600">
          Available Tasks
        </h1>

        {(isPending || isFetching) && (
          <div className="flex flex-col items-center justify-center h-40">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 font-semibold">Loading tasks…</p>
          </div>
        )}

        {!isPending && !isFetching && tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-24">
            <p className="text-xl text-gray-500 italic">
              No tasks found nearby. Try changing filters or location.
            </p>
            {/* <Link
              to="/post/job"
              className="mt-6 px-5 py-2 rounded-xl bg-blue-600 text-white font-medium"
            >
              Post a Task
            </Link> */}
          </div>
        )}

        {!isPending &&
          !isFetching &&
          tasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between gap-6 mt-8 bg-white p-6 rounded-2xl shadow-lg"
            >
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold">{task.taskTitle}</h3>
                <p className="text-gray-600 line-clamp-2">{task.description}</p>
                <p className="text-sm text-gray-500">{task.address}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="px-4 py-2 bg-emerald-50 rounded-xl font-bold">
                    ₹{task.budget}
                  </span>
                  <Link
                    to={`/task/${task._id}`}
                    className="px-6 py-2 bg-gray-900 text-white rounded-xl"
                  >
                    Details
                  </Link>
                </div>
              </div>

              {task.attachments && (
                <img
                  src={task.attachments}
                  alt="task"
                  className="h-32 w-32 rounded-xl object-cover"
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default JobListings;
