import React, { useState, useEffect } from "react";
import Toggle from "./Toggle";
import Section from "./Section";
import Row from "./Row";

const defaultSettings = {
  youtube: { recommended: true, minimalHome: true, shorts: true },
  instagram: { reelsPage: true, reelsMessages: true, followedOnly: false },
  facebook: { reels: true, marketplaceOnly: false },
  tiktok: { block: true },
};

const MainPopup = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasChanges, setHasChanges] = useState(false); // Tracks if user changed anything

  // 1. Fetch settings on popup open
  useEffect(() => {
    if (
      typeof chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.sync
    ) {
      chrome.storage.sync.get(["antiBrainrotSettings"], (data) => {
        if (data.antiBrainrotSettings) {
          setSettings(data.antiBrainrotSettings);
        }
        setIsLoaded(true);
      });
    } else {
      setIsLoaded(true);
    }
  }, []);

  // 2. Toggle Handler
  const toggle = (platform, key) => {
    setSettings((prevSettings) => {
      const updatedSettings = {
        ...prevSettings,
        [platform]: {
          ...prevSettings[platform],
          [key]: !prevSettings[platform][key],
        },
      };

      // Save to storage
      if (
        typeof chrome !== "undefined" &&
        chrome.storage &&
        chrome.storage.sync
      ) {
        chrome.storage.sync.set({ antiBrainrotSettings: updatedSettings });
      }

      // Trigger the refresh notice visibility
      setHasChanges(true);

      return updatedSettings;
    });
  };

  // 3. Helper to programmatically reload the active tab
  const handleRefreshTab = () => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.reload(tabs[0].id);
          setHasChanges(false); // Hide button after refresh
        }
      });
    }
  };

  if (!isLoaded) return <div className="bg-zinc-950 w-80 h-[480px]"></div>;

  return (
    <div className="bg-zinc-950 p-4 w-80 rounded-lg font-sans antialiased flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex gap-3 items-center mb-6 pl-2">
          <img
            src="/AntiBrainrotIcon.png"
            className="w-8 h-8 rounded-md object-cover"
            alt="Icon"
          />
          <h1 className="text-white text-2xl font-bold tracking-tight">
            Anti-Brainrot
          </h1>
        </div>

        {/* Settings Accordions */}
        <div>
          <Section title="YouTube">
            <Row
              label="Block recommendations"
              value={settings.youtube.recommended}
              onToggle={() => toggle("youtube", "recommended")}
            />
            <Row
              label="Minimal homepage"
              value={settings.youtube.minimalHome}
              onToggle={() => toggle("youtube", "minimalHome")}
            />
            <Row
              label="Block Shorts"
              value={settings.youtube.shorts}
              onToggle={() => toggle("youtube", "shorts")}
            />
          </Section>

          <Section title="Instagram">
            <Row
              label="Hide Reels page"
              value={settings.instagram.reelsPage}
              onToggle={() => toggle("instagram", "reelsPage")}
            />
            <Row
              label="Block Reels in messages"
              value={settings.instagram.reelsMessages}
              onToggle={() => toggle("instagram", "reelsMessages")}
            />
            <Row
              label="Followed-only feed"
              value={settings.instagram.followedOnly}
              onToggle={() => toggle("instagram", "followedOnly")}
            />
          </Section>

          <Section title="Facebook">
            <Row
              label="Block Reels"
              value={settings.facebook.reels}
              onToggle={() => toggle("facebook", "reels")}
            />
            <Row
              label="Marketplace only mode"
              value={settings.facebook.marketplaceOnly}
              onToggle={() => toggle("facebook", "marketplaceOnly")}
            />
          </Section>

          <Section title="TikTok">
            <Row
              label="Block Site"
              value={settings.tiktok.block}
              onToggle={() => toggle("tiktok", "block")}
            />
          </Section>
        </div>
      </div>

      {/* Footer and Notification Area */}
      <div className="mt-2">
        {/* Actionable Refresh Button (Shows up dynamically) */}
        {hasChanges && (
          <button
            onClick={handleRefreshTab}
            className="w-full mb-4 bg-[#34C759] hover:bg-[#2eb34f] text-white text-[14px] font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-md animate-fade-in"
          >
            Refresh Tab to Apply Changes
          </button>
        )}

        {/* Clean, Minimalist iOS-style Link Footer */}
        <div className="pt-4 border-t border-[#2C2C2E] flex justify-between items-center text-[12px] text-zinc-500 px-1">
          <a
            href="https://antibrainrot.anthnyjhn.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-300 transition-colors flex items-center gap-1"
          >
            🌐 antibrainrot - {new Date().getFullYear()}
          </a>
          <a
            href="https://ko-fi.com/anthnyjhn"
            target="_blank"
            rel="noreferrer"
            className="hover:text-rose-400 transition-colors flex items-center gap-1 font-medium"
          >
            ☕ Support on Ko-fi
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainPopup;
