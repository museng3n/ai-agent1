// ghl-webhook-handler.js
// This file handles webhook communication between Go High Level and your CREATE AI backend

/**
 * Go High Level Webhook Configuration Guide
 * 
 * This file provides guidance for setting up webhooks in Go High Level to connect
 * with your CREATE AI backend. In GHL, you'll need to:
 * 
 * 1. Create Webhook Connections
 * 2. Set up Triggers to send data to your backend
 * 3. Configure Workflows to process responses
 */

// === WEBHOOK ENDPOINTS ===

/**
 * Main webhook endpoints you'll need to create on your backend:
 * 
 * 1. /webhook/framework-save
 *    - Receives framework data from GHL
 *    - Saves it to your database
 *    - Returns success/failure status
 * 
 * 2. /webhook/content-generate
 *    - Receives content generation requests from GHL
 *    - Generates content using the AI
 *    - Returns the generated content
 * 
 * 3. /webhook/user-data
 *    - Receives requests for user data
 *    - Returns user framework data and stats
 */

// Example webhook handler code for framework-save endpoint:
const express = require('express');
const router = express.Router();

// Save framework data webhook
router.post('/webhook/framework-save', async (req, res) => {
    try {
        const {
            userId,
            contactId, // GHL contact ID
            element,
            strategies,
            businessInfo
        } = req.body;
        
        // Validate GHL webhook authentication
        if (!validateGHLWebhook(req)) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized webhook request'
            });
        }
        
        // Save framework data to database
        // This is where you'd connect to your database and save the data
        
        // Return success response
        return res.json({
            success: true,
            message: `${element} saved successfully`,
            // Include data GHL needs for follow-up actions
            contactId: contactId,
            completedElements: ['Connect', 'Revolutionize'] // Example
        });
        
    } catch (error) {
        console.error('Error handling framework save webhook:', error);
        return res.status(500).json({
            success: false,
            error: 'Error processing webhook request'
        });
    }
});

// Generate content webhook
router.post('/webhook/content-generate', async (req, res) => {
    try {
        const {
            userId,
            contactId,
            frameworkElement,
            contentType,
            contentTopic,
            platform,
            goal,
            additionalContext
        } = req.body;
        
        // Validate GHL webhook authentication
        if (!validateGHLWebhook(req)) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized webhook request'
            });
        }
        
        // Get user's framework data from database
        // const userFramework = await getUserFramework(userId);
        
        // Generate content using AI
        // const generatedContent = await generateContent(frameworkElement, contentType, contentTopic, platform, goal, additionalContext, userFramework);
        
        // Return generated content
        return res.json({
            success: true,
            content: "Example generated content would go here",
            contentType: contentType,
            platform: platform,
            contactId: contactId
        });
        
    } catch (error) {
        console.error('Error handling content generation webhook:', error);
        return res.status(500).json({
            success: false,
            error: 'Error processing webhook request'
        });
    }
});

// Webhook authentication validation
function validateGHLWebhook(req) {
    // In a real implementation, you would:
    // 1. Verify the signature/token from GHL
    // 2. Validate the request origin
    // 3. Check if the request is within allowed time window
    
    // For now, we'll assume it's valid
    return true;
}

module.exports = router;

/**
 * === GO HIGH LEVEL CONFIGURATION STEPS ===
 * 
 * 1. CREATE WEBHOOK CONNECTIONS
 *    - Go to Settings > Integrations > Webhooks
 *    - Add New Webhook
 *    - Enter your backend URL (e.g., https://your-backend.com/webhook/framework-save)
 *    - Configure authentication (if using)
 *    - Save the webhook
 * 
 * 2. SET UP CUSTOM FIELDS
 *    - Go to Settings > Custom Fields
 *    - Create fields to store framework data:
 *      - business_name (Text)
 *      - business_description (Text Area)
 *      - target_audience (Text)
 *      - brand_voice (Dropdown)
 *      - connect_strategies (Text Area - stores JSON)
 *      - revolutionize_strategies (Text Area - stores JSON)
 *      - engage_strategies (Text Area - stores JSON)
 *      - analyze_strategies (Text Area - stores JSON)
 *      - target_strategies (Text Area - stores JSON)
 *      - expand_strategies (Text Area - stores JSON)
 * 
 * 3. CREATE WORKFLOW TRIGGERS
 *    - Go to Automations > Workflows
 *    - Create a new workflow for each form submission
 *    - Set trigger to "Form Submitted" (your framework form)
 *    - Add a "Webhook" action
 *    - Select your webhook
 *    - Map form fields to webhook parameters
 *    - Add a "Conditional" to handle webhook response
 *    - Save and activate the workflow
 * 
 * 4. CREATE CONTENT GENERATION WORKFLOW
 *    - Create a workflow triggered by content form submission
 *    - Add webhook action to /webhook/content-generate
 *    - Add a "Update Contact" action to save generated content
 *    - Add a "Show Notification" action to display success message
 *    - Save and activate
 */

// === DATA MAPPING EXAMPLE ===

/**
 * Example of how to map form data to webhook in GHL:
 * 
 * Webhook payload structure:
 * {
 *   "userId": "{{contact.id}}", 
 *   "contactId": "{{contact.id}}",
 *   "element": "Connect",
 *   "strategies": [
 *     "{{form.strategy_1}}", 
 *     "{{form.strategy_2}}",
 *     "{{form.strategy_3}}",
 *     "{{form.strategy_4}}",
 *     "{{form.strategy_5}}"
 *   ],
 *   "businessInfo": {
 *     "name": "{{contact.custom_field.business_name}}",
 *     "description": "{{contact.custom_field.business_description}}",
 *     "targetAudience": "{{contact.custom_field.target_audience}}",
 *     "brandVoice": "{{contact.custom_field.brand_voice}}"
 *   }
 * }
 */

// === EXAMPLE DATABASE SCHEMA ===

/**
 * MongoDB Example Schema for User Framework Data
 * 
 * UserFramework Collection:
 * {
 *   _id: ObjectId,
 *   userId: String,           // Unique identifier for the user
 *   contactId: String,        // GHL contact ID
 *   businessName: String,
 *   businessDescription: String,
 *   targetAudience: String,
 *   brandVoice: String,
 *   framework: {
 *     connect: [String],      // Array of connect strategies
 *     revolutionize: [String],
 *     engage: [String],
 *     analyze: [String],
 *     target: [String],
 *     expand: [String]
 *   },
 *   completedElements: [String], // List of completed framework elements
 *   createdAt: Date,
 *   updatedAt: Date
 * }
 * 
 * GeneratedContent Collection:
 * {
 *   _id: ObjectId,
 *   userId: String,
 *   contactId: String,
 *   frameworkElement: String,
 *   contentType: String,
 *   platform: String,
 *   content: String,
 *   createdAt: Date
 * }
 */

// === GO HIGH LEVEL FORM CONFIGURATION ===

/**
 * To create the forms in Go High Level:
 * 
 * 1. FRAMEWORK SETUP FORM
 *    - Go to Websites > Forms
 *    - Create a new form for each framework element
 *    - Add fields matching your HTML interface:
 *      - For Connect form:
 *        - Hidden field for element name (value="Connect")
 *        - 5+ text fields for strategies
 *      - For Business Info form:
 *        - business_name (Text)
 *        - business_description (Text Area)
 *        - target_audience (Text)
 *        - brand_voice (Dropdown)
 *    - Configure "Next" button to submit form
 *    - Set up form submission actions to trigger webhook
 * 
 * 2. CONTENT GENERATOR FORM
 *    - Create form with fields:
 *      - framework_element (Dropdown)
 *      - content_type (Dropdown)
 *      - platform (Dropdown)
 *      - content_topic (Text)
 *      - content_goal (Dropdown)
 *      - additional_context (Text Area)
 *    - Configure Generate button to submit form
 *    - Set up submission to trigger webhook
 *    - Configure success action to display generated content
 */