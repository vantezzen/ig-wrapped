import Statistic from "./Statistic";
import emojiRegex from "emoji-regex";

export type EmojiStatisticResult = {
  emojisUsed: number;
  mostUsedEmoji: {
    emoji: string;
    count: number;
  };
  leastUsedEmoji: {
    emoji: string;
    count: number;
  };
};

export default class EmojiStatistic extends Statistic<EmojiStatisticResult> {
  name = "EmojiStatistic";

  calculateResult(): EmojiStatisticResult {
    let textsWrittenByUser = [
      ...(this.wrapped.userData.activity.comments?.map(
        (comment) => comment.value
      ) ?? []),
      ...(this.wrapped.userData.directMessages
        ?.filter((dm) => dm.isUserSender)
        .map((dm) => dm.content) ?? []),
    ].filter(Boolean);

    let emojiMap: Map<string, number> = new Map<string, number>();

    for (const text of textsWrittenByUser) {
      const emojis = this.extractEmojis(text);
      emojis.forEach((emoji) => {
        if (emojiMap.has(emoji)) {
          emojiMap.set(emoji, emojiMap.get(emoji)! + 1);
        } else {
          emojiMap.set(emoji, 1);
        }
      });
    }

    return {
      emojisUsed: emojiMap.size,
      mostUsedEmoji: this.getMostUsedEmoji(emojiMap),
      leastUsedEmoji: this.getLeastUsedEmoji(emojiMap),
    };
  }

  private extractEmojis(text: string): string[] {
    return text.match(emojiRegex()) ?? [];
  }

  private getMostUsedEmoji(emojiMap: Map<string, number>) {
    let maxEmoji = "";
    let maxEmojiCount = 0;
    emojiMap.forEach((count, emoji) => {
      if (count > maxEmojiCount) {
        maxEmoji = emoji;
        maxEmojiCount = count;
      }
    });
    return {
      emoji: maxEmoji,
      count: maxEmojiCount,
    };
  }

  private getLeastUsedEmoji(emojiMap: Map<string, number>) {
    let minEmoji = "";
    let minEmojiCount = Number.MAX_SAFE_INTEGER;
    emojiMap.forEach((count, emoji) => {
      if (count < minEmojiCount) {
        minEmoji = emoji;
        minEmojiCount = count;
      }
    });
    return {
      emoji: minEmoji,
      count: minEmojiCount,
    };
  }

  getDefaultValue(): EmojiStatisticResult {
    return {
      emojisUsed: 0,
      mostUsedEmoji: {
        emoji: "",
        count: 0,
      },
      leastUsedEmoji: {
        emoji: "",
        count: 0,
      },
    };
  }
}
