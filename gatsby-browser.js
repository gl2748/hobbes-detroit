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
