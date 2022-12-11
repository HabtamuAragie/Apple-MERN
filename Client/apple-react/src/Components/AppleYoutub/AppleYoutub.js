import React,{useState,useEffect} from 'react'
import "./AppleYoutub.css"

function AppleYoutub() {
    const [youTubeVideos,setyouTubeVideos] =useState([])
    useEffect(()=>{
        fetch(
            "https://www.googleapis.com/youtube/v3/search?key=AIzaSyDvT7C99qdhL9boCrHOAnyGQxBqvIbANS4&channelId=UCE_M8A5yxnLfW0KghEeajjw&part=snippet,id&order=date&maxResults=9"
        )
        .then((response)=>response.json())
        .then((data)=>{
    
            setyouTubeVideos(data.items)
        })

    },[])

console.log(youTubeVideos)

  return (
    <section className='youtubeVideosWrapper'>
         <div className='allVideosWrapper'>
        <div className='container'>
            <div className='row justify-content-center text-center'>
                <div className='col-12'>
                    <div className='title-wraper'>
                        Latest Videos <br/>
                    </div>

                </div>
              {youTubeVideos?.map((singleVideo)=>{
                let vidId =singleVideo.id.videoId;
                let vidLink = `https://www.youtube.com/watch?v=${vidId}`;
                let videoWrapper =(
                    <div className="col-sm-12 col-md-4">
                  <div className="singleVideoWrapper">
                    <div className="videoThumbnail">
                      <a href={vidLink} target="_blank">
                        <img src={singleVideo.snippet.thumbnails.high.url} />
                      </a>
                    </div>
                    <div className="videoInfoWrapper">
                      <div className="videoTitle">
                        <a href={vidLink} target="_blank">
                          {singleVideo.snippet.title}
                        </a>
                      </div>
                      <div className="videoDesc">
                        {singleVideo.snippet.description}
                      </div>
                    </div>
                  </div>
                </div>

                )
                return videoWrapper
              })}

            </div>

        </div>

    </div>
    </section>
   
  )
}

export default AppleYoutub