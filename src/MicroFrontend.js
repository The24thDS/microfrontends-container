import { useEffect } from "react";

const MicroFrontend = ({ name, host, history, ...rest }) => {
  const elementId = `${name}-container`;
  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;
    const renderMicroFrontend = () => {
      window[`render_${name}`] &&
        window[`render_${name}`](elementId, history, host, rest);
    };

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    fetch(`${host}/parcel-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        const jsPromises = Object.keys(manifest)
          .filter((key) => key.endsWith(".js"))
          .reduce((sum, key) => {
            sum.push(
              new Promise((resolve) => {
                const path = `${host}${manifest[key]}`;
                const script = document.createElement("script");
                if (key === "index.js") {
                  script.id = scriptId;
                }
                script.onload = () => {
                  resolve();
                };
                script.src = path;
                document.head.appendChild(script);
              })
            );
            return sum;
          }, []);
        // Promise.allSettled(jsPromises).then(() => {
        // renderMicroFrontend();
        // });
        const cssPromises = Object.keys(manifest)
          .filter((key) => key.endsWith(".css"))
          .reduce((sum, key) => {
            sum.push(
              new Promise((resolve) => {
                const path = `${host}${manifest[key]}`;
                const link = document.createElement("link");
                link.id = key;
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = path;
                link.media = "all";
                link.onload = () => {
                  resolve();
                };
                document.head.appendChild(link);
              })
            );
            return sum;
          }, []);
        console.log(jsPromises, cssPromises);
        Promise.allSettled([...jsPromises, ...cssPromises]).then(() => {
          renderMicroFrontend();
        });
      });

    return () => {
      console.log(elementId);
      // window[`unmount_${name}`] && window[`unmount_${name}`](elementId);
    };
  }, [name, host, history, rest]);

  return <main id={elementId} />;
};

export default MicroFrontend;
