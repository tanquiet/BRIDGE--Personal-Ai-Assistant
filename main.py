from llama_index.llms.ollama import Ollama
from ollama import chat


llm = Ollama(
    model="gemma3:4b",
    request_timeout=60.0,
    # Manually set the context window to limit memory usage
    context_window=8000,
)



while True:
    question = input("Enter your question (or 'exit' to quit): ")
    if question.lower() == 'exit':
        break
    response = chat(
        model='gemma4:cloud',
        messages=[{'role': 'user', 'content': question}],
    )
    print(response.message.content)