import gql from "graphql-tag";

const PARSE_PODCAST = gql`
  mutation ParsePodcast($rssUrl: String!) {
    parsePodcast(rssUrl: $rssUrl) {
      id
      title
      description
      rss
      email
      image
      website
      episodes {
        title
        description
        released
      }
    }
  }
`

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      username
      profilePic
      satoshis
      walletPermission
      followedHashtags {
        id
        name
        followedByCurrentUser
      }
      bookmarks {
        count
      }
      reks {
        count
      }
      followers {
        count
      }
      following {
        count
      }
    }
  }
`

const CURRENT_SATS = gql`
  query CurrentSats {
    currentUser {
      satoshis
      paymentMethod
      walletPermission
      canTweet
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUser($email: String, $username: String, $password: String, $profilePic: Upload) {
    updateUser(email: $email, username: $username, password: $password, profilePic: $profilePic) {
      username
      profilePic
    }
  }
`

const FEED_STREAM = gql`
  query FeedStream($n: Int!) {
    reks(n: $n, feed: true) {
      more
      stream {
        id
        satoshis
        user {
          id
          profilePic
          username
        }
        episode {
          title
          id
          bookmarked
          podcast {
            title
            image
            slug
          }
        }
        hashtags {
          name
          id
        }
      }
    }
  }
`

const GET_USER = gql`
  query GetUser($username: String) {
    user(username: $username) {
      id
      profilePic
      satoshis
      username
      current
      followedByCurrentUser
      bookmarks {
        count
      }
      reks {
        count
      }
      followers {
        count
      }
      following {
        count
      }
    }
  }
`

const GET_PODCAST = gql`
  query GetPodcast($slug: String, $id: String) {
    podcast(slug: $slug, id: $id) {
      id
      title
      description
      rss
      email
      image
      website
      emailVerified
      episodes {
        id
        title
        description
        released
      }
    }
  }
`

const GET_EPISODE = gql`
  query GetEpisode($id: Int!) {
    episode(id: $id) {
      title
      podcast {
        slug
        image
        title
      }
    }
  }
`
const CREATE_PODCAST = gql`
  mutation CreatePodcast($title: String!, $rss: String!, $description: String, $email: String!, $website: String, $image: String!) {
    createPodcast(title: $title, rss: $rss, description: $description, email: $email, website: $website, image: $image) {
      id
      title
      description
      email
      image
      website
      slug
    }
  }
`

const CREATE_EPISODES = gql`
  mutation CreateEpisodes($episodes: [EpisodeInput], $podcastId: String!) {
    createEpisodes(episodes: $episodes, podcastId: $podcastId) {
      id
    }
  }
`

const SEARCH = gql`
  query Search($term: String!, $type: String!, $n: Int) {
    search(term: $term, type: $type, n: $n) {
      podcast {
        more
        stream {
          id
          title
          image
          slug
        }
      }
      user {
        more
        stream {
          id
          username
          profilePic
          followedByCurrentUser
        }
      }
      hashtag {
        more
        stream {
          id
          name
          followedByCurrentUser
        }
      }
    }
  }
`

const SEARCH_EPISODES = gql`
  query SearchEpisodes($term: String!) {
    search(term: $term, type: "episode") {
      episode {
        stream {
          id
          title
          podcast {
            image
          }
        }
      }
    }
  }
`

const SIGN_UP_USER = gql`
  mutation SignUp($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      id
      token
      username
      profilePic
      email
    }
  }
`

const LOGIN_USER = gql`
  mutation LogIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      id
      token
      username
      profilePic
      email
    }
  }
`

const CREATE_REK = gql`
  mutation CreateRek($episodeId: String!, $tweetRek: Boolean!, $tags: [TagInput], $walletSatoshis: Int, $invoiceSatoshis: Int) {
    createRek(episodeId: $episodeId, tweetRek: $tweetRek, tags: $tags, walletSatoshis: $walletSatoshis, invoiceSatoshis: $invoiceSatoshis) {
      invoice
      satoshis
    }
  }
`

const SUBSRIBE_INVOICE = gql`
  subscription SubscribeInvoice($invoice: String!) {
    invoicePaid(invoice: $invoice) {
      userId
      invoice
    }
  }
`

const TOGGLE_FOLLOW = gql`
  mutation ToggleFollow($followeeId: String, $hashtagId: String, $type: String) {
    toggleFollow(followeeId: $followeeId, hashtagId: $hashtagId, type: $type)
  }
`

const CREATE_BOOKMARK = gql`
  mutation CreateBookmark($episodeId: Int!) {
    createBookmark(episodeId: $episodeId) {
      bookmarkExists
    }
  }
`

const DESTROY_BOOKMARK = gql`
  mutation DestroyBookmark($episodeId: Int!) {
    destroyBookmark(episodeId: $episodeId) {
      bookmarkExists
    }
  }
`

const BOOKMARKS = gql`
  query BookmarkStream($n: Int!) {
    bookmarks(n: $n) {
      more
      stream {
        id
        episode {
          id
          title
          bookmarked
          podcast {
            slug
            title
            image
            emailVerified
          }
        }
      }
    }
  }
`

const DEPOSIT = gql`
  mutation Deposit($satoshis: Int!) {
    deposit(satoshis: $satoshis) {
      satoshis
      invoice
    }
  }
`

const WITHDRAW = gql`
  mutation Withdraw($invoice: String!) {
    withdraw(invoice: $invoice) {
      success
      error
    }
  }
`

const FOLLOWER_STREAM = gql`
  query FollowerStream($userId: String, $n: Int!) {
    users(userId: $userId, n: $n, followers: true) {
      more
      stream {
        current
        id
        username
        profilePic
        followedByCurrentUser
      }
    }
  }
`

const FOLLOWING_STREAM = gql`
  query FollowingStream($userId: String, $n: Int!) {
    users(userId: $userId, n: $n, following: true) {
      more
      stream {
        current
        id
        username
        profilePic
        followedByCurrentUser
      }
    }
  }
`

const REK_STREAM = gql`
  query RekStream($n: Int!, $userId: String!) {
    reks(n: $n, userId: $userId) {
      more
      stream {
        id
        satoshis
        user {
          id
          profilePic
          username
        }
        episode {
          title
          id
          bookmarked
          podcast {
            title
            image
            slug
          }
        }
        hashtags {
          name
          id
        }
      }
    }
  }
`

const BOOKMARK_STREAM = gql`
  query BookmarkStream($userId: String, $n: Int!) {
    bookmarks(userId: $userId, n: $n) {
      more
      stream {
        id
        episode {
          id
          title
          bookmarked
          podcast {
            slug
            title
            image
          }
        }
      }
    }
  }
`

const GET_HASHTAG = gql`
  query GetHashtag($name: String!) {
    hashtag(name: $name) {
      id
      name
      followers
      followedByCurrentUser
    }
  }
`

const HASHTAG_FEED = gql`
  query HashtagFeed($name: String!, $n: Int!) {
    hashtagFeed(name: $name, n: $n) {
      more
      stream {
        id
        satoshis
        user {
          id
          profilePic
          username
        }
        episode {
          title
          id
          bookmarked
          podcast {
            title
            image
            slug
          }
        }
        hashtags {
          name
          id
        }
      }
    }
  }
`

const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($token: String!) {
    confirmEmail(token: $token) {
      podcast {
        id
      }
      user {
        id
      }
    }
  }
`

const RESEND_USER_EMAIL = gql`
  mutation ResendUserEmail {
    resendUserEmail
  }
`

const RESEND_PODCAST_EMAIL = gql`
  mutation ResendPodcastEmail($podcastId: String!) {
    resendPodcastEmail(podcastId: $podcastId)
  }
`

const TWITTER_TOKEN = gql`
  mutation TwitterToken {
    twitterToken
  }
`

const TWITTER_ACCESS_TOKEN = gql`
  mutation TwitterAccessToken($requestToken: String!, $oathVerifier: String!) {
    twitterAccessToken(requestToken: $requestToken, oathVerifier: $oathVerifier) {
      username
      profilePic
      id
      token
      signIn
    }
  }
`

export {
  PARSE_PODCAST,
  CURRENT_USER,
  FEED_STREAM,
  UPDATE_USER,
  CURRENT_SATS,
  GET_USER,
  GET_PODCAST,
  GET_EPISODE,
  CREATE_PODCAST,
  CREATE_EPISODES,
  SEARCH,
  SEARCH_EPISODES,
  SIGN_UP_USER,
  LOGIN_USER,
  CREATE_REK,
  SUBSRIBE_INVOICE,
  TOGGLE_FOLLOW,
  CREATE_BOOKMARK,
  DESTROY_BOOKMARK,
  BOOKMARKS,
  DEPOSIT,
  WITHDRAW,
  FOLLOWER_STREAM,
  FOLLOWING_STREAM,
  BOOKMARK_STREAM,
  REK_STREAM,
  GET_HASHTAG,
  HASHTAG_FEED,
  CONFIRM_EMAIL,
  RESEND_USER_EMAIL,
  RESEND_PODCAST_EMAIL,
  TWITTER_TOKEN,
  TWITTER_ACCESS_TOKEN
};
