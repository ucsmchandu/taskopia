import React, { useEffect } from "react";
import { useAuth } from "../AuthContextApi/AuthContext";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import useReveal from "../components/HomeComponents/UseReveal";
import Cards from "../components/HomeComponents/Cards";
import StartHome from "../components/HomeComponents/StartHome";
import { Target } from "lucide-react";
import Path from "../components/HomeComponents/Path";
import AllySuggestions from "../components/HomeComponents/Ally.Suggestions";
import HostSuggestions from "../components/HomeComponents/Host.Suggestions";
import HowItWorksSection from "../components/HomeComponents/HostComponents/HowItWorks";
import WhyChoose from "../components/HomeComponents/HostComponents/WhyChoose";
import UserSay from "../components/HomeComponents/HostComponents/UserSay";
const Home = () => {
  const { currentUser, loading } = useAuth();
  // const ref=useReveal();

  // console.log(user)
  return (
    <div className="scroll-smooth">
      {/* animated home content */}
      <StartHome user={currentUser} isLoading={loading} />

      {/* information content */}
      {currentUser?.userType === "host" ? <HowItWorksSection /> : <Cards />}

      {/* why choose taskopia */}
      {currentUser?.userType === "host" ? (
        <WhyChoose />
      ) : (
        <section className="py-20 px-6 bg-gradient-to-b from-white to-[#8D5F8C]">
          <div className="max-w-5xl mx-auto text-center">
            <h2
              ref={useReveal()}
              className="reveal text-3xl font-semibold mb-6 text-[#6B3F69]"
            >
              Why Choose Taskopia?
            </h2>
            <p ref={useReveal()} className="reveal text-[#131D4F] mb-10">
              Taskopia bridges the gap between opportunity and talent. It’s the
              easiest way for students to find flexible work...
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-[#292fa6]">
              {[
                {
                  text: "Quick Jobs Work when you’re free",
                  from: "#0D1164",
                  to: "#292fa6",
                },
                {
                  text: "No Long Commitments One-day tasks only",
                  from: "#641B2E",
                  to: "#c14c6b",
                },
                {
                  text: "Flexible Timings You decide when to work",
                  from: "#3D365C",
                  to: "#645a90",
                },
                {
                  text: "Trusted Network Verified local users",
                  from: "#3F72AF",
                  to: "#5a8cc9",
                },
              ].map((text, index) => (
                <div
                  key={index}
                  ref={useReveal()}
                  className="reveal p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition"
                  style={{
                    background: `linear-gradient(135deg, ${text.from} 0%, ${text.to} 100%)`,
                  }}
                >
                  <Sparkles className="w-8 h-8 text-white mx-auto mb-3" />
                  <p className="text-gray-100">{text.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our mission */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#8D5F8C] to-[#6B3F69] text-white text-center">
        <div ref={useReveal()} className="reveal flex flex-col items-center">
          <Target className="w-12 h-12 mb-4 text-emerald-100" />
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg max-w-3xl text-sky-100">
            To empower students with real-world earning opportunities...
          </p>
        </div>
      </section>

      {/* What our users saying  */}

      {currentUser?.userType === "host" ? (
        <UserSay />
      ) : (
        <section className="py-20 px-6 bg-white text-center">
          <h2
            ref={useReveal()}
            className="reveal text-3xl font-semibold mb-10 text-sky-700"
          >
            What Our Users Say 💬
          </h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Taskopia helped me earn extra money during weekends! So easy to use.",
                name: "Aisha, Student",
              },
              {
                quote:
                  "I found a ally in 10 minutes when my staff didn’t show up. Brilliant idea!",
                name: "Rajesh, Shop host",
              },
              {
                quote:
                  "It’s the perfect bridge between students and local jobs. Great UX too!",
                name: "Meena, College Student",
              },
            ].map((t, i) => (
              <div
                key={i}
                ref={useReveal()}
                className="reveal p-6 bg-sky-50 rounded-2xl shadow border border-sky-100"
              >
                <p className="text-gray-700 italic mb-3">“{t.quote}”</p>
                <p className="text-emerald-700 font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* ready to experince */}
      {(!currentUser && <Path />) ||
        (currentUser?.userType === "ally" && <AllySuggestions />) ||
        (currentUser?.userType === "host" && <HostSuggestions />)}
    </div>
  );
};

export default Home;
