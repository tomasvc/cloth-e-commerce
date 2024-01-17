import { CategorySection } from "../CategorySection";

export const GenericCategory: React.FC<{
  categories: any;
  onSelect: (id: string, name: string) => void;
  index: number;
}> = ({ categories, onSelect, index }) => {
  const relevantSubcategories = categories?.subcategories[index]?.subcategories;

  return (
    <div className="w-full flex flex-col md:flex-row justify-between">
      {relevantSubcategories?.map((subcategory: any, i: number) => (
        <CategorySection
          key={i}
          title={subcategory?.title}
          items={subcategory?.subcategories}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
