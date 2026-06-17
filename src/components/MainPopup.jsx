import React, { useState } from "react";

import Toggle from "./Toggle";
import Section from "./Section";
import Row from "./Row";

const MainPopup = () => {
  const [settings, setSettings] = useState({
    youtube: {
      recommended: true,
      minimalHome: true,
      shorts: true,
    },
    instagram: {
      reelsPage: true,
      reelsMessages: true,
      followedOnly: false,
    },
    facebook: {
      reels: true,
      marketplaceOnly: false,
    },
    tiktok: {
      block: true,
    },
  });

  const toggle = (platform, key) => {
    setSettings((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [key]: !prev[platform][key],
      },
    }));
  };

  return (
    <div className="bg-zinc-950 0 p-4 w-80  rounded-lg font-sans antialiased">
      <div className="flex gap-3 items-center mb-6 pl-2">
        {/* Fallback styling for the icon if it fails to load */}
        <img
          src="/AntiBrainrotIcon.png"
          className="w-8 h-8 rounded-md object-cover bg-zinc-800"
          alt="Icon"
        />
        <h1 className="text-white text-2xl font-bold tracking-tight">
          Anti-Brainrot
        </h1>
      </div>

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
  );
};

export default MainPopup;
