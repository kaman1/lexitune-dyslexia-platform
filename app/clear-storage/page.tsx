import StorageManagerClient from "./storage-manager-client";

export const metadata = {
  title: "Clear Local Storage - TEKIMAX",
  description: "Clear browser localStorage and cookies",
};

export default function ClearStoragePage() {
  return (
    <div className="container mx-auto py-24 px-4">
      <h1 className="text-3xl font-bold mb-8">Clear Local Storage</h1>

      <div className="bg-amber-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">What is localStorage?</h2>
        <p className="mb-4">
          localStorage is a web storage mechanism that allows websites to store
          data in your browser. This data persists even after you close your
          browser and can include settings, preferences, and other information.
        </p>
        <p>
          Clearing localStorage can help fix issues with the website or reset
          your preferences.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Clear Your Data</h2>
        <p className="mb-6">
          Click the button below to clear all localStorage data for this
          website. This will reset any stored preferences or settings.
        </p>

        <div className="relative">
          <StorageManagerClient />
        </div>
      </div>
    </div>
  );
}
