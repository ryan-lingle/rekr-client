import React from "react";
import { createStream, Rek, UserBox, HashtagBox, HashtagSearch, ErrorMessage, Loader } from "../components";
import { FEED_STREAM, CURRENT_USER } from '../actions';
import { Query } from 'react-apollo';

const Home = ({ match }) => {
  const Stream = createStream(Rek);

  const onEmpty = () => {

    return(
      <div className="nothing-message">
        Follow other Users and you will see their Reks here!
        <br></br><br></br>
        In the mean time...
        <HashtagSearch />
      </div>
    )
  }
  return(
    <div>
      <Query query={CURRENT_USER} >
        {({ data, error, loading}) => {
          if (loading) return <Loader />;
          if (error) return <div id="home"><ErrorMessage error={error} /></div>;
          const { currentUser } = data;

          return (
            <div id="home" className="row">
              <div className="col-md-12 col-lg-3 user-box-col">
                <UserBox {...currentUser} />
              </div>
              <div className="col-lg-6 col-md-12 feed-col">
                <Stream query={FEED_STREAM} onEmpty={onEmpty} />
              </div>
              <div className="col-sm-3 d-none d-lg-block hashtag-col">
                <HashtagBox hashtags={currentUser.followedHashtags} />
              </div>
            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default Home;
