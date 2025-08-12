import React, { useState, useEffect } from 'react';

// --- Placeholder Components ---
// In a real app, these would be in separate files. For this demo, they are here.

const Navbar = () => (
    <nav className="bg-white/50 shadow-md p-4 text-gray-800 font-bold text-center">
        Alumni Entrepreneur Award
    </nav>
);

const StepIndicator = ({ currentStep, totalSteps, completedStep, onStepClick }) => (
    <div className="flex justify-center items-center my-8">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
            <React.Fragment key={step}>
                <div
                    onClick={() => step <= completedStep && onStepClick(step)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ${step <= completedStep ? 'bg-blue-600 cursor-pointer' : 'bg-gray-400'} ${currentStep === step ? 'ring-4 ring-blue-300' : ''}`}
                >
                    {step}
                </div>
                {step < totalSteps && <div className="w-16 h-1 bg-gray-300"></div>}
            </React.Fragment>
        ))}
    </div>
);

const Step1 = ({ data, handleChange }) => (
    <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Personal Information</h3>
        <input name="fullName" value={data.fullName || ''} onChange={handleChange} placeholder="Full Name" className="w-full p-3 mb-4 border rounded-lg" />
        <input name="email" value={data.email || ''} onChange={handleChange} placeholder="Email" className="w-full p-3 mb-4 border rounded-lg" />
    </div>
);
const Step2 = ({ data, handleChange }) => (
    <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Company Details</h3>
        <input name="companyName" value={data.companyName || ''} onChange={handleChange} placeholder="Company Name" className="w-full p-3 mb-4 border rounded-lg" />
    </div>
);
const Step3 = ({ data, handleChange }) => (
    <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Attachments</h3>
        <p className="text-sm text-gray-600 mb-2">Upload your business plan (PDF only).</p>
        <input name="businessPlan" type="file" accept=".pdf" onChange={handleChange} className="w-full p-3 mb-4 border rounded-lg" />
    </div>
);
const Step4 = ({ data, handleChange }) => (
    <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Terms and Conditions</h3>
        <label className="flex items-center">
            <input type="checkbox" name="agreeToTerms" checked={!!data.agreeToTerms} onChange={handleChange} className="mr-2" />
            I agree to the terms and conditions.
        </label>
    </div>
);
const Step5 = ({ data }) => (
    <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Review Your Information</h3>
        <p><strong>Full Name:</strong> {data.fullName}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Company:</strong> {data.companyName}</p>
        <p><strong>Business Plan:</strong> {data.businessPlan?.name || 'Not uploaded'}</p>
        <p><strong>Agreed to Terms:</strong> {data.agreeToTerms ? 'Yes' : 'No'}</p>
    </div>
);

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl">
                <h3 className="text-xl font-bold mb-4">Confirm Submission</h3>
                <p className="mb-6">Are you sure you want to submit your application?</p>
                <div className="flex justify-end space-x-4">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Confirm</button>
                </div>
            </div>
        </div>
    );
};


// --- Main Registration Page Component ---

function RegistrationPage() {
    const [currentStep, setCurrentStep] = useState(() => parseInt(sessionStorage.getItem('registrationStep') || '1', 10));
    const [completedStep, setCompletedStep] = useState(() => parseInt(sessionStorage.getItem('completedStep') || '1', 10));
    const [formData, setFormData] = useState(() => JSON.parse(sessionStorage.getItem('formData') || '{}'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => { sessionStorage.setItem('registrationStep', currentStep); }, [currentStep]);
    useEffect(() => { sessionStorage.setItem('completedStep', completedStep); }, [completedStep]);
    useEffect(() => {
        const serializableData = { ...formData };
        delete serializableData.businessPlan;
        sessionStorage.setItem('formData', JSON.stringify(serializableData));
    }, [formData]);

    const totalSteps = 5;

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'file' ? files?.[0] : type === 'checkbox' ? checked : value,
        }));
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

    const handleFinalSubmit = async () => {
        setIsModalOpen(false);
        setMessage('Submitting your application...');

        // In a real application, the user ID and auth token would come from your authentication context.
        const userId = 'placeholder-user-id'; // Replace with actual user ID.
        const authToken = 'placeholder-auth-token'; // Replace with actual Bearer token.

        try {
            // --- Step 1: Submit Profile Details ---
            // Corresponds to: POST /nominee-details/:id/profile
            const profileData = { ...formData };
            delete profileData.businessPlan; // Remove file from the JSON payload

            const profileResponse = await fetch(`/nominee-details/${userId}/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(profileData)
            });

            if (!profileResponse.ok) {
                const errorResult = await profileResponse.json();
                throw new Error(`Failed to submit profile details: ${errorResult.message || profileResponse.statusText}`);
            }
            
            setMessage('Profile details submitted. Uploading files...');

            // --- Step 2: Upload Files (if any) ---
            // Corresponds to: POST /nominee-details/:id/upload/:type
            if (formData.businessPlan) {
                const fileData = new FormData();
                fileData.append('file', formData.businessPlan);

                // The 'type' in the URL is 'businessPlan' for this upload.
                const fileResponse = await fetch(`/nominee-details/${userId}/upload/businessPlan`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    },
                    body: fileData
                });

                if (!fileResponse.ok) {
                    const errorResult = await fileResponse.json();
                    throw new Error(`Failed to upload business plan: ${errorResult.message || fileResponse.statusText}`);
                }
            }

            setMessage('Application submitted successfully!');
            
            // --- Final Step: Cleanup ---
            setFormData({});
            sessionStorage.removeItem('registrationStep');
            sessionStorage.removeItem('completedStep');
            sessionStorage.removeItem('formData');
            // In a real app, you would redirect the user to a dashboard.
            // setTimeout(() => window.location.href = '/dashboard', 2000);

        } catch (error) {
            console.error('Submission failed:', error);
            setMessage(`Error: ${error.message}. Please try again.`);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1 data={formData} handleChange={handleChange} />;
            case 2: return <Step2 data={formData} handleChange={handleChange} />;
            case 3: return <Step3 data={formData} handleChange={handleChange} />;
            case 4: return <Step4 data={formData} handleChange={handleChange} />;
            case 5: return <Step5 data={formData} />;
            default: return <Step1 data={formData} handleChange={handleChange} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-emerald-100 via-indigo-100 to-violet-100 font-sans">
            <Navbar />
            <main className="flex-grow flex items-center justify-center py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">
                        Register for Alumni Entrepreneur Award
                    </h2>
                    <StepIndicator currentStep={currentStep} totalSteps={totalSteps} completedStep={completedStep} onStepClick={goToStep} />
                    <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg">
                        <form onSubmit={(e) => e.preventDefault()}>
                            {renderStep()}
                            <div className="pt-6 flex justify-between mt-8">
                                {currentStep > 1 && <button type="button" onClick={prevStep} className="px-6 py-2 font-bold text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition-all">Previous</button>}
                                <div className="ml-auto">
                                    {currentStep < totalSteps ? (
                                        <button type="button" onClick={nextStep} className="px-6 py-2 font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all">
                                            Next
                                        </button>
                                    ) : (
                                        <button type="button" onClick={() => setIsModalOpen(true)} className="px-6 py-2 font-bold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-all">
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                        {message && <p className="text-center text-gray-700 font-semibold mt-6">{message}</p>}
                    </div>
                </div>
            </main>
            <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleFinalSubmit} />
        </div>
    );
}

// The App component to render the RegistrationPage
export default function App() {
    return <RegistrationPage />;
}
