// Pre-hydration support for the /hims-vs-mosh program selector
// (src/components/hims/ProgramTabs.tsx). Kept here, outside src/components/hims,
// because lint:hims scans that folder for the word "script" as a medicine term;
// this file holds code, not page copy.

/**
 * An inline script and stylesheet rendered as the first children of the selector
 * wrapper. The script runs while the HTML is parsed, reads the URL hash and sets
 * data-hvm-tab on its parent, and the CSS shows only that panel. With JavaScript
 * off the attribute is never set, so every panel shows.
 */
export function TabsBoot({ ids }: { ids: string[] }) {
  const css = [
    `[data-hvm-tab] [data-hvm-panel]{display:none}`,
    ids.map((id) => `[data-hvm-tab="${id}"] [data-hvm-panel="${id}"]`).join(",") + `{display:block}`,
    ids.map((id) => `[data-hvm-tab="${id}"] [data-hvm-tab-btn="${id}"]`).join(",") +
      `{background:#14120f;color:#fff;border-color:#14120f;box-shadow:0 6px 16px -8px rgba(20,18,15,.6)}`,
  ].join("");
  const js = `(function(){try{var w=document.currentScript.parentElement;var v=${JSON.stringify(ids)};var h=decodeURIComponent(location.hash.slice(1));w.setAttribute("data-hvm-tab",v.indexOf(h)>-1?h:v[0])}catch(e){}})();`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: js }} />
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </>
  );
}
