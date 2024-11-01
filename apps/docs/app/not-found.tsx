import Link from 'next/link'
import Content from '&/content/content'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://seb.io'),
  title: '404 - Green Design System',
  description:
    'Green Design System is more than a polished user interface, its places the user at the very forefront of design, usability and accessibility.',
  alternates: {
    canonical: '/',
  },
}

export default function NotFound() {
  return (
    <Content layout="home">
      <h1 className="heading-medium">404 - Page Not Found</h1>
      <Link href={'/'}>Go back</Link>
    </Content>
  )
}
