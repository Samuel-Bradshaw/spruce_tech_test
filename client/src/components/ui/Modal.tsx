import React from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen?: boolean;
};

export function Modal({
  children,
  isOpen = true,
}: ModalProps): React.JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-background-secondary rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-2 border-border-primary">
        <div className="flex flex-col items-center gap-6">{children}</div>
      </div>
    </div>
  );
}
