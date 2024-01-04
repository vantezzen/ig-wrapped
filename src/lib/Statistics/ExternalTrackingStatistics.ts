import Statistic from "./Statistic";

export type ExternalTrackingStatisticResult = {
  totalPages: number;
  totalEvents: number;
  interestingPageNames: string[];
};

export default class ExternalTrackingStatistic extends Statistic<ExternalTrackingStatisticResult> {
  name = "ExternalTrackingStatistic";

  calculateResult(): ExternalTrackingStatisticResult {
    const externalPageNames =
      this.wrapped.userData.externalTrackedPages?.map((page) => page.name) ??
      [];

    const interestingPageNames = externalPageNames
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return {
      totalPages: this.wrapped.userData.externalTrackedPages?.length ?? 0,
      totalEvents:
        this.wrapped.userData.externalTrackedPages?.reduce(
          (acc, page) => acc + page.eventAmount,
          0
        ) ?? 0,
      interestingPageNames,
    };
  }

  getDefaultValue(): ExternalTrackingStatisticResult {
    return {
      totalPages: 0,
      totalEvents: 0,
      interestingPageNames: [],
    };
  }
}
