export interface CountryConfig {
  name: string;
  iso: string;
  dialCode: string;
  flag: string;
  regex: RegExp;
  example: string;
}

export const COUNTRIES: CountryConfig[] = [
  { name: "Switzerland", iso: "CH", dialCode: "41", flag: "🇨🇭", regex: /^[1-9]\d{8}$/, example: "791234567" },
  { name: "France", iso: "FR", dialCode: "33", flag: "🇫🇷", regex: /^[1-9]\d{8}$/, example: "612345678" },
  { name: "Belgium", iso: "BE", dialCode: "32", flag: "🇧🇪", regex: /^[1-9]\d{8,9}$/, example: "470123456" },
  { name: "Canada", iso: "CA", dialCode: "1", flag: "🇨🇦", regex: /^[2-9]\d{9}$/, example: "4165551234" },
  { name: "USA", iso: "US", dialCode: "1", flag: "🇺🇸", regex: /^[2-9]\d{9}$/, example: "2125551234" },
  { name: "UK", iso: "GB", dialCode: "44", flag: "🇬🇧", regex: /^[1-9]\d{9,10}$/, example: "7911123456" },
  { name: "Germany", iso: "DE", dialCode: "49", flag: "🇩🇪", regex: /^[1-9]\d{10,11}$/, example: "15123456789" },
  { name: "Spain", iso: "ES", dialCode: "34", flag: "🇪🇸", regex: /^[1-9]\d{8}$/, example: "612345678" },
  { name: "Italy", iso: "IT", dialCode: "39", flag: "🇮🇹", regex: /^[1-9]\d{9,10}$/, example: "3331234567" },
  { name: "Netherlands", iso: "NL", dialCode: "31", flag: "🇳🇱", regex: /^[1-9]\d{8,9}$/, example: "612345678" },
  { name: "Sweden", iso: "SE", dialCode: "46", flag: "🇸🇪", regex: /^[1-9]\d{7,9}$/, example: "701234567" },
  { name: "Australia", iso: "AU", dialCode: "61", flag: "🇦🇺", regex: /^[1-9]\d{8,9}$/, example: "412345678" },
  { name: "India", iso: "IN", dialCode: "91", flag: "🇮🇳", regex: /^[6-9]\d{9}$/, example: "9876543210" },
  { name: "UAE", iso: "AE", dialCode: "971", flag: "🇦🇪", regex: /^[1-9]\d{8,9}$/, example: "501234567" },
  { name: "Singapore", iso: "SG", dialCode: "65", flag: "🇸🇬", regex: /^[6-9]\d{7}$/, example: "91234567" },
  { name: "South Africa", iso: "ZA", dialCode: "27", flag: "🇿🇦", regex: /^[1-9]\d{8,9}$/, example: "721234567" },
  { name: "Brazil", iso: "BR", dialCode: "55", flag: "🇧🇷", regex: /^[1-9]\d{10,11}$/, example: "11912345678" },
  { name: "Mexico", iso: "MX", dialCode: "52", flag: "🇲🇽", regex: /^[1-9]\d{10}$/, example: "5512345678" },
  { name: "Japan", iso: "JP", dialCode: "81", flag: "🇯🇵", regex: /^[1-9]\d{9,10}$/, example: "9012345678" },
  { name: "Cyprus", iso: "CY", dialCode: "357", flag: "🇨🇾", regex: /^[1-9]\d{7,8}$/, example: "99123456" },
];

export const DEFAULT_COUNTRY = COUNTRIES[0];

export const getCountryByISO = (iso: string): CountryConfig => {
  return COUNTRIES.find((c) => c.iso === iso.toUpperCase()) || DEFAULT_COUNTRY;
};

export const trimPhonePrefix = (phone: string, dialCode: string): string => {
  if (!phone) return "";
  let clean = phone.replace(/[^0-9+]/g, "");
  if (clean.startsWith("+")) {
    if (clean.startsWith(`+${dialCode}`)) clean = clean.substring(dialCode.length + 1);
  } else if (clean.startsWith("00")) {
    if (clean.startsWith(`00${dialCode}`)) clean = clean.substring(dialCode.length + 2);
  }
  return clean.replace(/^0+/, "");
};

export const formatPhoneForCRM = (phone: string, dialCode: string): string => {
  const local = trimPhonePrefix(phone, dialCode);
  return `00${dialCode}${local}`;
};

export const formatPhoneForBlob = (phone: string, dialCode: string): string => {
  const local = trimPhonePrefix(phone, dialCode);
  return `+${dialCode}${local}`;
};

export const validatePhone = (phone: string, country: CountryConfig): boolean => {
  const local = trimPhonePrefix(phone, country.dialCode);
  return country.regex.test(local);
};

export const formatPhoneDisplay = (phone: string, country: CountryConfig): string => {
  const local = trimPhonePrefix(phone, country.dialCode);
  if (!local) return "";
  return `+${country.dialCode} ${local.replace(/(\d{3})(\d{1,3})?(\d{1,4})?/, (m, a, b, c) => [a, b, c].filter(Boolean).join(" ")).trim()}`;
};

export const getPhoneErrorMessage = (country: CountryConfig): string => {
  return `Please enter a valid phone number. Example: +${country.dialCode} ${country.example}`;
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

export const sanitizeString = (input: string): string => {
  return (input || "").toString().trim().replace(/[<>]/g, "");
};
