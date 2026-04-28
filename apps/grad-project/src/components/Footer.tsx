export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex justify-center items-center py-4 w-full px-4 bg-background border-t text-sm text-muted-foreground">
      <p className="text-center text-xs text-muted-foreground py-4">
        Project page design by{" "}
        <a
          href="https://melikechan.me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-bold underline underline-offset-2 hover:text-primary-alt transition-colors"
        >
          Melike Vurucu
        </a>{" "}
        in {year}. Inspired by{" "}
        <a
          href="https://github.com/eliahuhorwitz/Academic-project-page-template"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-bold underline underline-offset-2 hover:text-primary-alt transition-colors"
        >
          Academic Project Page Template
        </a>{" "}
        and{" "}
        <a
          href="https://cvpr.thecvf.com/Conferences/2025/AcceptedPapers"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-bold underline underline-offset-2 hover:text-primary-alt transition-colors"
        >
          CVPR 2025
        </a>{" "}
        project pages.
      </p>
    </footer>
  );
}
