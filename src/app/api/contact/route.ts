import { SPECIALITY_OPTIONS } from "@/lib/content";

const FROM = "Tiffany Venegas LCSW Website <website@tiffanyvenegaslcsw.com>";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Single-line fields collapse whitespace so nothing can break the subject line
const line = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";

const block = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Bots fill the hidden "website" field; act as if it worked
  if (line(body.website, 200)) return Response.json({ ok: true });

  const name = line(body.name, 200);
  const email = line(body.email, 320);
  const phone = line(body.phone, 40);
  const message = block(body.message, 5000);
  if (!name || !message || !EMAIL.test(email)) {
    return Response.json({ error: "Missing or invalid fields" }, { status: 400 });
  }
  const service = SPECIALITY_OPTIONS.find((option) => option.value === body.service)?.name ?? "Not chosen";

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return Response.json({ error: "Not configured" }, { status: 500 });
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not given"}`,
    `Support with: ${service}`,
    "",
    "Message:",
    message,
    "",
    `Reply to this email to answer ${name} directly.`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      reply_to: email,
      subject: `New website message from ${name}`,
      text,
    }),
  });

  if (!response.ok) {
    console.error("Contact form: Resend returned", response.status, await response.text());
    return Response.json({ error: "Send failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
