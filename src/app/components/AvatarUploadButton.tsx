"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function AvatarUploadButton({ onUpload }: { onUpload: (url: string) => void }) {
  return (
    <UploadButton<OurFileRouter, "avatarUploader">
    endpoint="avatarUploader"
    onClientUploadComplete={(res) => {
        const url = res?.[0]?.url;
        if (url) {
        onUpload(url);
        }
    }}
    onUploadError={(err) => alert(`Upload failed: ${err.message}`)}
    />
  );
}
