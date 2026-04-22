(function() {
    // SecondGuess Tracker
    const script = document.currentScript;
    const scriptSrc = new URL(script.src);
    const siteId = scriptSrc.searchParams.get('siteId');
    if (!siteId) return console.error('SecondGuess: siteId is missing');

    const STORAGE_KEY_VISITOR = 'sg_visitor_id';
    const STORAGE_KEY_SESSION = 'sg_session_id';
    
    // Determine the host of the tracker script to use as the base for API calls
    const trackerHost = scriptSrc.origin;
    const TRACKING_ENDPOINT = `${trackerHost}/api/track`;

    // Helper: UUID Generator
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Identifiers
    let visitorId = localStorage.getItem(STORAGE_KEY_VISITOR);
    if (!visitorId) {
        visitorId = uuidv4();
        localStorage.setItem(STORAGE_KEY_VISITOR, visitorId);
    }

    let sessionId = sessionStorage.getItem(STORAGE_KEY_SESSION);
    if (!sessionId) {
        sessionId = uuidv4();
        sessionStorage.setItem(STORAGE_KEY_SESSION, sessionId);
    }

    const basePayload = () => ({
        siteId,
        visitorId,
        sessionId,
        url: window.location.href,
        referrer: document.referrer,
        timestamp: new Date().toISOString()
    });

    async function trackEvent(eventType, eventData = {}) {
        const payload = {
            ...basePayload(),
            eventType,
            eventData
        };
        
        try {
            // Using navigator.sendBeacon for better reliability on unload, 
            // but fetch is better for general events to ensure JSON header
            await fetch(TRACKING_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                keepalive: true
            });
        } catch (e) {}
    }

    // --- TRACKING LOGIC ---

    // 1. Page View
    trackEvent('page_view');

    // 2. Scroll Depth
    const trackedScroll = new Set();
    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = Math.round((scrollTop + winHeight) / docHeight * 100);

        [25, 50, 75, 100].forEach(depth => {
            if (scrollPercent >= depth && !trackedScroll.has(depth)) {
                trackedScroll.add(depth);
                trackEvent('scroll_depth', { depth });
            }
        });
    }, { passive: true });

    // 3. Time on Section
    const sectionTimers = {};
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionName = entry.target.getAttribute('data-section');
            if (entry.isIntersecting) {
                sectionTimers[sectionName] = Date.now();
            } else if (sectionTimers[sectionName]) {
                const duration = Date.now() - sectionTimers[sectionName];
                if (duration > 1000) { // Only track if > 1s
                    trackEvent('time_on_section', { section: sectionName, duration });
                }
                delete sectionTimers[sectionName];
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-section]').forEach(el => observer.observe(el));

    // 4. Form Abandonment
    const focusedFields = new Set();
    document.addEventListener('focusin', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
            focusedFields.add(e.target.name || e.target.id || 'unnamed-field');
        }
    });

    window.addEventListener('beforeunload', () => {
        if (focusedFields.size > 0) {
            // Send beacon for abandon
            const payload = {
                ...basePayload(),
                eventType: 'form_abandon',
                eventData: { fields: Array.from(focusedFields) }
            };
            navigator.sendBeacon(TRACKING_ENDPOINT, JSON.stringify(payload));
        }
    });

    // 5. Rage Clicking
    let clickHistory = [];
    document.addEventListener('click', (e) => {
        const now = Date.now();
        clickHistory.push(now);
        clickHistory = clickHistory.filter(t => now - t < 2000);
        
        if (clickHistory.length >= 3) {
            trackEvent('rage_click', { 
                target: e.target.tagName, 
                text: e.target.innerText?.substring(0, 30),
                path: window.location.pathname
            });
            clickHistory = []; // Reset
        }
    });

    // 6. Exit Intent
    let exitIntentTracked = false;
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 10 && !exitIntentTracked) {
            exitIntentTracked = true;
            trackEvent('exit_intent', { type: 'top_exit' });
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && !exitIntentTracked) {
            trackEvent('exit_intent', { type: 'tab_switch' });
        }
    });

})();
