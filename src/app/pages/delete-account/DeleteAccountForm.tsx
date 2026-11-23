'use client';

import { useState } from 'react';

export default function DeleteAccountForm() {
  const [formData, setFormData] = useState({
    accountId: '',
    reason: '',
    confirmProceed: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.confirmProceed !== 'yes') return;
    setStatus('loading');

    try {
      const response = await fetch('/api/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send request');

      setStatus('success');
      setFormData({ accountId: '', reason: '', confirmProceed: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Delete Account</h1>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            Aura VPN is designed for anonymity. We do not store personal details or know your identity. However, your purchase information (if any) can be deleted upon request.
          </p>
          <p className="mt-2 text-lg leading-8 text-gray-300">
            Proceed only if you wish to permanently remove your purchase history and associated data.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="accountId" className="block text-sm font-semibold leading-6 text-white">
                Account ID
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="accountId"
                  id="accountId"
                  required
                  value={formData.accountId}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="reason" className="block text-sm font-semibold leading-6 text-white">
                Reason
              </label>
              <div className="mt-2.5">
                <textarea
                  name="reason"
                  id="reason"
                  rows={4}
                  required
                  value={formData.reason}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 space-y-4 rounded-lg border border-white/10 bg-white/5 p-6 mt-4">
              <h3 className="text-base font-semibold leading-7 text-white">Confirmation</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-300"><span className="font-semibold text-white">Action:</span> Delete Purchase Data</p>
                <p className="text-sm text-gray-300"><span className="font-semibold text-white">Impact:</span> Irreversible</p>
              </div>
              <div className="mt-4">
                <span className="block text-sm font-semibold leading-6 text-white mb-2">Proceed?</span>
                <div className="flex gap-x-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="proceed-yes"
                      name="confirmProceed"
                      value="yes"
                      type="radio"
                      checked={formData.confirmProceed === 'yes'}
                      onChange={handleChange}
                      className="h-4 w-4 border-white/10 bg-white/5 text-blue-600 focus:ring-blue-600"
                    />
                    <label htmlFor="proceed-yes" className="block text-sm font-medium leading-6 text-white">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="proceed-no"
                      name="confirmProceed"
                      value="no"
                      type="radio"
                      checked={formData.confirmProceed === 'no'}
                      onChange={handleChange}
                      className="h-4 w-4 border-white/10 bg-white/5 text-blue-600 focus:ring-blue-600"
                    />
                    <label htmlFor="proceed-no" className="block text-sm font-medium leading-6 text-white">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              disabled={status === 'loading' || formData.confirmProceed !== 'yes'}
              className="block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {status === 'loading' ? 'Sending...' : 'Request Deletion'}
            </button>
            {status === 'success' && (
              <p className="mt-4 text-center text-sm text-green-400">
                Request sent successfully! We will process it shortly.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-center text-sm text-red-400">
                Failed to send request. Please try again later or email us directly at contact@auravpn.net.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
