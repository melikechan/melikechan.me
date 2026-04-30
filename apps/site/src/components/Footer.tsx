const START_YEAR = 2024;
const currentYear = new Date().getFullYear();
const yearLabel =
  currentYear === START_YEAR
    ? `${START_YEAR}`
    : `${START_YEAR} – ${currentYear}`;

export default function Footer() {
  return (
    <footer className="flex justify-center items-center mt-4 py-4 w-full px-4 bg-background">
      made with love 🤍 by melikechan | {yearLabel}
    </footer>
  );
}
