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

const setVhUnit = () => {
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

exports.onClientEntry = () => {
  setVhUnit();
  window.addEventListener("resize", setVhUnit);
};
