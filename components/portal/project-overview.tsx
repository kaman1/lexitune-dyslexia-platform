"use client";

import { CalendarIcon, CheckCircle2, Clock, BarChart } from "lucide-react";

type Project = {
  id: string;
  name: string;
  description: string;
  progress: number;
  startDate: string;
  estimatedEndDate: string;
  status: "planning" | "in-progress" | "review" | "completed";
};

export function ProjectOverview({ project }: { project: Project }) {
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper to get status badge styles
  const getStatusStyles = (status: Project["status"]) => {
    switch (status) {
      case "planning":
        return "bg-sky-50 text-sky-700 border-sky-100";
      case "in-progress":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "review":
        return "bg-purple-50 text-purple-700 border-purple-100";
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  // Helper to get status display text
  const getStatusText = (status: Project["status"]) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div
            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap items-center gap-1.5 border ${getStatusStyles(
              project.status
            )}`}
          >
            {project.status === "in-progress" && (
              <Clock className="h-3.5 w-3.5" />
            )}
            {project.status === "completed" && (
              <CheckCircle2 className="h-3.5 w-3.5" />
            )}
            {getStatusText(project.status)}
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-6">{project.description}</p>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-slate-700">
              Project Progress
            </h4>
            <div className="flex items-center gap-1">
              <BarChart className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-medium">{project.progress}%</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-sky-500 to-indigo-600 h-2 rounded-full"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm border-t border-slate-100 pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 p-2 rounded-md border border-slate-100">
              <CalendarIcon className="h-4 w-4 text-slate-500" />
            </div>
            <div>
              <span className="block text-slate-500 text-xs">Start Date</span>
              <span className="font-medium text-slate-700">
                {formatDate(project.startDate)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-50 p-2 rounded-md border border-slate-100">
              <CalendarIcon className="h-4 w-4 text-slate-500" />
            </div>
            <div>
              <span className="block text-slate-500 text-xs">
                Estimated Completion
              </span>
              <span className="font-medium text-slate-700">
                {formatDate(project.estimatedEndDate)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
