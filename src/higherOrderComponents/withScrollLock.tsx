import React from 'react';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

export const withScrollLock = (Component) => {
  return class extends React.Component {
    // 2. Initialise your ref and targetElement here
    targetRef = React.createRef();
    targetElement = null;

    componentDidMount() {
      // 3. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
      // Specifically, the target element is the one we would like to allow scroll on (NOT a parent of that element).
      // This is also the element to apply the CSS '-webkit-overflow-scrolling: touch;' if desired.
      this.targetElement = this.targetRef.current;
    }

    showTargetElement = () => {
      // ... some logic to show target element

      // 4. Disable body scroll
      disableBodyScroll(this.targetElement);
    };

    hideTargetElement = () => {
      // ... some logic to hide target element

      // 5. Re-enable body scroll
      enableBodyScroll(this.targetElement);
    };

    componentWillUnmount() {
      // 5. Useful if we have called disableBodyScroll for multiple target elements,
      // and we just want a kill-switch to undo all that.
      // OR useful for if the `hideTargetElement()` function got circumvented eg. visitor
      // clicks a link which takes him/her to a different page within the app.
      clearAllBodyScrollLocks();
    }

    render() {
      const {...passThroughProps} = this.props
      return (
        // 6. Pass your ref with the reference to the targetElement to SomeOtherComponent
        <Component ref={this.targetRef} {...passThroughProps}/>
      );
    }
  };
};
