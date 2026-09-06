import React from "react";
import { useAuth } from "../AuthContextApi/AuthContext";
import useReveal from "../components/HomeComponents/UseReveal";
import Cards from "../components/HomeComponents/Cards";
import StartHome from "../components/HomeComponents/StartHome";
import Path from "../components/HomeComponents/Path";
import AllySuggestions from "../components/HomeComponents/Ally.Suggestions";
import HostSuggestions from "../components/HomeComponents/Host.Suggestions";
import HowItWorksSection from "../components/HomeComponents/HostComponents/HowItWorks";
import WhyChoose from "../components/HomeComponents/HostComponents/WhyChoose";
import UserSay from "../components/HomeComponents/HostComponents/UserSay";
import axios from "axios";
import { useEffect } from "react";
import { auth } from "../Firebase/Firebase";
import { useQuery } from "@tanstack/react-query";
import NewUserHomePage from "../components/HomeComponents/NewUserHomePage";
import HomePage from "../components/HomeComponents/HostComponents/HomePage";
// Reusable wrapper for reveal animations
function Reveal({ as: Tag = "div", className = "", children, ...props }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...props}>
      {children}
    </Tag>
  );
}

const getNotifications = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/notifications/get/notifications`,
      { withCredentials: true },
    );
    return res.data;
  } catch (err) {
    console.log(err);
    if (err.response?.status === 404) return [];
  }
};

const Home = () => {
  const { currentUser, loading } = useAuth();
  // console.log(currentUser);
  // console.log(auth)
  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    staleTime: 3000,
    enabled: !!currentUser, // only fetch when logged in
  });
  // console.log(currentUser)
  return (
    <div className="scroll-smooth">
      {!currentUser?.firebaseId ? (
        <NewUserHomePage />
      ) : currentUser.userType === "host" ? (
        <HomePage />
      ) : currentUser.userType === "ally" ? (
        <StartHome user={currentUser} isLoading={loading} />
      ) : null}

      {/* information content */}
      {currentUser?.userType === "host" ? <HowItWorksSection /> : <Cards />}

      {/* why choose taskopia */}
      {currentUser?.userType === "host" ? (
        <WhyChoose />
      ) : (
        <section
          className="relative overflow-hidden py-24 md:py-32 px-6"
          style={{ backgroundColor: "#F5F3EC", color: "#141413" }}
        >
          {/* Background Grid Pattern (Plain lines only, no blur/noise) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            aria-hidden="true"
            style={{
              backgroundImage: `
                linear-gradient(to right, #DCD8CE 1px, transparent 1px),
                linear-gradient(to bottom, #DCD8CE 1px, transparent 1px)
              `,
              backgroundSize: "4rem 4rem",
            }}
          />

          <div className="relative max-w-[85rem] mx-auto z-10 text-center">
            <span
              className="text-[10px] tracking-[0.3em] uppercase font-bold mb-6 px-4 py-1.5 border inline-block"
              style={{ color: "#141413", borderColor: "#141413" }}
            >
              The Advantage
            </span>

            <Reveal
              as="h2"
              className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-balance mb-6 text-[#141413]"
            >
              Why Choose Taskopia?
            </Reveal>

            <div
              className="w-16 h-px mb-6 mx-auto"
              style={{ backgroundColor: "#5A5752" }}
            ></div>

            <Reveal
              as="p"
              className="text-lg font-medium mb-16 max-w-2xl mx-auto leading-relaxed text-[#5A5752]"
            >
              Taskopia bridges the gap between opportunity and talent. It’s the
              easiest way for students to find flexible work.
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-left">
              {[
                {
                  title: "Quick Jobs",
                  text: "Find flexible work that fits cleanly around classes and weekends.",
                  number: "01",
                },
                {
                  title: "No Long Commitments",
                  text: "Pick one-day tasks without getting locked into long shifts or obligations.",
                  number: "02",
                },
                {
                  title: "Flexible Timings",
                  text: "Choose when you want to work and keep full control of your schedule.",
                  number: "03",
                },
                {
                  title: "Trusted Network",
                  text: "Connect with verified local users and safer task opportunities.",
                  number: "04",
                },
              ].map((item, index) => (
                <Reveal
                  key={index}
                  className="group relative p-8 bg-[#FCFBFA] transition-all duration-300 hover:-translate-y-1.5"
                  style={{
                    border: "1px solid #DCD8CE",
                    boxShadow: "6px 6px 0px 0px #DCD8CE",
                  }}
                >
                  <div
                    className="flex justify-between items-center mb-10 border-b pb-5"
                    style={{ borderColor: "#DCD8CE" }}
                  >
                    <div
                      className="w-10 h-10 rounded-full border flex items-center justify-center font-bold text-xs tracking-wider"
                      style={{
                        borderColor: "#DCD8CE",
                        backgroundColor: "#F5F3EC",
                        color: "#141413",
                      }}
                    >
                      {item.number}
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl mb-3 leading-tight text-[#141413]">
                    {item.title}
                  </h3>

                  <p className="text-sm font-medium leading-[1.7] text-[#5A5752]">
                    {item.text}
                  </p>

                  <div
                    className="absolute bottom-3 right-3 w-1.5 h-1.5 border-r border-b opacity-40"
                    style={{ borderColor: "#141413" }}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What our users say */}
      {currentUser?.userType === "host" ? (
        <UserSay />
      ) : (
        <section
          className="relative overflow-hidden py-24 px-6"
          style={{ backgroundColor: "#F5F3EC", color: "#141413" }}
        >
          {/* Background Grid Pattern (Plain lines only, no blur/noise) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            aria-hidden="true"
            style={{
              backgroundImage: `
                linear-gradient(to right, #DCD8CE 1px, transparent 1px),
                linear-gradient(to bottom, #DCD8CE 1px, transparent 1px)
              `,
              backgroundSize: "4rem 4rem",
            }}
          />

          <div className="relative max-w-5xl mx-auto text-center z-10">
            <Reveal
              as="h2"
              className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-[#141413]"
            >
              What Our Users Say
            </Reveal>

            <p
              className="text-sm md:text-base mb-16 max-w-lg mx-auto font-medium"
              style={{ color: "#5A5752" }}
            >
              Hear from the students and hosts building the Taskopia community.
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left">
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
                  className="p-8 bg-[#FCFBFA] border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: "#DCD8CE",
                    boxShadow: "6px 6px 0px 0px #DCD8CE",
                  }}
                >
                  <p
                    className="text-sm md:text-base leading-relaxed mb-8 font-normal"
                    style={{ color: "#5A5752" }}
                  >
                    “{t.quote}”
                  </p>
                  <p
                    className="font-bold text-sm tracking-wide text-[#141413] pt-4 border-t"
                    style={{ borderColor: "#DCD8CE" }}
                  >
                    {t.name}
                  </p>
                </Reveal>
              ))}
            </div>
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
