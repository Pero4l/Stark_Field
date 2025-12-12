/\*\*

- Tab Navigation with Mobile Back Button Override - Complete Guide
-
- This document demonstrates how to use the enhanced ActiveTabContext
- to manage tab navigation with custom back button handling.
  \*/

/\*\*

- ========================================
- 1.  BASIC USAGE IN YOUR APP
- ========================================
-
- Your existing setup in app/layout.tsx is already enhanced:
-
- import { ActiveTabProvider } from "@/app/context/ActiveTabContext";
-
- export default function RootLayout({
- children,
- }: {
- children: React.ReactNode;
- }) {
- return (
-     <html>
-       <body>
-         <ActiveTabProvider>
-           {children}
-         </ActiveTabProvider>
-       </body>
-     </html>
- );
- }
  \*/

/\*\*

- ========================================
- 2.  USE THE HOOK IN ANY COMPONENT
- ========================================
  \*/

// Example: Tab navigation component
"use client";

import { useActiveTab } from "@/app/context/ActiveTabContext";
import { ChevronLeft } from "lucide-react";

export function TabNavigation() {
const { activeTab, setActiveTab, goBack, canGoBack } = useActiveTab();

return (
<div className="flex items-center gap-2">
{/_ Back Button - only shows if there's history _/}
{canGoBack() && (
<button
          onClick={goBack}
          className="p-2 hover:bg-gray-200 rounded-lg transition"
          title="Go to previous tab"
        >
<ChevronLeft className="w-6 h-6" />
</button>
)}

      {/* Tab Buttons */}
      <button
        onClick={() => setActiveTab("dashboard")}
        className={`px-4 py-2 rounded-lg transition ${
          activeTab === "dashboard"
            ? "bg-green-600 text-white"
            : "hover:bg-gray-100"
        }`}
      >
        Dashboard
      </button>

      <button
        onClick={() => setActiveTab("feed")}
        className={`px-4 py-2 rounded-lg transition ${
          activeTab === "feed"
            ? "bg-green-600 text-white"
            : "hover:bg-gray-100"
        }`}
      >
        Feed
      </button>

      <button
        onClick={() => setActiveTab("profile")}
        className={`px-4 py-2 rounded-lg transition ${
          activeTab === "profile"
            ? "bg-green-600 text-white"
            : "hover:bg-gray-100"
        }`}
      >
        Profile
      </button>
    </div>

);
}

/\*\*

- ========================================
- 3.  HOW IT WORKS
- ========================================
-
- TAB HISTORY MANAGEMENT (In-Memory):
- - Each tab navigation is recorded in memory via TabHistoryManager
- - History is limited to 20 entries to prevent memory leaks
- - Consecutive duplicate tabs are not added
- - Forward history is cleared when a new tab is navigated to
-
- MOBILE BACK BUTTON OVERRIDE:
- - Listens to "popstate" event (fired when back button is pressed)
- - When back button is pressed:
- 1.  Checks if there's previous tab in history
- 2.  If yes, navigates to that tab and re-pushes state
- 3.  If no, allows default browser back behavior
- - URL remains unchanged (tab state is in memory, not in URL)
-
- STATE PERSISTENCE:
- - Current tab is always stored in localStorage under "farmchain:activeTab"
- - Persists across page reloads
- - Syncs across browser tabs
    \*/

/\*\*

- ========================================
- 4.  CONTEXT API METHODS
- ========================================
  \*/

export const TabContextMethods = {
/\*\*

- Get current active tab
- @returns {string} - Current tab name (e.g., "dashboard", "feed")
  \*/
  activeTab: "string",

/\*\*

- Set the active tab - adds to history automatically
- @param {string} tab - Tab name to activate
  \*/
  setActiveTab: "(tab: string) => void",

/\*\*

- Navigate to previous tab in history
- @returns {boolean} - true if navigation succeeded, false if no history
  \*/
  goBack: "() => boolean",

/\*\*

- Navigate to next tab in history (forward)
- @returns {boolean} - true if navigation succeeded, false if no forward history
  \*/
  goForward: "() => boolean",

/\*\*

- Check if back navigation is available
- @returns {boolean}
  \*/
  canGoBack: "() => boolean",

/\*\*

- Check if forward navigation is available
- @returns {boolean}
  \*/
  canGoForward: "() => boolean",

/\*\*

- Track selected user (optional feature)
  \*/
  selectedUserId: "string | null",
  setSelectedUserId: "(id: string | null) => void",
  };

/\*\*

- ========================================
- 5.  EXAMPLE: FARMCHAIN APP INTEGRATION
- ========================================
  \*/

export function FarmChainTabComponent() {
const { activeTab, setActiveTab, goBack, canGoBack, goForward, canGoForward } = useActiveTab();

return (
<div className="flex flex-col h-screen">
{/_ Header Navigation _/}
<header className="border-b p-4 flex items-center gap-2">
{canGoBack() && (
<button
            onClick={goBack}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
← Back
</button>
)}

        {canGoForward() && (
          <button
            onClick={goForward}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Forward →
          </button>
        )}

        <span className="ml-auto text-sm text-gray-600">
          Current: {activeTab}
        </span>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {activeTab === "dashboard" && <div>Dashboard Content</div>}
        {activeTab === "feed" && <div>Feed Content</div>}
        {activeTab === "profile" && <div>Profile Content</div>}
        {activeTab === "create_post" && <div>Create Post Content</div>}
      </main>

      {/* Footer Navigation */}
      <footer className="border-t p-4 flex gap-2">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2 rounded ${
            activeTab === "dashboard" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab("feed")}
          className={`px-4 py-2 rounded ${
            activeTab === "feed" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Feed
        </button>
        <button
          onClick={() => setActiveTab("create_post")}
          className={`px-4 py-2 rounded ${
            activeTab === "create_post" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Create
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded ${
            activeTab === "profile" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Profile
        </button>
      </footer>
    </div>

);
}

/\*\*

- ========================================
- 6.  BEHAVIOR EXAMPLES
- ========================================
-
- USER FLOW:
- 1.  User opens app → activeTab = "dashboard" (stored in memory)
- 2.  User clicks Feed → activeTab = "feed", history = [dashboard, feed]
- 3.  User clicks Profile → activeTab = "profile", history = [dashboard, feed, profile]
- 4.  User presses back button:
- - canGoBack() = true
- - goBack() is called
- - activeTab = "feed"
- - history pointer moves back
- 5.  User clicks Create → history = [dashboard, feed, create]
- - Forward history is cleared (user took a new path)
- 6.  User presses browser back button on Android/iOS:
- - Mobile back button triggers popstate event
- - goBack() is automatically called
- - Tab switches to previous tab instead of leaving app
-
- PERSISTENCE:
- - localStorage["farmchain:activeTab"] = "feed"
- - Page reload → activeTab restored to "feed"
- - Does NOT persist history (history resets to single tab on reload)
    \*/

/\*\*

- ========================================
- 7.  ADVANCED: CUSTOM HOOK (Optional)
- ========================================
-
- You can create a custom hook for common patterns:
  \*/

import { useCallback } from "react";

export function useTabNavigation() {
const context = useActiveTab();

const navigateToTab = useCallback(
(tab: string, shouldAddToHistory: boolean = true) => {
if (shouldAddToHistory) {
context.setActiveTab(tab);
} else {
// Direct navigation without history (rare use case)
context.setActiveTab(tab);
}
},
[context]
);

const handleMobileBack = useCallback(() => {
return context.goBack();
}, [context]);

const getNavigationState = useCallback(() => {
return {
current: context.activeTab,
canGoBack: context.canGoBack(),
canGoForward: context.canGoForward(),
};
}, [context]);

return {
navigateToTab,
handleMobileBack,
getNavigationState,
...context,
};
}

/\*\*

- ========================================
- 8.  TROUBLESHOOTING
- ========================================
-
- Q: Back button not working on iOS?
- A: Ensure you're using a real device or iOS simulator. Mobile back button
- triggers popstate event which is caught by the provider.
-
- Q: History not persisting after reload?
- A: This is by design - only the current tab persists (via localStorage).
- History is in-memory to avoid complexity. On reload, history is reset.
-
- Q: URL changing when navigating tabs?
- A: URLs are NOT changed. Tab state is entirely in-memory. This prevents
- browser history pollution and keeps the address bar clean.
-
- Q: How to clear history?
- A: Currently, history is cleared on page reload. To add manual reset:
- - Extend ActiveTabContext with a resetHistory() method if needed
-
- Q: Memory leaks with large history?
- A: History is capped at 20 entries. Old entries are automatically removed.
  \*/

/\*\*

- ========================================
- 9.  TESTING
- ========================================
-
- To test back button on desktop:
- 1.  Open browser DevTools
- 2.  Go to Device Toolbar (mobile view)
- 3.  Click mobile back button in DevTools
-
- To test on real mobile:
- 1.  Deploy app to a server
- 2.  Open on iPhone or Android device
- 3.  Press hardware back button (Android) or use back gesture (iOS)
      \*/
