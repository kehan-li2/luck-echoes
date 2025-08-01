import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  avatarUploader: f({ image: { maxFileSize: "2MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
