"use client";

import StorageCleaner from "@/components/storage-cleaner";
import { Suspense } from "react";

export default function StorageManagerClient() {
  return (
    <Suspense
      fallback={
        <div className="p-4 text-gray-500">Loading storage manager...</div>
      }
    >
      <StorageCleaner />
    </Suspense>
  );
}
