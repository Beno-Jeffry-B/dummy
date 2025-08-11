import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StepIndicator from '../components/StepIndicator';
import Step1 from '../components/RegistrationSteps/Step1';
import Step2 from '../components/RegistrationSteps/Step2';
import Step3 from '../components/RegistrationSteps/Step3';
import Step4 from '../components/RegistrationSteps/Step4';
import Step5 from '../components/RegistrationSteps/Step5';
import ConfirmationModal from '../components/ConfirmationModal';

export default function RegistrationPage({ handleLogout }) {
    const navigate = useNavigate();

    // Initialize state from sessionStorage
    const [currentStep, setCurrentStep] = useState(() => {
        const savedStep = sessionStorage.getItem('registrationStep');
        return savedStep ? parseInt(savedStep, 10) : 1;
    });

    const [completedStep, setCompletedStep] = useState(() => {
        const savedCompleted = sessionStorage.getItem('completedStep');
        return savedCompleted ? parseInt(savedCompleted, 10) : 1;
    });

    const [formData, setFormData] = useState(() => {
        const savedData = sessionStorage.getItem('formData');
        return savedData ? JSON.parse(savedData) : {};
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Save state to sessionStorage whenever it changes
    useEffect(() => {
        sessionStorage.setItem('registrationStep', currentStep);
    }, [currentStep]);

    useEffect(() => {
        sessionStorage.setItem('completedStep', completedStep);
    }, [completedStep]);

    useEffect(() => {
        const serializableFormData = {};
        for (const key in formData) {
            const value = formData[key];
            if (value instanceof File) {
                serializableFormData[key] = {
                    _isPlaceholder: true,
                    name: value.name,
                    size: value.size,
                    type: value.type,
                };
            } else {
                serializableFormData[key] = value;
            }
        }
        sessionStorage.setItem('formData', JSON.stringify(serializableFormData));
    }, [formData]);


    // This useEffect shows the "Are you sure?" popup. It remains unchanged.
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = 'Are you sure you want to leave? Your changes will be lost.';
        };

        const hasData = Object.keys(formData).length > 0;
        if (hasData) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        }
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [formData]);

    // --- NEW CODE ---
    // This new useEffect clears the data if the user confirms they want to leave.
    useEffect(() => {
        const handlePageHide = (event) => {
            // This runs when the page is being closed or navigated away from,
            // but only *after* the user confirms in the popup.
            if (!event.persisted) {
                sessionStorage.removeItem('formData');
                sessionStorage.removeItem('registrationStep');
                sessionStorage.removeItem('completedStep');
            }
        };

        window.addEventListener('pagehide', handlePageHide);
        return () => {
            window.removeEventListener('pagehide', handlePageHide);
        };
    }, []); // This effect runs once on component mount.


    const totalSteps = 5;

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setFormData((prev) => ({ ...prev, [name]: files?.[0] || null }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        }
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCompletedStep(Math.max(completedStep, currentStep + 1));
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const goToStep = (step) => {
        if (step <= completedStep) setCurrentStep(step);
    };

    const handleFinalSubmit = () => {
        alert('Form Submitted Successfully!\nData (files not shown): ' + JSON.stringify(formData, (k, v) => v instanceof File ? v.name : v, 2));

        // Clear state and storage for normal submission
        setFormData({});
        sessionStorage.removeItem('registrationStep');
        sessionStorage.removeItem('completedStep');
        sessionStorage.removeItem('formData');

        setIsModalOpen(false);
        navigate('/dashboard');
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1 data={formData} handleChange={handleChange} />;
            case 2: return <Step2 data={formData} handleChange={handleChange} />;
            case 3: return <Step3 data={formData} handleChange={handleChange} />;
            case 4: return <Step4 data={formData} handleChange={handleChange} />;
            case 5: return <Step5 data={formData} handleChange={handleChange} />;
            default: return <Step1 data={formData} handleChange={handleChange} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-emerald-100 via-indigo-100 to-violet-100">
            <Navbar handleLogout={handleLogout} />
            <main className="flex-grow flex items-center justify-center py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">
                        Register for Alumni Entrepreneur Award
                    </h2>
                    <StepIndicator currentStep={currentStep} totalSteps={totalSteps} completedStep={completedStep} onStepClick={goToStep} />
                    <div className="max-w-4xl mx-auto bg-white/50 p-8 md:p-12 rounded-2xl shadow-lg form-container">
                        <form onSubmit={(e) => e.preventDefault()}>
                            {renderStep()}
                            <div className="pt-6 flex justify-between mt-8">
                                {currentStep > 1 && <button type="button" onClick={prevStep} className="prev-button text-white font-bold py-2 px-6 rounded-lg shadow-lg cursor-pointer">Previous</button>}
                                <div className="ml-auto">
                                    {currentStep < totalSteps ? (
                                        <button type="button" onClick={nextStep} className="nav-button text-white font-bold py-2 px-6 rounded-lg shadow-lg cursor-pointer">
                                            Next
                                        </button>
                                    ) : (
                                        <button type="button" onClick={() => setIsModalOpen(true)} className="nav-button text-white font-bold py-2 px-6 rounded-lg shadow-lg cursor-pointer">
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleFinalSubmit}
            />
        </div>
    );
}