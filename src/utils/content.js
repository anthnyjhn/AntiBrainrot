(function () {
    // 1. Fetch the unified settings object
    chrome.storage.sync.get(['antiBrainrotSettings'], (data) => {
        const defaultSettings = {
            youtube: { recommended: true, minimalHome: true, shorts: true },
            instagram: { reelsPage: true, reelsMessages: true, followedOnly: false },
            facebook: { reels: true, marketplaceOnly: false },
            tiktok: { block: true },
        };

        const settings = data.antiBrainrotSettings || defaultSettings;
        const host = location.hostname;

        // Route to the correct script based on URL
        if (host.includes("facebook.com")) initFacebook(settings.facebook);
        if (host.includes("instagram.com")) initInstagram(settings.instagram);
        if (host.includes("tiktok.com")) initTikTok(settings.tiktok);
        if (host.includes("youtube.com")) initYouTube(settings.youtube);
    });

    // --- FACEBOOK LOGIC ---
    function initFacebook(settings) {
        function runAll() {
            // New Feature: Marketplace Only Mode
            if (settings.marketplaceOnly && !location.pathname.startsWith('/marketplace')) {
                window.stop();
                window.location.replace("https://www.facebook.com/marketplace");
                return;
            }

            // Block Reels
            if (settings.reels && location.pathname.startsWith("/reel")) {
                window.stop();
                // If marketplace only is on, redirect there, otherwise home
                window.location.replace(settings.marketplaceOnly ? "https://www.facebook.com/marketplace" : "https://www.facebook.com/");
            }
        }

        runAll();
        const observer = new MutationObserver(runAll);
        observer.observe(document, { subtree: true, childList: true });
        window.addEventListener("popstate", runAll);
    }

    // --- INSTAGRAM LOGIC ---
    function initInstagram(settings) {
        function runAll() {
            // New Feature: Followed Only Feed
            if (settings.followedOnly && location.pathname === "/" && !location.search.includes("variant=following")) {
                window.stop();
                window.location.replace("https://www.instagram.com/?variant=following");
                return;
            }

            // Block Reels Page
            if (settings.reelsPage) {
                if (location.pathname.startsWith("/reel/") || location.pathname.startsWith("/reels/")) {
                    window.stop();
                    window.location.replace("https://www.instagram.com/");
                }

                // Remove Nav Buttons
                document.querySelectorAll('a[href^="/reels"]').forEach(el => {
                    el.closest('div')?.remove();
                    el.remove();
                });

                // Remove Explore Reels
                document.querySelectorAll('svg[aria-label="Reel"]').forEach(svg => {
                    const link = svg.closest('a');
                    if (link && !link.querySelector('.anti-br-overlay')) {
                        applyOverlay(link);
                    }
                });

                // Remove Feed Reels
                if (location.pathname === "/") {
                    document.querySelectorAll('button[aria-label="Toggle audio"]').forEach(btn => {
                        const article = btn.closest('article');
                        if (article && !article.querySelector('.anti-br-overlay')) {
                            applyOverlay(article);
                        }
                    });
                }
            }

            // Block Reels in Messages
            if (settings.reelsMessages && location.pathname.startsWith("/direct/")) {
                document.querySelectorAll('svg[aria-label="Clip"]').forEach(svg => {
                    const wrapper = svg.closest('div[role="button"]');
                    if (wrapper) {
                        wrapper.innerHTML = '<div style="padding:8px; font-size:14px; color:white; text-align:center;">Blocked by AntiBrainrot</div>';
                    }
                });
            }
        }

        // Helper function for overlays
        function applyOverlay(element) {
            const overlay = document.createElement('div');
            overlay.className = 'anti-br-overlay';
            Object.assign(overlay.style, {
                position: 'absolute', top: '0', left: '0', right: '0', bottom: '0',
                backgroundColor: 'black', color: 'white', display: 'flex',
                alignItems: 'center', justifyContent: 'center', zIndex: '9999',
                fontWeight: 'bold', fontSize: '18px', borderRadius: '8px'
            });
            overlay.textContent = 'Blocked by AntiBrainrot';
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(overlay);
        }

        runAll();
        const observer = new MutationObserver(runAll);
        observer.observe(document, { subtree: true, childList: true });
        window.addEventListener("popstate", runAll);
    }

    // --- TIKTOK LOGIC ---
    function initTikTok(settings) {
        if (!settings.block) return;
        window.stop();
        window.location.replace("https://www.google.com/");
    }

    // --- YOUTUBE LOGIC ---
    function initYouTube(settings) {
        function runAll() {
            // Block Shorts
            if (settings.shorts) {
                if (location.pathname.startsWith("/shorts/")) {
                    window.stop();
                    window.location.replace("https://www.youtube.com/");
                }
                document.querySelectorAll('a[title="Shorts"], #endpoint[title="Shorts"]').forEach(el => {
                    const parent = el.closest('ytd-mini-guide-entry-renderer, ytd-guide-entry-renderer');
                    parent ? parent.remove() : el.remove();
                });
                document.querySelectorAll('#contents.ytd-reel-shelf-renderer, div#title-container.ytd-reel-shelf-renderer').forEach(el => el.remove());
            }

            // New Feature: Minimal Homepage
            if (settings.minimalHome && location.pathname === "/") {
                document.querySelectorAll('#contents.ytd-rich-grid-renderer').forEach(el => el.remove());
                document.querySelectorAll('#chips.ytd-feed-filter-chip-bar-renderer').forEach(el => el.remove());
            }

            // New Feature: Block Recommendations (Sidebar and Video End-screens)
            if (settings.recommended && location.pathname === "/watch") {
                document.querySelectorAll('#secondary, #secondary-inner').forEach(el => el.remove());
                document.querySelectorAll('.ytp-endscreen-content').forEach(el => el.remove());
            }
        }

        runAll();
        const observer = new MutationObserver(runAll);
        observer.observe(document, { subtree: true, childList: true });
        window.addEventListener("popstate", runAll);
    }
})();