import React from "react";
import { CircleCheckBig } from "lucide-react";
const OwnerCompletedTasks = () => {
  return (
    <div className="mt-10 flex flex-col gap-6">
        {/* card-1 */}
      <div className="flex border justify-between  p-6 rounded-xl border-gray-200 shadow-md hover:shadow-lg bg-white transition">
        <div className="flex gap-6 items-center">
          <CircleCheckBig color="green" />
          <div className="">
            <p>Data Entry Project</p>
            <p className="text-sm text-gray-400">Task Completed</p>
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
            <p className="text-sm text-gray-400">Task Completed</p>
          </div>
        </div>
        <div>
          <p>$100</p>
          <p className="text-sm text-gray-400">1/10/2023</p>
        </div>
      </div>
    </div>
  );
};

export default OwnerCompletedTasks;
