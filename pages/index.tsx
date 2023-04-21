import { GetStaticProps, NextPage } from "next"
import homestyle from '../styles/Home.module.css';
import Head from "next/head";
import { getSortedPostsDate } from "@/lib/post";
import Link from "next/link";



const Home = ({allPostsData}:{
  allPostsData: {
    date:string,title:string,id:string
  }[]
  }) => {
  return (
   <div>
    <Head>
      <title>Your Name</title>
    </Head>
    <section className={homestyle.headingMd}>
      <p>[Your Self Introduction]</p>
      <p>(This is a website)</p>
    </section>
    <section className={`${homestyle.headingMd} ${homestyle.padding1px}`}>
      <h2 className={homestyle.headingLg}>Blog</h2>
      <ul className={homestyle.list}>
        {allPostsData.map(({date,title,id})=>(
          <li className={homestyle.listItem} key={id}>
            <Link href={`/posts/${id}`}> 
            <span>{title}</span>
            </Link>
            <br />
            <small className={homestyle.lightText}>
              {date}
            </small>
          </li>
        ))}
      </ul>
    </section>
   </div>
  )
}
export default Home;

export const getStaticProps: GetStaticProps = async () =>{
  const allPostsData = getSortedPostsDate()
  return{
    props: {
      allPostsData //date,title,id

    }
  }
}

//getStaticProps 함수를 async로 export 하면, getStaticProps에서 return 되는 props 를 가지고 페이지를 pre-render한다. build time에 페이지를 렌더링한다.