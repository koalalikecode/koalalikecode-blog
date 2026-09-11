export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const variants = {
    primary: "ui-btn-primary",
    outline: "ui-btn-outline",
  };

  const variantClass = variants[variant] || variants.primary;

  return (
    <button type={type} className={`${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
