/**
 * Hook to override mobile back button behavior and handle tab navigation.
 *
 * Usage:
 * useMobileBackButton(() => {
 *   if (historyManager.canGoBack()) {
 *     const previousTab = historyManager.goBack();
 *     setActiveTab(previousTab!);
 *     return true; // prevent default browser back
 *   }
 *   return false; // allow default browser back
 * });
 */

import { useEffect } from "react";

type BackButtonHandler = () => boolean;

/**
 * Hook that intercepts the mobile back button
 * @param handler - Called when back button is pressed. Return true to prevent default behavior.
 */
export const useMobileBackButton = (handler: BackButtonHandler) => {
  useEffect(() => {
    // Listen for popstate event (back button on mobile and desktop)
    const handlePopState = (event: PopStateEvent) => {
      const shouldPreventDefault = handler();

      if (shouldPreventDefault) {
        // Push a new state to prevent default navigation
        window.history.pushState(null, "");
        event.preventDefault();
      }
    };

    // Push initial state to detect back button
    window.history.pushState(null, "");

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handler]);
};

/**
 * Alternative implementation using beforeunload for confirmation
 */
export const useMobileBackButtonWithConfirm = (
  shouldPrevent: boolean,
  onBack?: () => void
) => {
  useEffect(() => {
    const handlePopState = () => {
      if (shouldPrevent && onBack) {
        onBack();
        // Push state to prevent navigation
        window.history.pushState(null, "");
      }
    };

    window.history.pushState(null, "");
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [shouldPrevent, onBack]);
};

export default useMobileBackButton;
