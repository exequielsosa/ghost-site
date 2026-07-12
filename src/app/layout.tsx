// Root layout mínimo, obligatorio para Next.js. El <html>/<body> reales viven
// en src/app/[locale]/layout.tsx (patrón estándar de next-intl para App
// Router): ese layout, un nivel más abajo, es el que efectivamente envuelve
// todas las rutas de usuario con NextIntlClientProvider, Header, Footer, etc.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
