// ─────────────────────────────────────────────────────────────────────────────
// Email Notifications via EmailJS
//
// SETUP INSTRUCTIONS:
// 1. Go to https://emailjs.com and create a free account
// 2. Create an Email Service (Gmail recommended) → copy your SERVICE_ID
// 3. Create an Email Template with these variables:
//      {{to_email}}   {{from_name}}   {{property}}   {{unit}}
//      {{category}}   {{priority}}    {{title}}      {{description}}
//      {{date}}       {{ticket_id}}
// 4. Copy your TEMPLATE_ID and PUBLIC_KEY
// 5. Replace the placeholders below with your real values
// ─────────────────────────────────────────────────────────────────────────────

const EMAILJS_CONFIG = {
  SERVICE_ID:  "service_7bavw6l",    // e.g. "service_abc123"
  TEMPLATE_ID: "template_4qcvaiy",   // e.g. "template_xyz789"
  PUBLIC_KEY:  "r9nhuChDo8TkhnpCy",    // e.g. "user_AbCdEfGhIj"
  MANAGER_EMAIL: "admin@propdesk.ca",// Your email to receive notifications
};

/**
 * Sends an email notification when a new ticket is submitted.
 * Loads EmailJS from CDN on first call (no npm install needed).
 */
export const sendTicketNotification = async (ticket, property) => {
  // Skip if not configured yet
  if (EMAILJS_CONFIG.SERVICE_ID === "YOUR_SERVICE_ID") {
    console.log("📧 EmailJS not configured yet — skipping email notification.");
    console.log("📧 Ticket details:", ticket);
    return { success: false, reason: "not_configured" };
  }

  try {
    // Dynamically load EmailJS SDK if not already loaded
    if (!window.emailjs) {
      await loadEmailJSScript();
    }

    window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

    const templateParams = {
      to_email:    EMAILJS_CONFIG.MANAGER_EMAIL,
      from_name:   ticket.renter,
      ticket_id:   `#${ticket.id}`,
      title:       ticket.title,
      property:    property?.address || "Unknown Property",
      unit:        ticket.unit,
      category:    ticket.category,
      priority:    ticket.priority,
      description: ticket.description,
      date:        ticket.date,
      photo_count: ticket.photos?.length || 0,
    };

    await window.emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log("✅ Email notification sent successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Email notification failed:", error);
    return { success: false, reason: error.message };
  }
};

/**
 * Loads the EmailJS SDK script dynamically from CDN
 */
const loadEmailJSScript = () =>
  new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.onload  = resolve;
    script.onerror = () => reject(new Error("Failed to load EmailJS SDK"));
    document.head.appendChild(script);
  });
