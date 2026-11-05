export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Approach", href: "#approach" },
  { label: "Specialities", href: "#services" },
  { label: "FAQ", href: "#faq" },
];

// The speciality menu: plain-language concerns first, then the approaches,
// then "Not sure yet". Values are what the form sends as `service`.
export const SPECIALITY_OPTIONS = [
  { value: "anxiety", name: "Anxiety & ADHD", line: "For a mind that’s always on" },
  { value: "trauma", name: "Trauma", line: "Processing difficult experiences safely" },
  { value: "life-transitions", name: "Life Transitions", line: "Support through a season of change" },
  { value: "act", name: "ACT", line: "Let your values, not anxiety, guide you" },
  { value: "cbt", name: "CBT", line: "Shift the thought patterns keeping you stuck" },
  { value: "dbt", name: "DBT", line: "Concrete skills for intense emotions" },
  { value: "general", name: "Not sure yet", line: "That’s okay. We can figure it out together." },
] as const;

// Shared by the form and the API route so both accept the same addresses
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
