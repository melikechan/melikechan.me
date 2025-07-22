export default function Button({
  variant = "primary",
  children,
  href,
  ...props
}) {
  const variants = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    gradient_x: "bg-linear-to-r from-primary to-secondary",
    gradient_y: "bg-linear-to-b from-primary to-secondary",
  };

  return (
    <a href={href} target="_blank" rel="noreferrer">
      <button
        className={`px-4 py-2 rounded-lg text-white ${variants[variant]}`}
        {...props}
      >
        {children}
      </button>
    </a>
  );
}
