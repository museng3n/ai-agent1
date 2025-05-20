import random

class CreateAIContentDrafter:
    """
    Generates social media content drafts aligned with the CREATE framework.
    Simulates calling an AI language model for content generation.
    """

    def __init__(self):
        """Initializes the content drafter."""
        # In a real application, might load configuration, API keys, etc.
        print("CREATE AI Content Drafter Initialized.")

    def _simulate_ai_call(self, prompt, num_drafts=2):
        """
        *** SIMULATED AI CALL ***
        In a real application, this function would:
        1. Connect to an AI service (like OpenAI's GPT-4).
        2. Send the 'prompt' text to the AI model.
        3. Receive the AI's generated text response.
        4. Parse the response to extract the suggested text, visual idea,
           and hashtags for the requested number of drafts.
        5. Return the structured drafts.

        For now, it returns pre-defined example drafts based on keywords
        in the prompt to demonstrate the expected structure.
        """
        print("\n--- Simulating AI Call ---")
        print(f"Prompt Sent to AI (Simulation): \n'{prompt}'")
        print("--- End Simulated Prompt ---")

        # --- Simulation Logic ---
        # This is highly simplified. A real AI would generate unique content.
        # We'll return generic examples based on rough keyword matching in the prompt.
        simulated_drafts = []
        base_text = "This is a simulated draft. A real AI would generate unique content based on the prompt."
        visual_idea = "Generic visual idea (e.g., photo related to topic)."
        hashtags = ["#Simulated", "#AI", "#YourBrand"]

        if "Connect" in prompt:
             hashtags = ["#Connect", "#BrandStory", "#Community", "#YourBrand"]
             if "sourcing" in prompt.lower():
                 base_text = f"Draft focusing on connecting with the audience about sourcing {prompt.split('Topic: ')[-1].split(',')[0]}."
                 visual_idea = "Photo/Video of sourcing process or raw materials."
             else:
                 base_text = f"Draft focused on building connection around the topic: {prompt.split('Topic: ')[-1].split(',')[0]}."
                 visual_idea = "Image showing team, community, or brand values."

        elif "Revolutionize" in prompt:
            hashtags = ["#Revolutionize", "#Innovation", "#ComingSoon", "#GameChanger", "#YourBrand"]
            base_text = f"Draft announcing an innovative aspect related to: {prompt.split('Topic: ')[-1].split(',')[0]}."
            visual_idea = "Sleek graphic, sneak peek image, or behind-the-scenes of innovation."

        elif "Engage" in prompt:
            hashtags = ["#Engage", "#Community", "#Feedback", "#Poll", "#Challenge", "#YourBrand"]
            base_text = f"Draft designed to engage the audience regarding: {prompt.split('Topic: ')[-1].split(',')[0]}. Could be a question or poll."
            visual_idea = "Question graphic, poll sticker element, user-generated content collage."

        elif "Analyze" in prompt:
            hashtags = ["#Analyze", "#DataDriven", "#Results", "#Transparency", "#YourBrand"]
            base_text = f"Draft sharing insights or data related to: {prompt.split('Topic: ')[-1].split(',')[0]}. Frame positively."
            visual_idea = "Simple chart/graph, key statistic highlighted, quote graphic."

        elif "Target" in prompt:
            hashtags = ["#Target", "#ForYou", "#SpecificAudience", "#YourBrand"] # Add specific audience tag
            base_text = f"Draft specifically targeting an audience segment interested in: {prompt.split('Topic: ')[-1].split(',')[0]}."
            visual_idea = "Image/Video reflecting the target audience's lifestyle or needs."

        elif "Expand" in prompt:
            hashtags = ["#Expand", "#Collaboration", "#Growth", "#Partnership", "#SpreadTheWord", "#YourBrand"]
            base_text = f"Draft aimed at expanding reach, possibly mentioning collaboration or asking for shares, related to: {prompt.split('Topic: ')[-1].split(',')[0]}."
            visual_idea = "Collaborative graphic, image representing growth, call-to-action visual."

        # Add provided keywords to hashtags if any
        if "Keywords:" in prompt:
            kw_part = prompt.split("Keywords: ")[-1]
            keywords_list = [kw.strip() for kw in kw_part.split(',')]
            # Basic formatting for hashtags
            formatted_kws = ['#' + kw.replace(" ", "") for kw in keywords_list if kw]
            hashtags.extend(formatted_kws)


        for i in range(num_drafts):
            simulated_drafts.append({
                "Draft Option": i + 1,
                "Suggested Text": f"(Option {i+1}) {base_text}",
                "Visual Idea": visual_idea,
                "Suggested Hashtags": hashtags
            })

        return simulated_drafts
        # --- End Simulation Logic ---


    def generate_drafts(self, stage, topic, content_format="Standard Post", keywords=None, num_drafts=2):
        """
        Generates content drafts for a specific CREATE stage and topic.

        Args:
            stage (str): The CREATE stage ('Connect', 'Revolutionize', etc.).
            topic (str): The specific topic or goal for the post.
            content_format (str): The desired format (e.g., 'Standard Post', 'Story Idea').
                                   (Currently influences prompt slightly, could be expanded).
            keywords (list, optional): List of specific keywords to try and include. Defaults to None.
            num_drafts (int): How many draft options to generate. Defaults to 2.

        Returns:
            list: A list of dictionaries, where each dictionary represents a draft option.
                  Returns None if the stage is invalid.
        """
        if stage not in ["Connect", "Revolutionize", "Engage", "Analyze", "Target", "Expand"]:
            print(f"Error: Invalid CREATE stage '{stage}'.")
            return None

        # --- Construct the Prompt for the AI ---
        # This prompt guides the AI's generation process.
        prompt = f"Generate {num_drafts} social media draft(s) for the '{stage}' stage of the CREATE framework. "
        prompt += f"The content format should be suitable for a '{content_format}'. "
        prompt += f"The main topic/goal is: '{topic}'. "

        # Add specific guidance based on the stage
        if stage == "Connect":
            prompt += "Focus on building relationships, sharing brand mission/values, storytelling, or authenticity. Make it relatable."
        elif stage == "Revolutionize":
            prompt += "Focus on innovation, new features/products, unique approaches, or behind-the-scenes of creation. Make it sound fresh and exciting."
        elif stage == "Engage":
            prompt += "Focus on fostering interactivity. Generate a question, poll idea, contest concept, or a prompt for user-generated content."
        elif stage == "Analyze":
            prompt += "Focus on sharing data insights, results, or progress in a positive and transparent way. Build trust through data."
        elif stage == "Target":
            prompt += f"Focus on speaking directly to a specific audience segment interested in '{topic}'. Address their specific needs or interests."
        elif stage == "Expand":
            prompt += "Focus on growing reach. Suggest collaboration ideas, ask for shares/tags, or promote partnerships related to the topic."

        if keywords:
            prompt += f" Include or reference these keywords if possible: {', '.join(keywords)}."

        # --- Call the (Simulated) AI ---
        drafts = self._simulate_ai_call(prompt, num_drafts)

        return drafts

# --- Example Usage ---

# 1. Initialize the agent
agent = CreateAIContentDrafter()

# 2. Simulate Client Input and Generate Drafts
print("\n--- Example 1: Connect Stage ---")
stage_choice = "Connect"
topic_input = "Share story about sourcing our coffee beans ethically"
keywords_input = ["fair trade", "specialty coffee"]
draft_options_1 = agent.generate_drafts(stage=stage_choice, topic=topic_input, keywords=keywords_input)

if draft_options_1:
    for draft in draft_options_1:
        print(f"\nDraft Option {draft['Draft Option']}:")
        print(f"  Text: {draft['Suggested Text']}")
        print(f"  Visual: {draft['Visual Idea']}")
        print(f"  Hashtags: {' '.join(draft['Suggested Hashtags'])}")

print("\n--- Example 2: Revolutionize Stage ---")
stage_choice = "Revolutionize"
topic_input = "Tease the launch of our new AI-powered scheduling feature"
draft_options_2 = agent.generate_drafts(stage=stage_choice, topic=topic_input, num_drafts=3) # Ask for 3 drafts

if draft_options_2:
     for draft in draft_options_2:
        print(f"\nDraft Option {draft['Draft Option']}:")
        print(f"  Text: {draft['Suggested Text']}")
        print(f"  Visual: {draft['Visual Idea']}")
        print(f"  Hashtags: {' '.join(draft['Suggested Hashtags'])}")

print("\n--- Example 3: Target Stage ---")
stage_choice = "Target"
topic_input = "Promote weekend yoga workshop for beginners"
keywords_input = ["beginner yoga", "stress relief", "weekend wellness"]
draft_options_3 = agent.generate_drafts(stage=stage_choice, topic=topic_input, keywords=keywords_input)

if draft_options_3:
     for draft in draft_options_3:
        print(f"\nDraft Option {draft['Draft Option']}:")
        print(f"  Text: {draft['Suggested Text']}")
        print(f"  Visual: {draft['Visual Idea']}")
        print(f"  Hashtags: {' '.join(draft['Suggested Hashtags'])}")