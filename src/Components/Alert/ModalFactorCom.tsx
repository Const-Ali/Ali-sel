import React from "react";

interface ModalFactorComProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalFactorCom: React.FC<ModalFactorComProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-3/4 md:w-1/2">
        <button
          className="absolute text-xl justify-center text-gray-600 "
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalFactorCom;
