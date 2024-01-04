import Container from "@/components/Image/Container";
import Footer from "@/components/Image/Footer";
import TableRow from "@/components/Image/TableRow";
import Waves from "@/components/Image/Waves";
import { ShareImageDataSchema } from "@/lib/types";
import { ImageResponse } from "next/server";

export const runtime = "edge";

const interBlack = fetch(
  new URL("./Inter/Inter-Black.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
  const interBlackData = await interBlack;

  const { searchParams } = new URL(request.url);
  const reqData = ShareImageDataSchema.safeParse(
    JSON.parse(searchParams.get("data") ?? "{}")
  );

  if (!reqData.success) {
    return new Response("Invalid request", { status: 400 });
  }

  const { data } = reqData;

  return new ImageResponse(
    (
      <Container>
        <Waves />
        <h1
          style={{
            fontFamily: "Inter",
            fontWeight: 900,
            fontSize: "72px",
          }}
        >
          {data.name}'s
        </h1>
        <h1
          style={{
            fontFamily: "Inter",
            fontWeight: 900,
            fontSize: "72px",
          }}
        >
          Wrapped for Instagram
        </h1>

        <table
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "120px",
          }}
        >
          <TableRow
            title="Stories posted"
            value={data.storiesPosted.toLocaleString()}
          />
          <TableRow
            title="DMs received"
            value={data.dmReceived.toLocaleString()}
          />
          <TableRow
            title="Reels shared via DM"
            value={data.reelsShared.toLocaleString()}
          />
          <TableRow
            title="Accounts unfollowed"
            value={data.unfollowedAccounts.toLocaleString()}
          />
          <TableRow
            title="Posts liked"
            value={data.postsLiked.toLocaleString()}
          />
          <TableRow
            title="Comments posted"
            value={data.commentsWritten.toLocaleString()}
          />

          <TableRow
            title="Pages tracken on"
            value={data.externalTracking.toLocaleString()}
          />
        </table>

        <Footer />
      </Container>
    ),
    {
      width: 1080,
      height: 1920,
      fonts: [
        {
          name: "Inter",
          data: interBlackData,
          weight: 900,
          style: "normal",
        },
      ],
    }
  );
}
