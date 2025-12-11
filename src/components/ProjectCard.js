import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  Card,
  CardContent,
  CardDescription, // Still useful for specific description styling if needed
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardAction } from "@/components/ui/card"; // Ensure this is correctly imported and available in your shadcn setup
import { TypographyH3 } from "./typography/headings";
import { TypographyMuted } from "./typography/paragraph";

export default function ProjectCard({
  title,
  img,
  description,
  progress,
  href,
  tags,
}) {
  return (
    <Card className="flex flex-col items-center justify-between space-y-2 sm:space-y-3 md:space-y-4 h-full w-full sm:max-w-xs md:max-w-sm lg:max-w-80 xl:max-w-96 shadow-md p-3 sm:p-4 rounded-lg">
      <CardHeader className="flex flex-col items-center w-full mb-0 sm:mb-1">
        <CardTitle className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-alt text-balance mb-2 text-center">
          {title}
        </CardTitle>
        {img && (
          <div className="relative w-full h-24 sm:h-32 md:h-36 lg:h-40">
            <Image
              src={img}
              alt={title}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-md"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center gap-2 w-full flex-grow">
        {description && (
          <CardDescription className="text-lg">{description}</CardDescription>
        )}

        {progress && (
          <div className="w-full">
            <Progress value={progress} />
            <TypographyMuted className="mt-1">{progress}% completed.</TypographyMuted>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-3 w-full pt-3">
        {href && (
          <CardAction className="w-full">
            <Button variant="gradient_x" asChild className="w-full">
              <a href={href} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </Button>
          </CardAction>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-col items-center gap-3 w-full">
            <TypographyH3 className="text-lg mt-2">
              Used Technologies
            </TypographyH3>
            <div className="flex flex-row items-center justify-center flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index}>{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
