import Statistic from "./Statistic";
import * as Sentry from "@sentry/nextjs";

export type UseTimeStatisticResult = {
  totalUsageTimeSec: number;
  totalSessions: number;
  averageSessionLengthSec: number;
  longestSession: {
    startTime: Date;
    endTime: Date;
    lengthSec: number;
  };
  mostActiveWeekday: {
    weekday: string;
    averageUsageTime: number;
  };
};

export default class UseTimeStatistic extends Statistic<UseTimeStatisticResult> {
  name = "UseTimeStatistic";

  // This is the maximum time between activity in seconds that is assumed to be the time
  // the user used the app. Otherwise is is assumed that the app has been closed
  // and the session has ended.
  static readonly MAX_TIME_BETWEEN_VIDEOS = 60 * 10; // 10 minutes

  // At the end of the session (see previous comment) it is assumed that the user
  // used the app for this amount of seconds - just to make sure that many
  // short sessions are not ignored.
  static readonly SESSION_END_TIME = 5;

  calculateResult(): UseTimeStatisticResult {
    const activityPoints = [
      ...(this.wrapped.userData.accountConnections.following?.map(
        (following) => following.timestamp
      ) ?? []),
      ...(this.wrapped.userData.accountConnections.recentlyUnfollowed?.map(
        (following) => following.timestamp
      ) ?? []),

      ...(this.wrapped.userData.accountInformation.changes?.map(
        (comment) => comment.timestamp
      ) ?? []),

      ...(this.wrapped.userData.activity.comments?.map(
        (comment) => comment.timestamp
      ) ?? []),
      ...(this.wrapped.userData.activity.likedComments?.map(
        (comment) => comment.timestamp
      ) ?? []),
      ...(this.wrapped.userData.activity.likedPosts?.map(
        (comment) => comment.timestamp
      ) ?? []),
      ...(this.wrapped.userData.activity.participatedPolls?.map(
        (comment) => comment.timestamp
      ) ?? []),
      ...(this.wrapped.userData.activity.storyLikes?.map(
        (comment) => comment.timestamp
      ) ?? []),
      ...(this.wrapped.userData.activity.stories?.map(
        (comment) => comment.timestamp
      ) ?? []),

      ...(this.wrapped.userData.directMessages
        ?.filter((dm) => dm.isUserSender)
        .map((dm) => dm.timestamp) ?? []),
    ]
      .filter(Boolean)
      .sort((a, b) => a - b);

    let totalWatchTimeSec = 0;
    let totalSessions = 1;

    let currentSessionStartTime = null;
    let sessionLengths = [];

    if (!activityPoints) {
      return {
        totalUsageTimeSec: 0,
        totalSessions: 0,
        averageSessionLengthSec: 0,
        longestSession: {
          startTime: new Date(),
          endTime: new Date(),
          lengthSec: 0,
        },
        mostActiveWeekday: {
          weekday: "",
          averageUsageTime: 0,
        },
      };
    }

    let longestWatchSession = {
      startTime: new Date(),
      endTime: new Date(),
      lengthSec: 0,
    };

    const weekdayUsage = [0, 0, 0, 0, 0, 0, 0];
    const weekdaysWithSessions = [
      new Set(),
      new Set(),
      new Set(),
      new Set(),
      new Set(),
      new Set(),
      new Set(),
    ];

    for (let i = 1; i < activityPoints.length; i++) {
      const activityPoint = activityPoints[i];
      const previousVideo = activityPoints[i - 1];

      const videoStartTime = new Date(activityPoint * 1000);
      if (!currentSessionStartTime) {
        currentSessionStartTime = videoStartTime;
      }

      const previousVideoStartTime = new Date(previousVideo * 1000);

      const timeBetweenVideoWatched = Math.abs(
        (videoStartTime.getTime() - previousVideoStartTime.getTime()) / 1000
      ); // in seconds

      const weekday = videoStartTime.getDay();
      if (weekdaysWithSessions[weekday]) {
        weekdaysWithSessions[weekday].add(videoStartTime.toDateString());
      } else {
        Sentry.captureException(
          new Error(
            `Weekday ${weekday} ("${activityPoint}") is not in range 0-6. This should not happen.`
          )
        );
      }
      if (timeBetweenVideoWatched < UseTimeStatistic.MAX_TIME_BETWEEN_VIDEOS) {
        totalWatchTimeSec += timeBetweenVideoWatched;
        weekdayUsage[weekday] += timeBetweenVideoWatched;
      } else {
        // End of a session
        totalWatchTimeSec += UseTimeStatistic.SESSION_END_TIME;
        weekdayUsage[weekday] += UseTimeStatistic.SESSION_END_TIME;
        totalSessions++;

        const sessionLength = Math.abs(
          (previousVideoStartTime.getTime() -
            currentSessionStartTime.getTime()) /
            1000
        );
        sessionLengths.push(sessionLength);

        if (sessionLength > longestWatchSession.lengthSec) {
          longestWatchSession = {
            startTime: currentSessionStartTime,
            endTime: videoStartTime,
            lengthSec: sessionLength,
          };
        }

        currentSessionStartTime = videoStartTime;
      }
    }

    const mostActiveWeekdayIndex = weekdayUsage.indexOf(
      Math.max(...weekdayUsage)
    );

    return {
      totalUsageTimeSec: totalWatchTimeSec,
      totalSessions,
      averageSessionLengthSec:
        sessionLengths.reduce((a, b) => a + b, 0) / sessionLengths.length,
      longestSession: longestWatchSession,
      mostActiveWeekday: {
        weekday: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][mostActiveWeekdayIndex],
        averageUsageTime:
          weekdayUsage[mostActiveWeekdayIndex] /
          weekdaysWithSessions[mostActiveWeekdayIndex].size,
      },
    };
  }

  getDefaultValue(): UseTimeStatisticResult {
    return {
      totalUsageTimeSec: 0,
      totalSessions: 0,
      averageSessionLengthSec: 0,
      longestSession: {
        startTime: new Date(),
        endTime: new Date(),
        lengthSec: 0,
      },
      mostActiveWeekday: {
        weekday: "N/A",
        averageUsageTime: 0,
      },
    };
  }
}
