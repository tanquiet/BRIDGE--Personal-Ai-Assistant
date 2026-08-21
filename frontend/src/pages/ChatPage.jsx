import { useEffect, useState } from 'react';
import AppShell from '../components/layout/AppShell';
import Sidebar from '../components/sidebar/Sidebar';
import ChatPanel from '../components/chat/ChatPanel';
import { fetchHistory, streamChat, uploadPdf } from '../services/api';

const createMessage = (role, content) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  role,
  content,
});

const isGreeting = (message) =>
  ['hey', 'hi', 'hello', 'hey!', 'hi!', 'hello!'].includes(message.trim().toLowerCase());

export default function ChatPage() {
  const [theme, setTheme] = useState('dark');
  const [model, setModel] = useState('gemma3:4b');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await fetchHistory();
        setChatHistory(history);
      } catch (error) {
        console.error(error);
      }
    };

    loadHistory();
  }, []);

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
    setSettingsOpen(false);
  };

  const handleSelectChat = async (chatId) => {
    const selected = chatHistory.find((entry) => entry.id === chatId);
    if (!selected) return;
    setMessages(selected.messages || []);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage = createMessage('user', input.trim());
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const assistantText = isGreeting(userMessage.content)
        ? 'Yoo helooo'
        : await streamChat({
            message: userMessage.content,
            history: nextMessages,
            model,
            theme,
          });

      const assistantMessage = createMessage('assistant', assistantText);
      const updatedMessages = [...nextMessages, assistantMessage];
      setMessages(updatedMessages);

      const summary = assistantText.slice(0, 60) || 'New response';
      setChatHistory((current) => {
        const next = [...current, { id: `${Date.now()}`, title: userMessage.content.slice(0, 24), preview: summary, messages: updatedMessages }];
        return next.slice(-6);
      });
    } catch (error) {
      console.error(error);
      setMessages((current) => [...current, createMessage('assistant', 'The backend could not answer right now. Please verify FastAPI is running.')]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await uploadPdf(formData);
      setUploadedFiles((current) => [...current, { name: result.name, preview: result.preview }]);
      setMessages((current) => [...current, createMessage('assistant', `Stored ${result.name} for RAG context.`)]);
    } catch (error) {
      console.error(error);
      setMessages((current) => [...current, createMessage('assistant', 'Upload failed. Please try a smaller PDF.')]);
    }
  };

  return (
    <AppShell theme={theme} setTheme={setTheme}>
      <Sidebar chats={chatHistory} onNewChat={handleNewChat} onSelect={handleSelectChat} />
      <ChatPanel
        messages={messages}
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        onSend={handleSubmit}
        onUpload={handleUpload}
        uploadedFiles={uploadedFiles}
        theme={theme}
        setTheme={setTheme}
        model={model}
        setModel={setModel}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
      />
    </AppShell>
  );
}