"use client";

import { clearLocalStorage } from "@/lib/cookies";
import { useState, useEffect } from "react";
import { Trash2, Info } from "lucide-react";

export default function StorageCleaner() {
  const [message, setMessage] = useState<string | null>(null);
  const [storageInfo, setStorageInfo] = useState<{
    count: number;
    size: string;
    items: string[];
  }>({ count: 0, size: "0 KB", items: [] });

  useEffect(() => {
    // Get localStorage information on component mount
    updateStorageInfo();
  }, []);

  const updateStorageInfo = () => {
    try {
      if (typeof window === "undefined") return;

      // Get localStorage items
      const items: string[] = [];
      let totalSize = 0;

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key);
          if (value) {
            totalSize += key.length + value.length;
            items.push(key);
          }
        }
      }

      // Convert size to KB
      const sizeInKB = (totalSize * 2) / 1024; // Roughly 2 bytes per character

      setStorageInfo({
        count: localStorage.length,
        size: `${sizeInKB.toFixed(2)} KB`,
        items: items,
      });
    } catch (error) {
      console.error("Error getting localStorage info:", error);
    }
  };

  const handleClearStorage = () => {
    try {
      // Get count before clearing
      const countBefore = localStorage.length;
      const itemsBefore = storageInfo.items;

      // Clear localStorage
      clearLocalStorage();

      // Update storage info
      updateStorageInfo();

      // Show success message
      setMessage(`Cleared ${countBefore} items (${itemsBefore.join(", ")})`);

      // Clear the message after 5 seconds
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage(`Error clearing localStorage: ${error}`);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {message && (
        <div className="bg-green-500 text-white p-3 rounded-md mb-4 text-sm">
          {message}
        </div>
      )}

      {/* Storage info */}
      <div className="mb-4 bg-amber-50/50 p-3 rounded-md border border-amber-100">
        <div className="flex items-center gap-2 mb-1 text-amber-800">
          <Info size={16} />
          <span className="font-medium">Current Storage</span>
        </div>
        <div className="text-sm text-gray-600">
          <p>
            Items: <span className="font-medium">{storageInfo.count}</span>
          </p>
          <p>
            Size: <span className="font-medium">{storageInfo.size}</span>
          </p>
          {storageInfo.items.length > 0 && (
            <div className="mt-2">
              <p className="font-medium mb-1">Stored Keys:</p>
              <ul className="list-disc ml-5 text-xs">
                {storageInfo.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Clear button */}
      <button
        type="button"
        onClick={handleClearStorage}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-md text-sm transition-colors flex items-center justify-center gap-2"
        disabled={storageInfo.count === 0}
      >
        <Trash2 size={16} />
        Clear All Local Storage
      </button>
    </div>
  );
}
