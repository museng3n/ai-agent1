// server.js - Main server file for CREATE AI Framework Backend
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Add this if missing
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const ghlWebhookHandler = require('./ghl_webhook_handler');

// Initialize the server
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/ghl_webhook_handler', ghlWebhookHandler);

// Initialize Gemini AI API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to construct prompt based on student's framework
function constructPrompt(requestData) {
    const { 
        frameworkElement, 
        contentType, 
        contentTopic, 
        platform, 
        goal, 
        additionalContext, 
        userFramework 
    } = requestData;
    
    // Get the strategies for the selected framework element
    const elementStrategies = userFramework[frameworkElement.toLowerCase()] || [];
    const strategiesText = elementStrategies.join('\n- ');
    
    return `
You are an AI content creator specialized in the CREATE framework for social media marketing.

Create a ${contentType} for ${platform} that implements the ${frameworkElement} element of the CREATE framework.

The content should focus on: ${contentTopic}
Content goal: ${goal}

STUDENT'S SPECIFIC ${frameworkElement.toUpperCase()} STRATEGIES:
- ${strategiesText}

Business details: ${userFramework.businessDescription}
Target audience: ${userFramework.targetAudience}
Brand voice: ${userFramework.brandVoice}

Additional context: ${additionalContext || 'None provided'}

Focus on creating content that feels authentic to their specific business approach and uses their unique ${frameworkElement} strategies.

The content should be complete, properly formatted, and ready to use on ${platform}.
    `;
}

// Main API endpoint for generating content
app.post('/api/generate-content', async (req, res) => {
    try {
        const requestData = req.body;
        
        // Validate request
        if (!requestData.frameworkElement || !requestData.contentType || !requestData.userFramework) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields' 
            });
        }
        
        // Construct prompt
        const prompt = constructPrompt(requestData);
        
        // Call Gemini API
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const generatedContent = response.text();
        
        // Return the generated content
        return res.json({
            success: true,
            content: generatedContent,
            frameworkElement: requestData.frameworkElement,
            contentType: requestData.contentType,
            platform: requestData.platform
        });
        
    } catch (error) {
        console.error('Error generating content:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message || 'Error generating content' 
        });
    }
});

// Endpoint to save user framework data
app.post('/api/save-framework', async (req, res) => {
    try {
        const frameworkData = req.body;
        
        // Validate request
        if (!frameworkData.userId || !frameworkData.element) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields' 
            });
        }
        
        // Here you would typically save to a database
        // For now, we'll simulate successful saving
        
        return res.json({
            success: true,
            message: `${frameworkData.element} element saved successfully`
        });
        
    } catch (error) {
        console.error('Error saving framework:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message || 'Error saving framework data' 
        });
    }
});

// Get user framework data
app.get('/api/get-framework/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        
        // Here you would typically retrieve from a database
        // For now, we'll return mock data
        
        const mockFramework = {
            businessName: "FitWithSara",
            businessDescription: "Personal training focused on busy professionals",
            targetAudience: "Working professionals ages 30-45",
            brandVoice: "Motivational and supportive",
            connect: [
                "Daily workout form videos with tips",
                "Weekly meal prep walkthroughs",
                "Client transformation Fridays",
                "Live Q&A sessions on nutrition",
                "Personal fitness journey stories"
            ],
            revolutionize: [
                "Online training app launch",
                "Virtual group workout rooms",
                "AI form correction feature",
                "Personalized nutrition tracking"
            ],
            engage: [
                "30-day challenge groups",
                "Before/after photo contests",
                "Recipe sharing community",
                "Weekly accountability check-ins",
                "Member spotlight features"
            ],
            // Other elements would be here
        };
        
        return res.json({
            success: true,
            framework: mockFramework
        });
        
    } catch (error) {
        console.error('Error retrieving framework:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message || 'Error retrieving framework data' 
        });
    }
});
app.get('/api/data', (req, res) => {
    res.json({ data: [1, 2, 3, 4, 5] });
});

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// Export the Express API
module.exports = app;