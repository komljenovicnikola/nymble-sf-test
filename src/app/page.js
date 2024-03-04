'use client'

import { useState } from 'react';

const LeadForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(process.env.NEXT_PUBLIC_SALESFORCE_OID);

    const formData = {
      oid: process.env.NEXT_PUBLIC_SALESFORCE_OID,
      retURL: process.env.NEXT_PUBLIC_SALESFORCE_RETURL,
      first_name: firstName,
      last_name: lastName,
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
    } else {
      console.error('Submission failed');
    }
  };

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
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
  );
};

export default LeadForm;
