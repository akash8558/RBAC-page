import React from 'react';
import { useAuthStore } from '../store/authStore';

export function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Your role is: <span className="font-semibold">{user?.role}</span>
          </p>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Your Permissions:
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              {user?.role === 'admin' && (
                <>
                  <li>Access to admin panel</li>
                  <li>Manage users</li>
                  <li>View all content</li>
                </>
              )}
              {user?.role === 'moderator' && (
                <>
                  <li>Moderate content</li>
                  <li>View reports</li>
                </>
              )}
              {user?.role === 'user' && (
                <>
                  <li>View personal dashboard</li>
                  <li>Update profile</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}