import Statistic from "./Statistic";

export type ActivityStatisticResult = {
  commentsWritten: number;
  likedComments: number;
  likedPosts: number;
  pollsParticipated: number;
  storyLikes: number;
  storiesPosted: number;
};

export default class ActivityStatistic extends Statistic<ActivityStatisticResult> {
  name = "ActivityStatistic";

  calculateResult(): ActivityStatisticResult {
    return {
      commentsWritten: this.wrapped.userData.activity.comments?.length ?? 0,
      likedComments: this.wrapped.userData.activity.likedComments?.length ?? 0,
      likedPosts: this.wrapped.userData.activity.likedPosts?.length ?? 0,
      pollsParticipated:
        this.wrapped.userData.activity.participatedPolls?.length ?? 0,
      storyLikes: this.wrapped.userData.activity.storyLikes?.length ?? 0,
      storiesPosted: this.wrapped.userData.activity.stories?.length ?? 0,
    };
  }

  getDefaultValue(): ActivityStatisticResult {
    return {
      commentsWritten: 0,
      likedComments: 0,
      likedPosts: 0,
      pollsParticipated: 0,
      storyLikes: 0,
      storiesPosted: 0,
    };
  }
}
