const nodemailer = require("nodemailer");

function getEnv(name) {
  const value = process.env[name];
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

function requiredEnv(name) {
  const value = getEnv(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function escapeHtml(input) {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok: false, error: "Method not allowed" }),
    };
  }

  try {
    const SMTP_HOST = requiredEnv("SMTP_HOST");
    const SMTP_PORT = Number(getEnv("SMTP_PORT") || "587");
    const SMTP_USER = requiredEnv("SMTP_USER");
    const SMTP_PASS = requiredEnv("SMTP_PASS");

    const ADMIN_EMAIL = requiredEnv("ADMIN_EMAIL");
    const FROM_EMAIL = getEnv("FROM_EMAIL") || SMTP_USER;
    const SITE_NAME = getEnv("SITE_NAME") || "Website";

    let payload;
    try {
      payload = JSON.parse(event.body || "{}");
    } catch {
      return {
        statusCode: 400,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ok: false, error: "Invalid JSON" }),
      };
    }

    const name = (payload.name || "").toString().trim();
    const email = (payload.email || "").toString().trim();
    const phone = (payload.phone || "").toString().trim();
    const subject = (payload.subject || "").toString().trim();
    const message = (payload.message || "").toString().trim();

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ok: false, error: "Name, email, and message are required" }),
      };
    }

    // Basic email and phone validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ok: false, error: "Invalid email address" }),
      };
    }

    if (phone && !/^[0-9+ \-()]{7,20}$/.test(phone)) {
      return {
        statusCode: 400,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ok: false, error: "Invalid phone number format" }),
      };
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number.isFinite(SMTP_PORT) ? SMTP_PORT : 587,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeSubject = escapeHtml(subject || "General Inquiry");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    const adminText = [
      `New contact form submission from ${name} <${email}>`,
      `Phone: ${phone || "Not provided"}`,
      `Subject: ${subject || "General Inquiry"}`,
      "",
      message,
    ].join("\n");

    const adminHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0c1a33; color: #ffffff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">New Legal Inquiry</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; margin-bottom: 20px;">You have received a new consultation request from your website.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; width: 120px;"><strong>Client Name:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${safeEmail}" style="color: #c9a050; text-decoration: none;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><a href="tel:${safePhone}" style="color: #c9a050; text-decoration: none;">${safePhone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Topic:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">${safeSubject}</td>
            </tr>
          </table>
          <div style="margin-top: 25px; background: #f9f9f9; padding: 20px; border-radius: 6px; border-left: 4px solid #c9a050;">
            <p style="margin: 0; font-weight: bold; color: #0c1a33; margin-bottom: 10px;">Message Detail:</p>
            <p style="margin: 0; font-style: italic;">"${safeMessage}"</p>
          </div>
        </div>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          <p style="margin: 0;">This inquiry was sent via the contact form on kpjadvocates.com</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `${SITE_NAME} <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `New Inquiry: ${subject || "General Inquiry"}`,
      text: adminText,
      html: adminHtml,
    });

    const customerText = [
      `Hi ${name},`,
      "",
      `Thanks for contacting ${SITE_NAME}. We have received your message and will get back to you shortly.`,
      "",
      "Your message:",
      message,
      "",
      "Regards,",
      SITE_NAME,
    ].join("\n");

    const customerHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0c1a33; color: #ffffff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Message Received</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; margin-bottom: 20px;">Dear ${safeName},</p>
          <p>Thank you for reaching out to <strong>${escapeHtml(SITE_NAME)}</strong>. We have successfully received your inquiry and one of our legal experts will review it and get back to you shortly.</p>
          
          <div style="margin-top: 25px; padding: 20px; border: 1px solid #f0f0f0; border-radius: 6px; border-top: 3px solid #c9a050;">
            <p style="margin: 0; font-weight: bold; color: #0c1a33; margin-bottom: 15px;">Summary of your request:</p>
            <p style="margin: 0 0 5px; font-size: 14px;"><strong>Topic:</strong> ${safeSubject}</p>
            <p style="margin: 0; font-size: 14px; font-style: italic;">"${safeMessage}"</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://kpjadvocates.com" style="display: inline-block; padding: 12px 24px; background-color: #c9a050; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px;">Visit Our Website</a>
          </div>
        </div>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 13px; color: #555; border-top: 1px solid #eee;">
          <p style="margin: 0;"><strong>${escapeHtml(SITE_NAME)}</strong></p>
          <p style="margin: 5px 0 0;">Dedicated to Justice, Integrity, and Excellence.</p>
          <p style="margin: 10px 0 0; font-size: 11px;">If you did not submit this request, please ignore this email.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `${SITE_NAME} <${FROM_EMAIL}>`,
      to: email,
      subject: `We received your message (${SITE_NAME})`,
      text: customerText,
      html: customerHtml,
    });

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok: false, error: err instanceof Error ? err.message : "Server error" }),
    };
  }
};
