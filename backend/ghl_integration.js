// ghl-integration.js - Script to integrate CREATE AI with Go High Level

// Configuration
const API_ENDPOINT = 'https://your-create-ai-backend.com/api';
const PRIMARY_API_ENDPOINT = "https://create-ai-framework.vercel.app";
const ALTERNATIVE_API_ENDPOINT = "https://create-al-framework-4gh4hnqfb-museng3ns-projectsvercel.app";

// Utility functions
function getUserId() {
    // In GHL, you would get this from the URL or session
    // For testing, we'll use a fixed value
    return 'user_123456';
}

function showLoading(isLoading) {
    const loadingElement = document.getElementById('loading-indicator');
    if (loadingElement) {
        loadingElement.style.display = isLoading ? 'flex' : 'none';
    }
}

function showNotification(message, type = 'success') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '8px';
        notification.style.color = 'white';
        notification.style.fontWeight = '500';
        notification.style.zIndex = '1000';
        notification.style.transition = 'all 0.3s ease';
        document.body.appendChild(notification);
    }
    
    // Set style based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#38b000';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ff006e';
    } else if (type === 'warning') {
        notification.style.backgroundColor = '#ffbe0b';
    }
    
    notification.textContent = message;
    notification.style.display = 'block';
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// === AI SETUP PAGE FUNCTIONS ===

// Save framework element data
async function saveFrameworkElement(element, strategies) {
    try {
        showLoading(true);
        
        const userId = getUserId();
        const response = await fetch(`${API_ENDPOINT}/save-framework`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                element,
                strategies
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification(`${element} strategies saved successfully!`);
            return true;
        } else {
            showNotification(`Error: ${data.error}`, 'error');
            return false;
        }
    } catch (error) {
        console.error('Error saving framework element:', error);
        showNotification('Error saving data. Please try again.', 'error');
        return false;
    } finally {
        showLoading(false);
    }
}

// Load user framework data
async function loadUserFramework() {
    try {
        showLoading(true);
        
        const userId = getUserId();
        const response = await fetch(`${API_ENDPOINT}/get-framework/${userId}`);
        const data = await response.json();
        
        if (data.success) {
            populateFrameworkForm(data.framework);
            return data.framework;
        } else {
            showNotification(`Error: ${data.error}`, 'error');
            return null;
        }
    } catch (error) {
        console.error('Error loading framework data:', error);
        showNotification('Error loading your data. Please refresh the page.', 'error');
        return null;
    } finally {
        showLoading(false);
    }
}

// Populate framework form with saved data
function populateFrameworkForm(framework) {
    // Business info
    if (document.getElementById('business-name')) {
        document.getElementById('business-name').value = framework.businessName || '';
    }
    
    if (document.getElementById('business-description')) {
        document.getElementById('business-description').value = framework.businessDescription || '';
    }
    
    if (document.getElementById('target-audience')) {
        document.getElementById('target-audience').value = framework.targetAudience || '';
    }
    
    if (document.getElementById('brand-voice')) {
        const brandVoiceSelect = document.getElementById('brand-voice');
        if (framework.brandVoice) {
            // Find and select the matching option
            for (let i = 0; i < brandVoiceSelect.options.length; i++) {
                if (brandVoiceSelect.options[i].value === framework.brandVoice) {
                    brandVoiceSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }
    
    // Framework elements
    const currentElement = getCurrentFrameworkElement();
    if (currentElement && framework[currentElement.toLowerCase()]) {
        const strategies = framework[currentElement.toLowerCase()];
        populateStrategyInputs(strategies);
    }
}

// Get current framework element from URL or page state
function getCurrentFrameworkElement() {
    // This would depend on your page structure
    // For now, we'll check active elements or URL params
    
    const activeElement = document.querySelector('.framework-element.active');
    if (activeElement) {
        return activeElement.textContent.trim();
    }
    
    // Check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('element') || 'Connect';
}

// Populate strategy inputs with saved strategies
function populateStrategyInputs(strategies) {
    const strategyList = document.querySelector('.strategy-list');
    if (!strategyList) return;
    
    // Clear existing inputs
    strategyList.innerHTML = '';
    
    // Add inputs for each strategy
    strategies.forEach(strategy => {
        const item = document.createElement('div');
        item.className = 'strategy-item';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'strategy-input';
        input.value = strategy;
        
        item.appendChild(input);
        strategyList.appendChild(item);
    });
    
    // Add empty input if needed
    if (strategies.length === 0) {
        addEmptyStrategyInput();
    }
}

// Add empty strategy input
function addEmptyStrategyInput() {
    const strategyList = document.querySelector('.strategy-list');
    if (!strategyList) return;
    
    const item = document.createElement('div');
    item.className = 'strategy-item';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'strategy-input';
    input.placeholder = 'Enter your strategy here...';
    
    item.appendChild(input);
    strategyList.appendChild(item);
}

// Get strategies from input fields
function getStrategiesFromInputs() {
    const inputs = document.querySelectorAll('.strategy-input');
    const strategies = [];
    
    inputs.forEach(input => {
        const strategy = input.value.trim();
        if (strategy) {
            strategies.push(strategy);
        }
    });
    
    return strategies;
}

// Setup listeners for AI Setup page
function setupAiSetupPage() {
    // Load existing data
    loadUserFramework();
    
    // Add strategy button
    const addBtn = document.querySelector('.add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', addEmptyStrategyInput);
    }
    
    // Next button
    const nextBtn = document.querySelector('.btn-primary');
    if (nextBtn) {
        nextBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const element = getCurrentFrameworkElement();
            const strategies = getStrategiesFromInputs();
            
            if (strategies.length === 0) {
                showNotification('Please add at least one strategy', 'warning');
                return;
            }
            
            const saved = await saveFrameworkElement(element, strategies);
            if (saved) {
                // Navigate to next element or page
                // This depends on your GHL setup
                window.location.href = getNextElementUrl(element);
            }
        });
    }
    
    // Save & Exit button
    const saveBtn = document.querySelector('.btn-secondary');
    if (saveBtn) {
        saveBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const element = getCurrentFrameworkElement();
            const strategies = getStrategiesFromInputs();
            
            if (strategies.length > 0) {
                await saveFrameworkElement(element, strategies);
            }
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
}

// Get URL for next element
function getNextElementUrl(currentElement) {
    const elements = ['Connect', 'Revolutionize', 'Engage', 'Analyze', 'Target', 'Expand'];
    const currentIndex = elements.indexOf(currentElement);
    
    if (currentIndex < elements.length - 1) {
        return `ai-setup.html?element=${elements[currentIndex + 1]}`;
    } else {
        return 'dashboard.html';
    }
}

// === CONTENT GENERATOR PAGE FUNCTIONS ===

// Generate content
async function generateContent() {
    try {
        showLoading(true);
        
        // Get form data
        const frameworkElement = document.querySelector('.framework-element.active').textContent.trim();
        const contentType = document.querySelector('.content-type.selected .content-label').textContent.trim();
        const platform = document.querySelector('.platform-option.selected').textContent.trim();
        const contentTopic = document.getElementById('content-topic').value;
        const contentGoal = document.getElementById('content-goal').value;
        const additionalContext = document.getElementById('additional-context').value;
        
        // Validate inputs
        if (!contentTopic) {
            showNotification('Please enter a content topic', 'warning');
            return;
        }
        
        // Get user framework data
        const userId = getUserId();
        const frameworkResponse = await fetch(`${API_ENDPOINT}/get-framework/${userId}`);
        const frameworkData = await frameworkResponse.json();
        
        if (!frameworkData.success) {
            showNotification('Error loading your framework data', 'error');
            return;
        }
        
        // Generate content
        const response = await fetch(`${API_ENDPOINT}/generate-content`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                frameworkElement,
                contentType,
                contentTopic,
                platform,
                goal: contentGoal,
                additionalContext,
                userFramework: frameworkData.framework
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayGeneratedContent(data.content, contentType, platform);
            showNotification('Content generated successfully!');
        } else {
            showNotification(`Error: ${data.error}`, 'error');
        }
    } catch (error) {
        console.error('Error generating content:', error);
        showNotification('Error generating content. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Display generated content
function displayGeneratedContent(content, contentType, platform) {
    const outputArea = document.querySelector('.output-area');
    const outputContent = document.querySelector('.output-content');
    
    if (outputArea && outputContent) {
        // Show output area if hidden
        outputArea.style.display = 'block';
        
        // Set content
        outputContent.innerHTML = `
            <h3>${contentType} - ${platform}</h3>
            ${formatContent(content)}
        `;
        
        // Scroll to output
        outputArea.scrollIntoView({ behavior: 'smooth' });
    }
}

// Format content for display
function formatContent(content) {
    // Convert plain text to HTML with paragraphs
    return content
        .split('\n\n')
        .map(para => `<p>${para}</p>`)
        .join('');
}

// Setup listeners for Content Generator page
function setupContentGeneratorPage() {
    // Framework element selection
    const frameworkElements = document.querySelectorAll('.framework-element');
    frameworkElements.forEach(element => {
        element.addEventListener('click', () => {
            frameworkElements.forEach(el => el.classList.remove('active'));
            element.classList.add('active');
        });
    });
    
    // Content type selection
    const contentTypes = document.querySelectorAll('.content-type');
    contentTypes.forEach(type => {
        type.addEventListener('click', () => {
            contentTypes.forEach(t => t.classList.remove('selected'));
            type.classList.add('selected');
        });
    });
    
    // Platform selection
    const platformOptions = document.querySelectorAll('.platform-option');
    platformOptions.forEach(option => {
        option.addEventListener('click', () => {
            platformOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
    
    // Generate button
    const generateBtn = document.querySelector('.generate-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateContent);
    }
    
    // Copy button
    const copyBtn = document.querySelector('.output-btn:nth-child(3)');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const content = document.querySelector('.output-content').innerText;
            navigator.clipboard.writeText(content)
                .then(() => showNotification('Content copied to clipboard!'))
                .catch(err => showNotification('Failed to copy content', 'error'));
        });
    }
    
    // Save button
    const saveBtn = document.querySelector('.output-btn.primary');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            // In GHL, you would save to user's saved content
            showNotification('Content saved successfully!');
        });
    }
}

// === DASHBOARD PAGE FUNCTIONS ===

// Load dashboard data
async function loadDashboardData() {
    try {
        showLoading(true);
        
        const userId = getUserId();
        
        // Get framework status
        const frameworkResponse = await fetch(`${API_ENDPOINT}/get-framework/${userId}`);
        const frameworkData = await frameworkResponse.json();
        
        if (frameworkData.success) {
            updateFrameworkStatus(frameworkData.framework);
        }
        
        // Get usage stats
        // Get recent content
        // In a real implementation, you'd have endpoints for these
        
        showNotification('Dashboard updated');
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showNotification('Error loading dashboard data', 'error');
    } finally {
        showLoading(false);
    }
}

// Update framework status display
function updateFrameworkStatus(framework) {
    const frameworkItems = document.querySelectorAll('.framework-item');
    
    const elements = ['connect', 'revolutionize', 'engage', 'analyze', 'target', 'expand'];
    
    elements.forEach((element, index) => {
        if (frameworkItems[index]) {
            const letterElement = frameworkItems[index].querySelector('.framework-letter');
            const progressElement = frameworkItems[index].querySelector('.framework-progress');
            
            if (framework[element] && framework[element].length > 0) {
                letterElement.classList.remove('incomplete');
                progressElement.textContent = `Complete (${framework[element].length} strategies)`;
            } else {
                letterElement.classList.add('incomplete');
                progressElement.textContent = 'Not started';
            }
        }
    });
}

// Setup dashboard page
function setupDashboardPage() {
    loadDashboardData();
    
    // Create Content button
    const createBtn = document.querySelector('.action-btn');
    if (createBtn) {
        createBtn.addEventListener('click', () => {
            window.location.href = 'content-generator.html';
        });
    }
    
    // Continue Setup button
    const setupBtn = document.querySelector('.setup-btn');
    if (setupBtn) {
        setupBtn.addEventListener('click', () => {
            window.location.href = 'ai-setup.html';
        });
    }
}

// === HELP CENTER FUNCTIONS ===

// Setup help center page
function setupHelpCenterPage() {
    // FAQ toggles
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('open');
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.toLowerCase();
                searchHelpContent(searchTerm);
            }
        });
    }
}

// Search help content
function searchHelpContent(term) {
    // In a real implementation, you would search through help content
    showNotification(`Searching for "${term}"...`);
}

// === INITIALIZATION ===

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    // Determine which page we're on
    if (window.location.href.includes('ai-setup')) {
        setupAiSetupPage();
    } else if (window.location.href.includes('content-generator')) {
        setupContentGeneratorPage();
    } else if (window.location.href.includes('help-center')) {
        setupHelpCenterPage();
    } else {
        // Default to dashboard
        setupDashboardPage();
    }
});
