import type { ReactNode } from "react";

interface TimelineItem {
  children?: ReactNode;
  [key: string]: unknown;
}

interface TimelineProps {
  items: TimelineItem[];
  lineColor?: string;
  dotColor?: string;
  renderItemContent?: (item: TimelineItem) => ReactNode;
}

function Timeline({
  items,
  lineColor = "bg-primary",
  dotColor = "bg-primary",
  renderItemContent = ({ children: itemChildren }) => (
    <article className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-card rounded-lg border border-primary/20 shadow-sm text-wrap">
      {itemChildren as ReactNode}
    </article>
  ),
}: TimelineProps) {
  if (!items || !Array.isArray(items)) {
    console.error(
      "Timeline component requires an 'items' prop which must be an array.",
    );
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="relative">
        <div
          className={`absolute w-0.5 h-full ${lineColor} top-2 left-5 -translate-x-1/2 sm:left-1/2`}
        ></div>

        <div className="space-y-12 sm:space-y-0">
          {items.map((item, index) => (
            <div key={index} className="sm:mb-12">
              <div className="sm:hidden relative">
                <div
                  className={`absolute w-4 h-4 rounded-full ${dotColor} left-5 -translate-x-1/2 top-1 z-10 border-4 border-background`}
                ></div>
                <div className="ml-12 pt-0.5">{renderItemContent(item)}</div>
              </div>

              <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-x-8 items-center">
                {index % 2 === 0 ? renderItemContent(item) : <div></div>}

                <div className="flex justify-center">
                  <div
                    className={`relative w-4 h-4 rounded-full ${dotColor} z-10 border-4 border-background`}
                  ></div>
                </div>

                {index % 2 !== 0 ? renderItemContent(item) : <div></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
