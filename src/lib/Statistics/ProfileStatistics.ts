import Statistic from "./Statistic";

export type ProfileStatisticResult = {
  unfollowedCount: number;
  publicPrivateChanges: number;
  profilePhotoChanges: number;
  storiesPosted: number;
};

export default class ProfileStatistic extends Statistic<ProfileStatisticResult> {
  name = "ProfileStatistic";

  calculateResult(): ProfileStatisticResult {
    return {
      unfollowedCount:
        this.wrapped.userData.accountConnections.recentlyUnfollowed?.length ??
        0,
      publicPrivateChanges:
        this.wrapped.userData.accountInformation.changes?.filter(
          (change) =>
            change.changed === "Switched to Public" ||
            change.changed === "Switched to Private"
        ).length ?? 0,
      profilePhotoChanges:
        this.wrapped.userData.accountInformation.changes?.filter(
          (change) => change.changed === "Profile Photo"
        ).length ?? 0,
      storiesPosted: this.wrapped.userData.activity.stories?.length ?? 0,
    };
  }

  getDefaultValue(): ProfileStatisticResult {
    return {
      unfollowedCount: 0,
      publicPrivateChanges: 0,
      profilePhotoChanges: 0,
      storiesPosted: 0,
    };
  }
}
