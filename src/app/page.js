'use client'

import { useState, useEffect } from 'react';

const LeadForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gaClientId, setGaClientId] = useState('');

  useEffect(() => {
    // Function to get Google Analytics Client ID
    const getGaClientId = () => {
      const tracker = window.ga.getAll()[0];
      if (tracker) {
        setGaClientId(tracker.get('clientId'));
      }
    };

    // Load Google Analytics script and get Client ID
    const loadGaScript = () => {
      if (!window.ga) {
        (function(i, s, o, g, r, a, m) {
          i['GoogleAnalyticsObject'] = r;
          (i[r] =
            i[r] ||
            function() {
              (i[r].q = i[r].q || []).push(arguments);
            }),
            (i[r].l = 1 * new Date());
          (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
          a.async = 1;
          a.src = g;
          m.parentNode.insertBefore(a, m);
        })(
          window,
          document,
          'script',
          'https://www.google-analytics.com/analytics.js',
          'ga'
        );
        window.ga('create', 'G-YVMS31034B', 'auto');
        window.ga('send', 'pageview');
        getGaClientId();
        console.log(gaClientId);
      } else {
        getGaClientId();
      }
    };

    loadGaScript();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      oid: process.env.NEXT_PUBLIC_SALESFORCE_OID,
      retURL: process.env.NEXT_PUBLIC_SALESFORCE_RETURL,
      first_name: firstName,
      last_name: lastName,
      ga_client_id: gaClientId, // Appending Google Analytics Client ID
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
