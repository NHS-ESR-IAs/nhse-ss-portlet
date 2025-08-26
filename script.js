// Toggle page visibility
function showPage(pageId) {
  document
    .querySelectorAll(".page")
    .forEach((page) => page.classList.remove("active"));
  document.getElementById(pageId)?.classList.add("active");
}

// Search input: filters pages + cards
function searchPages(query) {
  query = query.toLowerCase();
  const pages = document.querySelectorAll(".page");
  const homePage = document.getElementById("home");

  function showAllCards() {
    document.querySelectorAll(".text-start").forEach((card) => {
      card.style.display = "block";
    });
  }

  function filterCards(q) {
    document.querySelectorAll(".page.active .text-start").forEach((card) => {
      const match = card.innerText.toLowerCase().includes(q);
      card.style.display = match ? "block" : "none";
    });
  }

  if (query === "") {
    showPage("home");
    pages.forEach((page) => {
      if (page.id !== "home") page.classList.remove("active");
    });
    showAllCards();
  } else {
    homePage.classList.remove("active");
    pages.forEach((page) => {
      const match = page.innerText.toLowerCase().includes(query);
      page.classList.toggle("active", match);
    });
    filterCards(query);
  }
}

// Open a popup window with provided URL
function openPopup(url) {
  window.open(url, "popupWindow", "width=auto,height=auto,scrollbars=yes");
}

// ===== THEME SWITCHER =====
const themeSelectors = document.querySelectorAll(".theme-selector");

themeSelectors.forEach((selector) => {
  selector.addEventListener("change", function () {
    // Remove existing theme-* classes
    document.body.className = document.body.className
      .split(" ")
      .filter((cls) => !cls.startsWith("theme-"))
      .join(" ");

    // Add selected theme class
    document.body.classList.add("theme-" + this.value);

    // Optional: preserve dark mode
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.add("dark-mode");
    }

    // Save theme
    localStorage.setItem("theme", this.value);
  });
});

// ===== DARK MODE TOGGLE =====
const toggleButtons = document.querySelectorAll(".toggle-dark");
const body = document.body;

function updateDarkMode() {
  const isDark = body.classList.toggle("dark-mode");
  toggleButtons.forEach((btn) => {
    btn.textContent = isDark ? "🌙 Dark Mode" : "☀️ Light Mode";
  });
}

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", updateDarkMode);
});

// ===== TEXT SIZE SWITCHER =====
function setTextSize(sizeClass) {
  document.body.classList.remove(
    "scale-small",
    "scale-medium",
    "scale-large",
    "scale-xlarge"
  );
  document.body.classList.add(sizeClass);
  localStorage.setItem("text-size", sizeClass);
}

// ===== RESTORE SETTINGS ON LOAD =====
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "blue";
  const savedSize = localStorage.getItem("text-size") || "scale-medium";
  isDarkMode = localStorage.getItem("dark-mode") === "true";

  themeSelector.value = savedTheme;
  document.body.classList.add("theme-" + savedTheme, savedSize);
  updateDarkMode();
});

// ===== TOGLLE SECTION VISIBILITY ====//
function toggleSection(id) {
  var section = document.getElementById(id);
  section.style.display = section.style.display === "none" ? "block" : "none";
}
