export const CategorySection: React.FC<{
  title: string;
  items: any;
  onSelect: (id: string, name: string) => void;
}> = ({ title, items, onSelect }) => (
  <div className="max-w-[500px] w-full mb-10 md:mb-0">
    <p className="text-white text-lg uppercase font-medium pl-4 pb-4">
      {title}
    </p>
    <ul
      className={`w-full ${
        items.length > 14
          ? "grid grid-cols-2 row-span-full gap-1 md:gap-0"
          : "grid grid-cols-1 flex-row md:flex-col"
      } flex-wrap text-white`}
    >
      {items?.map((item: any, id: number) => (
        <li
          className="w-full md:w-fit px-4 py-1.5 text-lg md:text-sm font-light hover:scale-110 hover:bg-white hover:text-gray-800 cursor-pointer transition-all ease-out"
          onClick={() => onSelect(item.categoryId, item.title)}
          key={id}
        >
          {item.title}
        </li>
      ))}
    </ul>
  </div>
);
