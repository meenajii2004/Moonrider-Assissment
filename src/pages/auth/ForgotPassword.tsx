import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ForgotFormValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotFormValues>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: ForgotFormValues) => {
    try {
      // TODO: integrate with authAPI.forgotPassword when available
      await new Promise((res) => setTimeout(res, 500));
      setSubmitted(true);
    } catch (e) {
      // no-op for placeholder
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Forgot Password</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Enter your email to receive a reset link.</p>

        {submitted ? (
          <div className="text-sm text-green-600 dark:text-green-400">If an account exists, a reset link has been sent.</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="you@example.com"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center rounded-md bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 text-sm disabled:opacity-60"
            >
              {isSubmitting ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
