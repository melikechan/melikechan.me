const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="flex justify-center items-center py-4 w-full px-4 bg-background border-t">
      <p className="text-center text-xs text-muted-foreground">
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
