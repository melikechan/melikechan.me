import { cn } from "@melikechan/ui/utils";
import type { ReactNode } from "react";

// "hi" = column-best (blue ↑), "lo" = column-worst (red ↓), "" = default
export type CellVariant = "hi" | "lo" | "";
export type Cell = [string, CellVariant];
export type EvalRow = [string, ...Cell[][]];

const variantCls: Record<CellVariant, string> = {
  hi: "text-blue-600 dark:text-blue-400 font-semibold",
  lo: "text-red-600 dark:text-red-400",
  "": "",
};

const variantArrow: Record<CellVariant, string> = {
  hi: "↑",
  lo: "↓",
  "": "",
};

interface EvaluationTableProps {
  caption: ReactNode;
  rowLabel?: string;
  groups: string[];
  metrics: readonly string[];
  rows: EvalRow[];
  footnote?: string;
}

export function EvaluationTable({
  caption,
  rowLabel = "Model Name",
  groups,
  metrics,
  rows,
  footnote,
}: EvaluationTableProps) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm">
        <caption className="caption-bottom mt-3 text-sm text-muted-foreground text-left">
          {caption}
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 pr-4 font-semibold" rowSpan={2}>
              {rowLabel}
            </th>
            {groups.map((label) => (
              <th
                key={label}
                className="text-center py-1 px-2 font-semibold border-l border-border"
                colSpan={metrics.length}
              >
                {label}
              </th>
            ))}
          </tr>
          <tr className="border-b-2 border-foreground">
            {groups.flatMap((_, gi) =>
              metrics.map((h, ci) => (
                <th
                  key={`${gi}-${ci}`}
                  className={cn(
                    "text-center py-1 px-2 font-medium text-muted-foreground",
                    ci === 0 && "border-l border-border",
                  )}
                >
                  {h}
                </th>
              )),
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map(([model, ...cellGroups], ri) => (
            <tr key={ri} className="border-b border-border">
              <td className="py-1.5 pr-4 whitespace-nowrap">{model}</td>
              {cellGroups.flatMap((group, gi) =>
                group.map(([val, variant], ci) => (
                  <td
                    key={`${gi}-${ci}`}
                    className={cn(
                      "text-center py-1.5 px-2",
                      ci === 0 && "border-l border-border",
                      variantCls[variant],
                    )}
                  >
                    {val}{variantArrow[variant]}
                  </td>
                )),
              )}
            </tr>
          ))}
        </tbody>
        {footnote && (
          <tfoot>
            <tr>
              <td
                colSpan={1 + groups.length * metrics.length}
                className="pt-2 text-xs text-muted-foreground italic"
              >
                {footnote}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
