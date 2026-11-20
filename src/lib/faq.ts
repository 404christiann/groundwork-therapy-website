// The FAQ copy, shared by the FAQ section and the FAQPage structured data in
// layout.tsx. Each answer is a list of paragraphs; **text** renders bold on
// the page and is stripped to plain text for search engines and AI tools.
export const FAQS: { q: string; a: string[] }[] = [
  {
    q: "How much does a session cost?",
    a: [
      "Sessions are $140 for a 55-minute appointment. If cost feels like a barrier, reach out. I'm happy to have an honest conversation about it.",
    ],
  },
  {
    q: "Do you accept insurance?",
    a: [
      "I'm out of network with all insurance providers, which means I don't bill insurance directly. However, I can provide a superbill, a detailed receipt you can submit to your insurance company for potential out of network reimbursement. Many clients get a portion of their sessions covered this way. I'd recommend calling your insurance ahead of time to ask about your out of network mental health benefits.",
    ],
  },
  {
    q: "How long are sessions and how often will we meet?",
    a: [
      "Our sessions are 55 minutes, so it's helpful to block off a full hour in your calendar. Most people start out coming weekly. Having that steady rhythm really helps create momentum so our work can build on itself. Once you're hitting your goals, we'll figure out a step-down plan together that feels comfortable for you.",
    ],
  },
  {
    q: "Is therapy online only?",
    a: [
      "All sessions take place via telehealth, so you can join from anywhere in California, whether that's your home, your office, or a parked car. Just keep in mind that for safety reasons, you cannot be driving during our appointment. There's no commute and no waiting room; all you need is a private space and a reliable internet connection.",
    ],
  },
  {
    q: "What is your cancellation policy?",
    a: [
      "Clients who benefit the most from therapy attend consistently each week, as your appointment time is held exclusively for you. That said, I know schedules change and unexpected things come up.",
      "You are allowed up to **4 fee-free cancellations per calendar year**, as long as you give at least one week's notice. If you cancel more than 4 sessions in a calendar year for any reason, you will be responsible for the full session fee.",
      "If you do need to cancel, please let me know as far in advance as possible. Any session canceled with **less than 24 hours' notice** is considered a late cancellation; these are billed at the full session fee and do not count toward your 4 annual cancellations. You're always welcome to ask about rescheduling to another time that week, though if we can't find a mutual time to make it up, the full fee still applies and will be charged at your regularly scheduled session time. Of course, if I ever need to cancel, you will never be charged.",
    ],
  },
  {
    q: "What is a Good Faith Estimate?",
    a: [
      "California law requires me to provide a Good Faith Estimate before we begin working together. It's a written document outlining the expected cost of therapy so there are no surprises. You'll receive one before your first session.",
    ],
  },
  {
    q: "What if I've tried therapy before and it didn't help?",
    a: [
      "That's more common than you'd think. A lot of people come to me after gaining insight elsewhere but still feeling stuck. The fit between therapist and client matters enormously, as does the approach. If therapy hasn't clicked before, I'd encourage you to try a free consultation before writing it off.",
    ],
  },
  {
    q: "How do I get started?",
    a: [
      "Start by scheduling a free 20-minute consultation through my secure client portal. It's a low-pressure conversation where we can connect and see if working together feels right. No commitment required.",
    ],
  },
];

export const plainAnswer = (paragraphs: string[]) => paragraphs.join("\n\n").replaceAll("**", "");
