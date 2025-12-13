/**
 * Custom hook for managing tab navigation history in memory.
 * Provides back/forward navigation and mobile back button override.
 *
 * Usage:
 * const { goBack, goForward, canGoBack, tabHistory } = useTabHistory();
 * goBack(); // Navigate to previous tab
 */

import { useEffect, useCallback, useRef } from "react";

type TabHistoryListener = (tab: string) => void;

class TabHistoryManager {
  private history: string[] = [];
  private currentIndex: number = -1;
  private listeners: TabHistoryListener[] = [];
  private maxHistorySize: number = 20;

  constructor(initialTab: string) {
    this.history = [initialTab];
    this.currentIndex = 0;
  }

  /**
   * Add a new tab to history
   */
  push(tab: string): void {
    // Remove any forward history when pushing a new tab
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    // Don't add duplicate consecutive tabs
    if (this.history[this.currentIndex] === tab) {
      return;
    }

    this.history.push(tab);
    this.currentIndex++;

    // Limit history size to prevent memory leaks
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
      this.currentIndex--;
    }

    this.notifyListeners();
  }

  /**
   * Go back to previous tab
   */
  back(): string | null {
    if (this.canGoBack()) {
      this.currentIndex--;
      this.notifyListeners();
      return this.current();
    }
    return null;
  }

  /**
   * Go forward to next tab
   */
  forward(): string | null {
    if (this.canGoForward()) {
      this.currentIndex++;
      this.notifyListeners();
      return this.current();
    }
    return null;
  }

  /**
   * Check if back navigation is available
   */
  canGoBack(): boolean {
    return this.currentIndex > 0;
  }

  /**
   * Check if forward navigation is available
   */
  canGoForward(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  /**
   * Get current tab
   */
  current(): string {
    return this.history[this.currentIndex];
  }

  /**
   * Get full history
   */
  getHistory(): string[] {
    return [...this.history];
  }

  /**
   * Get current index in history
   */
  getCurrentIndex(): number {
    return this.currentIndex;
  }

  /**
   * Subscribe to history changes
   */
  subscribe(listener: TabHistoryListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Notify all listeners of changes
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.current()));
  }

  /**
   * Reset history
   */
  reset(tab: string): void {
    this.history = [tab];
    this.currentIndex = 0;
    this.notifyListeners();
  }
}

// Global instance
let tabHistoryInstance: TabHistoryManager | null = null;

export const getTabHistoryManager = (initialTab: string = "dashboard") => {
  if (!tabHistoryInstance) {
    tabHistoryInstance = new TabHistoryManager(initialTab);
  }
  return tabHistoryInstance;
};

export const useTabHistory = (currentTab: string) => {
  const manager = useRef(getTabHistoryManager(currentTab));

  // Update history when tab changes
  useEffect(() => {
    manager.current.push(currentTab);
  }, [currentTab]);

  const goBack = useCallback(() => {
    const tab = manager.current.back();
    return tab;
  }, []);

  const goForward = useCallback(() => {
    const tab = manager.current.forward();
    return tab;
  }, []);

  const canGoBack = useCallback(() => {
    return manager.current.canGoBack();
  }, []);

  const canGoForward = useCallback(() => {
    return manager.current.canGoForward();
  }, []);

  const getHistory = useCallback(() => {
    return manager.current.getHistory();
  }, []);

  return {
    goBack,
    goForward,
    canGoBack,
    canGoForward,
    getHistory,
    currentTab: manager.current.current(),
  };
};

export default TabHistoryManager;
