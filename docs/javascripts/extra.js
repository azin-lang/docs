// Azin Docs — extra JS
// Implements a smooth, premium circular reveal animation on theme switch using the View Transitions API.

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("click", (event) => {
    const label = event.target.closest("label[for^='__palette_']");
    if (label && document.startViewTransition) {
      event.preventDefault();
      event.stopPropagation();

      const inputId = label.getAttribute("for");
      const input = document.getElementById(inputId);
      if (!input) return;

      // Get coordinate of the click, or fallback to the button's center
      const rect = label.getBoundingClientRect();
      const x = event.clientX || (rect.left + rect.width / 2);
      const y = event.clientY || (rect.top + rect.height / 2);

      document.documentElement.style.setProperty("--click-x", `${x}px`);
      document.documentElement.style.setProperty("--click-y", `${y}px`);

      // Execute view transition
      document.startViewTransition(() => {
        input.checked = true;
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
    }
  }, true); // Capture phase to intercept the click before Material's default listener
});

// Custom Syntax Highlighter for Azin (.azin, .az) code blocks
function highlightAzinCode() {
  const codeBlocks = document.querySelectorAll(".language-azin pre code, .language-az pre code");
  codeBlocks.forEach((block) => {
    if (block.dataset.azinHighlighted) return;
    block.dataset.azinHighlighted = "true";

    let text = block.textContent;
    const placeholders = [];
    let placeholderCounter = 0;

    function getPlaceholder(html) {
      const id = `___AZIN_HL_PLACEHOLDER_${placeholderCounter++}___`;
      placeholders.push({ id, html });
      return id;
    }

    // 1. Parse strings first (to prevent highlighting inside strings)
    text = text.replace(/("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/g, (match) => {
      return getPlaceholder(`<span class="s2">${escapeHtml(match)}</span>`);
    });

    // 2. Parse comments (to prevent highlighting inside comments)
    text = text.replace(/(\/\/.*|#.*)/g, (match) => {
      return getPlaceholder(`<span class="c1">${escapeHtml(match)}</span>`);
    });

    // Escape HTML of the remaining code content
    let escaped = escapeHtml(text);

    // 3. Keywords
    escaped = escaped.replace(/\b(fn|struct|do|end|if|else|elif|return|while|for|in|and|or|not|true|false|nil|import|as|class)\b/g, '<span class="k">$1</span>');

    // 4. Built-in types
    escaped = escaped.replace(/\b(int|float|string|bool|char|void|double|long|short|byte|uint|any)\b/g, '<span class="kt">$1</span>');
    
    // Capitalized user types/structs (e.g. Point)
    escaped = escaped.replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, '<span class="nc">$1</span>');

    // 5. Numbers
    escaped = escaped.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="mi">$1</span>');

    // 6. Function calls
    escaped = escaped.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()/g, '<span class="nf">$1</span>');

    // 7. Restore strings & comments
    placeholders.forEach(({ id, html }) => {
      escaped = escaped.replace(id, html);
    });

    block.innerHTML = escaped;
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
}

// Initial load
highlightAzinCode();

// PJAX Page Transitions support
if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    highlightAzinCode();
  });
}
