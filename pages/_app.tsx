import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer/>
    </div>
  ) 
}
/* 

_app.tsx
서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트
모든 페이지는 이곳을 통하게 되고 공통 레이아웃을 만들때 사용
글로벌 css 적용

Component: 현재 페이지를 의미하며 페이지 변경시 해당 component 변경
pageProps: DataFatching 메서드를 이용해 미리 가져온 초기 객체
이 매서드를 사용하지 않으면 빈 객체 전달

_app.tsx, _document.tsx: 두 파일은 server only file 입니다.
Next.js server logic에 사용되는 파일이기 때문에 client 에서 사용하는 로직 사용 불가
*/