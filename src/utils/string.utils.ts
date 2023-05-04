import slugify from 'slugify';

export function createSlug(text: string): string {
  if (!text) return '';
  return slugify(text, {
    replacement: '-',
    lower: true,
    strict: true,
    trim: true,
  });
}

export function createKeyword(text: string): string {
  if (!text) return '';
  return text.replace(/-/g, ' ');
}
