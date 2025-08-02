"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function AvatarUploadButton({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  return (
    <div className="flex flex-col items-start">
      <UploadButton<OurFileRouter, "avatarUploader">
        endpoint="avatarUploader"
        onClientUploadComplete={(res) => {
          if (res && res[0]?.url) {
            onUpload(res[0].url);
          }
        }}
        onUploadError={(error: Error) => {
          alert(`Upload failed: ${error.message}`);
        }}
        appearance={{
          button:
            "bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition",
          container: "mt-2",
          allowedContent: "text-sm text-gray-500 mt-1",
        }}
      />
    </div>
  );
}
