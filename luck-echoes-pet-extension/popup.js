/*
const animation = lottie.loadAnimation({
  container: document.getElementById("pet-animation"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "animations/pet.json",
});

const moodText = document.getElementById("mood-text");
const petMessage = document.getElementById("pet-message");

let happy = 50;
let excited = 50;
let sleepy = 30;
let hungry = 50;

// Helper to display mood based on internal scores
function calculateMood() {
  if (hungry > 70) return "😋 Full & Happy";
  if (sleepy > 70) return "😴 Sleepy";
  if (excited > 80) return "🤩 Playful!";
  if (happy < 30) return "😢 Lonely";
  return "😊 Balanced";
}

function updateMoodUI() {
  const mood = calculateMood();
  moodText.textContent = `Mood: ${mood}`;
}

function showMessage(message) {
  petMessage.textContent = message;
  setTimeout(() => {
    petMessage.textContent = "";
  }, 3000);
}

// Load initial mood + guidance from API
async function loadPetMessage() {
  try {
    const res = await fetch("http://localhost:3000/api/users/pet/message");
    const data = await res.json();

    if (res.ok) {
      happy = 50;
      excited = 50;
      sleepy = 30;
      hungry = 50;
      updateMoodUI();
      showMessage(data.message);
    } else {
      moodText.textContent = `Mood: Unknown`;
      petMessage.textContent = data.message || "No fortune today";
    }
  } catch (e) {
    console.error("Failed to load pet message", e);
    moodText.textContent = "Mood: Unknown";
    petMessage.textContent = "Unable to load pet message";
  }
}

// Interaction logic
function handleInteraction(type) {
  switch (type) {
    case "feed":
      hungry = Math.max(0, hungry - 30);
      happy = Math.min(100, happy + 10);
      showMessage("Yum yum!");
      break;
    case "pet":
      happy = Math.min(100, happy + 15);
      showMessage("Purrr...");
      break;
    case "play":
      excited = Math.min(100, excited + 20);
      sleepy = Math.min(100, sleepy + 10);
      showMessage("Woohoo! That was fun!");
      break;
  }
  updateMoodUI();
}

// Button Events
document.getElementById("feed").addEventListener("click", () => handleInteraction("feed"));
document.getElementById("pet").addEventListener("click", () => handleInteraction("pet"));
document.getElementById("play").addEventListener("click", () => handleInteraction("play"));

loadPetMessage();
*/
/*
const animation = lottie.loadAnimation({
  container: document.getElementById("pet-animation"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "animations/pet.json",
});

const moodText = document.getElementById("mood-text");
const petMessage = document.getElementById("pet-message");

let happy = 50;
let excited = 50;
let sleepy = 30;
let hungry = 50;

function calculateMood() {
  if (hungry > 60) return "😢 Hungry";
  if (excited > 70 && sleepy > 50) return "😴 Tired from playing";
  if (happy >= 70) return "😊 Feeling loved";
  if (excited >= 70) return "🤩 Super energetic!";
  if (sleepy >= 70) return "😴 Sleepy";
  return "😐 Just okay";
}

function updateMoodUI() {
  const mood = calculateMood();
  moodText.textContent = `Mood: ${mood}`;
}

function showMessage(message) {
  petMessage.textContent = message;
  setTimeout(() => {
    petMessage.textContent = "";
  }, 3000);
}

function saveMood() {
  chrome.storage.local.set({
    happy,
    excited,
    sleepy,
    hungry,
  });
}

function loadMoodFromStorage() {
  chrome.storage.local.get(["happy", "excited", "sleepy", "hungry"], (result) => {
    happy = result.happy ?? 50;
    excited = result.excited ?? 50;
    sleepy = result.sleepy ?? 30;
    hungry = result.hungry ?? 50;
    updateMoodUI();
  });
}

async function loadPetMessage() {
  try {
    const res = await fetch("http://localhost:3000/api/users/pet/message");
    const data = await res.json();

    if (res.ok) {
      showMessage(data.message); // Show word of guidance on load
    } else {
      moodText.textContent = `Mood: Unknown`;
      petMessage.textContent = data.message || "No fortune today";
    }
  } catch (e) {
    console.error("Failed to load pet message", e);
    moodText.textContent = "Mood: Unknown";
    petMessage.textContent = "Unable to load pet message";
  }
}

function handleInteraction(type) {
  switch (type) {
    case "feed":
      hungry = Math.max(0, hungry - 20);
      happy = Math.min(100, happy + 5);
      showMessage("Yum yum!");
      break;
    case "pet":
      happy = Math.min(100, happy + 15);
      showMessage("Purrr...");
      break;
    case "play":
      excited = Math.min(100, excited + 20);
      sleepy = Math.min(100, sleepy + 15);
      showMessage("Woohoo! That was fun!");
      break;
  }

  updateMoodUI();
  saveMood();
}

// Event listeners
document.getElementById("feed").addEventListener("click", () => handleInteraction("feed"));
document.getElementById("pet").addEventListener("click", () => handleInteraction("pet"));
document.getElementById("play").addEventListener("click", () => handleInteraction("play"));

loadMoodFromStorage();
loadPetMessage();
*/

//-----
/*
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
const scoresPanel = document.createElement("div");
scoresPanel.style.marginTop = "10px";
scoresPanel.style.fontSize = "14px";
scoresPanel.style.color = "#555";
document.querySelector(".container").appendChild(scoresPanel);

const MOODS = ["Happy", "Excited", "Sleepy", "Hungry"];
const MAX_SCORE = 100;

let scores = {
  happy: 50,
  excited: 50,
  sleepy: 0,
  hungry: 50,
};

let isSleeping = false;
let sleepTimeout = null;

function updateMoodDisplay() {
  // Determine dominant mood for moodText display
  let dominantMood = "Balanced 😊";
  if (scores.sleepy > 70) dominantMood = "Sleepy 😴";
  else if (scores.hungry > 70) dominantMood = "Hungry 😢";
  else if (scores.excited > 70) dominantMood = "Excited 🤩";
  else if (scores.happy > 70) dominantMood = "Happy 😊";

  moodText.textContent = `Mood: ${dominantMood}`;

  scoresPanel.innerHTML = `
    Happy: ${scores.happy} | Excited: ${scores.excited} | Sleepy: ${scores.sleepy} | Hungry: ${scores.hungry}
  `;
}

function saveScores() {
  chrome.storage.local.set({ scores });
}

function loadScores() {
  chrome.storage.local.get(["scores"], (result) => {
    if (result.scores) {
      scores = result.scores;
    }
    updateMoodDisplay();
  });
}

function startSleep() {
  isSleeping = true;
  petMessage.textContent = "💤 I'm sleeping... Come back later!";
  sleepTimeout = setTimeout(() => {
    isSleeping = false;
    petMessage.textContent = "I'm awake now! 🎉";
    updateMoodDisplay();
  }, 10 * 60 * 1000); // 10 minutes
}

function handleInteraction(action) {
  if (isSleeping) {
    petMessage.textContent = "😴 I'm sleeping, come back later!";
    return;
  }

  switch (action) {
    case "feed":
      if (scores.hungry <= 0) {
        petMessage.textContent = "😩 I'm too full!";
        return;
      }
      scores.hungry = Math.max(0, scores.hungry - 20);
      petMessage.textContent = "Yum yum! 🍎";
      break;

    case "pet":
      scores.happy = Math.min(MAX_SCORE, scores.happy + 15);
      petMessage.textContent = "😊";
      break;

    case "play":
      scores.excited = Math.min(MAX_SCORE, scores.excited + 20);
      petMessage.textContent = "Woohoo! Let's play! 🎮";

      // Increase sleepy too when playing
      scores.sleepy = Math.min(MAX_SCORE, scores.sleepy + 10);
      if (scores.sleepy >= 80) {
        startSleep();
      }
      break;
  }

  // Diminishing returns logic (example: cap scores at 100)
  // Optionally reduce other scores gradually
  // Here, just clamp values

  // Save and update UI
  saveScores();
  updateMoodDisplay();
}

// Load initial scores
loadScores();

// Attach event listeners
document.getElementById("feed").addEventListener("click", () => handleInteraction("feed"));
document.getElementById("pet").addEventListener("click", () => handleInteraction("pet"));
document.getElementById("play").addEventListener("click", () => handleInteraction("play"));
*/
const animation = lottie.loadAnimation({
  container: document.getElementById("pet-animation"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "animations/pet.json",
});

const moodText = document.getElementById("mood-text");
const petMessage = document.getElementById("pet-message");

// Create and style scores panel
const scoresPanel = document.createElement("div");
scoresPanel.style.marginTop = "10px";
scoresPanel.style.fontSize = "14px";
scoresPanel.style.color = "#555";
document.querySelector(".container").appendChild(scoresPanel);

// Create and style guidance panel
const guidancePanel = document.createElement("div");
guidancePanel.style.marginTop = "10px";
guidancePanel.style.fontSize = "13px";
guidancePanel.style.fontStyle = "italic";
guidancePanel.style.color = "#333";
document.querySelector(".container").appendChild(guidancePanel);

const MAX_SCORE = 100;

let scores = {
  happy: 50,
  excited: 50,
  sleepy: 0,
  hungry: 50,
};

let isSleeping = false;
let sleepTimeout = null;

function updateMoodDisplay() {
  let dominantMood = "Balanced 😊";
  if (scores.sleepy > 70) dominantMood = "Sleepy 😴";
  else if (scores.hungry > 70) dominantMood = "Hungry 😢";
  else if (scores.excited > 70) dominantMood = "Excited 🤩";
  else if (scores.happy > 70) dominantMood = "Happy 😊";

  moodText.textContent = `Mood: ${dominantMood}`;

  scoresPanel.innerHTML = `
    Happy: ${scores.happy} | Excited: ${scores.excited} | Sleepy: ${scores.sleepy} | Hungry: ${scores.hungry}
  `;
}

function saveScores() {
  chrome.storage.local.set({ scores });
}

function loadScores() {
  chrome.storage.local.get(["scores"], (result) => {
    if (result.scores) {
      scores = result.scores;
    }
    updateMoodDisplay();
  });
}

function startSleep() {
  isSleeping = true;
  petMessage.textContent = "💤 I'm sleeping... Come back later!";
  sleepTimeout = setTimeout(() => {
    isSleeping = false;
    petMessage.textContent = "I'm awake now! 🎉";
    updateMoodDisplay();
  }, 10 * 60 * 1000); // 10 minutes
}

function handleInteraction(action) {
  if (isSleeping) {
    petMessage.textContent = "😴 I'm sleeping, come back later!";
    return;
  }

  switch (action) {
    case "feed":
      if (scores.hungry <= 0) {
        petMessage.textContent = "😩 I'm too full!";
        return;
      }
      scores.hungry = Math.max(0, scores.hungry - 20);
      petMessage.textContent = "Yum yum! 🍎";
      break;

    case "pet":
      scores.happy = Math.min(MAX_SCORE, scores.happy + 15);
      petMessage.textContent = "😊";
      break;

    case "play":
      scores.excited = Math.min(MAX_SCORE, scores.excited + 20);
      petMessage.textContent = "Woohoo! Let's play! 🎮";

      scores.sleepy = Math.min(MAX_SCORE, scores.sleepy + 10);
      if (scores.sleepy >= 80) {
        startSleep();
      }
      break;
  }

  saveScores();
  updateMoodDisplay();
}

// Fetch word of guidance from daily fortune and update guidance panel
async function fetchGuidance() {
  try {
    const res = await fetch("http://luck-echoes-deploy.vercel.app/api/users/pet/message");
    const data = await res.json();

    if (res.ok) {
      guidancePanel.textContent = data.message || "Have a great day!";
    } else {
      moodText.textContent = `Mood: Unknown`;
      petMessage.textContent = data.message || "No fortune today";
      guidancePanel.textContent = "";
    }
  } catch (e) {
    console.error("Failed to load pet message", e);
    moodText.textContent = "Mood: Unknown";
    petMessage.textContent = "Unable to load pet message";
    guidancePanel.textContent = "";
  }
}

// Initial load
loadScores();
fetchGuidance();

// Event listeners
document.getElementById("feed").addEventListener("click", () => handleInteraction("feed"));
document.getElementById("pet").addEventListener("click", () => handleInteraction("pet"));
document.getElementById("play").addEventListener("click", () => handleInteraction("play"));
