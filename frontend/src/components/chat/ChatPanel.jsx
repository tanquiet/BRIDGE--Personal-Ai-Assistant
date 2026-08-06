import { ArrowUp, Paperclip, RefreshCw, Settings2 } from 'lucide-react';

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
  return (
    <section className={`flex h-full flex-col rounded-3xl border p-4 shadow-2xl shadow-black/20 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white/80'}`}>
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
        <div>
          <p className="text-sm font-semibold">Live conversation</p>
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Streaming responses from your backend</p>
        </div>
        <button
          type="button"
          onClick={() => setSettingsOpen((value) => !value)}
          className={`rounded-full border p-2 transition ${theme === 'dark' ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' : 'border-slate-200 bg-slate-100 hover:bg-slate-200'}`}
        >
          <Settings2 size={16} />
        </button>
      </div>

      {settingsOpen && (
        <div className={`mt-3 rounded-2xl border p-3 ${theme === 'dark' ? 'border-slate-800 bg-slate-800/70' : 'border-slate-200 bg-slate-50'}`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="text-sm font-medium">
              Model
              <select
                value={model}
                onChange={(event) => setModel(event.target.value)}
                className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${theme === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}
              >
                <option value="gemma3:4b">gemma3:4b</option>
                <option value="llama3.1:8b">llama3.1:8b</option>
                <option value="phi3:mini">phi3:mini</option>
              </select>
            </label>
            <label className="text-sm font-medium">
              Theme
              <select
                value={theme}
                onChange={(event) => setTheme(event.target.value)}
                className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${theme === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </label>
          </div>
        </div>
      )}

      <div className="mt-4 flex-1 space-y-3 overflow-y-auto rounded-2xl p-2">
        {messages.length === 0 ? (
          <div className={`flex h-full items-center justify-center rounded-2xl border border-dashed p-6 text-center ${theme === 'dark' ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-500'}`}>
            <div>
              <p className="text-lg font-semibold">Your intelligent workspace starts here</p>
              <p className="mt-2 text-sm">Ask for help, summarize documents, brainstorm ideas, or upload a PDF to ground the conversation in your own content.</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'bg-fuchsia-600 text-white' : theme === 'dark' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
                {message.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className={`flex justify-start ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2 text-sm">
              <RefreshCw size={14} className="animate-spin" />
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {uploadedFiles.map((file) => (
          <span key={file.name} className={`rounded-full px-3 py-1 ${theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
            {file.name}
          </span>
        ))}
      </div>

      <form onSubmit={onSend} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label className={`flex flex-1 items-center gap-2 rounded-2xl border px-3 py-2 ${theme === 'dark' ? 'border-slate-700 bg-slate-800/90' : 'border-slate-200 bg-slate-100'}`}>
          <Paperclip size={16} className="text-slate-500" />
          <input
            type="file"
            accept="application/pdf"
            onChange={onUpload}
            className="hidden"
          />
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask anything or attach a PDF..."
            className={`w-full bg-transparent text-sm outline-none ${theme === 'dark' ? 'text-slate-100 placeholder:text-slate-500' : 'text-slate-800 placeholder:text-slate-400'}`}
          />
        </label>
        <button
          type="submit"
          className="flex items-center justify-center rounded-2xl bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-fuchsia-500"
          disabled={isLoading}
        >
          <ArrowUp size={16} />
        </button>
      </form>
    </section>
  );
}
