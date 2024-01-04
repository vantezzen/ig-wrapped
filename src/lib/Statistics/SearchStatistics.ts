import Statistic from "./Statistic";

export type SearchStatisticResult = {
  topSearchValue: {
    value: string | null;
    count: number;
  };
};

export default class SearchStatistic extends Statistic<SearchStatisticResult> {
  name = "SearchStatistic";

  calculateResult(): SearchStatisticResult {
    const searchValues = [
      ...(this.wrapped.userData.activity.recentSearches?.accounts ?? []),
      ...(this.wrapped.userData.activity.recentSearches?.wordOrPhrase ?? []),
    ].map((search) => search.value);

    const searchValuesPerSearch = searchValues.reduce((acc, search) => {
      acc[search] = (acc[search] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedSearchValues = Object.entries(searchValuesPerSearch).sort(
      ([, a], [, b]) => b - a
    );

    const topSearchValue = sortedSearchValues[0] ?? null;

    return {
      topSearchValue: {
        value: topSearchValue?.[0] ?? null,
        count: topSearchValue?.[1] ?? 0,
      },
    };
  }

  getDefaultValue(): SearchStatisticResult {
    return {
      topSearchValue: {
        value: null,
        count: 0,
      },
    };
  }
}
