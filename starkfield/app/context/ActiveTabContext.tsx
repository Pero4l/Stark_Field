"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

type ActiveTabContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedUserId: string | null;
  setSelectedUserId: (id: string | null) => void;
  goBack: () => boolean;
  goForward: () => boolean;
  canGoBack: () => boolean;
  canGoForward: () => boolean;
};

const ActiveTabContext = createContext<ActiveTabContextType | undefined>(
  undefined
);

const STORAGE_KEY = "farmchain:activeTab";

class TabHistoryManager {
  private history: string[] = [];
  private currentIndex: number = -1;
  private maxHistorySize: number = 20;

  constructor(initialTab: string) {
    this.history = [initialTab];
    this.currentIndex = 0;
  }

  push(tab: string): void {
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    if (this.history[this.currentIndex] === tab) {
      return;
    }

    this.history.push(tab);
    this.currentIndex++;

    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
      this.currentIndex--;
    }
  }

  back(): string | null {
    if (this.canGoBack()) {
      this.currentIndex--;
      return this.current();
    }
    return null;
  }

  forward(): string | null {
    if (this.canGoForward()) {
      this.currentIndex++;
      return this.current();
    }
    return null;
  }

  canGoBack(): boolean {
    return this.currentIndex > 0;
  }

  canGoForward(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  current(): string {
    return this.history[this.currentIndex];
  }

  reset(tab: string): void {
    this.history = [tab];
    this.currentIndex = 0;
  }
}

export const ActiveTabProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTabState] = useState<string>(() => {
    return "dashboard";
  });

  const historyManagerRef = useRef<TabHistoryManager | null>(null);

  // Initialize history manager
  useEffect(() => {
    if (!historyManagerRef.current) {
      historyManagerRef.current = new TabHistoryManager(activeTab);
    }
  }, []);

  // Read persisted value after mount
  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (typeof v === "string" && v !== activeTab) {
        setActiveTabState(v);
        if (historyManagerRef.current) {
          historyManagerRef.current.reset(v);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Write to storage whenever activeTab changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, activeTab);
    } catch {
      /* ignore */
    }
  }, [activeTab]);

  // Keep in sync across windows
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && typeof e.newValue === "string") {
        setActiveTabState(e.newValue);
        if (historyManagerRef.current) {
          historyManagerRef.current.reset(e.newValue);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setActiveTab = (tab: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, tab);
    } catch {
      /* ignore */
    }
    setActiveTabState(tab);
    if (historyManagerRef.current) {
      historyManagerRef.current.push(tab);
    }
  };

  // Update history when tab changes programmatically
  useEffect(() => {
    if (historyManagerRef.current) {
      historyManagerRef.current.push(activeTab);
    }
  }, [activeTab]);

  const goBack = useCallback(() => {
    if (historyManagerRef.current?.canGoBack()) {
      const previousTab = historyManagerRef.current.back();
      if (previousTab) {
        setActiveTabState(previousTab);
        try {
          localStorage.setItem(STORAGE_KEY, previousTab);
        } catch {
          /* ignore */
        }
        return true;
      }
    }
    return false;
  }, []);

  const goForward = useCallback(() => {
    if (historyManagerRef.current?.canGoForward()) {
      const nextTab = historyManagerRef.current.forward();
      if (nextTab) {
        setActiveTabState(nextTab);
        try {
          localStorage.setItem(STORAGE_KEY, nextTab);
        } catch {
          /* ignore */
        }
        return true;
      }
    }
    return false;
  }, []);

  const canGoBack = useCallback(() => {
    return historyManagerRef.current?.canGoBack() ?? false;
  }, []);

  const canGoForward = useCallback(() => {
    return historyManagerRef.current?.canGoForward() ?? false;
  }, []);

  // Set up mobile back button handling
  useEffect(() => {
    const handlePopState = () => {
      if (goBack()) {
        // Push state again to prevent browser navigation
        window.history.pushState(null, "");
      }
    };

    // Push initial state to detect back button
    window.history.pushState(null, "");

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [goBack]);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <ActiveTabContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedUserId,
        setSelectedUserId,
        goBack,
        goForward,
        canGoBack,
        canGoForward,
      }}
    >
      {children}
    </ActiveTabContext.Provider>
  );
};

export const useActiveTab = () => {
  const ctx = useContext(ActiveTabContext);
  if (!ctx)
    throw new Error("useActiveTab must be used within ActiveTabProvider");
  return ctx;
};
// ...existing code...
