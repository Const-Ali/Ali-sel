interface Props {
  selectedColor: string | null;
  onSelect: (color: string) => void;
}

const colors = [
  { name: "مشکی", code: "black" },
  { name: "سفید", code: "white" },
  { name: "قرمز", code: "red" },
  { name: "سبز", code: "green" },
  { name: "آبی", code: "blue" },
  { name: "زرد", code: "yellow" },
  { name: "نارنجی", code: "orange" },
];

const ColorSelector = ({ selectedColor, onSelect }: Props) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4 justify-end">
      {colors.map((color) => (
        <button
          key={color.code}
          type="button"
          onClick={() => onSelect(color.name)}
          className={`w-8 h-8 rounded-md border-2 border-black transition-transform duration-300 transform hover:scale-110 hover:shadow-lg hover:ring-2 hover:ring-offset-2 hover:ring-${color.code} ${
            selectedColor === color.name ? "ring-4 ring-" + color.code : ""
          }`}
          style={{ backgroundColor: color.code }}
          title={color.name}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
