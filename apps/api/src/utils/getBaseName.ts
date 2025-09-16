// utils/getBaseName.ts
export function getBaseName(fullName: string, colors: string[], sizes: string[]): string {
    let baseName = fullName;
  
    // remove color words
    colors.forEach(color => {
      const regex = new RegExp(`\\b${color}\\b`, 'gi');
      baseName = baseName.replace(regex, '');
    });
  
    // remove size words
    sizes.forEach(size => {
      const regex = new RegExp(`\\b${size}\\b`, 'gi');
      baseName = baseName.replace(regex, '');
    });
  
    // remove extra spaces
    return baseName.replace(/\s+/g, ' ').trim();
  }
  