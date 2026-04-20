import SpotifyFramePlayer from "./Spotify/FramePlayer";
import Statistic from "./Statistics/Statistic";
import { InstagramUserData } from "./types";
import * as Sentry from "@sentry/nextjs";

import ProfileStatistic, {
  ProfileStatisticResult,
} from "./Statistics/ProfileStatistics";
import DmStatistic, { DmStatisticResult } from "./Statistics/DmStatistics";
import ActivityStatistic, {
  ActivityStatisticResult,
} from "./Statistics/ActivityStatistics";
import SearchStatistic, {
  SearchStatisticResult,
} from "./Statistics/SearchStatistics";
import ExternalTrackingStatistic, {
  ExternalTrackingStatisticResult,
} from "./Statistics/ExternalTrackingStatistics";
import EmojiStatistic, {
  EmojiStatisticResult,
} from "./Statistics/EmojiStatistics";
import UseTimeStatistic, {
  UseTimeStatisticResult,
} from "./Statistics/UseTimeStatistic";

export type Statistics = {
  name: string;
  profilePicture?: string;
  profile: ProfileStatisticResult;
  directMessages: DmStatisticResult;
  activity: ActivityStatisticResult;
  search: SearchStatisticResult;
  externalTracking: ExternalTrackingStatisticResult;
  emoji: EmojiStatisticResult;
  useTime: UseTimeStatisticResult;
};

export const SAMPLE_STATISTICS: Statistics = {
  name: "John Doe",
  profile: {
    unfollowedCount: 1,
    publicPrivateChanges: 4,
    profilePhotoChanges: 5,
    storiesPosted: 84,
  },
  directMessages: {
    dmSent: 1472,
    dmReceived: 3284,
    reelsShared: 856,
    postsShared: 105,
    tiktoksShared: 324,
    topSender: "Maria",
    mostActiveHour: "20",
  },
  activity: {
    commentsWritten: 152,
    likedComments: 623,
    likedPosts: 1478,
    pollsParticipated: 655,
    storyLikes: 544,
    storiesPosted: 84,
  },
  search: {
    topSearchValue: {
      value: "fatfatpankocat",
      count: 193,
    },
  },
  externalTracking: {
    totalPages: 28,
    totalEvents: 126,
    interestingPageNames: ["example.com", "example.org", "example.net"],
  },
  emoji: {
    emojisUsed: 64,
    mostUsedEmoji: {
      emoji: "💀",
      count: 293,
    },
    leastUsedEmoji: {
      emoji: "🤔",
      count: 1,
    },
  },
  useTime: {
    totalUsageTimeSec: 60 * 60 * 24 * 7 * 2,
    totalSessions: 1474,
    averageSessionLengthSec: 158,
    longestSession: {
      startTime: new Date(),
      endTime: new Date(),
      lengthSec: 120815,
    },
    mostActiveWeekday: {
      weekday: "Tuesday",
      averageUsageTime: 403.8139534883721,
    },
  },
};

export default class Wrapped {
  public spotifyPlayer: SpotifyFramePlayer | null = null;
  public demoMode = false;
  public possiblyEmptyExport = false;

  constructor(public userData: InstagramUserData) {
    if (
      !userData.accountConnections ||
      userData.accountConnections.following?.length === 0
    ) {
      this.possiblyEmptyExport = true;
    }
  }

  public getStatistics(): Statistics {
    console.log("Getting statistics", this.userData);

    if (this.demoMode) {
      return SAMPLE_STATISTICS;
    }

    return {
      name: this.userData.accountInformation.name ?? "you",
      profilePicture: this.userData.accountInformation.profilePicture,
      profile: this.calculateStatistic(ProfileStatistic),
      directMessages: this.calculateStatistic(DmStatistic),
      activity: this.calculateStatistic(ActivityStatistic),
      search: this.calculateStatistic(SearchStatistic),
      externalTracking: this.calculateStatistic(ExternalTrackingStatistic),
      emoji: this.calculateStatistic(EmojiStatistic),
      useTime: this.calculateStatistic(UseTimeStatistic),
    };
  }

  private calculateStatistic<T>(
    _statistic: new (_wrapped: Wrapped) => Statistic<T>
  ): T {
    const statisticInstance = new _statistic(this);

    try {
      return statisticInstance.calculateResult();
    } catch (e) {
      Sentry.captureException(
        new Error(`Failed to calculate statistic ${_statistic.name}`),
        {
          extra: {
            originalException: e,
          },
        }
      );
      console.log(`Failed to calculate statistic ${_statistic.name}`, e);
      return statisticInstance.getDefaultValue();
    }
  }
}
