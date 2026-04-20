import Wrapped from "../Wrapped";

export default abstract class Statistic<StaticData> {
  // eslint-disable-next-line unused-imports/no-unused-vars
  constructor(protected wrapped: Wrapped) { }
  abstract calculateResult(): StaticData;
  abstract getDefaultValue(): StaticData;
}
