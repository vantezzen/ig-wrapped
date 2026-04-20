import React from "react";
import { Statistics } from "@/lib/Wrapped";
import formatTimeLength from "@/lib/utils/formatTimeLength";

function ShareCard({
  statistics,
  forwardedRef,
}: {
  statistics: Statistics;
  forwardedRef: React.Ref<HTMLDivElement>;
}) {
  const { amount: totalWatchTimeAmount, unit: totalWatchTimeUnit } =
    formatTimeLength(statistics.useTime.totalUsageTimeSec);

  return (
    <div
      ref={forwardedRef}
      style={{
        width: 1080,
        height: 1920,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
      className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-0 flex flex-col relative overflow-hidden"
    >
      {/* Colorful top stripe */}
      <div style={{ display: 'flex', height: '64px', width: '100%' }}>
        <div style={{ flex: 1, backgroundColor: '#3B82F6' }}></div>
        <div style={{ flex: 1, backgroundColor: '#FACC15' }}></div>
        <div style={{ flex: 1, backgroundColor: '#EC4899' }}></div>
        <div style={{ flex: 1, backgroundColor: '#22C55E' }}></div>
        <div style={{ flex: 1, backgroundColor: '#F97316' }}></div>
      </div>

      {/* Decorative geometric shapes */}
      <div style={{
        position: 'absolute',
        top: '160px',
        right: '80px',
        width: '128px',
        height: '128px',
        border: '8px solid #F97316',
        borderRadius: '50%',
        opacity: 0.4,
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '384px',
        left: '64px',
        width: '192px',
        height: '192px',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        transform: 'rotate(45deg)',
      }}></div>

      {/* Sparkle decorations */}
      <div style={{ position: 'absolute', top: '256px', left: '128px', fontSize: '48px', color: '#FACC15', opacity: 0.6 }}>✦</div>
      <div style={{ position: 'absolute', top: '384px', right: '192px', fontSize: '40px', color: '#EC4899', opacity: 0.6 }}>✦</div>
      <div style={{ position: 'absolute', bottom: '33%', left: '192px', fontSize: '32px', color: '#3B82F6', opacity: 0.6 }}>✦</div>

      <div style={{ position: 'relative', zIndex: 10, padding: '80px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: '64px', marginTop: '48px' }}>
          <h1 style={{ fontSize: '120px', fontWeight: 900, lineHeight: 1, marginBottom: '24px', color: 'white' }}>
            Instagram
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <h2 style={{ 
              fontSize: '96px', 
              fontWeight: 900, 
              background: 'linear-gradient(to right, #FACC15, #EC4899, #A855F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Wrapped
            </h2>
            <span style={{ fontSize: '64px' }}>⚡</span>
          </div>
          <div style={{ 
            marginTop: '24px', 
            display: 'inline-block', 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            padding: '16px 32px', 
            borderRadius: '9999px' 
          }}>
            <p style={{ fontSize: '40px', fontWeight: 700, color: 'white' }}>2025</p>
          </div>
        </div>

        {/* Profile Section */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '32px', 
          marginBottom: '64px', 
          backgroundColor: 'rgba(30, 41, 59, 0.6)', 
          padding: '32px', 
          borderRadius: '24px',
          border: '4px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{ 
            width: '192px', 
            height: '192px', 
            borderRadius: '50%', 
            overflow: 'hidden',
            border: '6px solid rgba(255,255,255,0.3)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #9333EA, #EC4899)',
          }}>
            {statistics.profilePicture ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={statistics.profilePicture}
                alt={statistics.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ fontSize: '80px', fontWeight: 900, color: 'white' }}>
                {statistics.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 style={{ fontSize: '56px', fontWeight: 900, marginBottom: '8px', color: 'white' }}>{statistics.name}</h3>
            <div style={{ 
              background: 'linear-gradient(to right, #FACC15, #F97316)', 
              padding: '8px 24px', 
              borderRadius: '9999px', 
              display: 'inline-block' 
            }}>
              <p style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A' }}>Top Fan</p>
            </div>
          </div>
        </div>

        {/* Stats Grid - Bold Color Blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', flex: 1 }}>
          {/* Time Stat - Large */}
          <div style={{ 
            gridColumn: 'span 2', 
            background: 'linear-gradient(135deg, #2563EB, #3B82F6)', 
            padding: '40px', 
            borderRadius: '32px', 
            position: 'relative', 
            overflow: 'hidden' 
          }}>
            <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '96px', opacity: 0.1 }}>⏱</div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
              Time on IG
            </p>
            <p style={{ color: 'white', fontSize: '96px', fontWeight: 900, lineHeight: 1 }}>
              {totalWatchTimeAmount}
            </p>
            <p style={{ color: 'white', fontSize: '48px', fontWeight: 700, marginTop: '8px', opacity: 0.9 }}>
              {totalWatchTimeUnit}
            </p>
          </div>

          {/* DMs Sent */}
          <div style={{ 
            background: 'linear-gradient(135deg, #DB2777, #EC4899)', 
            padding: '32px', 
            borderRadius: '32px', 
            position: 'relative', 
            overflow: 'hidden' 
          }}>
            <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '72px', opacity: 0.1 }}>💬</div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '24px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
              DMs Sent
            </p>
            <p style={{ color: 'white', fontSize: '72px', fontWeight: 900, lineHeight: 1 }}>
              {statistics.directMessages.dmSent.toLocaleString()}
            </p>
          </div>

          {/* Stories */}
          <div style={{ 
            background: 'linear-gradient(135deg, #EAB308, #F97316)', 
            padding: '32px', 
            borderRadius: '32px', 
            position: 'relative', 
            overflow: 'hidden' 
          }}>
            <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '72px', opacity: 0.1 }}>📸</div>
            <p style={{ color: 'rgba(15,23,42,0.7)', fontSize: '24px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
              Stories
            </p>
            <p style={{ color: '#0F172A', fontSize: '72px', fontWeight: 900, lineHeight: 1 }}>
              {statistics.activity.storiesPosted.toLocaleString()}
            </p>
          </div>

          {/* Top Emoji - Special */}
          <div style={{ 
            gridColumn: 'span 2', 
            background: 'linear-gradient(135deg, #9333EA, #6366F1)', 
            padding: '40px', 
            borderRadius: '32px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            position: 'relative', 
            overflow: 'hidden' 
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '256px', height: '256px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(48px)' }}></div>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '28px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
                Top Emoji
              </p>
              <p style={{ color: 'white', fontSize: '48px', fontWeight: 700 }}>
                Used {statistics.emoji.mostUsedEmoji.count.toLocaleString()} times
              </p>
            </div>
            <div style={{ fontSize: '180px', position: 'relative', zIndex: 10 }}>
              {statistics.emoji.mostUsedEmoji.emoji}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: '48px', 
          paddingTop: '32px', 
          borderTop: '4px solid rgba(255,255,255,0.2)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div>
            <p style={{ fontSize: '40px', fontWeight: 900, color: 'white' }}>IG Wrapped</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '24px', marginTop: '4px' }}>Your year in review</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '24px' }}>Get yours at</p>
            <p style={{ color: '#FACC15', fontSize: '32px', fontWeight: 900, marginTop: '4px' }}>
              wrapped.vantezzen.io
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareCard;
