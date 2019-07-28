import React from "react";
import { CREATE_BOOKMARK, DESTROY_BOOKMARK } from "../actions";
import { Mutation } from "react-apollo";

export default class BookmarkButton extends React.Component {
  state = {
    bookmarked: this.props.bookmarked
  }

  handleResponse = ({ createBookmark, destroyBookmark }) => {
    const res = createBookmark || destroyBookmark;
    this.setState({ bookmarked: res.bookmarkExists })
  }

  render() {
    const { bookmarked } = this.state;
    const ACTION = bookmarked ? DESTROY_BOOKMARK : CREATE_BOOKMARK;
    const episodeId = parseInt(this.props.episodeId);

    return(
      <Mutation mutation={ACTION} onCompleted={this.handleResponse} >
        {(action, { error }) => (
          <i
            className={`fa-bookmark bookmark ${bookmarked ? 'fa bookmarked' : 'far'}`}
            onClick={() => {
              action({ variables: { episodeId }})
            }}
          >
          </i>
        )}
      </Mutation>
    )
  }
};