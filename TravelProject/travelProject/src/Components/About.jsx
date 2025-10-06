import {
  FaArrowCircleRight,
  FaAward,
  FaCamera,
  FaCompass,
  FaGlobe,
  FaHeart,
  FaMap,
  FaShieldAlt,
  FaStar,
  FaUser,
  FaUserShield,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./About.css";
import { GiCompass } from "react-icons/gi";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function About() {
  //   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const features = [
    {
      icon: FaGlobe,
      title: "Global Discovery",
      description:
        "Explore destinations from around the world with curated content and authentic local insights.",
    },
    {
      icon: FaHeart,
      title: "Personalized Experience",
      description:
        "Save your favorite destinations and get recommendations tailored to your travel preferences.",
    },
    {
      icon: FaMap,
      title: "Smart Planning",
      description:
        "Advanced search and filtering tools to help you find the perfect destination for any occasion.",
    },
    {
      icon: FaCamera,
      title: "Visual Inspiration",
      description:
        "Stunning photography galleries and immersive visual content to inspire your next adventure.",
    },
    {
      icon: FaUser,
      title: "Travel Community",
      description:
        "Connect with fellow travelers through shared experiences and authentic travel stories.",
    },
    {
      icon: FaAward,
      title: "Trusted Content",
      description:
        "Expertly curated travel guides and articles from experienced travelers and local experts.",
    },
  ];
  const values = [
    {
      icon: FaCompass,
      title: "Authentic Discovery",
      description:
        "We believe in showcasing the real, authentic essence of each destination, beyond the typical tourist experience.",
    },
    {
      icon: FaShieldAlt,
      title: "Trusted Guidance",
      description:
        "Our platform provides reliable, up-to-date information to help you make informed travel decisions.",
    },
    {
      icon: FaHeart,
      title: "Sustainable Travel",
      description:
        "We promote responsible tourism that respects local communities and preserves natural beauty.",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, delay: 3}); // 1000ms = 1s
  }, []);
  return (
    <div className="aboutPage">
      <div className="aboutVoyagoDiv">
        <h2>About Voyago</h2>
        <p style={{ color: "white" }}>
          Your gateway to discovering the world's most incredible destinations,
          one journey at a time.
        </p>
        <NavLink className="startExploringDiv" to={"/discover"}>
          <p className="toDiscover">Start Exploring</p>
          <FaArrowCircleRight />
        </NavLink>
      </div>
      <div className="aboutMissionDiv">
        <div className="aboutMissionHolder">
          <div className="aboutMissionTextDiv" data-aos="fade-right">
            <h2>Our Mission</h2>
            <p>
              At Voyago, we believe that travel has the power to transform
              lives, broaden perspectives, and create lasting memories. Our
              mission is to make the world more accessible by providing
              travelers with the tools, inspiration, and insights they need to
              discover their perfect destinations.
            </p>
            <p>
              We're not just another travel website – we're your trusted
              companion for planning meaningful adventures that go beyond the
              ordinary.
            </p>
          </div>
          <div className="aboutMissionImage" data-aos="fade-left">
            <img
              src="https://images.unsplash.com/photo-1730124572307-e98b702a80ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBleHBsb3JlJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc1OTM1NjEzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral://images.unsplash.com/photo-1730124572307-e9…&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt=""
            />
            <div className="imageGlobeDiv">
              <FaGlobe className="imageGlobe" />
            </div>
          </div>
        </div>
      </div>
      <div className="aboutStatsDiv">
        <div className="aboutStatsHolder">
          <div className="aboutStats">
            <h1>
              <CountUp start={0} end={30} duration={7} delay={2}>
                30
              </CountUp>
              +
            </h1>
            <p>Destinations</p>
          </div>
          <div className="aboutStats">
            <h1>
              <CountUp start={0} end={30} duration={7} delay={2}>
                30
              </CountUp>
              +
            </h1>
            <p>Happy travelers</p>
          </div>
          <div className="aboutStats">
            <h1>
              <CountUp start={0} end={20} duration={7} delay={2}>
                30
              </CountUp>
              +
            </h1>
            <p>Countries</p>
          </div>
          <div className="aboutStats">
            <h1>
              <FaStar style={{ color: "yellow" }} />
              <CountUp start={0.0} end={5.0} duration={7} delay={2}>
                30
              </CountUp>
            </h1>
            <p>User ratings</p>
          </div>
        </div>
      </div>
      <div className="specialVoyagoDiv" data-aos="fade-up">
        <h2 style={{ textAlign: "center" }}>What Makes Voyago Special</h2>
        <p className="specialVoyagop">
          We've built a comprehensive platform that combines cutting-edge
          technology with authentic travel experiences to help you discover your
          next adventure.
        </p>
        <div className="specialVoyagoCardsDiv">
          {features?.map((featureCards) => {
            return (
              <div className="cards">
                <div className="cardsheaderTextDiv">
                  <div className="cardsIconDiv">
                    {<featureCards.icon className="cardsIcon" />}
                  </div>
                  <p>{featureCards.title}</p>
                </div>
                <p>{featureCards.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="valuesDiv" data-aos="fade-up">
        <h2>Our Values</h2>
        <p>
          These core principles guide everything we do and shape the Voyago
          experience
        </p>
        <div className="valueCardsDiv">
          {values.map((values) => {
            return (
              <div className="valueCard">
                <div className="valuesIconDiv">
                  {<values.icon className="valueIcon" />}
                </div>
                <h3 className="valueTitle">{values.title}</h3>
                <p className="valueDescription">{values.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="howVoyagoWorksDiv" data-aos="fade-up">
        <h2>How Voyago Works</h2>
        <p>
          Discover, plan, and experience amazing destinations in just a few
          simple steps.
        </p>
        <div className="voyagoWorksDiv">
          <div className="voyagoWorksCards">
            <div className="voyagoWorksSpanDiv">
              <span className="voyagoWorksSpan">1</span>
            </div>
            <h1>Discover</h1>
            <p>
              Browse our curated collection of destinations, filtered by your
              interests and travel style.
            </p>
          </div>
          <div className="voyagoWorksCards">
            <div className="voyagoWorksSpanDiv">
              <span className="voyagoWorksSpan">2</span>
            </div>
            <h1>Plan</h1>
            <p>
              Save your favorites, read detailed guides, and get personalized
              recommendations.
            </p>
          </div>
          <div className="voyagoWorksCards">
            <div className="voyagoWorksSpanDiv">
              <span className="voyagoWorksSpan">3</span>
            </div>
            <h1>Experience</h1>
            <p>
              Embark on your journey with confidence, armed with local insights
              and expert tips.
            </p>
          </div>
        </div>
      </div>
      <div className="startJourneyDiv" data-aos="fade-up">
        <h2>Ready to Start Your Journey?</h2>
        <p>
          Join thousands of travelers who have discovered their perfect
          destinations through Voyago. Your next adventure is just a click away.
        </p>
        <div className="exploreDestinationsDiv">
          <NavLink className={"exploreDestinations"} to={"/discover"}>
            Explore Destinations
          </NavLink>
        </div>
      </div>
    </div>
  );
}
