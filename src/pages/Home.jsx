import React from "react";
import Cards from "../components/HomeComponents/Cards";
import StartHome from "../components/HomeComponents/StartHome";
import { motion } from "framer-motion";
import { Briefcase, Users, CheckCircle, Target, Sparkles } from "lucide-react";

const Home = () => {
  const user = null;

  return (
    <>
      {/* animated home content */}
      <StartHome />
      {/* information content */}
      <Cards />

      {/* why choose taskopia */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#1B3C53] to-[#8D5F8C]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-semibold mb-6 text-yellow-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose Taskopia?
          </motion.h2>
          <motion.p
            className="text-white mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Taskopia bridges the gap between opportunity and talent. It’s the
            easiest way for students to find flexible work and for owners to get
            reliable help.
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Quick Jobs — Work when you’re free",
              "No Long Commitments — One-day tasks only",
              "Flexible Timings — You decide when to work",
              "Trusted Network — Verified local users",
            ].map((text, index) => (
              <motion.div
                key={index}
                className="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-sky-100"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Sparkles className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
                <p className="text-gray-700">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our mission */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#8D5F8C] to-[#6B3F69] text-white text-center">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Target className="w-12 h-12 mb-4 text-emerald-100" />
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg max-w-3xl text-sky-100">
            To empower students with real-world earning opportunities and help
            small business owners get reliable help easily building a smarter,
            connected, and supportive community.
          </p>
        </motion.div>
      </section>

      {/* What our users saying  */}
      <section className="py-20 px-6 bg-white text-center">
        <motion.h2
          className="text-3xl font-semibold mb-10 text-sky-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What Our Users Say 💬
        </motion.h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "Taskopia helped me earn extra money during weekends! So easy to use.",
              name: "Aisha, Student",
            },
            {
              quote:
                "I found a worker in 10 minutes when my staff didn’t show up. Brilliant idea!",
              name: "Rajesh, Shop Owner",
            },
            {
              quote:
                "It’s the perfect bridge between students and local jobs. Great UX too!",
              name: "Meena, College Student",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="p-6 bg-sky-50 rounded-2xl shadow border border-sky-100"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3 }}
            >
              <p className="text-gray-700 italic mb-3">“{t.quote}”</p>
              <p className="text-emerald-700 font-semibold">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* ready to experince */}
      <section className="py-20 bg-gradient-to-r from-[#E5989B] to-[#B5828C] text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience the Future of Micro Work?
          </h2>
          <p className="text-lg mb-8 text-sky-100">
            Join Taskopia today and start your journey — whether you’re an owner
            or a student.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-white text-emerald-700 rounded-xl font-semibold shadow hover:bg-sky-50 transition">
              Join as Student
            </button>
            <button className="px-6 py-3 bg-emerald-700 text-white rounded-xl font-semibold shadow hover:bg-emerald-800 transition">
              Join as Owner
            </button>
          </div>
        </motion.div>
      </section>

    </>
  );
};

export default Home;
