import {
  Bell,
  Calendar,
  Gift,
  Headphones,
  MessageCircle,
  Phone,
  Zap,
} from "lucide-react";
import Link from "next/link";

export function PromotionCard() {
  return (
    <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-lg shadow-sm p-6 border border-sky-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-medium text-slate-800">Limited Offer</h3>
        <div className="bg-indigo-100 p-2 rounded-full">
          <Gift className="h-4 w-4 text-indigo-600" />
        </div>
      </div>

      <p className="text-sm text-slate-600 mb-4">
        Upgrade your AI strategy with our advanced analytics package. Available
        for a limited time.
      </p>

      <div className="flex items-center gap-2 text-xs text-indigo-700 font-medium">
        <Zap className="h-3.5 w-3.5" />
        <span>25% discount until July 30</span>
      </div>

      <button
        type="button"
        className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:from-indigo-600 hover:to-indigo-700 transition-colors"
      >
        Learn More
      </button>
    </div>
  );
}

export function SupportCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-medium text-slate-800">Need Support?</h3>
        <div className="bg-emerald-50 p-2 rounded-full">
          <Headphones className="h-4 w-4 text-emerald-600" />
        </div>
      </div>

      <div className="space-y-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-2 rounded-full">
            <MessageCircle className="h-4 w-4 text-slate-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Live Chat</p>
            <p className="text-xs text-slate-500">Available 9am - 5pm</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-2 rounded-full">
            <Phone className="h-4 w-4 text-slate-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Call Support</p>
            <p className="text-xs text-slate-500">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>

      <Link
        href="#"
        className="block w-full text-center bg-white border border-slate-200 text-slate-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors"
      >
        Contact Your Rep
      </Link>
    </div>
  );
}

export function NewDealsCard() {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-sm p-6 border border-amber-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-medium text-slate-800">Upcoming Opportunities</h3>
        <div className="bg-amber-100 p-2 rounded-full">
          <Calendar className="h-4 w-4 text-amber-600" />
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="bg-white bg-opacity-60 p-2.5 rounded-md border border-amber-100">
          <p className="text-sm font-medium">AI Optimization Workshop</p>
          <p className="text-xs text-slate-500 mt-0.5">
            July 25, 2023 • Virtual
          </p>
        </div>

        <div className="bg-white bg-opacity-60 p-2.5 rounded-md border border-amber-100">
          <p className="text-sm font-medium">Quarterly Strategy Review</p>
          <p className="text-xs text-slate-500 mt-0.5">
            August 10, 2023 • In-person
          </p>
        </div>
      </div>

      <Link
        href="#"
        className="flex items-center justify-center gap-1 text-sm font-medium text-amber-700"
      >
        <span>View all opportunities</span>
        <Bell className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
