export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="">
      <div className="flex justify-center items-center w-full h-full min-h-svh">
        {children}
      </div>
    </main>
  );
}
