export default function Tag({ children, ...props }) {
  return (
    <div className={`px-4 py-2 text-white bg-melikechan-pink dark:bg-melikechan-blue
      rounded-lg`} {...props}>
      {children}
    </div>
  );
}
