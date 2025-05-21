// lib/utils.ts
export function generateTextFromHTML(html: string): string {
  if (typeof document === 'undefined') {
    // Fallback for server-side rendering
    return html.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
  }

  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}