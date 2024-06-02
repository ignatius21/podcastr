export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <main>
            <p className="text-white-1">leftsidebar</p>
            {children}
            <p className="text-white-1">rightsidebar</p>
        </main>
    </div>
  );
}
