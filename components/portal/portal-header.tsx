"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LogOut,
  User as UserIcon,
  Menu,
  X,
  Users,
  Settings,
} from "lucide-react";

interface User {
  name: string;
  email: string;
  accountType: string;
}

export const PortalHeader = ({ user }: { user: User }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = user?.accountType === "organization";

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href={isAdmin ? "/portal/admin" : "/portal/dashboard"}
                className="font-bold text-lg"
              >
                Tekima Portal{" "}
                {isAdmin && (
                  <span className="text-xs ml-1 text-amber-600">(Admin)</span>
                )}
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {isAdmin ? (
                <>
                  <Link
                    href="/portal/admin"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  >
                    <Users className="mr-1 h-4 w-4" />
                    User Management
                  </Link>
                  <Link
                    href="/portal/admin/settings"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  >
                    <Settings className="mr-1 h-4 w-4" />
                    Settings
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/portal/dashboard"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/portal/product"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  >
                    Products
                  </Link>
                  <Link
                    href="/portal/events"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  >
                    Events
                  </Link>
                  <Link
                    href="/portal/organization"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  >
                    Organization
                  </Link>
                </>
              )}
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div className="flex items-center">
                <span className="hidden sm:block mr-3 text-sm text-slate-700">
                  {user?.name || "User"}
                </span>
                <div className="flex h-8 w-8 rounded-full bg-slate-200 text-slate-600 items-center justify-center">
                  <UserIcon size={14} />
                </div>
                <button
                  type="button"
                  onClick={() => {}}
                  className="ml-4 text-slate-600 hover:text-slate-900"
                  title="Sign out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100"
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {isAdmin ? (
              <>
                <Link
                  href="/portal/admin"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-300 flex items-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <Users className="mr-2 h-5 w-5" />
                  User Management
                </Link>
                <Link
                  href="/portal/admin/settings"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-300 flex items-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/portal/dashboard"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/portal/product"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/portal/events"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Events
                </Link>
                <Link
                  href="/portal/organization"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Organization
                </Link>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-slate-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                  <UserIcon size={18} />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-slate-800">
                  {user?.name || "User"}
                </div>
                <div className="text-sm font-medium text-slate-500">
                  {user?.email || ""}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {}}
                className="ml-auto flex-shrink-0 p-1 rounded-full text-slate-400 hover:text-slate-500"
              >
                <span className="sr-only">Sign out</span>
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
