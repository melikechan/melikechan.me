export default function Tag({ variant = "primary", children, ...props }) {
  const variants = {
    primary: "bg-primary",
    secondary: "bg-secondary",
  };
  
  return (
    <div className={`px-4 py-2 rounded-lg text-white ${variants[variant]}`} {...props}>
      {children}
    </div>
  );
}
