"use client";

import { useState, useEffect } from "react";
import type { User } from "@/types/user";

interface DashboardStatsProps {
  user: User;
}

export function DashboardStats({ user }: DashboardStatsProps) {
  const [lastActive, setLastActive] = useState<string>("Just now");

  // Calculate "last active" time on component mount
  useEffect(() => {
    // Store the current timestamp in localStorage to track "last active" time
    localStorage.setItem("lastActive", new Date().toISOString());

    // Get previous last active time if it exists
    const lastActiveTime = localStorage.getItem("lastLogin");

    if (lastActiveTime) {
      try {
        const lastDate = new Date(lastActiveTime);
        const now = new Date();
        const diffMs = now.getTime() - lastDate.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        if (diffDays > 0) {
          setLastActive(`${diffDays} day${diffDays > 1 ? "s" : ""} ago`);
        } else if (diffHours > 0) {
          setLastActive(`${diffHours} hour${diffHours > 1 ? "s" : ""} ago`);
        } else if (diffMinutes > 0) {
          setLastActive(
            `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`
          );
        } else {
          setLastActive("Just now");
        }
      } catch (e) {
        setLastActive("Unknown");
      }
    } else {
      // First time login, set the last login time
      localStorage.setItem("lastLogin", new Date().toISOString());
    }
  }, []);

  // Calculate account age
  const getAccountAge = () => {
    if (!user.createdAt) return "Unknown";

    try {
      const created = new Date(user.createdAt);
      const now = new Date();
      const diffMs = now.getTime() - created.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays > 365) {
        const years = Math.floor(diffDays / 365);
        return `${years} year${years > 1 ? "s" : ""}`;
      }

      if (diffDays > 30) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months > 1 ? "s" : ""}`;
      }

      return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
    } catch (e) {
      return "Unknown";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Account Statistics</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Last Active</p>
            <p className="text-2xl font-bold text-blue-700">{lastActive}</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Account Age</p>
            <p className="text-2xl font-bold text-green-700">
              {getAccountAge()}
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">
              Account Status
            </p>
            <p className="text-2xl font-bold text-purple-700">
              {user.isApproved || user.approved ? "Active" : "Pending Approval"}
            </p>
            {!(user.isApproved || user.approved) && (
              <p className="text-xs text-purple-600 mt-1">
                Your account is awaiting administrator approval
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
