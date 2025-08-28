import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

interface ResetFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<ResetFormValues>();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: ResetFormValues) => {
    try {
      // TODO: integrate with authAPI.resetPassword when available
      if (!token) throw new Error('Missing token');
      await new Promise((res) => setTimeout(res, 600));
      setSuccess(true);
    } catch (e) {
      // no-op for placeholder
    }
  };

  const password = watch('password');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Reset Password</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Choose a new password for your account.</p>

        {success ? (
          <div className="text-sm text-green-600 dark:text-green-400">Your password has been reset. You can now sign in.</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
              <input
                type="password"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="••••••••"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } })}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="••••••••"
                {...register('confirmPassword', {
                  required: 'Confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !token}
              className="w-full inline-flex items-center justify-center rounded-md bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 text-sm disabled:opacity-60"
            >
              {isSubmitting ? 'Resetting...' : 'Reset password'}
            </button>
            {!token && (
              <p className="mt-2 text-xs text-red-600">Invalid or missing reset token.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
