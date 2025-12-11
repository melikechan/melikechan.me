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
import { TypographyHr } from "@/components/typography/hr";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
} from "@/components/typography/headings";
import {
  TypographyMuted,
  TypographyParagraph,
  TypographySmall,
} from "@/components/typography/paragraph";

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
      <TypographyH1>About</TypographyH1>
      <TypographyParagraph className="text-center">
        {person.intro}
      </TypographyParagraph>

      <Accordion
        type="single"
        className="flex flex-col gap-2 sm:gap-4 w-full md:max-w-3xl lg:max-w-4xl mx-auto"
        collapsible
      >
        <AccordionItem
          value="experience"
          className="rounded-lg border-0 shadow-md"
        >
          <AccordionTrigger className="text-2xl font-bold bg-primary/80 text-primary-foreground">
            Experience
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance mt-4">
            <Timeline
              items={person.experience.map((exp) => ({
                children: (
                  <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      {exp.icon && React.isValidElement(exp.icon) && (
                        <div className="flex-shrink-0">
                          {React.cloneElement(exp.icon, {
                            className: "w-12 h-12",
                          })}
                        </div>
                      )}

                      <TypographyH2 className="font-bold text-lg mb-1">
                        {exp.compName}
                      </TypographyH2>
                    </div>

                    {/* Positions */}
                    <div className="mt-4">
                      {exp.positions.map((pos, posIndex) => (
                        <div key={posIndex} className="mb-4 last:mb-0">
                          <TypographyH3 className="text-base mt-2">
                            {pos.posName}
                            {pos.type && (
                              <span className="text-sm ml-2">({pos.type})</span>
                            )}
                          </TypographyH3>
                          <TypographySmall>{pos.location}</TypographySmall>
                          <TypographyMuted className="text-xs mb-2">
                            {formatTimePeriod(
                              pos.dates.startDate,
                              pos.dates.endDate,
                              pos.dates.continue
                            )}
                          </TypographyMuted>
                          {pos.description && (
                            <div className="text-sm">{pos.description}</div>
                          )}

                          {pos.areas && pos.areas.length > 0 && (
                            <>
                              <TypographyH3 className="text-lg font-semibold mb-2 mt-4">
                                Areas:
                              </TypographyH3>
                              <ul className="flex flex-wrap items-center gap-2">
                                {pos.areas.map((area, areaIndex) => (
                                  <li key={areaIndex}>
                                    {area.tooltip ? (
                                      <HoverCard>
                                        <HoverCardTrigger asChild>
                                          <Badge className="px-2 py-2 text-xs font-bold">
                                            {area.name}
                                          </Badge>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-80">
                                          {area.tooltip}
                                        </HoverCardContent>
                                      </HoverCard>
                                    ) : (
                                      <Badge className="px-2 py-2 text-xs font-bold">
                                        {area.name}
                                      </Badge>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}

                          {pos.usedTechnologies &&
                            pos.usedTechnologies.length > 0 && (
                              <>
                                <TypographyH3 className="text-lg font-semibold mb-2 mt-4">
                                  Used Technologies:
                                </TypographyH3>
                                <ul className="flex flex-wrap items-center gap-2">
                                  {pos.usedTechnologies.map(
                                    (tech, techIndex) => (
                                      <li key={techIndex}>
                                        {tech.tooltip ? (
                                          <HoverCard>
                                            <HoverCardTrigger asChild>
                                              <Badge className="px-2 py-2 text-xs font-bold bg-primary-alt">
                                                {tech.name}
                                              </Badge>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-80">
                                              {tech.tooltip}
                                            </HoverCardContent>
                                          </HoverCard>
                                        ) : (
                                          <Badge className="px-2 py-2 text-xs font-bold bg-primary-alt">
                                            {tech.name}
                                          </Badge>
                                        )}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </>
                            )}

                          {posIndex < exp.positions.length - 1 && (
                            <TypographyHr />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              }))}
            />
          </AccordionContent>
        </AccordionItem>

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
                    {edu.icon && React.isValidElement(edu.icon) && (
                      <div className="flex-shrink-0">
                        {React.cloneElement(edu.icon, {
                          className: "w-12 h-12",
                        })}
                      </div>
                    )}

                    <div className="flex-grow">
                      <TypographyH2 className="font-bold text-lg my-1">
                        {edu.insName}
                      </TypographyH2>
                      <TypographyH3 className="text-md mt-0">
                        {edu.degree} in {edu.subject}
                      </TypographyH3>
                      <TypographyMuted className="mt-1 mb-2">
                        {formatTimePeriod(
                          edu.dates.startDate,
                          edu.dates.endDate,
                          edu.dates.continue
                        )}
                      </TypographyMuted>

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
                  <TypographyH3 className="text-xl mb-1">
                    {skillCategory.title}
                  </TypographyH3>

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
                          {interest.tooltip}
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

            <TypographyMuted className="text-center">
              (<span className="font-black">*</span>) I am currently learning
              about that field.
            </TypographyMuted>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
