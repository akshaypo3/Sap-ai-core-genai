from gen_ai_hub.proxy.langchain.init_models import init_llm

# Initialize the Anthropic Claude model
llm = init_llm('anthropic--claude-3.5-sonnet', temperature=0.0, max_tokens=256)

# Test the model
response = llm.invoke('What is generative AI?').content
print('Response:', response)
