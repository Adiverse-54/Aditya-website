// ===== Basic JavaScript interactions =====
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("aditya-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀" : "☾";
  localStorage.setItem("aditya-theme", isDark ? "dark" : "light");
});

document.getElementById("year").textContent = new Date().getFullYear();

// Simple typing animation
const phrases = ["learning new things", "creative ideas", "technology", "building my future"];
const typedText = document.getElementById("typedText");
let phraseIndex = 0;
let letterIndex = 0;
let deleting = false;

function typePhrase() {
  const phrase = phrases[phraseIndex];
  typedText.textContent = phrase.slice(0, letterIndex);

  if (!deleting && letterIndex < phrase.length) {
    letterIndex++;
    setTimeout(typePhrase, 75);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typePhrase, 1150);
  } else if (letterIndex > 0) {
    letterIndex--;
    setTimeout(typePhrase, 35);
  } else {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typePhrase, 250);
  }
}
typePhrase();

// ===== Optional Supabase backend for contact messages =====
// Configure these in the setup instructions before expecting messages to save.
const SUPABASE_URL = "https://ltcjutmaxzewgxyevcve.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_GbldwwBgJUMt2dC2VFvg8A_bI2s1dDH";
const backendReady =
  window.supabase &&
  SUPABASE_URL.startsWith("https://") &&
  !SUPABASE_URL.includes("PASTE_") &&
  !SUPABASE_ANON_KEY.includes("PASTE_");

let supabaseClient = null;
if (backendReady) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitButton = document.getElementById("submitButton");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!supabaseClient) {
    formStatus.className = "form-status error";
    formStatus.textContent = "The contact database is not connected yet. Follow README.txt to set up Supabase.";
    return;
  }

  const formData = new FormData(contactForm);
  const message = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    message: String(formData.get("message") || "").trim()
  };

  if (message.name.length < 2 || message.message.length < 5) {
    formStatus.className = "form-status error";
    formStatus.textContent = "Please enter your name and a message (at least 5 characters).";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  formStatus.className = "form-status";
  formStatus.textContent = "Sending your message securely...";

  try {
    const { error } = await supabaseClient
      .from("contact_messages")
      .insert([message]);

    if (error) throw error;

    contactForm.reset();
    formStatus.className = "form-status success";
    formStatus.textContent = "Thanks! Your message was sent successfully.";
  } catch (error) {
    console.error("Contact form error:", error);
    formStatus.className = "form-status error";
    formStatus.textContent = "Message could not be sent. Check the Supabase setup and try again.";
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
  }
});
