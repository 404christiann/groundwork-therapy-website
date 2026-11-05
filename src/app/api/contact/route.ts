import { EMAIL_PATTERN, SPECIALITY_OPTIONS } from "@/lib/content";

const FROM = "Tiffany Venegas LCSW Website <website@tiffanyvenegaslcsw.com>";

// Collapse whitespace in single-line fields so nothing can break the subject line
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
  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Bots fill the hidden "website" field, so return success without sending
  if (line(body.website, 200)) return Response.json({ ok: true });

  const name = line(body.name, 200);
  const email = line(body.email, 320);
  const phone = line(body.phone, 40);
  const message = block(body.message, 5000);
  if (!name || !message || !EMAIL_PATTERN.test(email)) {
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

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        reply_to: email,
        subject: `New website message from ${name}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("Contact form: could not reach Resend", error);
    return Response.json({ error: "Send failed" }, { status: 502 });
  }

  if (!response.ok) {
    console.error("Contact form: Resend returned", response.status, await response.text());
    return Response.json({ error: "Send failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
