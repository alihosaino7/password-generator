export const PasswordOptionInput = ({
  value,
  onChange,
  id,
  type,
  children,
  ...attrs
}) => {
  return (
    <div className="gap-2 flex items-center text-sm md:text-base">
      <input type={type} id={id} {...attrs} value={value} onChange={onChange} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};
