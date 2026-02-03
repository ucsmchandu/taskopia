import React from "react";

const StepCard = ({ step, title, description }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <div className="w-16 h-16 border-2 border-gray-900 rounded-lg flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{step}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-tight">
        {title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed flex-grow">
        {description}
      </p>

      <div className="mt-6 pt-4 border-t border-gray-200"></div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-white ">
      <div className="h-1 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900"></div>

      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="max-w-3xl mb-24">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-2 h-12 bg-gray-900"></div>
            <div>
              <h1 className="text-6xl font-bold text-gray-900 mb-8 leading-tight">
                How Taskopia Works
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl font-light">
                Taskopia connects task posters and task doers through a
                structured and transparent process. All communication happens
                after a task application is accepted.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-32">
          <section>
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-4xl font-bold text-gray-900">
                For Task Posters
              </h2>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              <StepCard
                step="1"
                title="Create an Account"
                description="Sign up to post tasks and manage applications from interested task doers."
              />

              <StepCard
                step="2"
                title="Post a Task"
                description="Post a task with clear details such as location, time, duration, and payment expectations."
              />

              <StepCard
                step="3"
                title="Receive Applications"
                description="Task doers can apply to your task. You can review their applications and profiles."
              />

              <StepCard
                step="4"
                title="Select an Applicant"
                description="Choose one task doer to assign the task. Only the selected person can proceed further."
              />

              <StepCard
                step="5"
                title="Chat with Selected Task Doer"
                description="Once selected, both of you can communicate using the in-platform chat to confirm final details."
              />

              <StepCard
                step="6"
                title="Complete the Task"
                description="The task is completed offline at the agreed time and location."
              />

              <StepCard
                step="7"
                title="Close the Task"
                description="After completion, close the task and provide feedback if available."
              />
            </div>

            <div className="mt-12 pt-12 border-t border-gray-300">
              <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
                <span className="font-semibold text-gray-900">Note:</span> Chat
                access is limited to the selected task doer to maintain clarity
                and reduce misuse. You maintain complete control over who you
                work with.
              </p>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200"></div>

          <section>
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-4xl font-bold text-gray-900">
                For Task Doers
              </h2>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              <StepCard
                step="1"
                title="Create an Account"
                description="Sign up to explore available tasks and apply for work opportunities."
              />

              <StepCard
                step="2"
                title="Browse & Apply"
                description="Browse tasks and apply to ones that match your availability and skills."
              />

              <StepCard
                step="3"
                title="Wait for Acceptance"
                description="After applying, wait for the task poster to review and accept your application."
              />

              <StepCard
                step="4"
                title="Chat with Task Poster"
                description="Once accepted, you can communicate with the task poster using in-platform chat to confirm task details."
              />

              <StepCard
                step="5"
                title="Complete the Task"
                description="Meet the task poster at the agreed location and complete the task responsibly."
              />

              <StepCard
                step="6"
                title="Receive Payment"
                description="Payment is handled as agreed with the task poster based on task terms."
              />
            </div>

            <div className="mt-12 pt-12 border-t border-gray-300">
              <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
                <span className="font-semibold text-gray-900">Note:</span> Chat
                is enabled only after acceptance. Taskopia does not guarantee
                selection, income, or payment. All transactions are between the
                task poster and task doer.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-32 pt-24 border-t-2 border-gray-900">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                Safety First
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Chat is enabled only after acceptance to ensure both parties are
                committed.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                Complete Control
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Task posters choose who they work with. Task doers choose which
                tasks to apply for.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                Transparent Process
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                All details are clear before work begins. No hidden requirements
                or surprise changes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 mt-24"></div>
    </div>
  );
};

export default HowItWorks;
