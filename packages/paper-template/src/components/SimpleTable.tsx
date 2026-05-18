import { cn } from "@melikechan/ui/utils";
import type { ReactNode } from "react";

export interface Column {
  label: string;
  align?: "left" | "right" | "center";
}

interface SimpleTableProps {
  caption: ReactNode;
  columns: Column[];
  rows: string[][];
  className?: string;
}

const alignCls: Record<NonNullable<Column["align"]>, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

export function SimpleTable({
  caption,
  columns,
  rows,
  className,
}: SimpleTableProps) {
  return (
    <div className="overflow-x-auto my-6">
      <table className={cn("w-full border-collapse text-sm", className)}>
        <caption className="caption-bottom mt-3 text-sm text-muted-foreground text-left">
          {caption}
        </caption>
        <thead>
          <tr className="border-b-2 border-foreground">
            {columns.map(({ label, align = "left" }) => (
              <th
                key={label}
                className={cn("py-2 px-4 font-semibold", alignCls[align])}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, ri) => (
            <tr key={ri} className="border-b border-border">
              {cells.map((cell, ci) => (
                <td
                  key={ci}
                  className={cn(
                    "py-1.5 px-4",
                    alignCls[columns[ci]?.align ?? "left"],
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
