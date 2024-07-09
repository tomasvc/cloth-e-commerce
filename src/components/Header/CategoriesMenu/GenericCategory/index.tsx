import { CategorySection } from "../CategorySection";

export const GenericCategory: React.FC<{
  categories: any;
  onSelect: (id: string, name: string) => void;
  index: number;
}> = ({ categories, onSelect, index }) => {
  const excludeTitles = [
    "app & mobile promo",
    "app and mobile promo",
    "app and mobile top level",
    "app & mobile top level",
    "top level app & mobile",
    "top level app and mobile",
    "cta",
    "new edit",
  ];

  const relevantSubcategories = categories?.subcategories[index]?.subcategories;
  const filteredSubcategories = relevantSubcategories?.filter(
    (category: any) => {
      return !excludeTitles.some((excluded: string) =>
        category.title.toLowerCase().includes(excluded)
      );
    }
  );

  return (
    <div className="w-full flex flex-col md:flex-row">
      {filteredSubcategories?.map((subcategory: any, i: number) => (
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
