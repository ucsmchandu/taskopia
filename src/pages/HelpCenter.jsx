import React, { useState } from "react";
import { Link } from "react-router-dom";
const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-300 py-6 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex cursor-pointer items-start justify-between gap-4 text-left focus:outline-none group"
      >
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
          {question}
        </h3>
        <span className={`text-2xl text-gray-900 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {isOpen && (
        <p className="text-gray-700 leading-relaxed mt-4 text-base">
          {answer}
        </p>
      )}
    </div>
  );
};

const HelpCenter = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sections = [
    {
      title: "Account & Signup",
      items: [
        {
          id: "account-1",
          question: "Is creating an account free?",
          answer: "Yes, creating an account on Taskopia is free for all users. You can sign up, post tasks, and apply for work without any upfront costs."
        },
        {
          id: "account-2",
          question: "Can I use the same account as a host and an ally?",
          answer: "No. Hosts and task doers must use separate accounts. This helps keep task posting, applications, and communication clear and prevents misuse of the platform."
        },
        {
          id: "account-3",
          question: "What if I forget my login details?",
          answer: "You can reset your password using the email address associated with your account. Click 'Forgot Password' on the login page and follow the instructions sent to your email."
        }
      ]
    },
    {
      title: "Posting Tasks (For Task Posters)",
      items: [
        {
          id: "posting-1",
          question: "How do I post a task?",
          answer: "After logging in as a task poster, you can create a task by providing details such as task description, location, timing, duration, and payment expectations. All details help task doers understand what you need."
        },
        {
          id: "posting-2",
          question: "Can I edit or cancel a task?",
          answer: "Yes, tasks can be edited or cancelled before they are completed. However, please inform the selected task doer if changes are made, as they may have already committed to the work."
        },
        {
          id: "posting-3",
          question: "How many task doers can I select?",
          answer: "You can select only one task doer per task. Communication is enabled only after a task doer is selected to maintain clarity and focus."
        }
      ]
    },
    {
      title: "Applying for Tasks (For Task Doers)",
      items: [
        {
          id: "applying-1",
          question: "How do I apply for a task?",
          answer: "Browse available tasks in the marketplace and apply to the ones that match your availability, skills, and interests. You can apply to multiple tasks simultaneously."
        },
        {
          id: "applying-2",
          question: "Can I chat with the task poster before acceptance?",
          answer: "No. Chat is enabled only after the task poster accepts your application. This helps keep communication focused, secure, and prevents miscommunication."
        },
        {
          id: "applying-3",
          question: "What if my application is not accepted?",
          answer: "Task posters select task doers based on their specific requirements and preferences. Not being selected for one task does not prevent you from applying for other available tasks."
        }
      ]
    },
    {
      title: "Safety & Trust",
      items: [
        {
          id: "safety-1",
          question: "Is Taskopia safe to use?",
          answer: "Taskopia provides tools to connect task posters and task doers, but all tasks are completed offline between parties. Users should always exercise caution and personal judgment when meeting new people."
        },
        {
          id: "safety-2",
          question: "How do I report a problem or safety concern?",
          answer: "You can report issues through the 'Report a Problem' section or contact our support team with relevant details. We review all reports carefully and take appropriate action."
        },
        {
          id: "safety-3",
          question: "What information do I need to share?",
          answer: "Share only the information necessary for the task. Personal details beyond contact information for the specific task are not required. Always verify details with the other party before meeting."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="h-1 mt-10"></div>

      <div className="max-w-7xl mx-auto px-8 py-24">

        <div className="max-w-3xl mb-24">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-2 h-12 bg-gray-900"></div>
            <div>
              <h1 className="text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Help Center
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl font-light">
                Find answers to common questions about using Taskopia. If you don't find what you're looking for, contact our support team for assistance.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-20">
          {sections.map((section, idx) => (
            <section key={idx}>
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold text-gray-900">
                  {section.title}
                </h2>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              <div className="space-y-0">
                {section.items.map(item => (
                  <FAQItem
                    key={item.id}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openItems[item.id] || false}
                    onToggle={() => toggleItem(item.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-24 pt-24 border-t-2 border-gray-900">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Didn't find your answer?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-8">
              Our support team is ready to help. Visit the Contact Us page to send us a message, and we'll respond within 24-48 hours.
            </p>
            <Link to="/contact" className="px-8 py-3 bg-gray-900 text-white font-semibold text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors duration-200">
              Contact Support
            </Link>
          </div>
        </div>

      </div>

      <div className="h-1  mt-24"></div>
    </div>
  );
};

export default HelpCenter;