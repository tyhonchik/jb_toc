import { TPage } from "@/types";

/**
 * Find ancestors of a given page in a tree structure of pages.
 * Ancestors are pages that are parents or grandparents of the given page.
 *
 * @param pages - The collection of pages represented as an object with keys as page IDs.
 * @param id - The ID of the page for which to find ancestors. If not provided, the function returns an empty set.
 * @returns A Set of page IDs representing the ancestors of the given page.
 */
export const findAncestors = (
  pages: { [key: string]: TPage },
  id?: string
): Set<string> => {
  const ancestors = new Set<string>();
  let current = id ? pages[id] : undefined;

  while (current?.parentId) {
    ancestors.add(current.parentId);
    current = pages[current.parentId];
  }

  return ancestors;
};
