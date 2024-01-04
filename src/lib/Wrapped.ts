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

export type Statistics = {
  name: string;
  profile: ProfileStatisticResult;
  directMessages: DmStatisticResult;
  activity: ActivityStatisticResult;
  search: SearchStatisticResult;
  externalTracking: ExternalTrackingStatisticResult;
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
      profile: this.calculateStatistic(ProfileStatistic),
      directMessages: this.calculateStatistic(DmStatistic),
      activity: this.calculateStatistic(ActivityStatistic),
      search: this.calculateStatistic(SearchStatistic),
      externalTracking: this.calculateStatistic(ExternalTrackingStatistic),
    };
  }

  private calculateStatistic<T>(
    statistic: new (wrapped: Wrapped) => Statistic<T>
  ): T {
    const statisticInstance = new statistic(this);

    try {
      return statisticInstance.calculateResult();
    } catch (e) {
      Sentry.captureException(
        new Error(`Failed to calculate statistic ${statistic.name}`),
        {
          extra: {
            originalException: e,
          },
        }
      );
      console.log(`Failed to calculate statistic ${statistic.name}`, e);
      return statisticInstance.getDefaultValue();
    }
  }
}
