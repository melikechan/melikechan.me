export default function Navbar() {
  const now = new Date();
  const year = now.getFullYear();
  let yearString = year.toString();
  if (year !== 2024) {
    yearString = `2024 - ${yearString}`;
  }
  return (
    <footer className="flex justify-center items-center py-4 w-full px-4">
      made with love 🤍 by melikechan | {yearString}
    </footer>
  );
}