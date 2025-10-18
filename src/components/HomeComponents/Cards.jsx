import React from 'react'
import { motion } from "framer-motion";
import { Briefcase, Users, CheckCircle, Sparkles } from "lucide-react";

const Cards = () => {
  return (
   <section className="py-20 px-6 bg-gradient-to-b from-gray-800 to-[#1B3C53] ">
        <h2 className="text-3xl font-semibold text-center mb-12 text-sky-300">
          How Taskopia Works
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Briefcase className="w-10 h-10 text-emerald-600 mb-4" />,
              title: "Post a Task",
              desc: "Owners post one-day or short-term jobs when they need help.",
            },
            {
              icon: <Users className="w-10 h-10 text-sky-600 mb-4" />,
              title: "Students Apply",
              desc: "Students nearby view available jobs and apply instantly.",
            },
            {
              icon: <CheckCircle className="w-10 h-10 text-emerald-600 mb-4" />,
              title: "Work & Get Paid",
              desc: "Complete the task, help the owner, and earn your payment easily.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gradient-to-br from-white to-sky-50 rounded-2xl shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center text-center">
                {step.icon}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
   
  )
}

export default Cards