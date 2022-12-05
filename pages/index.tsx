import Head from 'next/head'
import * as React from 'react'
import { useState } from 'react'
import { InferGetServerSidePropsType } from 'next'

import clientPromise from '../lib/mongodb'
import { MovieType } from '../types/movieTypes'


export async function getStaticProps() {
  try {
    const client = await clientPromise
    const db = client.db('movie_app')

    const movies = await db.collection('movies')
      .find({})
      .toArray()

    return {
      props: {
        isConnected: true,
        movies: JSON.parse(JSON.stringify(movies)),
      },
    }
  } catch (e) {
    return {
      props: {
        isConnected: false,
        movies: [],
      },
    }
  }
}


export default function Home({
  isConnected,
  movies,
}: InferGetServerSidePropsType<typeof getStaticProps>) {

  const [filter, setFilter] = useState<string>('')

  const filterOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const filterVal = evt.target.value.toLowerCase()
    setFilter(filterVal)
  }

  return (
    <div className="wrap">
      <Head>
        <title>Movies Library</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="mainPart">
        <h1>Movies</h1>
        <input type='text' onChange={filterOnChange}/>

        <ul className="movieList">
          {movies && movies.map((mv: MovieType, i: number) => {
            if (mv.film?.toLowerCase().includes(filter)) {
              return <li key={i}><a className="movieLink" href={`movie/${mv._id}`}>{mv.film}</a></li>
            } else return null
          })}
        </ul>
      </main>
      <footer className="theFooter">
        <p>Made by May</p>
      </footer>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
            color: #333;
        }

        * {
          box-sizing: border-box;
        }

        .wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        input {
          font-size: 22px;
          line-height: 26px;
        }
        .mainPart {
          max-width: 800px;
        }
        .movieList {
          padding: 0;
          list-style: none;
        }
        .movieList li {
          margin-bottom: 10px;
        }
        .movieLink {
          color: #333;
        }
        .movieLink:hover {
          color: #555;
        }
        .theFooter {
          width: 100%;
          border-top: solid 1px #bbb;
          text-align: center;
          color: #555;
        }
      `}</style>

    </div>
  )
}
