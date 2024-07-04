export default function Button({ children, href, ...props }) {
  return(
    <a href={href} target="_blank" rel="noreferrer">
      <button className={`px-4 py-2 text-white bg-gradient-to-b from-melikechan-gold to-melikechan-pink dark:from-melikechan-purple dark:to-melikechan-blue
      rounded-lg`} {...props}>
        {children}
      </button>
    </a>
  );
}
