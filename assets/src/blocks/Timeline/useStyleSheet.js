// useScript implementation from: https://usehooks.com/useScript/
import { useEffect, useState } from 'react';

// Hook
let cachedStyleSheets = [];
export const useStyleSheet = (href, media = 'all') => {

  // Keeping track of script loaded and error state
  const [state, setState] = useState({
    loaded: false,
    error: false
  });

  useEffect(
    () => {
      // If cachedStyleSheets array already includes href that means another instance ...
      // ... of this hook already loaded this script, so no need to load again.
      if (cachedStyleSheets.includes(href)) {
        setState({
          loaded: true,
          error: false
        });
      } else {
        cachedStyleSheets.push(href);

        // Create stylesheet link
        let linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = href;
        linkElement.media = media;

        // Stylesheet event listener callbacks for load and error
        const onStyleSheetLoad = () => {
          setState({
            loaded: true,
            error: false
          });
        };

        const onStyleSheetError = () => {
          // Remove from cachedStyleSheets we can try loading again
          const index = cachedStyleSheets.indexOf(href);
          if (index >= 0) cachedStyleSheets.splice(index, 1);
          linkElement.remove();

          setState({
            loaded: true,
            error: true
          });
        };

        linkElement.addEventListener('load', onStyleSheetLoad);
        linkElement.addEventListener('error', onStyleSheetError);

				// Add stylesheet to document body
        document.body.appendChild(linkElement);

        // Remove event listeners on cleanup
        return () => {
          linkElement.removeEventListener('load', onStyleSheetLoad);
          linkElement.removeEventListener('error', onStyleSheetError);
        };
      }
    },
    [href] // Only re-run effect if stylesheet href changes
  );

  return [state.loaded, state.error];
}
