import React from "react";
import { Loader, ErrorMessage } from ".";
import { Query } from "react-apollo";
import { EPISODE_SHOW } from "../actions";
import TwitterLogo from "../Twitter_Logo_Blue.png";

const RekCreated = ({ episodeId, rekId }) => {
  return(
    <Query query={EPISODE_SHOW} variables={{ episodeId, rekId: rekId.toString() }} >
      {({ data, loading, error }) => {
        if (loading) return <Loader />;
        if (error) return <ErrorMessage error={error} />;
        const { title, podcast } = data.episodeShow.episode;
        const { satoshis } = data.episodeShow.rek;
        const url = `${window.location.origin}/episode/${episodeId}?rekId=${rekId}`;
        return(
          <div id="rek-created">
            <div id="rc-sats">Success - <strong>{satoshis} sat</strong> Rek created for:</div>
            <div id="rc-episode">
              <img id="rc-podcast-img" src={podcast.image} />
              <div id="rc-episode-title" >{title}</div>
            </div>
            <div id="rc-actions">
              <a className="btn btn-secondary" href={url}>
                View Rek
              </a>
              <a className="sign-in-btn" target="_blank" href={`https://twitter.com/intent/tweet?text=I just donated ${satoshis} sats to ${podcast.title} on Rekr. Check out my episode rek:&url=${url}`} >
                <img src={TwitterLogo} width={'30px'} alt="twitter-logo" />
                Share on Twitter
              </a>
            </div>
          </div>
        );
      }}
    </Query>
  )
}

export default RekCreated;
