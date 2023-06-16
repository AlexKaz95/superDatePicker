import React, { ReactNode } from "react";

type ButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  children: ReactNode;
  className: string;
};

export const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};
