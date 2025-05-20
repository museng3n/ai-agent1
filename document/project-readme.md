# CREATE AI Framework System

## Overview

The CREATE AI Framework System is a personalized content generation solution that implements the CREATE social media marketing framework. The system allows students to train their own AI assistant based on their specific business strategies for each element of the CREATE framework:

- **C**onnect: Building relationships with the audience
- **R**evolutionize: Creating innovative content
- **E**ngage: Fostering interaction and community
- **A**nalyze: Using data to inform decisions
- **T**arget: Focusing on specific audience segments
- **E**xpand: Growing reach through new channels

## Components

This project consists of the following components:

### Frontend

- **Framework Setup Interface**: Collects students' business info and strategies
- **Dashboard**: Shows progress and stats
- **Content Generator**: Creates content using trained AI
- **Help Center**: Provides guidance and support

### Backend

- **API Server**: Node.js/Express server handling requests
- **AI Service**: Connects to Gemini API for content generation
- **Database**: MongoDB for storing user data
- **Webhook Handlers**: Processes Go High Level integration

## File Structure

```
CREATE-AI-Framework/
├── frontend/
│   ├── framework-setup-updated.html
│   ├── dashboard-mockup.html
│   ├── content-generator-mockup.html
│   ├── help-center-mockup.html
│   └── ghl-integration.js
├── backend/
│   ├── server.js
│   ├── database-schema.js
│   ├── backend-api-endpoint.js
│   ├── ghl-webhook-setup.js
│   └── .env
└── docs/
    ├── deployment-guide.md
    ├── create-agent.md
    ├── create-implementation.md
    ├── create-marketing-strategy.md
    ├── content-templates.md
    └── documentation.md
```

## Getting Started

Follow these steps to set up the CREATE AI Framework System:

1. **Set up the backend server**:
   - See `backend/` directory and follow instructions in `deployment-guide.md`

2. **Deploy frontend to Go High Level**:
   - Follow instructions in `deployment-guide.md` to add custom pages to GHL

3. **Configure AI API**:
   - Get an API key from Google Gemini AI
   - Update the `.env` file with your API key

4. **Set up database**:
   - Create a MongoDB instance
   - Update connection string in `.env` file

5. **Test the system**:
   - Follow testing steps in `deployment-guide.md`

## Usage Flow

1. **Student Setup**:
   - Student logs into their account
   - Completes business information
   - Inputs their specific strategies for each CREATE element
   - AI is trained on their unique approach

2. **Content Generation**:
   - Student selects framework element to focus on
   - Chooses content type and platform
   - Provides specific topic and goal
   - AI generates personalized content based on their framework

3. **Management**:
   - Student can save, edit, and organize generated content
   - Track usage and performance from dashboard
   - Update framework strategies as business evolves

## Integration with Go High Level

This system is designed to integrate with Go High Level (GHL), a marketing platform. The integration includes:

- Custom HTML pages within GHL
- Webhooks for data exchange
- Custom fields for storing framework data
- Workflows for automation

For detailed integration instructions, see `deployment-guide.md`.

## Customization

The system can be customized in several ways:

- **AI Provider**: Switch between different AI APIs (Gemini, OpenAI, Claude)
- **Framework Elements**: Modify elements to match curriculum changes
- **UI Theming**: Update CSS to match your branding
- **Content Types**: Add new content formats as needed

## Support and Maintenance

Regular maintenance tasks include:

- Monitoring AI API usage and costs
- Database backups
- Performance optimization
- Security updates
- User feedback collection

## License

This system is proprietary and for use only within your membership program.

## Credits

Developed by Claude AI and implemented by your development team.

---

For any questions or support, please contact your system administrator.