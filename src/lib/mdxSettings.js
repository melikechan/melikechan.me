import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Image from "next/image";
import Link from "next/link";

export const config = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
};

export const components = {
  Image: (props) => (
    <div className="my-6 flex place-content-center">
      {" "}
      <Image
        {...props}
        alt={props.alt}
        className="rounded lg:rounded-lg"
      />
    </div>
  ),
  a: (props) => (
    <Link
      href
      {...props}
      className="hover:underline focus:underline active:underline"
    >
      {props.children}
    </Link>
  ),
  h1: (props) => (
    <h1 className="text-4xl font-bold mb-4 leading-tight" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-3xl font-bold mb-2 leading-tight" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-2xl font-bold mb-1 leading-tight" {...props} />
  ),
  h4: (props) => <h4 className="text-xl font-bold" {...props} />,
  h5: (props) => <h5 className="text-lg font-bold" {...props} />,
  h6: (props) => <h6 className="text-base font-bold" {...props} />,
  p: (props) => <p className="text-base leading-relaxed" {...props} />,
  ul: (props) => (
    <ul className="list-disc list-inside ml-4 space-y-2" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal list-inside ml-4 space-y-2" {...props} />
  ),
  li: (props) => <li className="text-base leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-gray-400 pl-4" {...props} />
  ),
  code: (props) => <code className="p-1 rounded" {...props} />,
  pre: (props) => <pre className="p-2 rounded" {...props} />,
  inlineCode: (props) => <code className="p-1 rounded" {...props} />,
  hr: (props) => <hr className="border-gray-400" {...props} />,
  table: (props) => (
    <table className="border-collapse max-w-full h-auto" {...props} />
  ),
  th: (props) => <th className="border font-bold p-2" {...props} />,
  td: (props) => <td className="border p-2" {...props} />,
};
