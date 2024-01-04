import { WrappedSlideProps } from "@/components/Wrapped/WrappedContainer";
import EventEmitter from "events";
import Intro from "@/components/Wrapped/Slides/Intro";
import StoriesPosted from "@/components/Wrapped/Slides/StoriesPosted";
import UnfollowedCount from "@/components/Wrapped/Slides/UnfollowedCount";
import DirectMessagesReceived from "@/components/Wrapped/Slides/DirectMessagesReceived";
import ReelsShared from "@/components/Wrapped/Slides/ReelsShared";
import Comments from "@/components/Wrapped/Slides/Comments";
import Polls from "@/components/Wrapped/Slides/Polls";
import PublicPrivateChanges from "@/components/Wrapped/Slides/PublicPrivateChanges";
import Roundup from "@/components/Wrapped/Slides/Roundup";
import ExternalTracking from "@/components/Wrapped/Slides/ExternalTracking";
import SpotifyFramePlayer from "../Spotify/FramePlayer";
import MostSearchedTerm from "@/components/Wrapped/Slides/MostSearchedTerm";
import { trackEvent } from "../analytics";
import { Statistics } from "../Wrapped";

export type Slide = {
  name: string;
  component: React.FC<WrappedSlideProps>;
  duration: number;
  spotify?: {
    uri: string;
  };
  skip?: (statistics: Statistics) => boolean;
};

const SLIDES: Slide[] = [
  {
    name: "Intro",
    component: Intro,
    duration: 6000,
    spotify: {
      uri: "spotify:track:7KA4W4McWYRpgf0fWsJZWB",
    },
  },
  {
    name: "StoriesPosted",
    component: StoriesPosted,
    duration: 6000,
  },
  {
    name: "UnfollowedCount",
    component: UnfollowedCount,
    duration: 6000,
    spotify: {
      uri: "spotify:track:6AQbmUe0Qwf5PZnt4HmTXv",
    },
    skip: (statistics) => statistics.profile.unfollowedCount === 0,
  },
  {
    name: "PublicPrivateChanges",
    component: PublicPrivateChanges,
    duration: 6000,
    skip: (statistics) => statistics.profile.publicPrivateChanges === 0,
  },
  {
    name: "DirectMessagesReceived",
    component: DirectMessagesReceived,
    duration: 6000,
    skip: (statistics) => statistics.directMessages.dmReceived === 0,
  },
  {
    name: "Comments",
    component: Comments,
    duration: 6000,
    spotify: {
      uri: "spotify:track:6UN73IYd0hZxLi8wFPMQij",
    },
    skip: (statistics) => statistics.activity.commentsWritten === 0,
  },
  {
    name: "ReelsShared",
    component: ReelsShared,
    duration: 6000,
    skip: (statistics) => statistics.directMessages.reelsShared === 0,
  },
  {
    name: "Polls",
    component: Polls,
    duration: 6000,
  },
  {
    name: "MostSearchedTerm",
    component: MostSearchedTerm,
    duration: 6000,
    spotify: {
      uri: "spotify:track:1Qrg8KqiBpW07V7PNxwwwL",
    },
    skip: (statistics) => statistics.search.topSearchValue.count === 0,
  },
  {
    name: "ExternalTracking",
    component: ExternalTracking,
    duration: 6000,
    skip: (statistics) => statistics.externalTracking.totalPages === 0,
  },
  {
    name: "Roundup",
    component: Roundup,
    duration: 6000,
    spotify: {
      uri: "spotify:track:5odlY52u43F5BjByhxg7wg",
    },
  },
];

export default class WrappedPlayer extends EventEmitter {
  public currentSlide: Slide | null = null;

  constructor(public spotifyPlayer: SpotifyFramePlayer | null = null) {
    super();
  }

  public async play(statistics: Statistics) {
    for (let i = 0; i < SLIDES.length; i++) {
      const slide = SLIDES[i];

      if (slide.skip && slide.skip(statistics)) {
        continue;
      }

      this.currentSlide = slide;
      console.log(`Playing slide`, this.currentSlide, this.spotifyPlayer);
      if (this.currentSlide.spotify && this.spotifyPlayer) {
        console.log(`Playing Spotify song`, this.currentSlide.spotify.uri);
        await this.spotifyPlayer.playSong(this.currentSlide.spotify.uri);
        console.log(`Loaded spotify song`);
      }
      trackEvent(`slide-${slide.name}`);

      this.emit("update");
      await this.wait(slide.duration);
    }
  }

  private wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
