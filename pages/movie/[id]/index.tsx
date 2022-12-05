import { useRouter } from 'next/router'
import { useState } from 'react'
import * as React from 'react'
import useSwr from 'swr'
import { CommentType, MovieType } from '../../../types/movieTypes'


const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function MoviePage() {
  const router = useRouter()
  const id = router.query.id as string

  const [userName, setUserName] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  const { data } = useSwr<MovieType>(id ? `/api/movie/${id}`: null, fetcher)
  const { data: comments, mutate } = useSwr<CommentType[]>(id ? `/api/comments/${id}`: null, fetcher)


  const nameOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const val = evt.target.value
    setUserName(val)
  }

  const commentOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const val = evt.target.value
    setComment(val)
  }

  const onSubmit = async () => {
    const res = await fetch(`/api/comments/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        comment,
        movieId: id,
      }),
    })
    if (res.status === 200) {
      mutate()
    }
  }


  return (
    <div className="wrap">
      <div className="dataContainer">
        <h1>{data?.film}</h1>
        <p><span className="title">Genre</span> {data?.genre}</p>
        <p><span className="title">Studio</span> {data?.leadStudio}</p>
        <p><span className="title">User Rating</span> {data?.audienceScore}</p>
        <p><span className="title">Profitability</span> {data?.profitability}</p>
        <p><span className="title">Rotten Tomatoes Rating (%)</span> {data?.rottenTomatoes}</p>
        <p><span className="title">Worldwide Gross</span> {data?.worldwideGross}</p>
        <p><span className="title">Year Release</span> {data?.year}</p>
      </div>

      <div className="commentContainer">
        <h3>Comments</h3>
        {
          !!comments && comments.map((cm, i) => {
            return (
              <div key={i}>
                <span>{cm.userName}: </span>
                <span>{cm.comment}</span>
              </div>
            )
          })
        }
      </div>
      <p className="addComment">Add your comment here:</p>
      <div className="inputBlock">
        <div className="inputWrap">
          <label htmlFor="userName">Name: </label>
          <input type="text" id="userName" onChange={nameOnChange} />
        </div>
        <div className="inputWrap">
          <label htmlFor="comment">Your comment: </label>
          <input type="text" id="comment" onChange={commentOnChange} />
        </div>
        <button type="button" onClick={onSubmit}>submit</button>
      </div>


      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 500px;
          margin: 0 auto;
        }
        .title {
          display: inline-block;
          width: 150px;
          color: #888;
          font-weight: bold;
          margin-right: 15px;
        }
        .dataContainer {
          display: block;
          margin-bottom: 15px;
        }
        .commentContainer {
          width: 500px;
          margin-bottom: 45px;
          border-top: solid 1px #aaa;
        }
        .inputBlock {
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 10px;
          background-color: #eee;
        }
        .inputWrap {
          margin-bottom: 10px;
        }
        .inputWrap label {
          display: inline-block;
          width: 130px;
        }
        input {
          line-height: 26px;
        }
        button {
          display: block;
          width: 90px;
          margin-left: auto;
          padding: 5px;
          cursor: pointer;
        }
        .addComment {
          align-self: start;
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}
