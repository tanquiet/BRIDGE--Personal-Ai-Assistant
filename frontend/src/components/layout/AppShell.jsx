export default function AppShell({ children, theme }) {
  return (
    <div className={`flex h-screen w-screen overflow-hidden ${theme === 'dark' ? 'bg-[#212121] text-[#ececec]' : 'bg-[#f7f7f8] text-[#2f2f2f]'}`}>
      {children}
    </div>
  );
}