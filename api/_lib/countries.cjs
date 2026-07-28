const COUNTRIES = [
  { name: "Switzerland", iso: "CH", dialCode: "41", flag: "🇨🇭", regexString: "^[1-9]\\d{8}$", example: "791234567" },
  { name: "France", iso: "FR", dialCode: "33", flag: "🇫🇷", regexString: "^[1-9]\\d{8}$", example: "612345678" },
  { name: "Belgium", iso: "BE", dialCode: "32", flag: "🇧🇪", regexString: "^[1-9]\\d{8,9}$", example: "470123456" },
  { name: "Canada", iso: "CA", dialCode: "1", flag: "🇨🇦", regexString: "^[2-9]\\d{9}$", example: "4165551234" },
  { name: "USA", iso: "US", dialCode: "1", flag: "🇺🇸", regexString: "^[2-9]\\d{9}$", example: "2125551234" },
  { name: "UK", iso: "GB", dialCode: "44", flag: "🇬🇧", regexString: "^[1-9]\\d{9,10}$", example: "7911123456" },
  { name: "Germany", iso: "DE", dialCode: "49", flag: "🇩🇪", regexString: "^[1-9]\\d{10,11}$", example: "15123456789" },
  { name: "Spain", iso: "ES", dialCode: "34", flag: "🇪🇸", regexString: "^[1-9]\\d{8}$", example: "612345678" },
  { name: "Italy", iso: "IT", dialCode: "39", flag: "🇮🇹", regexString: "^[1-9]\\d{9,10}$", example: "3331234567" },
  { name: "Netherlands", iso: "NL", dialCode: "31", flag: "🇳🇱", regexString: "^[1-9]\\d{8,9}$", example: "612345678" },
  { name: "Sweden", iso: "SE", dialCode: "46", flag: "🇸🇪", regexString: "^[1-9]\\d{7,9}$", example: "701234567" },
  { name: "Australia", iso: "AU", dialCode: "61", flag: "🇦🇺", regexString: "^[1-9]\\d{8,9}$", example: "412345678" },
  { name: "India", iso: "IN", dialCode: "91", flag: "🇮🇳", regexString: "^[6-9]\\d{9}$", example: "9876543210" },
  { name: "UAE", iso: "AE", dialCode: "971", flag: "🇦🇪", regexString: "^[1-9]\\d{8,9}$", example: "501234567" },
  { name: "Singapore", iso: "SG", dialCode: "65", flag: "🇸🇬", regexString: "^[6-9]\\d{7}$", example: "91234567" },
  { name: "South Africa", iso: "ZA", dialCode: "27", flag: "🇿🇦", regexString: "^[1-9]\\d{8,9}$", example: "721234567" },
  { name: "Brazil", iso: "BR", dialCode: "55", flag: "🇧🇷", regexString: "^[1-9]\\d{10,11}$", example: "11912345678" },
  { name: "Mexico", iso: "MX", dialCode: "52", flag: "🇲🇽", regexString: "^[1-9]\\d{10}$", example: "5512345678" },
  { name: "Japan", iso: "JP", dialCode: "81", flag: "🇯🇵", regexString: "^[1-9]\\d{9,10}$", example: "9012345678" },
  { name: "Cyprus", iso: "CY", dialCode: "357", flag: "🇨🇾", regexString: "^[1-9]\\d{7,8}$", example: "99123456" },
];

const DEFAULT_COUNTRY = COUNTRIES[0];

function getCountryByISO(iso) {
  return COUNTRIES.find((c) => c.iso === String(iso).toUpperCase()) || DEFAULT_COUNTRY;
}

function trimPhonePrefix(phone, dialCode) {
  if (!phone) return "";
  let clean = String(phone).replace(/[^0-9+]/g, "");
  if (clean.startsWith("+")) {
    if (clean.startsWith(`+${dialCode}`)) clean = clean.substring(String(dialCode).length + 1);
  } else if (clean.startsWith("00")) {
    if (clean.startsWith(`00${dialCode}`)) clean = clean.substring(String(dialCode).length + 2);
  }
  return clean.replace(/^0+/, "");
}

function formatPhoneForCRM(phone, dialCode) {
  const local = trimPhonePrefix(phone, dialCode);
  return `00${dialCode}${local}`;
}

function formatPhoneForBlob(phone, dialCode) {
  const local = trimPhonePrefix(phone, dialCode);
  return `+${dialCode}${local}`;
}

function validatePhone(phone, country) {
  const local = trimPhonePrefix(phone, country.dialCode);
  return new RegExp(country.regexString).test(local);
}

function parseName(fullName) {
  const parts = String(fullName || "Unknown").trim().split(" ");
  const first_name = parts.shift() || "Unknown";
  const last_name = parts.join(" ") || "";
  return { first_name, last_name };
}

function sanitizeString(input) {
  return String(input || "").trim().replace(/[<>]/g, "");
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

module.exports = {
  COUNTRIES,
  DEFAULT_COUNTRY,
  getCountryByISO,
  trimPhonePrefix,
  formatPhoneForCRM,
  formatPhoneForBlob,
  validatePhone,
  parseName,
  sanitizeString,
  validateEmail,
};
