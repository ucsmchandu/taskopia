import React from "react";
import PageSection from "../components/PageSection";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mt-16 mx-auto px-6 py-20">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Taskopia
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Taskopia is a short-term task marketplace designed to help people
            connect for quick, flexible, real-world work - without long-term
            commitments or complex hiring processes.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 md:p-14 space-y-14">
          <PageSection title="Who We Are">
            <p>
              Taskopia is a technology platform built for everyday needs. We
              connect individuals and businesses who need short-term help with
              people looking to earn through flexible, task-based work.
            </p>
            <p>
              From small shop owners to individuals handling one-time tasks,
              Taskopia provides a simple way to find help without the
              complications of traditional hiring or long-term employment.
            </p>
          </PageSection>

          <PageSection title="Why Taskopia Exists">
            <p>
              Many real-world tasks do not require permanent employees, lengthy
              contracts, or complex recruitment processes. Yet, finding reliable
              short-term help remains a challenge.
            </p>
            <p>
              At the same time, many people prefer flexible work - choosing
              when, where, and how they work - instead of being tied to
              long-term job commitments.
            </p>
            <p>
              Taskopia exists to bridge this gap by enabling quick connections
              between task posters and task doers in a transparent and efficient
              way.
            </p>
          </PageSection>

          <PageSection title="What We Do">
            <p>
              Taskopia allows task posters to publish short-term tasks with
              clear details such as location, duration, and compensation.
              Interested users can apply, and task posters can choose who they
              want to work with.
            </p>
            <p>
              The platform facilitates discovery and communication, while the
              task itself is completed offline based on mutual agreement between
              the parties involved.
            </p>
            <p className="font-medium text-gray-800">
              Taskopia operates strictly as a technology platform and does not
              act as an employer, contractor, or agent for any user.
            </p>
          </PageSection>

          <PageSection title="Who Can Use Taskopia">
            <div className="grid md:grid-cols-2 gap-10 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Task Posters
                </h3>
                <p>
                  Task posters include shop owners, small businesses, and
                  individuals who need help with short-term or one-time tasks.
                  They can post tasks, review applications, and select suitable
                  task doers based on their needs.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Task Doers
                </h3>
                <p>
                  Task doers include students, freelancers, daily workers, and
                  anyone looking for flexible, short-duration work. They can
                  browse tasks, apply based on availability, and earn by
                  completing accepted tasks.
                </p>
              </div>
            </div>
          </PageSection>

          <PageSection title="Our Mission">
            <p>
              Our mission is to make short-term work accessible, flexible, and
              fair by reducing friction between people who need help and people
              who want to work - without forcing long-term commitments on either
              side.
            </p>
          </PageSection>

          <PageSection title="Our Values">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Simplicity:</strong> Clear processes without unnecessary
                complexity.
              </li>
              <li>
                <strong>Flexibility:</strong> Work opportunities that fit
                individual schedules.
              </li>
              <li>
                <strong>Transparency:</strong> Clear task expectations and
                communication.
              </li>
              <li>
                <strong>Responsibility:</strong> Users are accountable for their
                actions and agreements.
              </li>
            </ul>
          </PageSection>

          <PageSection title="Looking Ahead">
            <p>
              Taskopia is continuously evolving. We are focused on improving
              user experience, strengthening trust mechanisms, and building
              features that make short-term work safer and more reliable for
              everyone on the platform.
            </p>
          </PageSection>
        </div>
      </div>
    </div>
  );
};

export default About;
