import React from "react";

class MicroFrontendClass extends React.Component {
  componentDidMount() {
    const { name, host } = this.props;
    const scriptId = `micro-frontend-script-${name}`;

    if (document.getElementById(scriptId)) {
      this.renderMicroFrontend();
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
                script.type = "module";
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
          this.renderMicroFrontend();
        });
      });
  }

  renderMicroFrontend = () => {
    const { name, host, window, history, ...rest } = this.props;
    window[`render_${name}`] &&
      window[`render_${name}`](`${name}-container`, history, host, rest);
  };

  componentWillUnmount() {
    const { name, window } = this.props;
    window[`unmount_${name}`] && window[`unmount_${name}`](`${name}-container`);
  }

  render() {
    return <main id={`${this.props.name}-container`} />;
  }
}

MicroFrontendClass.defaultProps = {
  document,
  window,
};

export default MicroFrontendClass;
