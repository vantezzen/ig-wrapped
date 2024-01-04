import Wrapped from "./Wrapped";
import {
  InstagramAccountConnections,
  InstagramAccountInformation,
  InstagramActivity,
  InstagramDirectMessage,
  InstagramExternalTrackedPage,
  InstagramProfileChange,
  InstagramUserData,
  InstagramUserDataSchema,
} from "./types";
import JSZip from "jszip";
import * as Sentry from "@sentry/nextjs";

import debugging from "debug";
const debug = debugging("WrappedCreator");

export default class WrappedCreator {
  isTextExport = false;

  fromFile(file: File): Promise<Wrapped> {
    return new Promise((resolve, reject) => {
      this.isTextExport = false;
      Sentry.setContext("file", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      this.fromZip(file).then(resolve).catch(reject);
    });
  }

  private async fromZip(file: File): Promise<Wrapped> {
    try {
      const zip = new JSZip();
      await zip.loadAsync(file);

      const instagramData: InstagramUserData = {
        accountConnections: await this.getAccountConnections(zip),
        accountInformation: await this.getAccountInformation(zip),
        directMessages: await this.getDirectMessages(zip),
        activity: await this.getActivity(zip),
        externalTrackedPages: await this.getExternalTrackedPages(zip),
      };

      console.log(instagramData);

      this.investigateSchema(instagramData);
      return new Wrapped(instagramData);
    } catch (e) {
      Sentry.captureException(new Error("Cannot read ZIP file"), {
        extra: {
          originalException: e,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        },
      });

      throw e;
    }
  }

  forDemoMode(): Wrapped {
    const wrapped = new Wrapped({} as any);
    wrapped.demoMode = true;
    return wrapped;
  }

  private investigateSchema(content: any) {
    const parsed = InstagramUserDataSchema.safeParse(content);
    if (!parsed.success) {
      // Log schema errors to Sentry
      Sentry.captureException(new Error("Schema validation failed"), {
        extra: {
          errors: parsed.error,
        },
      });
    }
  }

  private async getAccountConnections(
    zip: JSZip
  ): Promise<InstagramAccountConnections> {
    let output = {} as InstagramAccountConnections;

    const followingFile =
      zip.files["connections/followers_and_following/following.json"];
    if (followingFile) {
      debug("getAccountConnections: followingFile");
      const following = JSON.parse(await followingFile.async("string"));
      output.following = following.relationships_following.map(
        (f: any) => f.string_list_data[0]
      );
    }

    const followersFile =
      zip.files["connections/followers_and_following/followers_1.json"];
    if (followersFile) {
      debug("getAccountConnections: followersFile");
      const followers = JSON.parse(await followersFile.async("string"));
      output.followers = followers.map((f: any) => f.string_list_data[0]);
    }

    const recentlyUnfollowedFile =
      zip.files[
        "connections/followers_and_following/recently_unfollowed_accounts.json"
      ];
    if (recentlyUnfollowedFile) {
      debug("getAccountConnections: recentlyUnfollowedFile");
      const recentlyUnfollowed = JSON.parse(
        await recentlyUnfollowedFile.async("string")
      );
      output.recentlyUnfollowed = this.removeOutdatedEntries(
        recentlyUnfollowed.relationships_unfollowed_users.map(
          (f: any) => f.string_list_data[0]
        )
      );
    }

    const recentFollowRequestsFile =
      zip.files[
        "connections/followers_and_following/recent_follow_requests.json"
      ];
    if (recentFollowRequestsFile) {
      debug("getAccountConnections: recentFollowRequestsFile");
      const recentFollowRequests = JSON.parse(
        await recentFollowRequestsFile.async("string")
      );
      output.recentFollowRequests = this.removeOutdatedEntries(
        recentFollowRequests.relationships_permanent_follow_requests.map(
          (f: any) => f.string_list_data[0]
        )
      );
    }

    return output;
  }

  private async getAccountInformation(
    zip: JSZip
  ): Promise<InstagramAccountInformation> {
    let output = {} as InstagramAccountInformation;

    const generalAccountInformationFile =
      zip.files[
        "personal_information/personal_information/personal_information.json"
      ];
    if (generalAccountInformationFile) {
      debug("getAccountInformation: generalAccountInformationFile");
      const generalAccountInformation = JSON.parse(
        await generalAccountInformationFile.async("string")
      );
      const profile = generalAccountInformation.profile_user[0];
      output.username = profile.string_map_data.Username.value;
      output.name = profile.string_map_data.Name.value;
    }

    const profileChangesFile =
      zip.files[
        "personal_information/personal_information/profile_changes.json"
      ];

    output.changes = [];
    if (profileChangesFile) {
      debug("getAccountInformation: profileChangesFile");
      const profileChanges = JSON.parse(
        await profileChangesFile.async("string")
      );
      output.changes = this.removeOutdatedEntries(
        profileChanges.profile_profile_change.map((c: any) => ({
          changed: c.string_map_data.Changed.value,
          timestamp: c.string_map_data["Change Date"].timestamp,
        }))
      );
    }

    const profilePhotoChangesFile =
      zip.files["your_instagram_activity/content/profile_photos.json"];
    if (profilePhotoChangesFile) {
      debug("getAccountInformation: profilePhotoChangesFile");
      const profilePhotoChanges = JSON.parse(
        await profilePhotoChangesFile.async("string")
      );

      output.changes = output.changes.concat(
        this.removeOutdatedEntries(
          profilePhotoChanges.ig_profile_picture.map((c: any) => ({
            changed: "Profile Photo",
            timestamp: c.creation_timestamp,
          }))
        )
      );
    }

    const privacyStatusChangesFile =
      zip.files[
        "security_and_login_information/login_and_account_creation/account_privacy_changes.json"
      ];
    if (privacyStatusChangesFile) {
      debug("getAccountInformation: privacyStatusChangesFile");
      const privacyStatusChanges = JSON.parse(
        await privacyStatusChangesFile.async("string")
      );

      const privacyChanges = this.removeOutdatedEntries(
        privacyStatusChanges.account_history_account_privacy_history.map(
          (c: any) => ({
            changed: c.title,
            timestamp: c.string_map_data.Time.timestamp,
          })
        ) as InstagramProfileChange[]
      );
      console.log(privacyChanges);

      output.changes = output.changes.concat(privacyChanges);
    }

    return output;
  }

  private async getDirectMessages(
    zip: JSZip
  ): Promise<InstagramDirectMessage[]> {
    let output = [] as InstagramDirectMessage[];
    let ownName = "";

    const generalAccountInformationFile =
      zip.files[
        "personal_information/personal_information/personal_information.json"
      ];
    if (generalAccountInformationFile) {
      debug("getDirectMessages: generalAccountInformationFile");
      const generalAccountInformation = JSON.parse(
        await generalAccountInformationFile.async("string")
      );
      const profile = generalAccountInformation.profile_user[0];
      ownName = profile.string_map_data.Name.value;
    }

    const directMessageFiles = Object.values(zip.files).filter(
      (f) =>
        f.name.startsWith("your_instagram_activity/messages/inbox") &&
        f.name.endsWith(".json")
    );
    for (const file of directMessageFiles) {
      debug("getDirectMessages: directMessageFiles: ", file.name);
      const messages = JSON.parse(await file.async("string"));

      const messagesInThread = this.removeOutdatedEntries(
        messages.messages.map((m: any) => ({
          content: m.content,
          timestamp: Math.round(m.timestamp_ms / 1000),
          sender: m.sender_name,

          isUserSender: m.sender_name === ownName,
          isReelShare:
            m.share?.link?.startsWith("https://www.instagram.com/reel/") ??
            false,
          isPostShare:
            m.share?.link?.startsWith("https://www.instagram.com/p/") ?? false,
          isTikTokShare: m.content?.includes("https://vm.tiktok.com/") ?? false,
        })) as InstagramDirectMessage[]
      );

      output = output.concat(messagesInThread);
    }

    return output;
  }

  private async getActivity(zip: JSZip): Promise<InstagramActivity> {
    let output = {} as InstagramActivity;

    const commentsFile =
      zip.files["your_instagram_activity/comments/post_comments_1.json"];
    if (commentsFile) {
      debug("getActivity: commentsFile");
      const comments = JSON.parse(await commentsFile.async("string"));
      output.comments = this.removeOutdatedEntries(
        comments.map((c: any) => ({
          href: "",
          value: c.string_map_data.Comment.value,
          timestamp: c.string_map_data.Time.timestamp,
        }))
      );
    }

    const likedCommentsFile =
      zip.files["your_instagram_activity/likes/liked_comments.json"];
    if (likedCommentsFile) {
      debug("getActivity: likedCommentsFile");
      const likedComments = JSON.parse(await likedCommentsFile.async("string"));
      output.likedComments = this.removeOutdatedEntries(
        likedComments.likes_comment_likes.map((c: any) => c.string_list_data[0])
      );
    }

    const likedPostsFile =
      zip.files["your_instagram_activity/likes/liked_posts.json"];
    if (likedPostsFile) {
      debug("getActivity: likedPostsFile");
      const likedPosts = JSON.parse(await likedPostsFile.async("string"));
      output.likedPosts = this.removeOutdatedEntries(
        likedPosts.likes_media_likes.map((c: any) => c.string_list_data[0])
      );
    }

    output.recentSearches = {};

    const recentAccountSearchesFile =
      zip.files["logged_information/recent_searches/account_searches.json"];
    if (recentAccountSearchesFile) {
      debug("getActivity: recentAccountSearchesFile");
      const recentAccountSearches = JSON.parse(
        await recentAccountSearchesFile.async("string")
      );
      output.recentSearches.accounts = this.removeOutdatedEntries(
        recentAccountSearches.searches_user.map((c: any) => ({
          href: "",
          value: c.string_map_data.Search.value,
          timestamp: c.string_map_data.Time.timestamp,
        }))
      );
    }

    const recentWordOrPhraseSearchesFile =
      zip.files[
        "logged_information/recent_searches/word_or_phrase_searches.json"
      ];
    if (recentWordOrPhraseSearchesFile) {
      debug("getActivity: recentWordOrPhraseSearchesFile");
      const recentWordOrPhraseSearches = JSON.parse(
        await recentWordOrPhraseSearchesFile.async("string")
      );
      output.recentSearches.wordOrPhrase = this.removeOutdatedEntries(
        recentWordOrPhraseSearches.searches_keyword.map((c: any) => ({
          href: "",
          value: c.string_map_data.Search.value,
          timestamp: c.string_map_data.Time.timestamp,
        }))
      );
    }

    const participatedPollsFile =
      zip.files[
        "your_instagram_activity/story_sticker_interactions/polls.json"
      ];
    if (participatedPollsFile) {
      debug("getActivity: participatedPollsFile");
      const participatedPolls = JSON.parse(
        await participatedPollsFile.async("string")
      );
      output.participatedPolls = this.removeOutdatedEntries(
        participatedPolls.story_activities_polls.map((c: any) => ({
          href: "",
          value: c.title,
          timestamp: c.string_list_data[0].timestamp,
        }))
      );
    }

    const storyLikesFile =
      zip.files[
        "your_instagram_activity/story_sticker_interactions/story_likes.json"
      ];
    if (storyLikesFile) {
      debug("getActivity: storyLikesFile");
      const storyLikes = JSON.parse(await storyLikesFile.async("string"));
      output.storyLikes = this.removeOutdatedEntries(
        storyLikes.story_activities_story_likes.map((c: any) => ({
          href: "",
          value: c.title,
          timestamp: c.string_list_data[0].timestamp,
        }))
      );
    }

    const storiesFile =
      zip.files["your_instagram_activity/content/stories.json"];
    if (storiesFile) {
      debug("getActivity: storiesFile");
      const stories = JSON.parse(await storiesFile.async("string"));
      output.stories = this.removeOutdatedEntries(
        stories.ig_stories.map((c: any) => ({
          href: "",
          value: "",
          timestamp: c.creation_timestamp,
        }))
      );
    }

    const profilePhotosFile =
      zip.files["your_instagram_activity/content/profile_photos.json"];
    if (profilePhotosFile) {
      debug("getActivity: profilePhotosFile");
      const profilePhotos = JSON.parse(await profilePhotosFile.async("string"));
      output.profilePhotos = this.removeOutdatedEntries(
        profilePhotos.ig_profile_picture.map((c: any) => ({
          href: "",
          value: "",
          timestamp: c.creation_timestamp,
        }))
      );
    }

    return output;
  }

  private async getExternalTrackedPages(
    zip: JSZip
  ): Promise<InstagramExternalTrackedPage[]> {
    let output = [] as InstagramExternalTrackedPage[];

    const externalTrackedPagesFile =
      zip.files[
        "apps_and_websites_off_of_instagram/apps_and_websites/your_activity_off_meta_technologies.json"
      ];
    if (externalTrackedPagesFile) {
      debug("getExternalTrackedPages: externalTrackedPagesFile");
      const externalTrackedPages = JSON.parse(
        await externalTrackedPagesFile.async("string")
      );
      output = externalTrackedPages.apps_and_websites_off_meta_activity.map(
        (c: any) => ({
          name: c.name,
          eventAmount: c.events.length,
        })
      );
    }

    return output;
  }

  private removeOutdatedEntries<T extends { timestamp: number }>(
    data: T[]
  ): T[] {
    const earliestTimestamp = new Date().getTime() - 1000 * 60 * 60 * 24 * 365; // 1 year ago

    return data.filter((entry) => entry.timestamp * 1000 > earliestTimestamp);
  }
}
