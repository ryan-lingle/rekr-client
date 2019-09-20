import React from "react";
import RekModal from "./rek_modal";
import BookmarkButton from "./bookmark_button";
import Tooltip from "./tooltip";

const Episode = ({ episode, podcast }) => {
  if (!podcast) podcast = episode.podcast;


  return(
    <div className="episode item">
      <Tooltip tooltip={podcast.title}>
        <a href={"/podcast/" + podcast.slug}>
          <img className="podcast-art" alt="podcast art" src={podcast.image} width={"70px"} />
        </a>
      </Tooltip>
      <a className="episode-details" href={`/episode/${episode.id}`}>
        <div>
          {podcast.title}
        </div>
        <div>
          {episode.title}
        </div>
      </a>
      {podcast.emailVerified ?
          <RekModal episodeId={episode.id}>
            <div href="#" id="rek-btn" className="rek-btn btn btn-secondary episode-rek-btn">Rek</div>
          </RekModal>
        : null}
      <BookmarkButton bookmarked={episode.bookmarked} episodeId={episode.id} />
    </div>
  )
}

export default Episode;
