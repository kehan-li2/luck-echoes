"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AvatarUploadButton } from "../components/AvatarUploadButton";
import Header from "../components/header";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [originalProfile, setOriginalProfile] = useState({
    name: "",
    bday: "",
    avatar: "",
  });

  const [editedProfile, setEditedProfile] = useState({
    name: "",
    bday: "",
    avatar: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/users/info");
      if (res.ok) {
        const data = await res.json();
        const formatted = {
          name: data.name || "",
          bday: data.bday?.slice(0, 10) || "",
          avatar: data.avatar || "/default-avatar.png",
        };
        setOriginalProfile(formatted);
        setEditedProfile(formatted);
      }
    }

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

  const handleSave = async () => {
    setIsSaving(true);
    const res = await fetch("/api/users/info", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedProfile),
    });

    if (res.ok) {
      alert("Profile updated!");
      const updated = { ...editedProfile };
      setOriginalProfile(updated);
      setIsEditing(false);
    } else {
      alert("Failed to update profile.");
    }

    setIsSaving(false);
  };

  const handleCancel = () => {
    setEditedProfile(originalProfile);
    setIsEditing(false);
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <>
      <Header />
      <main className="min-h-screen px-6 py-10 bg-white text-black font-main">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">View and update your personal information</p>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} title="Edit Profile">
                ✏️
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Avatar</label>
            <img
              src={editedProfile.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover mb-2 border"
            />
            {isEditing && (
              <div className="mt-2">
                <AvatarUploadButton
                  onUpload={(url) =>
                    setEditedProfile((prev) => ({ ...prev, avatar: url }))
                  }
                />
              </div>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Username</label>
            {!isEditing ? (
              <p>{editedProfile.name}</p>
            ) : (
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            )}
          </div>

          {/* Birthday */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Birthday</label>
            {!isEditing ? (
              <p>{editedProfile.bday}</p>
            ) : (
              <input
                type="date"
                value={editedProfile.bday}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, bday: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
