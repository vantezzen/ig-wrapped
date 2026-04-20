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
import Emojis from "@/components/Wrapped/Slides/Emojis";
import TotalWatchTime from "@/components/Wrapped/Slides/TotalWatchTime";
import WatchTimeComparableActivity from "@/components/Wrapped/Slides/WatchTimeComparableActivity";

export type Slide = {
  name: string;
  component: React.FC<WrappedSlideProps>;
  duration: number;
  spotify?: {
    uri: string;
  };
  skip?: (_statistics: Statistics) => boolean;
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
    name: "TotalWatchTime",
    component: TotalWatchTime,
    duration: 6000,
    skip: (statistics) => statistics.useTime.totalUsageTimeSec === 0,
  },
  {
    name: "WatchTimeComparableActivity",
    component: WatchTimeComparableActivity,
    duration: 6000,
    skip: (statistics) => statistics.useTime.totalUsageTimeSec === 0,
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
    name: "Emojis",
    component: Emojis,
    duration: 6000,
    skip: (statistics) => statistics.emoji.mostUsedEmoji.count === 0,
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
  public currentSlideIndex: number = 0;
  public slides: Slide[] = [];
  private statistics: Statistics | null = null;

  constructor(public _spotifyPlayer: SpotifyFramePlayer | null = null) {
    super();
  }

  public initialize(statistics: Statistics) {
    this.statistics = statistics;

    // Filter slides based on skip logic
    this.slides = SLIDES.filter((slide) => {
      if (slide.skip && slide.skip(statistics)) {
        return false;
      }
      return true;
    });

    this.currentSlideIndex = 0;
    this._loadCurrentSlide();
    
    // Emit update event to trigger UI re-render
    this.emit("update");
  }


  public get currentSlide(): Slide | null {
    return this.slides[this.currentSlideIndex] || null;
  }

  public nextSlide(): void {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex++;
      this._loadCurrentSlide();
      this.emit("update");
    }
  }

  public previousSlide(): void {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this._loadCurrentSlide();
      this.emit("update");
    }
  }

  public jumpToSlide(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.currentSlideIndex = index;
      this._loadCurrentSlide();
      this.emit("update");
    }
  }

  private async _loadCurrentSlide() {
    const slide = this.currentSlide;
    if (!slide) return;

    console.log(`Loading slide`, slide.name);

    // Play Spotify track if available
    if (slide.spotify && this._spotifyPlayer) {
      console.log(`Playing Spotify song`, slide.spotify.uri);
      try {
        await this._spotifyPlayer.playSong(slide.spotify.uri);
        console.log(`Loaded spotify song`);
      } catch (error) {
        console.error("Failed to play Spotify track", error);
      }
    }

    // Track analytics
    trackEvent(`slide-${slide.name}`);
  }

  public canGoNext(): boolean {
    return this.currentSlideIndex < this.slides.length - 1;
  }

  public canGoPrevious(): boolean {
    return this.currentSlideIndex > 0;
  }
}

