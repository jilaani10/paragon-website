// ==================== GLOBAL CONFIG ==================== 

const AnimationConfig = {
    observerOptions: {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    },
    scrollOffset: 300,
    debounceDelay: 250,
    isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    inspectMode: false,
};

// ==================== DOM CACHE ==================== 

const DOM = {
    // Navigation
    hamburger: document.querySelector('.hamburger'),
    navMenu: document.querySelector('.nav-menu'),
    navLinks: document.querySelectorAll('.nav-menu a'),
    navbar: document.querySelector('.navbar'),

    // Sections
    heroContent: document.querySelector('.hero-content'),
    heroImage: document.querySelector('.hero-image'),
    heroButtons: document.querySelectorAll('.hero-buttons a'),

    // Cards
    featureCards: document.querySelectorAll('.feature-card'),
    programCards: document.querySelectorAll('.program-card'),
    specialCards: document.querySelectorAll('.special-card'),
    testimonialCards: document.querySelectorAll('.testimonial-card'),
    newsCards: document.querySelectorAll('.news-card'),
    galleryItems: document.querySelectorAll('.gallery-item'),

    // Forms
    contactForm: document.getElementById('contactForm'),
    portalLogin: document.getElementById('portalLogin'),
    formInputs: document.querySelectorAll('.form-group input, .form-group textarea, .form-group select'),

    // Timeline
    timelineItems: document.querySelectorAll('.timeline-item'),

    // Buttons
    primaryButtons: document.querySelectorAll('.btn-primary'),
    secondaryButtons: document.querySelectorAll('.btn-secondary'),

    // CTA Section
    ctaSection: document.querySelector('.cta'),
};

// ==================== INITIALIZATION ==================== 

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeScrollAnimations();
    initializeButtonAnimations();
    initializeContactForm();
    initializePortalLogin();
    initializeGradeUpload();
    highlightActiveNav();
    initializeScrollEffects();
    initializeTouchOptimizations();
    initializeViewportFix();
    initializeInspectMode();
});

window.addEventListener('load', () => {
    animatePageLoad();
});

// ==================== NAVIGATION MODULE ==================== 

function initializeNavigation() {
    if (!DOM.hamburger) return;

    // Toggle menu
    DOM.hamburger.addEventListener('click', toggleMenu);

    // Close menu on link click
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
    
    // Handle window resize to reset navigation state
    window.addEventListener('resize', handleNavigationResize);
}

function handleNavigationResize() {
    // If window is resized to desktop size, close mobile menu
    if (window.innerWidth >= 992 && DOM.navMenu.classList.contains('active')) {
        closeMenu();
    }
}

function toggleMenu() {
    DOM.hamburger.classList.toggle('active');
    DOM.navMenu.classList.toggle('active');
}

function closeMenu() {
    if (DOM.hamburger) {
        DOM.hamburger.classList.remove('active');
        DOM.navMenu.classList.remove('active');
    }
}

function handleSmoothScroll(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            closeMenu();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// ==================== SCROLL EFFECTS MODULE ==================== 

function initializeScrollEffects() {
    if (!DOM.navbar) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Navbar shadow effect
        if (currentScroll > 50) {
            DOM.navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            DOM.navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// ==================== ANIMATION MODULE ==================== 

function initializeScrollAnimations() {
    // Cards are always visible - no animation needed
}

function animatePageLoad() {
    // Page loads immediately - no animation
}

function initializeButtonAnimations() {
    // Add ripple effect to buttons
    const buttons = [...DOM.primaryButtons, ...DOM.secondaryButtons];
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== FORM HANDLING MODULE ==================== 

function initializeContactForm() {
    if (!DOM.contactForm) return;

    DOM.contactForm.addEventListener('submit', handleContactSubmit);
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: this.querySelector('input[type="text"]')?.value || '',
        email: this.querySelector('input[type="email"]')?.value || '',
        message: this.querySelector('textarea')?.value || ''
    };

    if (formData.name && formData.email && formData.message) {
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        this.reset();
    } else {
        showNotification('Please fill in all required fields.', 'error');
    }
}

function initializePortalLogin() {
    if (!DOM.portalLogin) return;

    DOM.portalLogin.addEventListener('submit', handlePortalSubmit);
}

function handlePortalSubmit(e) {
    e.preventDefault();
    
    const userType = document.getElementById('userType')?.value || '';
    const username = document.getElementById('username')?.value || '';
    const password = document.getElementById('password')?.value || '';

    if (userType && username && password) {
        showNotification(`Login successful! Welcome ${userType}: ${username}`, 'success');
        this.reset();
    } else {
        showNotification('Please fill in all required fields.', 'error');
    }
}

function initializeGradeUpload() {
    const uploadInput = document.getElementById('gradeUpload');
    const grid = document.getElementById('gradesGrid');
    if (!uploadInput || !grid) return;

    const storageKey = 'paragon_grade_pictures';
    let pictures = [];
    try {
        pictures = JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch (e) {
        pictures = [];
    }

    function render() {
        if (pictures.length === 0) return;
        grid.innerHTML = '';
        pictures.forEach((src, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item grade-picture';
            item.innerHTML = `
                <div class="gallery-image"><img src="${src}" alt="Student Grade ${index + 1}" class="gallery-img"></div>
                <button type="button" class="grade-remove" data-index="${index}" title="Remove picture">×</button>
            `;
            grid.appendChild(item);
        });
    }

    function save() {
        try {
            localStorage.setItem(storageKey, JSON.stringify(pictures));
        } catch (e) {
            showNotification('Storage full. Please use smaller images.', 'error');
        }
        render();
    }

    uploadInput.addEventListener('change', function () {
        const files = Array.from(this.files).filter(f => f.type.startsWith('image/'));
        if (files.length === 0) return;
        let remaining = files.length;
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                pictures.push(e.target.result);
                if (--remaining === 0) {
                    save();
                    showNotification('Grade pictures added successfully!', 'success');
                }
            };
            reader.onerror = () => {
                if (--remaining === 0) save();
            };
            reader.readAsDataURL(file);
        });
        this.value = '';
    });

    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.grade-remove');
        if (btn) {
            pictures.splice(parseInt(btn.dataset.index, 10), 1);
            save();
        }
    });

    render();
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #2D5016;' : 'background: #dc2626;'}
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// ==================== ACTIVE NAVIGATION MODULE ==================== 

function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    DOM.navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.style.color = '#FF8C42';
            link.style.fontWeight = 'bold';
        } else {
            link.style.color = '';
            link.style.fontWeight = '';
        }
    });
}

// ==================== TOUCH OPTIMIZATIONS MODULE ==================== 

function initializeTouchOptimizations() {
    if (!AnimationConfig.isTouchDevice) return;

    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('a, button, .feature-card, .program-card, .news-card, .gallery-item');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        }, { passive: true });
    });

    // Optimize tap targets on mobile devices (tablets and phones)
    if (window.innerWidth < 992) {
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.style.padding = '15px 10px';
            link.style.minHeight = '44px'; // iOS tap target size
            link.style.display = 'inline-block';
        });

        // Increase button tap targets
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.style.minHeight = '44px';
            btn.style.minWidth = '44px';
        });
    }

    // Prevent double-tap zoom on interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, select');
    interactiveElements.forEach(element => {
        element.style.touchAction = 'manipulation';
    });
}

// ==================== VIEWPORT FIX MODULE ==================== 

function initializeViewportFix() {
    // Set proper viewport height for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });

    // Fix iOS 100vh issue
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.minHeight = 'calc(var(--vh, 1vh) * 100)';
        }
    }

    // Handle orientation changes gracefully
    window.addEventListener('orientationchange', handleOrientationChange);
}

function handleOrientationChange() {
    // Brief delay to allow browser to complete orientation change
    setTimeout(() => {
        // Close mobile menu if open
        if (DOM.navMenu && DOM.navMenu.classList.contains('active')) {
            closeMenu();
        }
        
        // Reinitialize animations for new layout
        initializeScrollAnimations();
        
        // Adjust any size-dependent elements
        adjustElementsForOrientation();
        
        // Reinitialize touch optimizations for new screen size
        initializeTouchOptimizations();
    }, 150);
}

function adjustElementsForOrientation() {
    const isLandscape = window.innerWidth > window.innerHeight;
    
    if (isLandscape && window.innerWidth < 768) {
        // Reduce spacing in landscape mode on mobile phones
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.padding = '1rem 0';
        }
        
        const sections = document.querySelectorAll('.features, .programs, .news, .gallery, .testimonials');
        sections.forEach(section => {
            section.style.padding = '1.5rem 0';
        });
    } else {
        // Reset spacing for portrait mode or larger screens
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.padding = '';
        }
        
        const sections = document.querySelectorAll('.features, .programs, .news, .gallery, .testimonials');
        sections.forEach(section => {
            section.style.padding = '';
        });
    }
}

// ==================== INSPECT MODE MODULE ==================== 

function initializeInspectMode() {
    // Check if debug=inspect parameter is present in URL
    const urlParams = new URLSearchParams(window.location.search);
    const isDebugMode = urlParams.get('debug') === 'inspect';
    
    // Only initialize inspect mode if debug=inspect is in URL
    if (!isDebugMode) {
        console.log('%c🔍 Inspect Mode is hidden. Add ?debug=inspect to URL to enable it.', 'color: #666; font-size: 12px;');
        return;
    }
    
    // Create inspect mode toggle button
    const inspectButton = document.createElement('button');
    inspectButton.id = 'inspect-toggle-button';
    inspectButton.innerHTML = '🔍 Inspect';
    inspectButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #1E3A8A;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
    font-weight: bold;
    z-index: 10000;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    min-width: 44px;
    touch-action: manipulation;
    `;
    
    inspectButton.addEventListener('mouseenter', () => {
        inspectButton.style.background = '#FF8C42';
        inspectButton.style.transform = 'scale(1.05)';
    });
    
    inspectButton.addEventListener('mouseleave', () => {
        inspectButton.style.background = AnimationConfig.inspectMode ? '#2D5016' : '#1E3A8A';
        inspectButton.style.transform = 'scale(1)';
    });
    
    inspectButton.addEventListener('click', () => toggleInspectMode(inspectButton));
    document.body.appendChild(inspectButton);

    // Create inspect mode indicator
    const inspectIndicator = document.createElement('div');
    inspectIndicator.id = 'inspect-indicator';
    inspectIndicator.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: #2D5016;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
    font-weight: bold;
    z-index: 10000;
    display: none;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    font-family: monospace;
    `;
    inspectIndicator.textContent = '🔍 INSPECT MODE ACTIVE';
    document.body.appendChild(inspectIndicator);

    // Create element info panel
    const infoPanel = document.createElement('div');
    infoPanel.id = 'element-info-panel';
    infoPanel.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 10001;
        display: none;
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;
    
    infoPanel.innerHTML = `
        <div style="padding: 20px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; color: #1E3A8A; font-size: 18px;">🔍 Element Information</h3>
            <button id="close-panel" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #6B7280;">×</button>
        </div>
        <div id="panel-content" style="padding: 20px;"></div>
        <div style="padding: 15px 20px; border-top: 1px solid #e5e7eb; background: #f9fafb; display: flex; gap: 10px; flex-wrap: wrap;">
            <button id="copy-info" style="flex: 1; padding: 10px 15px; background: #1E3A8A; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">📋 Copy Info</button>
            <button id="copy-selector" style="flex: 1; padding: 10px 15px; background: #FF8C42; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">🎯 Copy Selector</button>
            <button id="close-panel-btn" style="flex: 1; padding: 10px 15px; background: #6B7280; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">❌ Close</button>
        </div>
    `;
    
    document.body.appendChild(infoPanel);
    
    // Panel event listeners
    document.getElementById('close-panel').addEventListener('click', closeInfoPanel);
    document.getElementById('close-panel-btn').addEventListener('click', closeInfoPanel);
    document.getElementById('copy-info').addEventListener('click', copyElementInfo);
    document.getElementById('copy-selector').addEventListener('click', copyElementSelector);
    
    // Close panel when clicking outside
    infoPanel.addEventListener('click', (e) => {
        if (e.target === infoPanel) {
            closeInfoPanel();
        }
    });

    // Add keyboard shortcut listener
    document.addEventListener('keydown', (e) => {
        // Ctrl+Shift+I to toggle inspect mode
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            toggleInspectMode(inspectButton);
        }
        // Escape to close panel
        if (e.key === 'Escape') {
            closeInfoPanel();
        }
    });

    // Add console command to enable inspect mode
    window.enableInspectMode = () => toggleInspectMode(inspectButton);
    window.disableInspectMode = () => {
        if (AnimationConfig.inspectMode) {
            toggleInspectMode(inspectButton);
        }
    };

    console.log('%c🔍 Inspect Mode ENABLED (debug=inspect detected)', 'color: #2D5016; font-size: 16px; font-weight: bold;');
    console.log('%cClick the 🔍 Inspect button to start inspecting elements', 'color: #666; font-size: 12px;');
}

function toggleInspectMode(inspectButton) {
    AnimationConfig.inspectMode = !AnimationConfig.inspectMode;
    
    const inspectIndicator = document.getElementById('inspect-indicator');
    
    if (AnimationConfig.inspectMode) {
        inspectButton.innerHTML = '✅ Inspecting';
        inspectButton.style.background = '#2D5016';
        inspectIndicator.style.display = 'block';
        document.body.style.cursor = 'crosshair';
        document.addEventListener('mouseover', handleInspectHover);
        document.addEventListener('mouseout', handleInspectHoverOut);
        document.addEventListener('click', handleInspectClick);
        console.log('%c✅ Inspect Mode ENABLED - Click any element to inspect it', 'color: #2D5016; font-size: 14px; font-weight: bold;');
    } else {
        inspectButton.innerHTML = '🔍 Inspect';
        inspectButton.style.background = '#1E3A8A';
        inspectIndicator.style.display = 'none';
        document.body.style.cursor = '';
        document.removeEventListener('mouseover', handleInspectHover);
        document.removeEventListener('mouseout', handleInspectHoverOut);
        document.removeEventListener('click', handleInspectClick);
        
        // Remove all inspect highlights
        document.querySelectorAll('.inspect-highlight').forEach(el => {
            el.style.outline = '';
            el.style.outlineOffset = '';
            el.classList.remove('inspect-highlight');
        });
        
        console.log('%c❌ Inspect Mode DISABLED', 'color: #dc2626; font-size: 14px; font-weight: bold;');
    }
}

function handleInspectHover(e) {
    if (!AnimationConfig.inspectMode) return;
    
    const element = e.target;
    
    // Skip if it's the inspect button or indicator
    if (element.id === 'inspect-indicator' || element.id === 'inspect-toggle-button' || element.closest('#inspect-toggle-button')) return;
    
    // Add highlight
    element.style.outline = '3px solid #FF8C42';
    element.style.outlineOffset = '2px';
    element.classList.add('inspect-highlight');
}

function handleInspectHoverOut(e) {
    if (!AnimationConfig.inspectMode) return;
    
    const element = e.target;
    
    // Skip if it's the inspect button or indicator
    if (element.id === 'inspect-indicator' || element.id === 'inspect-toggle-button' || element.closest('#inspect-toggle-button')) return;
    
    // Remove highlight
    element.style.outline = '';
    element.style.outlineOffset = '';
    element.classList.remove('inspect-highlight');
}

function handleInspectClick(e) {
    if (!AnimationConfig.inspectMode) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const element = e.target;
    
    // Skip if it's the inspect button or indicator
    if (element.id === 'inspect-indicator' || element.id === 'inspect-toggle-button' || element.closest('#inspect-toggle-button')) return;
    
    // Store current element
    window.$0 = element;
    
    // Show info panel with element details
    showElementInfoPanel(element);
    
    // Also log to console for backup
    console.log('%c🔍 ELEMENT INSPECTED', 'color: #1E3A8A; font-size: 16px; font-weight: bold; border-bottom: 2px solid #1E3A8A;');
    console.log('🎯 Element:', element);
    console.log('%c✨ Element stored in $0 for quick access', 'color: #2D5016; font-style: italic;');
}

function showElementInfoPanel(element) {
    const panel = document.getElementById('element-info-panel');
    const content = document.getElementById('panel-content');
    
    const elementInfo = {
        tag: element.tagName.toLowerCase(),
        id: element.id || 'none',
        classes: element.className || 'none',
        text: element.textContent?.substring(0, 100) + (element.textContent?.length > 100 ? '...' : '') || 'none',
        html: element.outerHTML?.substring(0, 300) + '...' || 'none',
        attributes: getElementAttributes(element),
        styles: getComputedStyles(element),
        position: getElementPosition(element),
        dimensions: getElementDimensions(element),
        selector: getElementSelector(element)
    };
    
    // Store current element info for copying
    window.currentElementInfo = elementInfo;
    
    content.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h4 style="color: #1E3A8A; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">📋 Basic Information</h4>
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; font-size: 13px; line-height: 1.8;">
                <div><strong>Tag:</strong> ${elementInfo.tag}</div>
                <div><strong>ID:</strong> ${elementInfo.id}</div>
                <div><strong>Classes:</strong> ${elementInfo.classes}</div>
                <div><strong>Selector:</strong> <code style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">${elementInfo.selector}</code></div>
            </div>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h4 style="color: #1E3A8A; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">📐 Dimensions & Position</h4>
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; font-size: 13px; line-height: 1.8;">
                <div><strong>Width:</strong> ${elementInfo.dimensions.width}px</div>
                <div><strong>Height:</strong> ${elementInfo.dimensions.height}px</div>
                <div><strong>Position:</strong> Top: ${Math.round(elementInfo.position.top)}px, Left: ${Math.round(elementInfo.position.left)}px</div>
            </div>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h4 style="color: #1E3A8A; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">🎨 Key Styles</h4>
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; font-size: 13px; line-height: 1.8;">
                <div><strong>Display:</strong> ${elementInfo.styles.display}</div>
                <div><strong>Position:</strong> ${elementInfo.styles.position}</div>
                <div><strong>Background:</strong> ${elementInfo.styles.backgroundColor}</div>
                <div><strong>Color:</strong> ${elementInfo.styles.color}</div>
                <div><strong>Font Size:</strong> ${elementInfo.styles.fontSize}</div>
            </div>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h4 style="color: #1E3A8A; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">⚙️ Attributes</h4>
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; font-size: 13px; line-height: 1.8; max-height: 150px; overflow-y: auto;">
                ${Object.keys(elementInfo.attributes).length > 0 ? 
                    Object.entries(elementInfo.attributes).map(([key, value]) => 
                        `<div><strong>${key}:</strong> ${value}</div>`
                    ).join('') : 
                    '<div style="color: #6B7280;">No attributes</div>'}
            </div>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h4 style="color: #1E3A8A; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">📝 Text Content</h4>
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; font-size: 13px; line-height: 1.6; max-height: 100px; overflow-y: auto;">
                ${elementInfo.text}
            </div>
        </div>
        
        <div>
            <h4 style="color: #1E3A8A; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">💡 Quick Actions for Devin</h4>
            <div style="background: #eff6ff; padding: 15px; border-radius: 8px; font-size: 13px; line-height: 1.8; border-left: 4px solid #1E3A8A;">
                <div><strong>Element:</strong> $0</div>
                <div><strong>Hide:</strong> $0.style.display = "none"</div>
                <div><strong>Background:</strong> $0.style.backgroundColor = "red"</div>
                <div><strong>Text:</strong> $0.textContent = "New Text"</div>
                <div><strong>Click:</strong> $0.click()</div>
            </div>
        </div>
    `;
    
    panel.style.display = 'block';
}

function closeInfoPanel() {
    const panel = document.getElementById('element-info-panel');
    panel.style.display = 'none';
}

function copyElementInfo() {
    if (!window.currentElementInfo) return;
    
    const infoText = `
ELEMENT INFORMATION FOR DEVIN:
================================
Tag: ${window.currentElementInfo.tag}
ID: ${window.currentElementInfo.id}
Classes: ${window.currentElementInfo.classes}
Selector: ${window.currentElementInfo.selector}

Dimensions: ${window.currentElementInfo.dimensions.width}px x ${window.currentElementInfo.dimensions.height}px
Position: Top: ${Math.round(window.currentElementInfo.position.top)}px, Left: ${Math.round(window.currentElementInfo.position.left)}px

Key Styles:
- Display: ${window.currentElementInfo.styles.display}
- Position: ${window.currentElementInfo.styles.position}
- Background: ${window.currentElementInfo.styles.backgroundColor}
- Color: ${window.currentElementInfo.styles.color}
- Font Size: ${window.currentElementInfo.styles.fontSize}

Text Content: ${window.currentElementInfo.text}

Quick Actions:
- Element: $0
- Hide: $0.style.display = "none"
- Change background: $0.style.backgroundColor = "red"
- Change text: $0.textContent = "New Text"
- Click: $0.click()
    `.trim();
    
    navigator.clipboard.writeText(infoText).then(() => {
        alert('✅ Element info copied to clipboard! Paste it in Devin to help with debugging.');
    }).catch(() => {
        console.log('Failed to copy to clipboard');
    });
}

function copyElementSelector() {
    if (!window.currentElementInfo) return;
    
    const selector = window.currentElementInfo.selector;
    navigator.clipboard.writeText(selector).then(() => {
        alert('✅ Selector copied: ' + selector);
    }).catch(() => {
        console.log('Failed to copy selector');
    });
}

function getElementAttributes(element) {
    const attrs = {};
    for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        attrs[attr.name] = attr.value;
    }
    return attrs;
}

function getComputedStyles(element) {
    const computed = window.getComputedStyle(element);
    const importantStyles = {
        display: computed.display,
        position: computed.position,
        width: computed.width,
        height: computed.height,
        margin: computed.margin,
        padding: computed.padding,
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        fontSize: computed.fontSize,
        fontFamily: computed.fontFamily,
        zIndex: computed.zIndex,
        opacity: computed.opacity
    };
    return importantStyles;
}

function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        bottom: rect.bottom + window.scrollY,
        right: rect.right + window.scrollX
    };
}

function getElementDimensions(element) {
    const rect = element.getBoundingClientRect();
    return {
        width: rect.width,
        height: rect.height,
        innerWidth: element.innerWidth,
        innerHeight: element.innerHeight,
        outerWidth: element.offsetWidth,
        outerHeight: element.offsetHeight
    };
}

function getElementSelector(element) {
    if (element.id) {
        return '#' + element.id;
    }
    if (element.className) {
        return '.' + element.className.split(' ')[0];
    }
    return element.tagName.toLowerCase();
}