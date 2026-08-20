import { useState } from 'react';
import { ArrowUp, Paperclip, Settings2, SunMedium, Moon, Bot, Sparkles, Lightbulb, Code2, Copy, Check, ChevronDown } from 'lucide-react';

export default function ChatPanel({
  messages,
  input,
  setInput,
  isLoading,
  onSend,
  onUpload,
  uploadedFiles,
  theme,
  setTheme,
  model,
  setModel,
  settingsOpen,
  setSettingsOpen,
}) {
  const isDark = theme === 'dark';
  const [copiedId, setCopiedId] = useState(null);

  const promptCards = [
    { icon: Sparkles, title: 'Explore an idea', prompt: 'Help me think through a new idea' },
    { icon: Lightbulb, title: 'Explain something', prompt: 'Explain a difficult topic in simple terms' },
    { icon: Code2, title: 'Write some code', prompt: 'Help me build a small project' },
  ];

  const copyMessage = async (message) => {
    await navigator.clipboard.writeText(message.content);
    setCopiedId(message.id);
    window.setTimeout(() => setCopiedId(null), 1600);
  };

  return (
    <main className={`flex h-full min-w-0 flex-1 flex-col ${isDark ? 'bg-[#212121]' : 'bg-[#f7f7f8]'}`}>
      {/* Top bar */}
      <div className={`flex h-14 shrink-0 items-center justify-between border-b px-5 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <button
          type="button"
          onClick={() => setSettingsOpen((v) => !v)}
          className={`flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-black/10 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}
        >
          {model}
          <Settings2 size={14} className="text-slate-400" />
        </button>
        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          className={`rounded-md p-2 transition hover:bg-black/10 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
        >
          {theme === 'dark' ? <SunMedium size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {settingsOpen && (
        <div className={`border-b px-4 py-3 ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
          <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row">
            <label className="flex-1 text-xs font-medium text-slate-400">
              Model
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm ${isDark ? 'border-white/15 bg-[#2a2a2a] text-slate-100' : 'border-black/15 bg-white text-slate-900'}`}
              >
                <option value="gemma3:4b">gemma3:4b</option>
                <option value="llama3.1:8b">llama3.1:8b</option>
                <option value="phi3:mini">phi3:mini</option>
              </select>
            </label>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-2 px-0 py-8">
          {messages.length === 0 ? (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
              <div className="welcome-orbit mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#10a37f] text-white">
                <Bot size={24} />
              </div>
              <p className="text-2xl font-semibold tracking-tight text-[#ececec]">How can I help you today?</p>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                Ask a question, brainstorm ideas, or upload a PDF to ground the conversation in your own content.
              </p>
              <div className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
                {promptCards.map(({ icon: Icon, title, prompt }) => (
                  <button
                    key={title}
                    type="button"
                    onClick={() => setInput(prompt)}
                    className={`prompt-card group rounded-xl border p-4 text-left transition ${isDark ? 'border-white/10 bg-white/[0.03] hover:border-[#10a37f]/60 hover:bg-[#10a37f]/10' : 'border-black/10 bg-white hover:border-[#10a37f]/60 hover:bg-[#10a37f]/5'}`}
                  >
                    <Icon size={17} className="mb-6 text-[#10a37f] transition-transform group-hover:scale-110" />
                    <span className={`block text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{title}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">{prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) =>
              message.role === 'user' ? (
                <div key={message.id} className="flex justify-end px-4 py-2 sm:px-8">
                  <div className={`max-w-[78%] rounded-2xl px-5 py-3 text-sm leading-6 ${isDark ? 'bg-[#2f2f2f] text-slate-100' : 'bg-white text-slate-800 shadow-sm'}`}>
                    {message.content}
                  </div>
                </div>
              ) : (
                <div key={message.id} className={`message-row group flex gap-4 rounded-xl px-4 py-5 sm:px-8 ${isDark ? 'bg-[#2f2f2f]/45' : 'bg-white/70'}`}>
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#10a37f] text-white">
                    <Bot size={14} />
                  </div>
                  <div className="min-w-0 max-w-3xl">
                    <div className={`whitespace-pre-wrap pt-1 text-sm leading-7 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                      {message.content}
                    </div>
                    <button
                      type="button"
                      onClick={() => copyMessage(message)}
                      className="message-action mt-3 flex items-center gap-1.5 text-xs text-slate-500 transition hover:text-slate-300"
                    >
                      {copiedId === message.id ? <Check size={13} /> : <Copy size={13} />}
                      {copiedId === message.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              )
            )
          )}
          {isLoading && (
            <div className="flex gap-4 rounded-xl px-4 py-5 sm:px-8">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#10a37f] text-white">
                <Bot size={14} />
              </div>
              <div className="flex items-center gap-3 pt-1 text-sm text-slate-400">
                <span className="typing-dots flex gap-1"><span /><span /><span /></span>
                Thinking through it...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 pb-5 pt-2 sm:px-6">
        <div className="mx-auto max-w-4xl">
          {uploadedFiles.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2 text-xs">
              {uploadedFiles.map((file) => (
                <span key={file.name} className="rounded-full bg-white/10 px-3 py-1 text-slate-300">
                  {file.name}
                </span>
              ))}
            </div>
          )}
          <form
            onSubmit={onSend}
            className={`composer-glow flex items-center gap-2 rounded-2xl border px-3 py-2.5 shadow-lg ${isDark ? 'border-white/15 bg-[#2f2f2f]' : 'border-black/15 bg-white'}`}
          >
            <label className="flex cursor-pointer items-center rounded-full p-2 text-slate-400 transition hover:bg-white/10" title="Attach a PDF">
              <Paperclip size={18} />
              <input type="file" accept="application/pdf" onChange={onUpload} className="hidden" />
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message Bridge"
              className={`flex-1 bg-transparent text-sm placeholder:text-slate-500 outline-none ${isDark ? 'text-slate-100' : 'text-slate-900'}`}
            />
            <span className="hidden items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:flex">
              {model}<ChevronDown size={12} />
            </span>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="send-button flex h-8 w-8 items-center justify-center rounded-full bg-[#10a37f] text-white transition hover:scale-105 hover:bg-[#0d8f70] disabled:scale-100 disabled:opacity-30"
            >
              <ArrowUp size={16} />
            </button>
          </form>
          <p className="mt-2 text-center text-xs text-slate-500">Bridge can make mistakes. Verify important info.</p>
        </div>
      </div>
    </main>
  );
}