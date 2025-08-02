import { Suspense } from "react";
import CharmsClient from "./CharmsClient";

export default function CharmsPage() {
  return (
    <Suspense fallback={<div>Loading Charms page...</div>}>
      <CharmsClient />
    </Suspense>
  );
}
