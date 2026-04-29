import { Button } from "@melikechan/ui";

interface HeroSocialButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function HeroSocialButton({
  href,
  children,
}: HeroSocialButtonProps) {
  return (
    <Button
      variant="gradient_x"
      size="icon"
      className="text-primary-foreground h-10 w-12 [&_svg]:w-6 [&_svg]:h-6"
      asChild
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Button>
  );
}
