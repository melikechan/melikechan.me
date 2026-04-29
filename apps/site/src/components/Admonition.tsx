import { Card, CardHeader, CardTitle, CardContent, cn } from "@melikechan/ui";

interface AdmonitionVariant {
  title: string;
  iconName: string;
  color: string;
  border: string;
}

const VARIANTS: Record<string, AdmonitionVariant> = {
  note: {
    title: "Note",
    iconName: "info",
    color: "text-blue-600 dark:text-blue-400",
    border: "border-l-blue-600 dark:border-l-blue-400",
  },
  tip: {
    title: "Tip",
    iconName: "lightbulb",
    color: "text-emerald-600 dark:text-emerald-400",
    border: "border-l-emerald-600 dark:border-l-emerald-400",
  },
  important: {
    title: "Important",
    iconName: "label_important",
    color: "text-purple-600 dark:text-purple-400",
    border: "border-l-purple-600 dark:border-l-purple-400",
  },
  warning: {
    title: "Warning",
    iconName: "warning",
    color: "text-amber-600 dark:text-amber-400",
    border: "border-l-amber-600 dark:border-l-amber-400",
  },
  caution: {
    title: "Caution",
    iconName: "dangerous",
    color: "text-red-600 dark:text-red-400",
    border: "border-l-red-600 dark:border-l-red-400",
  },
};

interface AdmonitionProps {
  type?: keyof typeof VARIANTS;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Admonition({
  type = "note",
  title,
  children,
  className,
}: AdmonitionProps) {
  const config = VARIANTS[type] ?? VARIANTS.note;

  return (
    <Card
      className={cn(
        "border-l-4 border-r-0 border-t-0 border-b-0 shadow-sm rounded-none gap-2",
        config.border,
        className,
      )}
    >
      <CardHeader className="px-4">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "material-symbols-outlined text-[20px]",
              config.color,
            )}
          >
            {config.iconName}
          </span>
          <CardTitle className={cn("text-base font-semibold", config.color)}>
            {title || config.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-sm sm:text-base opacity-90 px-4">
        {children}
      </CardContent>
    </Card>
  );
}
