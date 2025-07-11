// Load Lottie animation
const animation = lottie.loadAnimation({
  container: document.getElementById("pet-animation"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "animations/pet.json",
});

const moodText = document.getElementById("mood-text");
const petMessage = document.getElementById("pet-message");

const MOODS = ["Happy 😊", "Excited 🤩", "Sleepy 😴", "Hungry 😢"];
let moodIndex = 0;

// Load mood from storage
chrome.storage.local.get(["moodIndex"], (result) => {
  if (result.moodIndex !== undefined) {
    moodIndex = result.moodIndex;
    moodText.textContent = "Mood: " + MOODS[moodIndex];
  }
});

function updateMood() {
  moodIndex = (moodIndex + 1) % MOODS.length;
  moodText.textContent = "Mood: " + MOODS[moodIndex];
  chrome.storage.local.set({ moodIndex });
}

async function loadPetMessage() {
  try {
    const res = await fetch("http://localhost:3000/api/users/dailyFortune", {
      method: "POST",
    });
    if (!res.ok) return;

    const data = await res.json();
    moodText.textContent = `Mood: ${data.mood || "Unknown"}`;
    petMessage.textContent = data.message || "";
  } catch (e) {
    console.error("Failed to load pet message", e);
  }
}

loadPetMessage();

document.getElementById("feed").addEventListener("click", updateMood);
document.getElementById("pet").addEventListener("click", updateMood);
document.getElementById("play").addEventListener("click", updateMood);
