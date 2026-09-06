import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Palette matching the notice-board / vintage editorial theme
const COLORS = {
  paper: "#FFFDF9",
  paperDark: "#F4DEC2",
  ink: "#3A2414",
  rust: "#D9401C",
  mustard: "#E8A800",
  clay: "#E57D30",
  line: "#DCD8CE",
  surface: "#FCFBFA",
  muted: "#5A5752",
};

// get tasks
const getActiveTasks = async () => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/tasks/get/host/tasks`,
      { withCredentials: true },
    );
    return res.data.tasks;
  } catch (err) {
    console.log(err);
    if (err.response?.status === 404) return [];
    throw err;
  }
};

const HostSuggestions = () => {
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["hostTasksData"],
    queryFn: getActiveTasks,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnReconnect: true,
    enabled: true,
    placeholderData: null,
  });

  const tasks = data
    ? data.filter(
        (t) =>
          t.isDeleted === false &&
          t.status !== "completed" &&
          t.status !== "cancelled",
      )
    : [];

  return (
    <section 
      className="py-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: COLORS.bg, color: COLORS.ink }}
    >
      {/* Background Texture & Grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div 
          className="absolute inset-0 opacity-[0.35] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${COLORS.line} 1px, transparent 1px),
              linear-gradient(to bottom, ${COLORS.line} 1px, transparent 1px)
            `,
            backgroundSize: "4rem 4rem",
            maskImage: "radial-gradient(ellipse at center, black 15%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 15%, transparent 75%)",
          }}
        />
      </div>

      <div 
        className="max-w-4xl mx-auto relative z-10 bg-[#FCFBFA] border p-8 md:p-12"
        style={{ borderColor: COLORS.line, boxShadow: `8px 8px 0px 0px ${COLORS.line}` }}
      >
        {/* Header */}
        <div className="mb-8 pb-6 border-b" style={{ borderColor: COLORS.line }}>
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold mb-3 block" style={{ color: COLORS.muted }}>
            Host Dashboard
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#141413]">
            Welcome back
          </h1>
          <p className="text-[#5A5752] text-sm mt-2 font-medium">
            Quick access to your recent tasks.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mb-10">
          <Link
            to="/post/job"
            className="px-6 py-3.5 bg-[#141413] text-white text-xs font-bold tracking-widest uppercase transition-all hover:-translate-y-0.5"
          >
            + Post a Task
          </Link>

          <Link
            to="/host/dashboard"
            className="px-6 py-3.5 border-2 border-[#141413] text-[#141413] text-xs font-bold tracking-widest uppercase transition-all hover:bg-[#141413] hover:text-white"
          >
            View Posted Tasks
          </Link>
        </div>

        {/* Task list */}
        <div className="space-y-4">
          {isPending || isFetching ? (
            <div className="flex flex-col items-center justify-center h-40 space-y-3">
              <div className="w-8 h-8 border-4 border-[#141413] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#5A5752] text-sm font-medium">Loading tasks...</p>
            </div>
          ) : isError ? (
            <p className="text-red-600 text-sm font-medium">Failed to load tasks</p>
          ) : tasks && tasks.length > 0 ? (
            tasks.slice(0, 2).map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between p-5 border bg-[#F5F3EC] transition-all hover:translate-x-1"
                style={{ borderColor: COLORS.line }}
              >
                <div>
                  <p className="text-[#141413] font-bold text-base">{task?.taskTitle}</p>
                  <p className="text-[#5A5752] text-xs font-medium mt-1">
                    {task?.applicationsCount || 0} applicants
                  </p>
                </div>

                <Link
                  to={`/task/details/${task._id}`}
                  className="text-xs font-bold uppercase tracking-wider text-[#141413] hover:underline"
                >
                  Manage →
                </Link>
              </div>
            ))
          ) : (
            <p className="text-[#5A5752] text-sm text-center font-medium py-6">
              No tasks posted yet.
            </p>
          )}
        </div>

        {/* Footer */}
        {tasks?.length > 0 && (
          <div className="mt-12 text-center pt-8 border-t" style={{ borderColor: COLORS.line }}>
            <Link
              to="/host/dashboard"
              className="inline-block px-8 py-3.5 border-2 border-[#141413] text-[#141413] text-xs font-bold tracking-widest uppercase transition-all hover:bg-[#141413] hover:text-white"
            >
              View All My Tasks
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HostSuggestions;