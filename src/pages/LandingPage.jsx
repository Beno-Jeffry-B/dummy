import React, { useRef } from "react";
import LandingNavbar from "../components/LandingNavbar";
import LandingHero from "../components/LandingHero";
import EligibilityCriteria from "../components/EligibilityCriteria";
import Footer from "../components/Footer";

export default function LandingPage() {
    // Create a ref to attach to the criteria section
    const criteriaRef = useRef(null);

    // Create a function that scrolls to the ref's element
    const scrollToCriteria = () => {
        criteriaRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Pass the scroll function to the navbar */}
            <LandingNavbar scrollToCriteria={scrollToCriteria} />
            <main className="flex-grow">
                <LandingHero />
                {/* Attach the ref to a wrapper div around the component */}
                <div ref={criteriaRef}>
                    <EligibilityCriteria />
                </div>
            </main>
            <Footer />
        </div>
    );
}
