// Returns an array of page numbers or '...' for ellipsis
export function getPaginationPages(current: number, total: number, maxVisible = 5) {
  const pages: (number | "...")[] = [];

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  pages.push(1); // Always show first page

  if (left > 2) pages.push("...");

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < total - 1) pages.push("...");

  pages.push(total); // Always show last page

  return pages;
}
