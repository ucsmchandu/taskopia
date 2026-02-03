import React from "react";

const PageSection = ({ title, children }) => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed text-base">
        {children}
      </div>
    </section>
  );
};

export default PageSection;
