import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import globalStyles from '@/app/globals.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'TanStack Start Starter' },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: globalStyles,
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
