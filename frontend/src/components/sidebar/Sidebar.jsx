import { MessageSquarePlus, MessageSquare, Bot, PanelLeft } from 'lucide-react';

export default function Sidebar({ chats, onNewChat, onSelect }) {
  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col bg-[#171717] px-2 py-3 text-[#ececec] max-[640px]:w-[60px] max-[640px]:px-1">
      <div className="flex items-center justify-between px-2 pb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#10a37f] text-white">
            <Bot size={16} />
          </div>
          <p className="text-sm font-semibold tracking-tight max-[640px]:hidden">Bridge</p>
        </div>
        <PanelLeft size={17} className="text-slate-500 max-[640px]:hidden" />
      </div>

      <button
        type="button"
        onClick={onNewChat}
        className="mt-1 flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition hover:bg-white/10"
      >
        <MessageSquarePlus size={16} />
        <span className="max-[640px]:hidden">New chat</span>
      </button>

      <div className="mt-6 flex-1 space-y-1 overflow-y-auto px-1">
        <p className="px-2 pb-2 text-xs font-medium text-slate-500 max-[640px]:hidden">Today</p>
        {chats.length === 0 && (
          <p className="px-2 text-xs text-slate-500 max-[640px]:hidden">No conversations yet</p>
        )}
        {chats.map((chat) => (
          <button
            key={chat.id}
            type="button"
            onClick={() => onSelect(chat.id)}
            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-slate-300 transition hover:bg-white/10"
          >
            <MessageSquare size={14} className="shrink-0 text-slate-500" />
            <span className="truncate max-[640px]:hidden">{chat.title}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}