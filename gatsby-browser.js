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
  let ua = window.navigator.userAgent;
  let isIE = /MSIE|Trident/.test(ua);

  if (isIE) {
    window.location = "https://static.hobbes.work";
  }
};
