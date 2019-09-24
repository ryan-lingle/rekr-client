import React from "react";
import { createStream, Rek, UserBox, HashtagBox, FollowButton, Loader, ErrorMessage } from "../components";
import { HASHTAG_FEED, GET_HASHTAG, CURRENT_USER } from '../actions';
import { Query } from "react-apollo";


export default class HashtagFeed extends React.Component {
  componentDidMount() {
    document.querySelector(".navbar").style.boxShadow = "none";
    document.querySelector("#home").style.marginTop = "150px";

  }
  render() {
    const isLoggedIn = localStorage.getItem('token');
    const Stream = createStream(Rek);
    console.log(this.props.match.params)
    return(
      <div id="home">
        <Query query={GET_HASHTAG} variables={this.props.match.params} >
          {({ data, error, loading}) => {
            if (loading) return <div></div>;
            if (error) return <div id="home"><ErrorMessage error={error} /></div>;
            const { name, followedByCurrentUser, id } = data.hashtag;
            return (
              <div id="hashtag-nav">
                <h3 id="hashtag-header">
                  {name}
                </h3>
                <FollowButton
                  hashtagId={id}
                  following={followedByCurrentUser}
                  type={'hashtag'}
                />
              </div>
            );
          }}
        </Query>
        {isLoggedIn ? <Query query={CURRENT_USER} >
          {({ data, error, loading}) => {
            if (loading) return <Loader />;
            if (error) return <ErrorMessage error={error} />;

            const { currentUser } = data;

            return (
              <div className="row">
                <div className="col-md-12 col-lg-3 user-box-col">
                  <UserBox {...currentUser} />
                </div>
                <div className="col-lg-6 col-md-12 feed-col">
                  <Stream query={HASHTAG_FEED} variables={this.props.match.params} />
                </div>
                <div className="col-sm-3 d-none d-lg-block hashtag-col">
                  <HashtagBox hashtags={currentUser.followedHashtags} />
                </div>
              </div>
            )
          }}
        </Query>
        : <div className="col-lg-6 col-md-12 offset-md-3 feed-col">
            <Stream query={HASHTAG_FEED} variables={this.props.match.params} />
          </div>}
      </div>
    )
  }
}
