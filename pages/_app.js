import '@/styles/globals.css'
import { Livvic } from 'next/font/google'

const livvic = Livvic({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
})

export default function App({ Component, pageProps }) {
  return (
    <div className={livvic.className}>
      <Component {...pageProps} />
    </div>
  )
}
