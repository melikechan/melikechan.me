import React from "react";

import Timeline from "@/components/Timeline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Badge } from "@/components/ui/badge";

import person from "@/utils/person";
import { formatTimePeriod } from "@/utils/date";

export async function generateMetadata() {
  return {
    title: "About",
    description: "About melikechan.",

    openGraph: {
      title: "About",
      description: "About melikechan.",
    },
  };
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center gap-6 mt-2 mx-1 animate-fade-in">
      <h1 className="text-4xl font-bold">About</h1>
      <p className="text-lg text-center">{person.intro}</p>

      <Accordion
        type="single"
        className="flex flex-col gap-2 sm:gap-4 w-full md:max-w-3xl lg:max-w-4xl mx-auto"
        collapsible
      >
        <AccordionItem
          value="education"
          className="rounded-lg border-0 shadow-md"
        >
          <AccordionTrigger className="text-2xl font-bold bg-primary/80 text-primary-foreground">
            Education
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance mt-4">
            <Timeline
              items={person.education.map((edu) => ({
                children: (
                  <>
                    {/* Icon */}
                    {edu.icon && React.isValidElement(edu.icon) && (
                      <div className="flex-shrink-0">
                        {React.cloneElement(edu.icon, {
                          className: "w-12 h-12",
                        })}
                      </div>
                    )}

                    {/* Details */}
                    <div className="flex-grow">
                      <h2 className="font-bold text-lg text-primary-text mb-1">
                        {edu.insName}
                      </h2>
                      <h3 className="text-secondary-text mb-1">
                        {edu.degree} in {edu.subject}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {formatTimePeriod(
                          edu.dates.startDate,
                          edu.dates.endDate,
                          edu.dates.continue
                        )}
                      </p>

                      {/* GPA */}
                      {edu.gpa && (
                        <Badge className="text-sm">
                          <span className="font-bold">GPA:</span>{" "}
                          {edu.gpa.cgpa.toFixed(2)} / {edu.gpa.scale.toFixed(2)}
                        </Badge>
                      )}
                    </div>
                  </>
                ),
              }))}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills" className="rounded-lg border-0 shadow-md">
          <AccordionTrigger className="text-2xl font-bold bg-primary/80 text-primary-foreground">
            Skills
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance mt-4">
            {Object.values(person.skills).map(
              (skillCategory, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {skillCategory.title}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {skillCategory.elements.map((skill) => (
                      <li key={skill.name}>
                        {skill.tooltip ? (
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <Badge>{skill.name}</Badge>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                              {skill.tooltip}
                            </HoverCardContent>
                          </HoverCard>
                        ) : (
                          <Badge>{skill.name}</Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="interested-areas"
          className="rounded-lg border-0 shadow-md"
        >
          <AccordionTrigger className="text-2xl font-bold bg-primary/80 text-primary-foreground">
            Interested Areas
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance mt-4">
            <ul className="flex flex-wrap items-center justify-center gap-2 ">
              {Object.values(person.interests).map(
                (interest, interestIndex) => (
                  <li key={interestIndex}>
                    {interest.tooltip ? (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Badge>
                            {interest.name}
                            {interest.stillLearning && "*"}
                          </Badge>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <p>{interest.tooltip}</p>
                        </HoverCardContent>
                      </HoverCard>
                    ) : (
                      <Badge>
                        {interest.name}
                        {interest.stillLearning && "*"}
                      </Badge>
                    )}
                  </li>
                )
              )}
            </ul>

            <p className="text-sm text-center text-muted-foreground mt-2">
              (<span className="font-black">*</span>) I am currently learning
              about that field.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
