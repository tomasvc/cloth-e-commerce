import { useEffect, useState } from "react";
import { getCategories } from "api/getCategories";

const findProductCategoriesAndBuildTree = (node: any) => {
  // Check if the current node's content.title matches "product categories" (case-insensitively)
  if (
    node.content &&
    node.content.title &&
    node.content.title.toLowerCase() === "categories"
  ) {
    return buildCategoryTree(node);
  }

  // If the current node has children, traverse through them
  if (node.children && node.children.length > 0) {
    for (let child of node.children) {
      const categoryTree: any = findProductCategoriesAndBuildTree(child);
      if (categoryTree) {
        return categoryTree;
      }
    }
  }

  return null;
};

const buildCategoryTree = (node: any) => {
  // Base case: If the node has a categoryId, return it as a leaf node
  if (node.link && node.link.categoryId) {
    return {
      title: node.content ? node.content.title : null,
      categoryId: node.link.categoryId,
      subcategories: [],
      ...node,
    };
  }

  // Recursive case: If the node has children, traverse them and build the tree
  let subcategories = [];
  if (node.children && node.children.length > 0) {
    subcategories = node.children
      .map((child: any) => buildCategoryTree(child))
      .filter((category: any) => category);
  }

  // If the node doesn't have a title or any subcategories, return null
  if (!node.content || !node.content.title || subcategories.length === 0) {
    return null;
  }

  return {
    title: node.content.title,
    subcategories: subcategories,
  };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<{ men: any; women: any }>({
    men: null,
    women: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        if (response.data.navigation.length === 2) {
          setCategories({
            men: findProductCategoriesAndBuildTree(response.data.navigation[0]),
            women: findProductCategoriesAndBuildTree(
              response.data.navigation[1]
            ),
          });
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchData();
  }, []);

  return categories;
};
