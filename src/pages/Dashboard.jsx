import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import EligibilityCriteria from "../components/EligibilityCriteria";
import Footer from "../components/Footer";

export default function Dashboard({ handleLogout }) {
    // 1. Create a ref to attach to the criteria section DOM element
    const criteriaRef = useRef(null);

    // 2. Create the function that will be called to scroll to that element
    const scrollToCriteria = () => {
        criteriaRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* 3. Pass all necessary props to the Navbar component */}
            <Navbar
                handleLogout={handleLogout}
                scrollToCriteria={scrollToCriteria}
                showCriteriaButton={true}
            />
            <main className="flex-grow">
                <Hero />
                {/* 4. Attach the ref to a wrapper div around the EligibilityCriteria component */}
                <div ref={criteriaRef}>
                    <EligibilityCriteria />
                </div>
            </main>
            <Footer />
        </div>
    );
}
