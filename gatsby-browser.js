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
  // IE9 Plus
  console.log("testing");
  if (window.navigator.msPointerEnabled) {
    window.location = "https://google.com";
  }
};
