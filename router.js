// Health App Router
class HealthAppRouter {
    constructor() {
        this.routes = new Map();
        this.currentPage = null;
        this.pageContainer = null;
        this.breadcrumbContainer = null;
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    init() {
        this.pageContainer = document.getElementById('page-content');
        this.breadcrumbContainer = document.getElementById('breadcrumb');
        
        // Set up route definitions
        this.setupRoutes();
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.loadPage(e.state.page, false);
            }
        });
        
        // Handle initial page load
        const initialPage = this.getPageFromUrl() || 'dashboard';
        this.loadPage(initialPage, false);
        
        // Set up navigation event listeners
        this.setupNavigation();
    }
    
    setupRoutes() {
        this.routes.set('dashboard', {
            title: 'My Health Dashboard',
            file: 'pages/dashboard.html',
            breadcrumb: [{ text: 'My Health', url: '#dashboard' }]
        });
        
        // Longevity & Aging Pages
        this.routes.set('biological-age', {
            title: 'Biological Age (Blood)',
            file: 'pages/biological-age.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'Biological Age', url: '#biological-age' }
            ]
        });
        
        this.routes.set('biological-age-methylation', {
            title: 'Biological Age (Methylation)',
            file: 'pages/biological-age-methylation.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'Biological Age (Methylation)', url: '#biological-age-methylation' }
            ]
        });
        
        this.routes.set('lifespan', {
            title: 'Lifespan Projection',
            file: 'pages/lifespan.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'Lifespan Projection', url: '#lifespan' }
            ]
        });
        
        this.routes.set('healthspan', {
            title: 'Healthspan Projection',
            file: 'pages/healthspan.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'Healthspan', url: '#healthspan' }
            ]
        });
        
        // Health Systems Pages
        this.routes.set('cardiovascular', {
            title: 'Cardiovascular Health',
            file: 'pages/cardiovascular_updated.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'Cardiovascular', url: '#cardiovascular' }
            ]
        });
        
        this.routes.set('body-systems', {
            title: 'Body Systems Overview',
            file: 'pages/body-systems.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'Body Systems', url: '#body-systems' }
            ]
        });
        
        // Lab Results Hierarchy
        this.routes.set('lab-results', {
            title: 'Lab Results Overview',
            file: 'pages/lab_results_overview.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'Lab Results', url: '#lab-results' }
            ]
        });
        
        this.routes.set('lab-report', {
            title: 'Lab Report Details',
            file: 'pages/lab_results_page.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'Lab Results', url: '#lab-results' },
                { text: 'Lab Report', url: '#lab-report' }
            ]
        });
        
        this.routes.set('glucose', {
            title: 'Glucose Biomarker',
            file: 'pages/glucose.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'Lab Results', url: '#lab-results' },
                { text: 'Glucose', url: '#glucose' }
            ]
        });
        
        // Lifestyle & Habits Pages
        this.routes.set('nutrition', {
            title: 'Nutrition Analysis',
            file: 'pages/nutrition.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'Nutrition', url: '#nutrition' }
            ]
        });
        
        this.routes.set('lifestyle', {
            title: 'Lifestyle & Health Habits',
            file: 'pages/lifestyle.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'Lifestyle', url: '#lifestyle' }
            ]
        });
        
        // Symptoms & Conditions Pages
        this.routes.set('symptoms', {
            title: 'Symptoms & Conditions',
            file: 'pages/symptoms_landing v2.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'Symptoms', url: '#symptoms' }
            ]
        });
        
        this.routes.set('fatigue', {
            title: 'Fatigue Analysis',
            file: 'pages/fatigue_updated.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'Fatigue', url: '#fatigue' }
            ]
        });
        
        // Genetics & DNA Pages
        this.routes.set('dna-traits', {
            title: 'DNA Traits Analysis',
            file: 'pages/dna-traits.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'DNA Traits', url: '#dna-traits' }
            ]
        });
        
        // Metrics & Analytics Pages
        this.routes.set('composite-metrics', {
            title: 'Composite Metrics',
            file: 'pages/composite_metric_detail.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'Composite Metrics', url: '#composite-metrics' }
            ]
        });
        
        this.routes.set('wearable-metrics', {
            title: 'Wearable Metrics',
            file: 'pages/wearable_metric_detail.html',
            breadcrumb: [
                { text: 'My Health', url: '#dashboard' },
                { text: 'Wearable Metrics', url: '#wearable-metrics' }
            ]
        });
    }
    
    setupNavigation() {
        // Handle all navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const page = link.getAttribute('href').substring(1);
                this.navigateTo(page);
            }
        });
        
        // Handle back links specifically
        document.addEventListener('click', (e) => {
            if (e.target.matches('.back-link') || e.target.closest('.back-link')) {
                e.preventDefault();
                this.navigateTo('dashboard');
            }
        });
    }
    
    navigateTo(page) {
        if (this.routes.has(page)) {
            this.loadPage(page, true);
        } else {
            console.warn(`Page "${page}" not found, redirecting to dashboard`);
            this.loadPage('dashboard', true);
        }
    }
    
    async loadPage(page, updateHistory = true) {
        const route = this.routes.get(page);
        if (!route) {
            console.error(`Route for page "${page}" not found`);
            this.showErrorPage(`Page "${page}" not found`);
            return;
        }

        try {
            // Show loading state
            this.pageContainer.innerHTML = `
                <div class="loading-placeholder" style="text-align: center; padding: 4rem;">
                    <div class="spinner" style="margin: 0 auto 1rem;"></div>
                    <p>Loading ${route.title}...</p>
                </div>
            `;

            const response = await fetch(route.file);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const content = await response.text();
            this.pageContainer.innerHTML = content;
            
            // Update page title and breadcrumb
            document.title = route.title;
            this.updateBreadcrumb(route.breadcrumb);
            
            // Update browser history
            if (updateHistory) {
                const url = `#${page}`;
                history.pushState({ page }, route.title, url);
            }
            
            this.currentPage = page;
            this.initPageScripts();
            
        } catch (error) {
            console.error('Error loading page:', error);
            
            // For file:// protocol, show a helpful message
            if (location.protocol === 'file:') {
                this.showErrorPage(`
                    <h2>File Access Issue</h2>
                    <p>It looks like you're running this from a local file. For the best experience, please:</p>
                    <ol>
                        <li>Use a local web server (like Live Server in VS Code)</li>
                        <li>Or use a simple HTTP server like Python's: <code>python -m http.server 8000</code></li>
                        <li>Then visit: <code>http://localhost:8000</code></li>
                    </ol>
                    <p>Alternatively, you can view the individual page files in the pages/ folder.</p>
                    <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
                `);
            } else {
                this.showErrorPage(`
                    <h2>Failed to load page</h2>
                    <p>There was an error loading "${route.title}". Please try again.</p>
                    <button class="btn btn-primary" onclick="router.loadPage('${page}')">Retry</button>
                    <button class="btn btn-secondary" onclick="router.navigateTo('dashboard')">Go to Dashboard</button>
                `);
            }
        }
    }
    
    showErrorPage(content) {
        this.pageContainer.innerHTML = `
            <div class="error-page" style="text-align: center; padding: 4rem; max-width: 600px; margin: 0 auto;">
                <div style="font-size: 4rem; margin-bottom: 2rem;">⚠️</div>
                <div style="color: #374151; line-height: 1.6;">
                    ${content}
                </div>
            </div>
        `;
    }
    
    showLoading() {
        this.pageContainer.classList.add('loading');
        // You could add a spinner here
    }
    
    hideLoading() {
        this.pageContainer.classList.remove('loading');
    }
    
    showError(message) {
        this.pageContainer.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 2rem;">
                <h2>Oops! Something went wrong</h2>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="router.navigateTo('dashboard')">
                    Return to Dashboard
                </button>
            </div>
        `;
    }
    
    updateBreadcrumb(breadcrumbItems) {
        if (!this.breadcrumbContainer) return;
        
        const breadcrumbHtml = breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            if (isLast) {
                return `<span>${item.text}</span>`;
            } else {
                return `<a href="${item.url}">${item.text}</a>`;
            }
        }).join(' <span class="breadcrumb-separator">›</span> ');
        
        this.breadcrumbContainer.innerHTML = breadcrumbHtml;
    }
    
    getPageFromUrl() {
        const hash = window.location.hash.substring(1);
        return hash || null;
    }
    
    initPageScripts() {
        // Re-initialize any page-specific JavaScript
        // This is where you'd call functions that need to run after page load
        
        // Example: Re-attach event listeners for charts, forms, etc.
        if (typeof initCharts === 'function') {
            initCharts();
        }
        
        if (typeof initForms === 'function') {
            initForms();
        }
        
        // Initialize tabs for pages that have them
        this.initTabs();
        
        // Scroll to top of page
        window.scrollTo(0, 0);
    }
    
    initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        if (tabBtns.length === 0) return;

        tabBtns.forEach(btn => {
            // Remove any existing listeners to prevent duplicates
            btn.replaceWith(btn.cloneNode(true));
        });

        // Re-query after replacing elements
        const newTabBtns = document.querySelectorAll('.tab-btn');
        
        newTabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.dataset.tab;

                // Remove active class from all buttons and panels
                newTabBtns.forEach(b => b.classList.remove('active'));
                tabPanels.forEach(p => p.classList.remove('active'));

                // Add active class to clicked button and corresponding panel
                this.classList.add('active');
                const targetPanel = document.getElementById(targetTab);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
    
    // Utility method for external use
    getCurrentPage() {
        return this.currentPage;
    }
    
    // Method to refresh current page
    refresh() {
        if (this.currentPage) {
            this.loadPage(this.currentPage, false);
        }
    }
    
    // Global utility functions
    static showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Style the toast
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#7c3aed',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: '1000',
            fontSize: '14px',
            fontWeight: '500',
            maxWidth: '300px',
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'all 0.3s ease'
        });
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }
    
    // Tab switching functionality
    static switchTab(tabId, buttonElement) {
        // Hide all tab panels
        const tabPanels = document.querySelectorAll('.tab-panel');
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Remove active class from all tab buttons
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Show selected tab panel
        const selectedPanel = document.getElementById(tabId);
        if (selectedPanel) {
            selectedPanel.classList.add('active');
        }
        
        // Add active class to clicked button
        if (buttonElement) {
            buttonElement.classList.add('active');
        }
    }
}

// Initialize router
const router = new HealthAppRouter();

// Export for external use
window.router = router;
