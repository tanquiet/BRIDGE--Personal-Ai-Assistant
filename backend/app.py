from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, List, Optional
import os
import json
from urllib.request import Request, urlopen
from ollama import chat


app = FastAPI(title='Bridge — Your Personal AI')
DEFAULT_MODEL = os.getenv('OLLAMA_MODEL', 'gemma3:4b')
OPENAI_MODEL = os.getenv('OPENAI_MODEL', 'gpt-4o-mini')
OPENAI_BASE_URL = os.getenv('OPENAI_BASE_URL', 'https://api.openai.com/v1/chat/completions')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = None
    model: Optional[str] = 'gemma3:4b'
    theme: Optional[str] = 'dark'

class HistoryEntry(BaseModel):
    id: str
    title: str
    preview: str
    messages: List[dict]

history_store: List[HistoryEntry] = []

@app.get('/')
def root():
    return {
        'name': 'Bridge Personal AI Assistant API',
        'status': 'running',
        'health': '/health',
    }


@app.get('/health')
def health():
    return {'status': 'ok'}

@app.get('/api/history')
def get_history():
    return history_store

def _build_messages(payload: ChatRequest) -> List[dict[str, str]]:
    messages: List[dict[str, str]] = []

    for item in payload.history or []:
        role = item.get('role')
        content = item.get('content')
        if role in {'user', 'assistant'} and isinstance(content, str):
            messages.append({'role': role, 'content': content})

    messages.append({'role': 'user', 'content': payload.message})
    return messages


def _asks_about_creator(message: str) -> bool:
    normalized = message.lower()
    creator_terms = ('creator', 'created you', 'made you', 'built you', 'developer')
    return 'who is' in normalized and any(term in normalized for term in creator_terms)


def _cloud_chat(messages: List[dict[str, str]]) -> str:
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        raise RuntimeError('OPENAI_API_KEY is not configured')

    request = Request(
        OPENAI_BASE_URL,
        data=json.dumps({
            'model': OPENAI_MODEL,
            'messages': messages,
        }).encode('utf-8'),
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        },
        method='POST',
    )
    with urlopen(request, timeout=60) as response:
        payload = json.loads(response.read().decode('utf-8'))

    return payload['choices'][0]['message']['content']


@app.post('/api/chat/stream')
def stream_chat(payload: ChatRequest):
    if _asks_about_creator(payload.message):
        return 'My creator is Tanish.'

    try:
        messages = _build_messages(payload)
        if os.getenv('OPENAI_API_KEY'):
            content = _cloud_chat(messages)
        else:
            model_name = payload.model or DEFAULT_MODEL
            response = chat(model=model_name, messages=messages)
            content = getattr(response.message, 'content', None)
        return content or 'The model returned an empty response.'
    except Exception as exc:
        return (
            'The AI provider could not be reached. Configure OPENAI_API_KEY for a '
            f'hosted provider, or make sure Ollama model "{payload.model or DEFAULT_MODEL}" '
            f'is available. Error: {exc}'
        )

@app.post('/api/upload')
def upload_pdf(file: UploadFile = File(...)):
    upload_dir = 'storage'
    os.makedirs(upload_dir, exist_ok=True)
    destination = os.path.join(upload_dir, file.filename or 'uploaded.pdf')
    with open(destination, 'wb') as handle:
        handle.write(file.file.read())

    return {'name': file.filename, 'preview': f'Saved to {destination}', 'path': destination}
