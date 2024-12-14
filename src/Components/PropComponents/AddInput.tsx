import React from "react";

interface AddInputProps {
  id: string;
  labelText: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddInput: React.FC<AddInputProps> = ({
  id,
  labelText,
  value,
  type,
  onChange,
}) => (
  <div className="flex flex-col mb-4">
    <label
      htmlFor={id}
      className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 text-right"
    >
      <span className="text-1xl font-medium text-gray-700">{labelText}</span>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required
        className="mt-2 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 text-right sm:text-sm"
      />
    </label>
  </div>
);

export default AddInput;
