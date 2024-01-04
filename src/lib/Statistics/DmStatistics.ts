import Statistic from "./Statistic";

export type DmStatisticResult = {
  dmSent: number;
  dmReceived: number;

  reelsShared: number;
  postsShared: number;
  tiktoksShared: number;

  topSender: string | null;
};

export default class DmStatistic extends Statistic<DmStatisticResult> {
  name = "DmStatistic";

  calculateResult(): DmStatisticResult {
    const senders =
      this.wrapped.userData.directMessages
        ?.filter((dm) => !dm.isUserSender)
        .map((dm) => dm.sender) ?? [];

    const messagesPerSender = senders.reduce((acc, sender) => {
      acc[sender] = (acc[sender] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedSenders = Object.entries(messagesPerSender).sort(
      ([, a], [, b]) => b - a
    );
    const topSender = sortedSenders[0]?.[0] ?? null;

    return {
      dmSent:
        this.wrapped.userData.directMessages?.filter((dm) => dm.isUserSender)
          .length ?? 0,
      dmReceived:
        this.wrapped.userData.directMessages?.filter((dm) => !dm.isUserSender)
          .length ?? 0,

      reelsShared:
        this.wrapped.userData.directMessages?.filter((dm) => dm.isReelShare)
          .length ?? 0,
      postsShared:
        this.wrapped.userData.directMessages?.filter((dm) => dm.isPostShare)
          .length ?? 0,
      tiktoksShared:
        this.wrapped.userData.directMessages?.filter((dm) => dm.isTikTokShare)
          .length ?? 0,

      topSender,
    };
  }

  getDefaultValue(): DmStatisticResult {
    return {
      dmSent: 0,
      dmReceived: 0,

      reelsShared: 0,
      postsShared: 0,
      tiktoksShared: 0,

      topSender: null,
    };
  }
}
