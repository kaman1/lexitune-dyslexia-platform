"use client";

import {
  FileText,
  Clock,
  CheckCircle,
  Upload,
  Download,
  ChevronRight,
} from "lucide-react";

type Document = {
  id: string;
  name: string;
  description: string;
  status: "required" | "received" | "approved";
  dateRequired?: string;
  dateSubmitted?: string;
};

export function ProjectDocuments({ documents }: { documents: Document[] }) {
  // Format dates for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper to get status badge and icon
  const getStatusElement = (status: Document["status"]) => {
    switch (status) {
      case "required":
        return (
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs border border-red-100">
            <Clock className="h-3 w-3" />
            <span>Required</span>
          </div>
        );
      case "received":
        return (
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs border border-blue-100">
            <Clock className="h-3 w-3" />
            <span>Under Review</span>
          </div>
        );
      case "approved":
        return (
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs border border-emerald-100">
            <CheckCircle className="h-3 w-3" />
            <span>Approved</span>
          </div>
        );
      default:
        return null;
    }
  };

  const handleUpload = (documentId: string) => {
    // In a real app, this would open a file picker and handle the upload
    alert(
      `Upload functionality for document ${documentId} would be implemented here.`
    );
  };

  if (documents.length === 0)
    return (
      <div className="bg-white rounded-lg border border-slate-100 p-6 text-center">
        <p className="text-slate-500">
          No documents required for this project.
        </p>
      </div>
    );

  return (
    <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
      <div className="divide-y divide-slate-100">
        {documents.map((doc) => (
          <div key={doc.id} className="p-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 rounded-md border border-slate-100 flex-shrink-0">
                  <FileText className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-1">
                    {doc.name}
                  </h4>
                  <p className="text-sm text-slate-500 mb-2">
                    {doc.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    {getStatusElement(doc.status)}

                    <div className="text-slate-500">
                      Required by:{" "}
                      <span className="font-medium">
                        {formatDate(doc.dateRequired)}
                      </span>
                    </div>

                    {doc.dateSubmitted && (
                      <div className="text-slate-500">
                        Submitted:{" "}
                        <span className="font-medium">
                          {formatDate(doc.dateSubmitted)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                {doc.status === "required" ? (
                  <button
                    type="button"
                    onClick={() => handleUpload(doc.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-black text-white text-sm font-medium rounded-full hover:bg-slate-800"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-full hover:bg-slate-50"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
        <button
          type="button"
          className="w-full text-sm font-medium text-slate-600 flex items-center justify-center gap-1 hover:text-slate-800"
        >
          <span>View all documents</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
