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
        <section className="py-20 px-6 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal
              as="h2"
              className="text-3xl md:text-4xl font-semibold mb-6 text-[#0F172A]"
            >
              Why Choose Taskopia?
            </Reveal>

            <Reveal as="p" className="text-[#475569] mb-12 max-w-2xl mx-auto">
              Taskopia bridges the gap between opportunity and talent. It’s the
              easiest way for students to find flexible work.
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  text: "Quick Jobs — work when you’re free",
                },
                {
                  text: "No Long Commitments — one-day tasks only",
                },
                {
                  text: "Flexible Timings — you decide when to work",
                },
                {
                  text: "Trusted Network — verified local users",
                },
              ].map((item, index) => (
                <Reveal
                  key={index}
                  className="p-6 bg-white rounded-xl border border-[#E2E8F0]
                     shadow-sm hover:shadow-lg transition-all"
                >
                  <div
                    className="w-12 h-12 mx-auto mb-4 rounded-full
                          bg-[#EFF6FF] flex items-center justify-center"
                  >
                    <Sparkles className="w-6 h-6 text-[#2563EB]" />
                  </div>

                  <p className="text-[#0F172A] text-sm font-medium leading-relaxed">
                    {item.text}
                  </p>
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
