import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import getShareUrl from "@/lib/utils/getShareUrl";
import { Loader2, Share2 } from "lucide-react";
import shareImage from "@/lib/utils/shareImage";
import { trackEvent } from "@/lib/analytics";
import Projects from "@/components/Projects";
import formatTimeLength from "@/lib/utils/formatTimeLength";

function Roundup({ statistics }: WrappedSlideProps) {
  const [isLoadingShareImage, setIsLoadingShareImage] = React.useState(false);

  const { amount: totalWatchTimeAmount, unit: totalWatchTimeUnit } =
    formatTimeLength(statistics.useTime.totalUsageTimeSec);
  const totalWatchTimeMins = Math.round(
    statistics.useTime.totalUsageTimeSec / 60
  );

  const { amount: averageSessionLengthAmount, unit: averageSessionLengthUnit } =
    formatTimeLength(statistics.useTime.averageSessionLengthSec);

  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <div className="md:p-12">
        <h1 className="text-2xl font-black text-starship-400 animate-in slide-in-from-bottom fade-in duration-1000 pb-12">
          And you did so much more...
        </h1>

        <div className="w-4xl dark text-zinc-200 text-left">
          <Table className="w-full">
            <TableBody>
              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Profile</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Profile photo changes
                </TableCell>
                <TableCell>
                  {statistics.profile.profilePhotoChanges.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Public/Private profile changes
                </TableCell>
                <TableCell>
                  {statistics.profile.publicPrivateChanges.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Stories posted</TableCell>
                <TableCell>
                  {statistics.profile.storiesPosted.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Accounts unfollowed
                </TableCell>
                <TableCell>
                  {statistics.profile.unfollowedCount.toLocaleString()}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Usage</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Total time spent on Instagram
                </TableCell>
                <TableCell>
                  {totalWatchTimeAmount} {totalWatchTimeUnit} (
                  {totalWatchTimeMins} minutes)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Sessions</TableCell>
                <TableCell>
                  {statistics.useTime.totalSessions.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Average session length
                </TableCell>
                <TableCell>
                  {Math.abs(averageSessionLengthAmount)}{" "}
                  {averageSessionLengthUnit}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Activity</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Total Comments</TableCell>
                <TableCell>
                  {statistics.activity.commentsWritten.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Liked comments</TableCell>
                <TableCell>
                  {statistics.activity.likedComments.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Liked posts</TableCell>
                <TableCell>
                  {statistics.activity.likedPosts.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Polls participated
                </TableCell>
                <TableCell>
                  {statistics.activity.pollsParticipated.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Stories posted</TableCell>
                <TableCell>
                  {statistics.activity.storiesPosted.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Stories liked</TableCell>
                <TableCell>
                  {statistics.activity.storyLikes.toLocaleString()}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">DMs</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">DMs received</TableCell>
                <TableCell>
                  {statistics.directMessages.dmReceived.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  DMs sent to others
                </TableCell>
                <TableCell>
                  {statistics.directMessages.dmSent.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Posts shared via DM
                </TableCell>
                <TableCell>
                  {statistics.directMessages.postsShared.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Reels shared via DM
                </TableCell>
                <TableCell>
                  {statistics.directMessages.reelsShared.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  TikToks shared via DM
                </TableCell>
                <TableCell>
                  {statistics.directMessages.tiktoksShared.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Top sender</TableCell>
                <TableCell>{statistics.directMessages.topSender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Most active hour
                </TableCell>
                <TableCell>
                  {statistics.directMessages.mostActiveHour}:00
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Emojis</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Most used emoji</TableCell>
                <TableCell>
                  {statistics.emoji.mostUsedEmoji.emoji} (
                  {statistics.emoji.mostUsedEmoji.count.toLocaleString()})
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Least used emoji
                </TableCell>
                <TableCell>
                  {statistics.emoji.leastUsedEmoji.emoji} (
                  {statistics.emoji.leastUsedEmoji.count.toLocaleString()})
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Total emojis used
                </TableCell>
                <TableCell>
                  {statistics.emoji.emojisUsed.toLocaleString()}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">
                    External tracking
                  </strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Total pages tracked
                </TableCell>
                <TableCell>
                  {statistics.externalTracking.totalPages.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Total events tracked
                </TableCell>
                <TableCell>
                  {statistics.externalTracking.totalEvents.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Pages tracked</TableCell>
                <TableCell>
                  {statistics.externalTracking.interestingPageNames.join(", ")},
                  ...
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Search</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Top search</TableCell>
                <TableCell>
                  {statistics.search.topSearchValue.value} (
                  {statistics.search.topSearchValue.count.toLocaleString()}{" "}
                  times)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Button
            onClick={async () => {
              setIsLoadingShareImage(true);

              const url = getShareUrl(statistics);
              await shareImage(url);
              trackEvent("share_image");

              setTimeout(() => {
                setIsLoadingShareImage(false);
              }, 1000);
            }}
            className="mt-12 w-full"
            disabled={isLoadingShareImage}
          >
            {isLoadingShareImage ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <Share2 className="inline-block mr-2" size={16} />
                Share image
              </>
            )}
          </Button>

          <Projects />
        </div>
      </div>
    </WrappedContainer>
  );
}

export default Roundup;
