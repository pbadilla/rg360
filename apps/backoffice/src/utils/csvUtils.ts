export interface CSVData {
  headers: string[];
  rows: string[][];
}

/**
 * Parse CSV string data into an array of arrays
 */
export function parseCSV(csvText: string): CSVData {
  const lines = csvText.split("\n").map((line) => line.trim()); // Trim whitespace from lines

  // Ensure there are enough lines
  if (lines.length < 2) {
    return { headers: [], rows: [] };
  }

  // Use the SECOND line as headers
  const headers = lines[1].split(";").map((header) => header.trim());

  // Parse data rows starting from the THIRD line
  const rows = lines
    .slice(2)
    .filter((line) => line !== "")
    .map((line) => line.split(";").map((cell) => cell.trim()));

  return { headers, rows };
}

/**
 * Convert array data to CSV string
 */
export function convertToCSV(data: CSVData): string {
  const headerRow = data.headers.join(",");
  const dataRows = data.rows.map((row) => row.join(","));
  return [headerRow, ...dataRows].join("\n");
}

/**
 * Download data as a CSV file
 */
export function downloadCSV(
  data: CSVData,
  filename: string = "export.csv",
): void {
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
