import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // TODO: add email sending api
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white mt-10">
      <div className="h-1 "></div>

      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="max-w-3xl mb-20">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-2 h-12 bg-gray-900"></div>
            <div>
              <h1 className="text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Get in Touch
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl font-light">
                Have a question, issue, or feedback? Our support team is here to
                help. Send us a message and we'll get back to you as soon as
                possible.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                Send Us a Message
              </h2>
              <div className="w-12 h-1 bg-gray-900 mt-4"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="name ..."
                  className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="bg-white">
                    Select a subject
                  </option>
                  <option value="account" className="bg-white">
                    Account related issue
                  </option>
                  <option value="task" className="bg-white">
                    Task or application issue
                  </option>
                  <option value="payment" className="bg-white">
                    Payment related question
                  </option>
                  <option value="safety" className="bg-white">
                    Safety or trust concern
                  </option>
                  <option value="feedback" className="bg-white">
                    General feedback
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Describe your issue or question clearly..."
                  className="w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-500 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-8 cursor-pointer px-8 py-3 bg-gray-900 text-white font-semibold text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-12">
            <div className="border-l-4 border-gray-900 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Support Information
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our support team reviews all messages carefully. Please provide
                as much detail as possible so we can assist you effectively. We
                value your feedback and concerns.
              </p>
            </div>

            <div className="border-l-4 border-gray-700 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Response Time
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We typically respond within <strong>24–48 hours</strong>.
                Response times may vary during weekends or high-volume periods.
                Urgent matters may require faster attention.
              </p>
            </div>

            <div className="border-l-4 border-gray-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Important Notes
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-gray-900 font-bold text-lg">–</span>
                  <span className="text-gray-700">
                    Taskopia does not handle emergency situations through this
                    form.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-900 font-bold text-lg">–</span>
                  <span className="text-gray-700">
                    For task-specific issues, include relevant task details if
                    possible.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-900 font-bold text-lg">–</span>
                  <span className="text-gray-700">
                    Abusive or misleading messages may not receive a response.
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-8 border-t-2 border-gray-300 mt-12">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                Other Ways to Reach Us
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                For general inquiries, you can also reach out through our social
                media channels or visit our help center for frequently asked
                questions and documentation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 mt-24"></div>
    </div>
  );
};

export default Contact;
