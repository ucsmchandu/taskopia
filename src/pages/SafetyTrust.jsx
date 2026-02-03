import React from "react";
import { Link } from "react-router-dom";

const SafetyTrust = () => {
  return (
    <div className="min-h-screen bg-white mt-10">
      <div className="h-1 "></div>

      <div className="max-w-7xl mx-auto px-8 py-24">

        <div className="max-w-3xl mb-20">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-2 h-12 bg-gray-900"></div>
            <div>
              <h1 className="text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Safety & Trust
              </h1>
              <p className="text-base text-gray-700 leading-relaxed max-w-2xl font-light">
                At Taskopia, safety and trust are essential to creating meaningful connections. While tasks are completed offline, we provide tools and guidelines to help users interact responsibly.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl space-y-12">

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Our Role as a Platform
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              Taskopia is a technology platform that connects task posters and task doers for short-term tasks. We do not supervise task execution or act as an employer, contractor, or agent for any user.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm">
              Our responsibility is to provide a structured environment where users can connect, communicate, and report issues when necessary.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Safe Communication
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              Taskopia offers an in-platform chat system that is enabled only after a task poster accepts a task doer's application.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm">
              The chat system is intended strictly for task-related communication such as timing, location, and expectations.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm font-medium">
              Taskopia may review conversations to ensure compliance with platform rules and to prevent misuse or inappropriate behavior.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Guidelines for Task Posters
            </h2>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-3 text-gray-700 text-sm">
                <span className="text-gray-900 font-bold mt-0.5">–</span>
                <span>Provide accurate and complete task details</span>
              </li>
              <li className="flex gap-3 text-gray-700 text-sm">
                <span className="text-gray-900 font-bold mt-0.5">–</span>
                <span>Select task doers carefully based on applications</span>
              </li>
              <li className="flex gap-3 text-gray-700 text-sm">
                <span className="text-gray-900 font-bold mt-0.5">–</span>
                <span>Use chat only for task-related communication</span>
              </li>
              <li className="flex gap-3 text-gray-700 text-sm">
                <span className="text-gray-900 font-bold mt-0.5">–</span>
                <span>Avoid sharing sensitive personal information</span>
              </li>
              <li className="flex gap-3 text-gray-700 text-sm">
                <span className="text-gray-900 font-bold mt-0.5">–</span>
                <span>Report suspicious or abusive behavior promptly</span>
              </li>
            </ul>
          </section>

          <div className="h-px bg-gray-300"></div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Guidelines for Task Doers
            </h2>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-3 text-gray-700 text-sm">
                <span className="text-gray-900 font-bold mt-0.5">–</span>
                <span>Apply only to tasks you can commit to</span>
              </li>
              <li className="flex gap-3 text-gray-700 text-sm">
                <span className="text-gray-900 font-bold mt-0.5">–</span>
                <span>Review task details carefully before accepting</span>
              </li>
              <li className="flex gap-3 text-gray-700 text-sm">
                <span className="text-gray-900 font-bold mt-0.5">–</span>
                <span>Communicate clearly and professionally with task posters</span>
              </li>
              <li className="flex gap-3 text-gray-700 text-sm">
                <span className="text-gray-900 font-bold mt-0.5">–</span>
                <span>Do not share passwords or sensitive personal details</span>
              </li>
              <li className="flex gap-3 text-gray-700 text-sm">
                <span className="text-gray-900 font-bold mt-0.5">–</span>
                <span>Report issues or unsafe situations immediately</span>
              </li>
            </ul>
          </section>

          <div className="h-px bg-gray-300"></div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Offline Safety
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              Tasks arranged through Taskopia are completed offline. Users are responsible for taking appropriate precautions during in-person interactions.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm">
              We recommend meeting in safe, appropriate locations and trusting your judgment at all times.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Reporting Problems
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              If you experience misuse, abuse, or any behavior that violates platform rules, you can report the issue through the "Report a Problem" page.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm">
              Reported issues are reviewed, and appropriate action may be taken based on the nature of the report.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Our Commitment to Trust
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              Building trust takes time. Taskopia is committed to improving platform safeguards, strengthening moderation, and supporting responsible use as the platform evolves.
            </p>
          </section>

        </div>

        <div className="mt-24 pt-20 border-t-2 border-gray-300">
          <div className="max-w-2xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Questions About Safety?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              If you have concerns about safety or want to report an issue, please visit our Contact Us page or use the Report a Problem feature on the platform.
            </p>
            <Link to="/report-problem" className="px-8 py-3 bg-gray-900 text-white font-semibold text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors duration-200">
              Report a Problem
            </Link>
          </div>
        </div>

      </div>

      <div className="h-1 mt-24"></div>
    </div>
  );
};

export default SafetyTrust;