import React from "react";
import Episode from "./episode";
import { Mutation } from "react-apollo";
import { RESEND_PODCAST_EMAIL } from "../actions";

const Podcast = (podcast) => {
  const onCompleted = ({ resendPodcastEmail }) => {
    if (resendPodcastEmail) window.location.href = `/email_unconfirmed?email=${podcast.email}&id=${podcast.id}`;
  }

  const { image, title, website, description, email, episodes } = podcast;
  return (
    <div>
      {podcast.emailVerified || podcast.hideUnverifiedMessage ? null :
        <div id="unverified-podcast">
          This Podcasts has not been authorized for donations. Is it yours?
          <Mutation mutation={RESEND_PODCAST_EMAIL} onCompleted={onCompleted}>
            {(resendConfirmEmail) => (
              <a href="#" onClick={() => resendConfirmEmail({ variables: { podcastId: podcast.id }})} > Claim this Podcast.</a>
            )}
          </Mutation>
        </div>}
      <div id="podcast">
        <div>
          <img src={image} alt="podcast art" width="325px" className="podcast-artwork-lg"/>
        </div>
        <div id="podcast-details-1">
          <div className="podcast-detail">
            <h4>Title</h4>
            <h4 className="thin" >{title || "No Title Found"}</h4>
          </div>
          <div className="podcast-detail">
            <h4>Website</h4>
            <h4 className="thin">{website || "No Website Found"}</h4>
          </div>
          <div className="podcast-detail">
            <h4>Email</h4>
            <h4 className="thin">{email || "No Email Found"}</h4>
          </div>
          <div className="podcast-detail">
            <h4>Description</h4>
            <h4 className="thin" dangerouslySetInnerHTML={{ __html: description }}></h4>
          </div>
        </div>
      </div>
      {episodes.map((episode, i) => {
        return <Episode episode={episode} podcast={podcast} key={i} />
      })}
    </div>
  )
}

export default Podcast;
