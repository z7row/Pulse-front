// Minimal markdown -> HTML for the editor preview only. Deliberately not a
// full CommonMark implementation — no extra dependency, covers the basics
// writers actually use: headings, bold/italic, links, lists, quotes, code.
// Use a real renderer (e.g. on the backend) for the published post page.
export function markdownToHtml(md: string): string {
  if (!md.trim()) return "<p class='opacity-50'>Nothing to preview yet…</p>";

  let html = md
    // escape basic HTML first
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/^> (.*)$/gm, "<blockquote>$1</blockquote>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.*)$/gm, "<li>$1</li>");

  // wrap consecutive <li> lines in <ul>
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  // remaining lines become paragraphs
  html = html
    .split(/\n{2,}/)
    .map((block) =>
      /^<(h1|h2|h3|ul|blockquote)/.test(block.trim()) ? block : `<p>${block}</p>`
    )
    .join("\n");

  return html;
}
