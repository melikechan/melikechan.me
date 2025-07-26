import { TypographyUnorderedList } from "@/components/typography/list";
import { TypographyMuted } from "@/components/typography/paragraph";
import {
  SiPython,
  SiPytorch,
  SiCmake,
  SiCplusplus,
  SiKeras,
  SiTensorflow,
} from "@icons-pack/react-simple-icons";

export const techGlossary = {
  areas: {
    compVision: {
      name: "Computer Vision",
      tooltip: (
        <>
          <>
            <TypographyMuted>
              Computer vision involves equipping computers with the ability to
              "see" and interpret the visual world. Key aspects include:
            </TypographyMuted>
            <TypographyUnorderedList className="text-sm text-muted-foreground my-0 mt-4">
              <li>
                Methods for acquiring, processing, analyzing, and understanding
                digital images.
              </li>
              <li>
                Extraction of high-dimensional data from the real world to
                produce numerical or symbolic information (e.g., decisions).
              </li>
              <li>
                Transforming visual images into descriptions of the world that
                enable thought processes and appropriate action, often achieved
                by processing symbolic information from image data using models.
              </li>
            </TypographyUnorderedList>
          </>
        </>
      ),
    },
    perception: {
      name: "Machine Perception",
      tooltip: (
        <>
          <TypographyMuted>
            Machine perception equips computer systems with the ability to
            interpret data in a manner similar to human sensory experience. Key
            aspects and advancements include:
          </TypographyMuted>
          <TypographyUnorderedList className="text-sm text-muted-foreground my-0 mt-4">
            <li>Processing sensory input akin to humans.</li>
            <li>
              Enabling computers to gather information with greater accuracy and
              present it more comfortably to the user.
            </li>
            <li>
              Encompassing fields like computer vision, machine hearing, machine
              touch, and machine smelling.
            </li>
            <li>
              The ultimate goal is to allow machines to see, feel, and perceive
              the world like humans, enabling them to explain decisions, warn of
              failures, and articulate reasons for those failures.
            </li>
          </TypographyUnorderedList>
        </>
      ),
    },
    deepLearning: {
      name: "Deep Learning",
      tooltip: (
        <>
          <TypographyMuted>
            Deep learning is a subfield of machine learning that focuses on
            utilizing multilayered neural networks. Key characteristics include:
          </TypographyMuted>
          <TypographyUnorderedList className="text-sm text-muted-foreground my-0 mt-4">
            <li>
              Performing tasks such as classification, regression, and
              representation learning.
            </li>
            <li>
              Drawing inspiration from biological neuroscience by stacking
              artificial neurons into multiple layers.
            </li>
            <li>
              The "deep" aspect refers to networks having three to several
              hundred or thousands of layers.
            </li>
            <li>
              Methods used can be supervised, semi-supervised, or unsupervised.
            </li>
          </TypographyUnorderedList>
        </>
      ),
    },
  },
  progLangs: {
    python: {
      name: "Python",
      tooltip: (
        <>
          <div className="flex items-center space-x-2 mb-2">
            <SiPython className="text-[#3776AB] dark:text-foreground w-6 h-6" />{" "}
            <a
              href="https://www.python.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              Python
            </a>
          </div>
          <TypographyMuted>
            Python is a high-level, general-purpose programming language that
            offers:
          </TypographyMuted>
          <TypographyUnorderedList className="text-sm text-muted-foreground my-0 mt-4">
            <li>Dynamic type-checking</li>
            <li>Automatic garbage collection</li>
            <li>Support for multiple programming paradigms</li>
            <li>
              Emphasis on code readability through significant indentation
            </li>
          </TypographyUnorderedList>
        </>
      ),
    },
    cpp: {
      name: "C++",
      tooltip: (
        <>
          <div className="flex items-center space-x-2 mb-2">
            <SiCplusplus className="text-[#00599C] dark:text-foreground w-6 h-6" />{" "}
            <a
              href="https://isocpp.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              C++
            </a>
          </div>
          <TypographyMuted>
            C++ is a high-level, general-purpose programming language that
            offers:
          </TypographyMuted>
          <TypographyUnorderedList className="text-sm text-muted-foreground my-0 mt-4">
            <li>Object-oriented (OOP) features, expanding on the C language</li>
            <li>
              Functional features and low-level memory manipulation facilities
            </li>
            <li>Support for generic programming through templates</li>
            <li>
              Implementation as a compiled language with various vendor
              compilers
            </li>
            <li>
              Design highlights include performance, efficiency, flexibility,
              and use in systems programming, embedded software, and large
              systems
            </li>
          </TypographyUnorderedList>
        </>
      ),
    },
  },
  buildTools: {
    cmake: {
      name: "CMake",
      tooltip: (
        <>
          <div className="flex items-center space-x-2 mb-2">
            <SiCmake className="text-[#064F8C] dark:text-foreground w-6 h-6" />{" "}
            <a
              href="https://cmake.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              CMake
            </a>
          </div>
          <TypographyMuted>
            CMake is a free, cross-platform software development tool that:
          </TypographyMuted>
          <TypographyUnorderedList className="text-sm text-muted-foreground my-0 mt-4">
            <li>Builds applications via compiler-independent instructions</li>
            <li>Can automate testing, packaging, and installation</li>
            <li>
              Runs on a variety of platforms and supports many programming
              languages
            </li>
            <li>
              As a meta-build tool, it configures native build tools and
              generates configuration files for them based on CMake-specific
              files, allowing a single set of configurations to be used across
              multiple platforms
            </li>
          </TypographyUnorderedList>
        </>
      ),
    },
  },
  frameworks: {
    pytorch: {
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
          <TypographyMuted>
            Pytorch is a Python package that provides two high-level features:
          </TypographyMuted>
          <TypographyUnorderedList className="text-sm text-muted-foreground my-0 mt-4">
            <li>
              Tensor computation (like NumPy) with strong GPU acceleration
            </li>
            <li>Deep neural networks built on a tape-based autograd system</li>
          </TypographyUnorderedList>
        </>
      ),
    },
    keras: {
      name: "Keras",
      tooltip: (
        <>
          <div className="flex items-center space-x-2 mb-2">
            <SiKeras className="text-[#D00000] dark:text-foreground w-6 h-6" />{" "}
            <a
              href="https://keras.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              Keras
            </a>
          </div>
          <>
            <TypographyMuted>
              Keras is a multi-backend deep learning framework that provides:
            </TypographyMuted>
            <TypographyUnorderedList className="text-sm text-muted-foreground my-0 mt-4">
              <li>
                Support for JAX, TensorFlow, PyTorch, and OpenVINO (for
                inference-only)
              </li>
              <li>
                Effortless model building and training for various applications
              </li>
            </TypographyUnorderedList>
          </>
        </>
      ),
    },
    tensorflow: {
      name: "Tensorflow",
      tooltip: (
        <>
          <div className="flex items-center space-x-2 mb-2">
            <SiTensorflow className="text-[#FF6F00] dark:text-foreground w-6 h-6" />{" "}
            <a
              href="https://tensorflow.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              TensorFlow
            </a>
          </div>
          <TypographyMuted>
            TensorFlow is a free and open-source software library for machine
            learning and artificial intelligence, developed by the Google Brain
            team. It serves as an end-to-end platform for machine learning and
            offers:
          </TypographyMuted>
          <TypographyUnorderedList className="text-sm text-muted-foreground my-0 mt-4">
            <li>
              Primary use for training and inference of neural networks across a
              range of tasks.
            </li>
            <li>
              Support for various programming languages including Python
              (primary front-end API), JavaScript, C++, and Java.
            </li>
            <li>
              A comprehensive, flexible ecosystem of tools, libraries, and
              community resources.
            </li>
            <li>
              Features to assist with all stages of the machine learning
              process, from data preparation to model deployment.
            </li>
            <li>
              Compatibility with Keras for building machine learning models.
            </li>
          </TypographyUnorderedList>
        </>
      ),
    },
  },
};
