import {
  SiGithub,
  SiKaggle,
  SiOrcid,
  SiTuta,
} from "@icons-pack/react-simple-icons";
import Linkedin from "@/icons/linkedin.svg";
import AnkaraUni from "@/icons/education/ankara-uni.svg";
import Getir from "@/icons/experience/getir.svg";

import { techGlossary } from "@/utils/glossary";
import { TypographyUnorderedList } from "@/components/typography/list";
import {
  TypographyLink,
  TypographyParagraph,
} from "@/components/typography/paragraph";

import { dateListSort } from "./date";

const person = {
  fullname: "Melike Vurucu",
  nickname: "melikechan",
  title: (
    <>
      undergraduate researcher/computer engineering student{" "}
      <TypographyLink
        key="uni-link"
        href="https://ankara.edu.tr/"
        target="_blank"
        rel="noopener noreferrer"
      >
        @ankara university
      </TypographyLink>
    </>
  ),
  intro: (
    <>
      I am currently a <b>senior</b> in computer engineering at Ankara
      University. <br />I am interested in deep learning and computer vision,
      would like to work as a research scientist in the future.
    </>
  ),
  links: {
    linkedin: {
      href: "https://www.linkedin.com/in/melikechan",
      title: "LinkedIn",
      icon: <Linkedin />,
      featured: true,
      contact: true,
    },
    github: {
      href: "https://github.com/melikechan",
      title: "Github",
      icon: <SiGithub />,
      featured: true,
      contact: false,
    },
    kaggle: {
      href: "https://www.kaggle.com/melikechan",
      title: "Kaggle",
      icon: <SiKaggle />,
      featured: true,
      contact: false,
    },
    orcid: {
      href: "https://orcid.org/0009-0002-6359-9519",
      title: "ORCID",
      icon: <SiOrcid />,
      featured: true,
      contact: false,
    },
  },
  education: [
    {
      insName: "Ankara University",
      icon: <AnkaraUni />,
      degree: "Bachelor's Degree",
      subject: "Computer Engineering",
      dates: {
        startDate: new Date("2022-09-21"),
        endDate: new Date("2026-06-19"), // It can be null if end date is unknown
        continue: true,
      },
      gpa: {
        cgpa: 3.74,
        scale: 4.0,
      },
    },
  ],
  experience: [
    {
      compName: "Getir",
      icon: <Getir />,
      positions: [
        {
          posName: "Software Engineering Intern",
          type: "Part-time",
          location: "Ankara, Türkiye",
          dates: {
            startDate: new Date("2024-12-13"),
            endDate: new Date("2025-09-30"), // It can be null if end date is unknown
            continue: false,
          },
          description: (
            <>
              <TypographyUnorderedList className="text-sm">
                <li>
                  Involved in providing accurate and flexible routing, distance,
                  and duration services by utilizing map-related data and
                  routing engines, impacting millions of end-users and thousands
                  of couriers.
                </li>
                <li>
                  Improved service reliability by implementing key stability
                  logic for the distance/duration calculation, significantly
                  reducing prediction anomalies.
                </li>
                <li>
                  Mostly used Python as the main programming language, also
                  having some exposure to Go.
                </li>
                <li>
                  Utilized data visualization libraries like Seaborn to
                  visualize data for making interpretations.
                </li>
              </TypographyUnorderedList>
            </>
          ),
          areas: [],
          usedTechnologies: [techGlossary.progLangs.python],
        },
      ],
    },
    {
      compName: "Ankara University",
      icon: <AnkaraUni />,
      positions: [
        {
          posName: "Undergraduate Researcher",
          type: "Part-time",
          location: "Ankara, Türkiye",
          dates: {
            startDate: new Date("2024-05-15"),
            endDate: null, // It can be null if end date is unknown
            continue: true,
          },
          description: (
            <>
              <TypographyUnorderedList className="text-sm">
                <li>Working on a domain-specific image segmentation task.</li>
              </TypographyUnorderedList>
              <TypographyParagraph className="text-sm">
                Working in a research group (size of 2, contains another{" "}
                <i>undergraduate</i> student) under{" "}
                <TypographyLink
                  href="https://scholar.google.com/citations?user=8LKy_XoAAAAJ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Asst. Prof. Dr. Merve Özkan
                </TypographyLink>
                .
              </TypographyParagraph>
            </>
          ),
          areas: [
            techGlossary.areas.compVision,
            techGlossary.areas.deepLearning,
          ],
          usedTechnologies: [
            techGlossary.frameworks.pytorch,
            techGlossary.progLangs.python,
          ],
        },
      ],
    },
  ],
  skills: [
    {
      title: "Programming Languages",
      elements: [techGlossary.progLangs.python, techGlossary.progLangs.cpp],
    },
    {
      title: "Build Tools",
      elements: [techGlossary.buildTools.cmake],
    },
    {
      title: "Frameworks/Libraries",
      elements: [
        techGlossary.frameworks.pytorch,
        techGlossary.frameworks.keras,
        techGlossary.frameworks.tensorflow,
      ],
    },
  ],
  interests: [
    { ...techGlossary.areas.compVision, stillLearning: true },
    { ...techGlossary.areas.deepLearning, stillLearning: true },
    { ...techGlossary.areas.perception, stillLearning: true },
  ],
};

person.experience.sort((a, b) =>
  dateListSort(a.positions[0]?.dates, b.positions[0]?.dates)
);

person.education.sort((a, b) => date(a.dates, b.dates));

export default person;
