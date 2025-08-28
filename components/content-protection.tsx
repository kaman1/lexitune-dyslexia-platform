"use client";

import { useEffect } from "react";

export function ContentProtection() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable specific keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12 (Developer Tools)
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+S (Save As)
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+A (Select All)
      if (e.ctrlKey && e.key === "a") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+C (Copy)
      if (e.ctrlKey && e.key === "c") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+V (Paste)
      if (e.ctrlKey && e.key === "v") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+X (Cut)
      if (e.ctrlKey && e.key === "x") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+P (Print)
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection via mouse
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Detect developer tools opening (more precise detection)
    const detectDevTools = () => {
      // More conservative threshold to avoid false positives from zoom
      const threshold = 300;
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      
      // Only trigger if both dimensions suggest dev tools (not just zoom)
      // and if the difference is significant enough
      const likelyDevTools = (widthDiff > threshold && heightDiff > 100) || 
                           (heightDiff > threshold && widthDiff > 100);
      
      // Additional check: dev tools usually change the available screen space significantly
      const screenRatio = window.innerWidth / window.screen.availWidth;
      const suspiciousRatio = screenRatio < 0.7; // Less than 70% of available width
      
      if (likelyDevTools && suspiciousRatio) {
        document.body.innerHTML = `
          <div style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #000;
            color: #fff;
            font-family: Arial, sans-serif;
            text-align: center;
          ">
            <h1 style="font-size: 2rem; margin-bottom: 1rem;">Content Protected</h1>
            <p style="font-size: 1.2rem; margin-bottom: 2rem;">This content is protected and cannot be inspected.</p>
            <p style="font-size: 1rem; opacity: 0.7;">Please close developer tools to continue.</p>
          </div>
        `;
      }
    };

    // Prevent console messages from being useful
    const disableConsole = () => {
      const noop = () => {};
      const methods = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'];
      for (let i = 0; i < methods.length; i++) {
        (console as any)[methods[i]] = noop;
      }
    };

    // Override console.clear to prevent clearing our protection
    const originalClear = console.clear;
    console.clear = () => {
      console.log("%cContent Protection Active", "color: red; font-size: 20px; font-weight: bold;");
      console.log("%cThis website's content is protected from copying and inspection.", "color: orange; font-size: 14px;");
    };

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("dragstart", handleDragStart);

    // Check for developer tools periodically
    const devToolsCheck = setInterval(detectDevTools, 1000);

    // Disable console on load
    disableConsole();

    // Show protection message in console
    console.log("%cContent Protection Active", "color: red; font-size: 20px; font-weight: bold;");
    console.log("%cThis website's content is protected from copying and inspection.", "color: orange; font-size: 14px;");

    // Cleanup function
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("dragstart", handleDragStart);
      clearInterval(devToolsCheck);
      console.clear = originalClear;
    };
  }, []);

  return null; // This component doesn't render anything
}