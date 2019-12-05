exports.onRouteUpdate = ({ location }) => {
  if (location.hash) {
    setTimeout(() => {
      const section = document.querySelector(location.hash);

      if (section) {
        section.scrollIntoView();
      }
    }, 5);
  }
};
exports.onClientEntry = () => {
  const isIe = () => {
    return (
      window.navigator.userAgent.indexOf("MSIE ") > 0 ||
      !!navigator.userAgent.match(/Trident.*rv\:11\./)
    );
  };
  if (isIe) {
    window.location = "https://www.google.com";
  }
};
