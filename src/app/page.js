'use client'

import { useState, useEffect } from 'react';

const LeadForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [clientId, setClientId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      oid: process.env.NEXT_PUBLIC_SALESFORCE_OID,
      retURL: process.env.NEXT_PUBLIC_SALESFORCE_RETURL,
      first_name: firstName,
      last_name: lastName,
      GA_Client_ID: clientId, // Include GA Client ID in form data
    };

    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString(),
    });

    if (response.ok) {
      console.log('Submission successful');
      setIsSubmitted(true);
    } else {
      console.error('Submission failed');
    }
  };

  useEffect(() => {
    const getClientId = () => {
      if (window.gaGlobal) {
        const tracker = window.gaGlobal.getAll()[0];
        if (tracker) {
          const clientId = tracker.get('vid');
          setClientId(clientId);
          console.log("GA Client ID: ", clientId);
        }
      }
    };

    getClientId();

    // Add event listener to handle changes in GA Client ID (if needed)
    const handleClientIdChange = () => {
      getClientId();
    };
    window.addEventListener('load', handleClientIdChange);

    return () => {
      window.removeEventListener('load', handleClientIdChange);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
          First Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
      {isSubmitted && (
      <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">Form successfully submitted.</span>
      </div>
    )}
    </form>
  </div>
  );
};

export default LeadForm;
