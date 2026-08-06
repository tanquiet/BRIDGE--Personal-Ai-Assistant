import { MessageSquarePlus, FileText, Sparkles } from 'lucide-react';

export default function Sidebar({ chats, onNewChat, onSelect }) {
  return (
    <aside className="flex h-full w-full flex-col rounded-3xl border border-slate-800/70 bg-slate-900/70 p-4 shadow-2xl shadow-black/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Workspace</p>
          <p className="text-xs text-slate-400">Recent conversations</p>
        </div>
        <button
          type="button"
          onClick={onNewChat}
          className="rounded-full bg-fuchsia-600 p-2 text-white transition hover:bg-fuchsia-500"
          aria-label="Start a new chat"
        >
          <MessageSquarePlus size={18} />
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 p-3">
        <div className="flex items-center gap-2 text-sm font-medium text-fuchsia-300">
          <Sparkles size={16} />
          <span>Built for modern work</span>
        </div>
        <p className="mt-2 text-xs text-slate-400">Ask questions, upload documents, and keep your workflow moving with context-aware assistance.</p>
      </div>

      <div className="mt-5 space-y-2 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            type="button"
            onClick={() => onSelect(chat.id)}
            className="flex w-full items-center justify-between rounded-2xl border border-transparent bg-slate-800/80 px-3 py-2 text-left transition hover:border-slate-700"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{chat.title}</p>
              <p className="truncate text-xs text-slate-400">{chat.preview}</p>
            </div>
            <FileText size={16} className="shrink-0 text-slate-500" />
          </button>
        ))}
      </div>
    </aside>
  );
}
