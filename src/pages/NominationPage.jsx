import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import NominationsModal from '../components/NominationsModal';

export default function NominationPage({ handleLogout }) {
  // State for the form inputs
  const [nomineeName, setNomineeName] = useState('');
  const [nomineeEmail, setNomineeEmail] = useState('');
  const [relationship, setRelationship] = useState('');

  // State for the list of nominations
  const [nominations, setNominations] = useState([]);
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nomineeName) {
      const newNomination = { name: nomineeName, status: 'Pending' };
      setNominations([...nominations, newNomination]);
      alert(`Thank you for nominating ${nomineeName}!`);
      // Reset form fields
      setNomineeName('');
      setNomineeEmail('');
      setRelationship('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 via-indigo-100 to-violet-100">
      <Navbar handleLogout={handleLogout} />


      {/* Added Note Section Here */}
      <div className="text-center mt-4 p-3 bg-yellow-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> An email will be sent to the nominee with instructions to register. We recommend you also contact them to ensure they complete the application.
        </p>
      </div>

      <main className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl p-8 space-y-6 rounded-2xl shadow-lg form-container">
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-800">Nominate an Alumnus</h1>


            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Name of Nominee */}
              <div>
                <label htmlFor="nominator-name" className="block text-sm font-medium text-gray-700 mb-1">Name of Nominee</label>
                <input
                  id="nominator-name"
                  type="text"
                  required
                  value={nomineeName}
                  onChange={(e) => setNomineeName(e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the name of the person you are nominating"
                />
              </div>
              {/* Email of Nominee */}
              <div>
                <label htmlFor="nominator-email" className="block text-sm font-medium text-gray-700 mb-1">Email of Nominee</label>
                <input
                  id="nominator-email"
                  type="email"
                  required
                  value={nomineeEmail}
                  onChange={(e) => setNomineeEmail(e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter their email address"
                />
              </div>
              {/* Relationship Dropdown */}
              <div>
                <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">Your Relationship to Nominee</label>
                <select
                  id="relationship"
                  required
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select your relationship</option>
                  <option value="classmate">Classmate</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                  <option value="batchmate">Batchmate</option>
                </select>
              </div>
              {/* Submit Button */}
              <div>
                <button type="submit" className="w-full px-4 py-3 font-semibold text-white transition-transform duration-200 transform rounded-lg shadow-md submit-button hover:scale-105">
                  Submit Nomination
                </button>
              </div>
              <div className="w-full max-w-2xl mt-6 text-center">
                <button type="button" onClick={() => setIsModalOpen(true)} className="font-semibold text-gray-800 hover:text-gray-900 hover:underline cursor-pointer">
                  View Your Nominations
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* The Modal Component */}
      <NominationsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        nominations={nominations}
      />
    </div>
  );
}
