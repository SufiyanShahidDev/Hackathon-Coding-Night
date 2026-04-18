/* =========================================================
   FILE: js/app.js
   PURPOSE: Shared JavaScript utilities used across all pages.
   Include AFTER data.js in every HTML page.
   ========================================================= */

// ──────────────────────────────────────────────────────────
//  NAVIGATION GUARD
//  Redirect to auth.html if user is not logged in.
//  Call this on protected pages (dashboard, explore, etc.)
// ──────────────────────────────────────────────────────────
function requireLogin() {
  const user = getLoggedInUser();
  if (!user) {
    window.location.href = "auth.html";
  }
  return user;
}

// ──────────────────────────────────────────────────────────
//  BADGE HELPERS
//  Returns the CSS class for a given category / urgency / status
// ──────────────────────────────────────────────────────────
function getCategoryClass(cat) {
  const map = {
    "Web Development": "badge-webdev",
    "Design":          "badge-design",
    "Career":          "badge-career",
    "Community":       "badge-community"
  };
  return map[cat] || "badge-community";
}

function getUrgencyClass(urgency) {
  const map = { "High": "badge-high", "Medium": "badge-medium", "Low": "badge-low" };
  return map[urgency] || "badge-low";
}

function getStatusClass(status) {
  return status === "Solved" ? "badge-solved" : "badge-open";
}

// Build a request card's badge HTML
function buildBadges(req) {
  return `
    <span class="badge-pill ${getCategoryClass(req.category)}">${req.category}</span>
    <span class="badge-pill ${getUrgencyClass(req.urgency)}">${req.urgency}</span>
    <span class="badge-pill ${getStatusClass(req.status)}">${req.status}</span>
  `;
}

// Build skill/tag chip HTML from an array
function buildChips(tags) {
  return tags.map(t => `<span class="skill-chip">${t}</span>`).join("");
}

// ──────────────────────────────────────────────────────────
//  AI FEATURES (Simple keyword-based logic)
//  These give the "AI" feel using plain JavaScript rules.
// ──────────────────────────────────────────────────────────

// Detect category from title + description text
function detectCategory(text) {
  text = text.toLowerCase();
  if (text.includes("react") || text.includes("html") || text.includes("css") ||
      text.includes("javascript") || text.includes("frontend") || text.includes("web") ||
      text.includes("portfolio") || text.includes("responsive") || text.includes("node") ||
      text.includes("api") || text.includes("github") || text.includes("git"))
    return "Web Development";

  if (text.includes("figma") || text.includes("design") || text.includes("poster") ||
      text.includes("ui") || text.includes("ux") || text.includes("logo") ||
      text.includes("illustrator") || text.includes("photoshop") || text.includes("wireframe"))
    return "Design";

  if (text.includes("interview") || text.includes("internship") || text.includes("career") ||
      text.includes("resume") || text.includes("cv") || text.includes("job") ||
      text.includes("linkedin"))
    return "Career";

  return "Community";
}

// Detect urgency from title + description text
function detectUrgency(text) {
  text = text.toLowerCase();
  if (text.includes("urgent") || text.includes("asap") || text.includes("today") ||
      text.includes("tonight") || text.includes("deadline") || text.includes("tomorrow") ||
      text.includes("submission") || text.includes("demo day") || text.includes("immediately"))
    return "High";

  if (text.includes("this week") || text.includes("soon") || text.includes("few days"))
    return "Medium";

  return "Low";
}

// Suggest tags from text
function suggestTags(text) {
  text = text.toLowerCase();
  const tagMap = {
    "HTML/CSS":     ["html", "css", "styling", "layout", "responsive", "portfolio"],
    "React":        ["react", "component", "jsx", "hook"],
    "JavaScript":   ["javascript", "js", "function", "script"],
    "Figma":        ["figma", "design", "prototype", "wireframe"],
    "Git/GitHub":   ["git", "github", "repo", "commit", "push"],
    "Interview Prep": ["interview", "behavioral", "technical questions"],
    "Career":       ["career", "internship", "job", "resume"],
    "Python":       ["python", "script", "pandas", "numpy"],
    "Frontend":     ["frontend", "web app", "browser"],
    "Portfolio":    ["portfolio", "showcase", "personal site"]
  };

  const found = [];
  for (const [tag, keywords] of Object.entries(tagMap)) {
    if (keywords.some(k => text.includes(k))) {
      found.push(tag);
    }
  }
  return found.slice(0, 4); // max 4 tags
}

// Rewrite suggestion (makes description sound more structured)
function rewriteSuggestion(title, desc) {
  if (!title.trim()) return "Start describing the challenge to generate a stronger version.";
  const cat = detectCategory(title + " " + desc);
  const urg = detectUrgency(title + " " + desc);
  if (desc.trim().length < 20) {
    return `Add more detail: what have you tried, your deadline, and what kind of support would help most.`;
  }
  return `This looks like a ${cat} request with ${urg.toLowerCase()} urgency. Consider mentioning your tech stack version and exact error or blocker.`;
}

// ──────────────────────────────────────────────────────────
//  RENDER HELPERS
//  Reusable HTML builders for request cards
// ──────────────────────────────────────────────────────────

// Build a full request card HTML string (used on Explore page)
function buildRequestCard(req) {
  const chips = req.tags && req.tags.length ? buildChips(req.tags) : "";
  return `
    <div class="request-card">
      <div>${buildBadges(req)}</div>
      <h5>${req.title}</h5>
      <p>${req.description}</p>
      ${chips ? `<div class="mb-2">${chips}</div>` : ""}
      <div class="d-flex justify-content-between align-items-center mt-2">
        <div>
          <div class="requester-name">${req.author}</div>
          <div class="requester-meta">${req.location} &bull; ${req.helpers} helper${req.helpers !== 1 ? "s" : ""} interested</div>
        </div>
        <a href="request-detail.html?id=${req.id}" class="open-details">Open details</a>
      </div>
    </div>
  `;
}

// ──────────────────────────────────────────────────────────
//  NAVBAR ACTIVE STATE
//  Highlights the correct nav link on each page
// ──────────────────────────────────────────────────────────
function setActiveNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".hh-navbar .nav-link").forEach(link => {
    const href = link.getAttribute("href") || "";
    if (href === page) {
      link.classList.add("active");
    }
  });
}

// Run on every page load
document.addEventListener("DOMContentLoaded", function () {
  setActiveNav();
});
