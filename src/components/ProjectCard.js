import Button from "./Button";
import Image from "next/image";
import Tag from "./Tag";

export default function ProjectCard({ title, ...props }) {
  return (
    <section className="flex flex-col items-center justify-center space-y-4 h-full max-w-80 shadow-md p-4 rounded-lg">
      <h1 className="text-2xl text-center text-balance font-bold bg-clip-text text-transparent bg-gradient-to-r from-melikechan-gold to-melikechan-pink dark:from-melikechan-purple dark:to-melikechan-blue">
        {title}
      </h1>
      {props.img &&
        <Image src={props.img} alt={title} width={240} height={80} />
      }
      {props.description &&
        <p className="text-lg text-center">
          {props.description}
        </p>
      }
      {props.progress &&
        <p className="text-lg text-center">
          {props.progress}% completed.
        </p>
      }

      {props.href &&
        <Button href={props.href}>
          View Project
        </Button>
      }

      {props.tags &&
        (
          <>
            <h2 className="text-lg font-bold"> Used Technologies </h2>
            <div className="flex flex-row items-center justify-center flex-wrap gap-2">
              {props.tags && props.tags.map((tag, index) => (
                <Tag key={index}>
                  {tag}
                </Tag>
              ))}
            </div>
          </>
        )
      }
    </section>
  );
}