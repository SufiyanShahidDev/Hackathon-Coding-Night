/* =========================================================
   FILE: js/data.js
   PURPOSE: All mock data for the platform.
   This file stores sample users, requests, messages etc.
   Include BEFORE app.js in every HTML page.
   ========================================================= */

// ── Default users ──────────────────────────────────────────
const DEFAULT_USERS = [
  {
    id: "u1",
    name: "Ayesha Khan",
    role: "Both",
    location: "Karachi",
    email: "ayesha@helphub.ai",
    skills: ["Figma", "UI/UX", "HTML/CSS", "Career Guidance"],
    interests: ["Hackathons", "UI/UX", "Community Building"],
    trustScore: 100,
    contributions: 35,
    badges: ["Design Ally", "Fast Responder", "Top Mentor"]
  },
  {
    id: "u2",
    name: "Hassan Ali",
    role: "Can Help",
    location: "Lahore",
    email: "hassan@helphub.ai",
    skills: ["JavaScript", "React", "Git/GitHub"],
    interests: ["Open Source", "Web Dev"],
    trustScore: 88,
    contributions: 24,
    badges: ["Code Rescuer", "Bug Hunter"]
  },
  {
    id: "u3",
    name: "Sara Noor",
    role: "Need Help",
    location: "Remote",
    email: "sara@helphub.ai",
    skills: ["Python", "Data Analysis"],
    interests: ["Data Science", "ML"],
    trustScore: 74,
    contributions: 11,
    badges: ["Community Voice"]
  }
];

// ── Default help requests ──────────────────────────────────
const DEFAULT_REQUESTS = [
  {
    id: "r1",
    title: "Need help",
    description: "helpn needed",
    category: "Web Development",
    urgency: "High",
    status: "Solved",
    tags: [],
    author: "Ayesha Khan",
    location: "Karachi",
    helpers: 1,
    helpersList: ["Hassan Ali"]
  },
  {
    id: "r2",
    title: "Need help making my portfolio responsive before demo day",
    description: "My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.",
    category: "Web Development",
    urgency: "High",
    status: "Solved",
    tags: ["HTML/CSS", "Responsive", "Portfolio"],
    author: "Sara Noor",
    location: "Karachi",
    helpers: 1,
    helpersList: ["Ayesha Khan"]
  },
  {
    id: "r3",
    title: "Looking for Figma feedback on a volunteer event poster",
    description: "I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.",
    category: "Design",
    urgency: "Medium",
    status: "Open",
    tags: ["Figma", "Poster", "Design Review"],
    author: "Ayesha Khan",
    location: "Lahore",
    helpers: 1,
    helpersList: ["Hassan Ali"]
  },
  {
    id: "r4",
    title: "Need mock interview support for internship applications",
    description: "Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.",
    category: "Career",
    urgency: "Low",
    status: "Solved",
    tags: ["Interview Prep", "Career", "Frontend"],
    author: "Sara Noor",
    location: "Remote",
    helpers: 2,
    helpersList: ["Ayesha Khan", "Hassan Ali"],
    aiSummary: "Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews."
  }
];

// ── Default messages ───────────────────────────────────────
const DEFAULT_MESSAGES = [
  {
    from: "Ayesha Khan",
    to: "Sara Noor",
    text: "I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.",
    time: "09:45 AM"
  },
  {
    from: "Hassan Ali",
    to: "Ayesha Khan",
    text: "Your event poster concept is solid. I would tighten the CTA and reduce the background texture.",
    time: "11:10 AM"
  }
];

// ── Default notifications ──────────────────────────────────
const DEFAULT_NOTIFICATIONS = [
  { id: "n1", text: '"Need help" was marked as solved',         type: "Status", time: "Just now",    read: false },
  { id: "n2", text: 'Ayesha Khan offered help on "Need help"',  type: "Match",  time: "Just now",    read: false },
  { id: "n3", text: 'Your request "Need help" is now live in the community feed', type: "Request", time: "Just now", read: false },
  { id: "n4", text: '"Need help making my portfolio responsive before demo day" was marked as solved', type: "Status", time: "Just now", read: false },
  { id: "n5", text: 'New helper matched to your responsive portfolio request',    type: "Match",  time: "12 min ago", read: false },
  { id: "n6", text: 'Your trust score increased after a solved request',          type: "Reputation", time: "1 hr ago", read: false },
  { id: "n7", text: 'AI Center detected rising demand for interview prep',        type: "Insight", time: "Today",   read: true }
];

// ──────────────────────────────────────────────────────────
//  LocalStorage Helpers
//  These functions save/load data from the browser.
// ──────────────────────────────────────────────────────────

// Load requests from LocalStorage (or use defaults)
function getRequests() {
  const saved = localStorage.getItem("hh_requests");
  return saved ? JSON.parse(saved) : DEFAULT_REQUESTS;
}

// Save requests to LocalStorage
function saveRequests(requests) {
  localStorage.setItem("hh_requests", JSON.stringify(requests));
}

// Add a new request and save
function addRequest(newRequest) {
  const requests = getRequests();
  requests.unshift(newRequest); // add to top
  saveRequests(requests);
}

// Load logged-in user from LocalStorage
function getLoggedInUser() {
  const saved = localStorage.getItem("hh_user");
  return saved ? JSON.parse(saved) : null;
}

// Save logged-in user to LocalStorage
function saveLoggedInUser(user) {
  localStorage.setItem("hh_user", JSON.stringify(user));
}

// Load notifications from LocalStorage (or use defaults)
function getNotifications() {
  const saved = localStorage.getItem("hh_notifications");
  return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
}

// Save notifications
function saveNotifications(notifs) {
  localStorage.setItem("hh_notifications", JSON.stringify(notifs));
}

// Mark a notification as read
function markNotifRead(id) {
  const notifs = getNotifications();
  notifs.forEach(n => { if (n.id === id) n.read = true; });
  saveNotifications(notifs);
}

// Load messages
function getMessages() {
  const saved = localStorage.getItem("hh_messages");
  return saved ? JSON.parse(saved) : DEFAULT_MESSAGES;
}

// Add a new message
function addMessage(msg) {
  const messages = getMessages();
  messages.push(msg);
  localStorage.setItem("hh_messages", JSON.stringify(messages));
}

// Get unread notification count
function getUnreadCount() {
  return getNotifications().filter(n => !n.read).length;
}
