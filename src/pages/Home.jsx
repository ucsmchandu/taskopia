import React from "react";
import { useAuth } from "../AuthContextApi/AuthContext";
import { Sparkles, Target } from "lucide-react";
import useReveal from "../components/HomeComponents/UseReveal";
import Cards from "../components/HomeComponents/Cards";
import StartHome from "../components/HomeComponents/StartHome";
import Path from "../components/HomeComponents/Path";
import AllySuggestions from "../components/HomeComponents/Ally.Suggestions";
import HostSuggestions from "../components/HomeComponents/Host.Suggestions";
import HowItWorksSection from "../components/HomeComponents/HostComponents/HowItWorks";
import WhyChoose from "../components/HomeComponents/HostComponents/WhyChoose";
import UserSay from "../components/HomeComponents/HostComponents/UserSay";

// Reusable wrapper for reveal animations 
function Reveal({ as: Tag = "div", className = "", children, ...props }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...props}>
      {children}
    </Tag>
  );
}

const Home = () => {
  const { currentUser, loading } = useAuth();

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
            <Reveal
              as="h2"
              className="text-3xl font-semibold mb-6 text-[#6B3F69]"
            >
              Why Choose Taskopia?
            </Reveal>

            <Reveal as="p" className="text-[#131D4F] mb-10">
              Taskopia bridges the gap between opportunity and talent. It’s the
              easiest way for students to find flexible work...
            </Reveal>

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
              ].map((item, index) => (
                <Reveal
                  key={index}
                  className="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition"
                  style={{
                    background: `linear-gradient(135deg, ${item.from} 0%, ${item.to} 100%)`,
                  }}
                >
                  <Sparkles className="w-8 h-8 text-white mx-auto mb-3" />
                  <p className="text-gray-100">{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Our mission */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#8D5F8C] to-[#6B3F69] text-white text-center">
        <Reveal className="flex flex-col items-center">
          <Target className="w-12 h-12 mb-4 text-emerald-100" />
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg max-w-3xl text-sky-100">
            To empower students with real-world earning opportunities...
          </p>
        </Reveal>
      </section>

      {/* What our users say */}
      {currentUser?.userType === "host" ? (
        <UserSay />
      ) : (
        <section className="py-20 px-6 bg-white text-center">
          <Reveal as="h2" className="text-3xl font-semibold mb-10 text-sky-700">
            What Our Users Say 💬
          </Reveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Taskopia helped me earn extra money during weekends! So easy to use.",
                name: "Aisha, Student",
              },
              {
                quote:
                  "I found an ally in 10 minutes when my staff didn’t show up. Brilliant idea!",
                name: "Rajesh, Shop host",
              },
              {
                quote:
                  "It’s the perfect bridge between students and local jobs. Great UX too!",
                name: "Meena, College Student",
              },
            ].map((t, i) => (
              <Reveal
                key={i}
                className="p-6 bg-sky-50 rounded-2xl shadow border border-sky-100"
              >
                <p className="text-gray-700 italic mb-3">“{t.quote}”</p>
                <p className="text-emerald-700 font-semibold">{t.name}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ready to experience */}
      {(!currentUser && <Path />) ||
        (currentUser?.userType === "ally" && <AllySuggestions />) ||
        (currentUser?.userType === "host" && <HostSuggestions />)}
    </div>
  );
};

export default Home;
