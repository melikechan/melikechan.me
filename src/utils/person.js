import {
  SiGithub,
  SiKaggle,
  SiOrcid,
  SiPytorch,
  SiTuta,
} from "@icons-pack/react-simple-icons";
import Linkedin from "@/icons/linkedin.svg";
import AnkaraUni from "@/icons/education/ankara-uni.svg";

const person = {
  fullname: "Melike Vurucu",
  nickname: "melikechan",
  title: (
    <>
      swe intern{" "}
      <a
        key="company-link"
        href="https://getir.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline transition underline-offset-2 hover:no-underline hover:text-primary"
      >
        @getir
      </a>
      , undergraduate researcher/computer engineering student{" "}
      <a
        key="uni-link"
        href="https://ankara.edu.tr/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline transition underline-offset-2 hover:no-underline hover:text-primary"
      >
        @ankara university
      </a>
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
    mail: {
      href: "mailto:melikechan@tuta.io",
      title: "melikechan[at]tuta.io",
      icon: <SiTuta />,
      featured: false,
      contact: true,
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
  experience: [],
  skills: [
    {
      title: "Programming Languages",
      elements: [
        {
          name: "Python",
        },
        {
          name: "C++",
        },
      ],
    },
    {
      title: "Build Tools",
      elements: [
        {
          name: "CMake",
        },
      ],
    },
    {
      title: "Frameworks/Libraries",
      elements: [
        {
          name: "PyTorch",
          tooltip: (
            <>
              <div className="flex items-center space-x-2 mb-2">
                <SiPytorch className="text-[#EE4C2C] dark:text-foreground w-6 h-6" />{" "}
                <a
                  href="https://pytorch.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:underline"
                >
                  PyTorch
                </a>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                is a Python package that provides two high-level features:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                <li className="mb-1">
                  Tensor computation (like NumPy) with strong GPU acceleration
                </li>
                <li>
                  Deep neural networks built on a tape-based autograd system
                </li>
              </ul>
            </>
          ),
        },
        {
          name: "Keras",
          tooltip: "Deep Learning",
        },
        {
          name: "Tensorflow",
          tooltip: "Deep Learning",
        },
      ],
    },
  ],
  interests: [
    { name: "Computer Vision", stillLearning: true },
    { name: "Machine Perception", stillLearning: true },
    { name: "Deep Learning", stillLearning: true },
  ],
};

export default person;
