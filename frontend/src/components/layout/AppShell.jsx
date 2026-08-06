import { Bot, Moon, SunMedium } from 'lucide-react';

export default function AppShell({ children, theme, setTheme }) {
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <header className={`border-b ${theme === 'dark' ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white/80'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-fuchsia-600 to-violet-600 p-2 text-white shadow-lg shadow-fuchsia-600/20">
              <Bot size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold">Bridge — Your Personal AI</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Private, intelligent, and built for everyday productivity</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`rounded-full border p-2 transition ${theme === 'dark' ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' : 'border-slate-200 bg-slate-100 hover:bg-slate-200'}`}
          >
            {theme === 'dark' ? <SunMedium size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
