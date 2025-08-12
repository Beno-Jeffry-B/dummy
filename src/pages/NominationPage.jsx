import React, { useState, useEffect } from 'react';

// --- Placeholder Components ---
// In a real app, these would be in separate files.

const Navbar = ({ handleLogout }) => (
    <nav className="bg-white/50 shadow-md p-4 flex justify-between items-center">
        <span className="text-gray-800 font-bold text-lg">Alumni Entrepreneur Award</span>
        <button onClick={handleLogout} className="text-sm font-semibold text-blue-600 hover:underline">Logout</button>
    </nav>
);

const NominationsModal = ({ isOpen, onClose, nominations, isLoading, error }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                <h3 className="text-2xl font-bold mb-4">Your Nominations</h3>
                {isLoading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && (
                    <ul className="space-y-2">
                        {nominations.length > 0 ? nominations.map((nom, index) => (
                            <li key={index} className="p-2 border rounded-md">
                                <p className="font-semibold">{nom.nomineeName}</p>
                                <p className="text-sm text-gray-600">{nom.nomineeEmail}</p>
                            </li>
                        )) : <p>You have not made any nominations yet.</p>}
                    </ul>
                )}
                <div className="flex justify-end mt-6">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Close</button>
                </div>
            </div>
        </div>
    );
};

// --- Main Nomination Page Component ---

export default function NominationPage() {
    // State for the form inputs, combined into a single object.
    const [formData, setFormData] = useState({
        nomineeName: '',
        nomineeEmail: '',
        nomineeMobile: '', // Added based on CreateNominationDto
        relationship: ''
    });

    // State for the list of nominations fetched from the server.
    const [nominations, setNominations] = useState([]);
    // State to control modal visibility.
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State for loading and error messages.
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // In a real app, the token would come from an auth context or storage.
    const authToken = 'placeholder-auth-token';

    // --- API Functions ---

    // Fetches existing nominations from the server.
    const fetchNominations = async () => {
        setIsLoading(true);
        setError('');
        try {
            // Corresponds to: GET /nominations
            const response = await fetch('/nominations', {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch nominations.');
            }
            const data = await response.json();
            setNominations(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Effects ---

    // Fetch nominations when the component mounts.
    useEffect(() => {
        fetchNominations();
    }, []);

    // --- Event Handlers ---

    // Handles changes for all form inputs.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    // Handles the form submission.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Submitting nomination...');
        setError('');

        // Prepare the data payload according to the CreateNominationDto.
        const submissionData = {
            nomineeName: formData.nomineeName,
            nomineeEmail: formData.nomineeEmail,
            nomineeMobile: formData.nomineeMobile,
        };

        try {
            // Corresponds to: POST /nominations
            const response = await fetch('/nominations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(submissionData)
            });

            if (!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.message || 'Failed to submit nomination.');
            }

            setMessage(`Thank you for nominating ${formData.nomineeName}!`);
            setFormData({ nomineeName: '', nomineeEmail: '', nomineeMobile: '', relationship: '' }); // Reset form
            fetchNominations(); // Refresh the list of nominations
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    // Opens the modal and fetches the latest nominations.
    const handleViewNominations = () => {
        fetchNominations();
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-emerald-100 via-indigo-100 to-violet-100 font-sans">
            <Navbar handleLogout={() => alert('Logout clicked')} />

            <div className="text-center mt-4 p-3 mx-4 bg-yellow-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                    <strong>Note:</strong> An email will be sent to the nominee with instructions to register.
                </p>
            </div>

            <main className="flex flex-col items-center justify-center py-12 px-4">
                <div className="w-full max-w-2xl p-8 space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                    <div>
                        <h1 className="text-3xl font-bold text-center text-gray-800">Nominate an Alumnus</h1>
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            {/* Form fields */}
                            <input name="nomineeName" required value={formData.nomineeName} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Name of Nominee" />
                            <input name="nomineeEmail" type="email" required value={formData.nomineeEmail} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Email of Nominee" />
                            <input name="nomineeMobile" required value={formData.nomineeMobile} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Mobile Number of Nominee" />
                            <select name="relationship" required value={formData.relationship} onChange={handleChange} className="w-full p-3 border rounded-lg">
                                <option value="" disabled>Select your relationship</option>
                                <option value="classmate">Classmate</option>
                                <option value="junior">Junior</option>
                                <option value="senior">Senior</option>
                                <option value="batchmate">Batchmate</option>
                            </select>
                            
                            {/* Submit Button */}
                            <button type="submit" className="w-full p-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
                                Submit Nomination
                            </button>

                            {/* View Nominations Button */}
                            <div className="text-center mt-4">
                                <button type="button" onClick={handleViewNominations} className="font-semibold text-gray-800 hover:underline">
                                    View Your Nominations
                                </button>
                            </div>
                        </form>
                        {message && <p className="text-center text-green-600 mt-4">{message}</p>}
                        {error && <p className="text-center text-red-600 mt-4">{error}</p>}
                    </div>
                </div>
            </main>

            <NominationsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                nominations={nominations}
                isLoading={isLoading}
                error={error}
            />
        </div>
    );
}
