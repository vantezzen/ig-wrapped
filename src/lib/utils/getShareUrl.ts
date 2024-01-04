import { Statistics } from "../Wrapped";
import { ShareImageData } from "../types";

export default function getShareUrl(statistics: Statistics) {
  const data: ShareImageData = {
    name: statistics.name,
    storiesPosted: statistics.activity.storiesPosted,
    dmReceived: statistics.directMessages.dmReceived,
    reelsShared: statistics.directMessages.reelsShared,
    unfollowedAccounts: statistics.profile.unfollowedCount,
    postsLiked: statistics.activity.likedPosts,
    commentsWritten: statistics.activity.commentsWritten,
    externalTracking: statistics.externalTracking.totalPages,
  };

  const url = new URL("/api/image", window.location.href);
  url.searchParams.set("data", JSON.stringify(data));

  return url.toString();
}
