import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { COUNTRIES, type CountryConfig } from "@/lib/countries";
import { cn } from "@/lib/utils";

interface CountryDropdownProps {
  value: CountryConfig;
  onChange: (c: CountryConfig) => void;
  error?: string;
  className?: string;
}

export default function CountryDropdown({ value, onChange, error, className }: CountryDropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.iso.toLowerCase().includes(query.toLowerCase()) ||
      String(c.dialCode).includes(query),
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
    setActiveIndex(0);
  }, [open]);

  const handleKey = (e: KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIndex]) {
        onChange(filtered[activeIndex]);
        setOpen(false);
        setQuery("");
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <div ref={rootRef} className={cn("relative w-full", className)} onKeyDown={handleKey}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-md border bg-background px-3 py-2 text-sm transition-all",
          "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent/50",
          "hover:border-accent/40",
          error ? "border-destructive/50 focus:ring-destructive/40" : "border-input",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg leading-none">{value.flag}</span>
          <span className="font-body text-foreground">{value.name}</span>
          <span className="font-body text-xs text-muted-foreground">+{value.dialCode}</span>
        </span>
        <ChevronDown
          size={16}
          className={cn("text-muted-foreground transition-transform", open && "rotate-180 text-accent")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute z-50 left-0 right-0 mt-2 overflow-hidden rounded-lg border border-border bg-card/95 backdrop-blur-xl shadow-xl glass-effect"
            role="listbox"
            style={{ background: "hsl(var(--card) / 0.95)", backdropFilter: "blur(20px)" }}
          >
            <div className="border-b border-border/60 p-2">
              <div className="flex items-center gap-2 rounded-md bg-muted/40 px-3 py-2">
                <Search size={14} className="text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search country or code..."
                  className="w-full bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <div className="px-4 py-6 font-body text-center text-sm text-muted-foreground">No countries found</div>
              ) : (
                filtered.map((c, i) => (
                  <button
                    key={c.iso}
                    type="button"
                    role="option"
                    aria-selected={value.iso === c.iso}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => {
                      onChange(c);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition-colors",
                      i === activeIndex ? "bg-accent/10" : "hover:bg-accent/5",
                      value.iso === c.iso && "text-accent",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg leading-none">{c.flag}</span>
                      <span className="font-body text-foreground">{c.name}</span>
                    </span>
                    <span className="font-body text-xs text-muted-foreground">+{c.dialCode}</span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
