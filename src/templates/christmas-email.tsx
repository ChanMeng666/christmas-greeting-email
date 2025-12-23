import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Img,
  Hr,
} from '@react-email/components';
import * as React from 'react';
import { config } from '../config.js';

interface ChristmasEmailProps {
  recipientName?: string;
  personalImageUrl?: string;
  festiveImageUrl?: string;
  stickerImageUrl?: string;
}

// ============================================
// Emoji Icons - Email-safe decorations
// ============================================

const icons = {
  christmasTree: '🎄',
  snowflake: '❄️',
  gift: '🎁',
  star: '⭐',
  sparkle: '✨',
  bell: '🔔',
  holly: '🎄',
  heart: '❤️',
  ribbon: '🎀',
  santa: '🎅',
  candy: '🍬',
};

// ============================================
// Color Palette
// ============================================

const colors = {
  christmasRed: '#DC2626',
  christmasRedDark: '#B91C1C',
  christmasRedLight: '#FEE2E2',
  christmasGreen: '#16A34A',
  christmasGreenDark: '#15803D',
  christmasGreenLight: '#DCFCE7',
  gold: '#F59E0B',
  goldLight: '#FEF3C7',
  black: '#000000',
  cream: '#FEF3C7',
  warmWhite: '#FFFBEB',
  white: '#FFFFFF',
  darkBg: '#1a1a2e',
};

// ============================================
// Styles - Neobrutalism + Christmas Theme
// ============================================

const styles = {
  body: {
    backgroundColor: colors.darkBg,
    fontFamily: "'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif",
    margin: 0,
    padding: '40px 20px',
  },
  container: {
    backgroundColor: colors.warmWhite,
    border: `5px solid ${colors.black}`,
    boxShadow: `12px 12px 0px ${colors.black}`,
    maxWidth: '600px',
    margin: '0 auto',
  },
  topBanner: {
    backgroundColor: colors.christmasGreen,
    padding: '12px',
    textAlign: 'center' as const,
    borderBottom: `4px solid ${colors.black}`,
  },
  topBannerText: {
    fontSize: '18px',
    margin: 0,
    letterSpacing: '8px',
  },
  header: {
    backgroundColor: colors.christmasRed,
    padding: '40px 30px',
    textAlign: 'center' as const,
    borderBottom: `4px solid ${colors.black}`,
  },
  headerSubtitle: {
    color: colors.goldLight,
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '4px',
    textTransform: 'uppercase' as const,
    margin: '0 0 10px 0',
  },
  headerTitle: {
    color: colors.white,
    fontSize: '42px',
    fontWeight: 900,
    margin: '0 0 10px 0',
    textTransform: 'uppercase' as const,
    letterSpacing: '3px',
    textShadow: `4px 4px 0px ${colors.black}`,
    lineHeight: 1.1,
  },
  headerYear: {
    color: colors.gold,
    fontSize: '24px',
    fontWeight: 700,
    margin: '15px 0 0 0',
    letterSpacing: '8px',
  },
  iconBar: {
    backgroundColor: colors.cream,
    padding: '15px',
    textAlign: 'center' as const,
    borderBottom: `4px solid ${colors.black}`,
    fontSize: '28px',
    letterSpacing: '12px',
  },
  imageSection: {
    padding: '35px 30px',
    textAlign: 'center' as const,
    backgroundColor: colors.christmasRedLight,
    borderBottom: `4px solid ${colors.black}`,
  },
  imageSectionIcons: {
    fontSize: '20px',
    letterSpacing: '8px',
    marginBottom: '15px',
  },
  imageContainer: {
    border: `6px solid ${colors.black}`,
    boxShadow: `10px 10px 0px ${colors.christmasRed}`,
    display: 'inline-block',
    backgroundColor: colors.white,
    padding: '10px',
    borderRadius: '4px',
  },
  mainImage: {
    maxWidth: '100%',
    width: '480px',
    height: 'auto',
    display: 'block',
    borderRadius: '2px',
  },
  imageCaption: {
    backgroundColor: colors.christmasRed,
    color: colors.white,
    fontSize: '14px',
    fontWeight: 700,
    padding: '12px 20px',
    margin: '15px auto 0',
    display: 'inline-block',
    border: `3px solid ${colors.black}`,
    boxShadow: `4px 4px 0px ${colors.black}`,
    letterSpacing: '1px',
  },
  festiveImageSection: {
    padding: '35px 30px',
    textAlign: 'center' as const,
    backgroundColor: colors.christmasGreenLight,
    borderBottom: `4px solid ${colors.black}`,
  },
  festiveImageContainer: {
    border: `6px solid ${colors.black}`,
    boxShadow: `10px 10px 0px ${colors.christmasGreen}`,
    display: 'inline-block',
    backgroundColor: colors.white,
    padding: '10px',
    borderRadius: '4px',
  },
  festiveImageCaption: {
    backgroundColor: colors.christmasGreen,
    color: colors.white,
    fontSize: '14px',
    fontWeight: 700,
    padding: '12px 20px',
    margin: '15px auto 0',
    display: 'inline-block',
    border: `3px solid ${colors.black}`,
    boxShadow: `4px 4px 0px ${colors.black}`,
    letterSpacing: '1px',
  },
  ribbonDivider: {
    backgroundColor: colors.christmasRed,
    padding: '12px 20px',
    textAlign: 'center' as const,
    borderTop: `3px solid ${colors.black}`,
    borderBottom: `3px solid ${colors.black}`,
  },
  ribbonText: {
    color: colors.white,
    fontSize: '13px',
    fontWeight: 700,
    margin: 0,
    letterSpacing: '3px',
    textTransform: 'uppercase' as const,
  },
  greetingSection: {
    backgroundColor: colors.christmasGreenLight,
    padding: '30px',
    borderBottom: `4px solid ${colors.black}`,
  },
  greetingBox: {
    backgroundColor: colors.christmasGreen,
    border: `4px solid ${colors.black}`,
    boxShadow: `6px 6px 0px ${colors.christmasRed}`,
    padding: '20px 25px',
    display: 'inline-block',
  },
  greetingText: {
    color: colors.white,
    fontSize: '22px',
    fontWeight: 700,
    margin: 0,
    textShadow: `1px 1px 0px ${colors.black}`,
  },
  messageSection: {
    padding: '35px 30px',
    backgroundColor: colors.warmWhite,
  },
  messageBox: {
    backgroundColor: colors.white,
    border: `4px solid ${colors.black}`,
    padding: '30px',
    marginBottom: '25px',
  },
  messageText: {
    color: colors.black,
    fontSize: '16px',
    lineHeight: 1.9,
    margin: '0 0 20px 0',
  },
  messageTextLast: {
    color: colors.black,
    fontSize: '16px',
    lineHeight: 1.9,
    margin: 0,
  },
  highlightBox: {
    backgroundColor: colors.gold,
    border: `3px solid ${colors.black}`,
    padding: '15px 20px',
    margin: '25px 0',
    textAlign: 'center' as const,
  },
  highlightText: {
    color: colors.black,
    fontSize: '18px',
    fontWeight: 700,
    margin: 0,
  },
  wishesSection: {
    backgroundColor: colors.christmasRedLight,
    border: `4px solid ${colors.black}`,
    padding: '25px',
    marginBottom: '25px',
    position: 'relative' as const,
  },
  stickerContainer: {
    textAlign: 'center' as const,
    marginTop: '20px',
  },
  stickerImage: {
    maxWidth: '200px',
    width: '200px',
    height: 'auto',
  },
  wishesTitle: {
    color: colors.christmasRedDark,
    fontSize: '18px',
    fontWeight: 700,
    margin: '0 0 15px 0',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
  },
  wishItem: {
    color: colors.black,
    fontSize: '15px',
    lineHeight: 2.2,
    margin: '0 0 5px 0',
    paddingLeft: '5px',
  },
  senderSection: {
    padding: '35px 30px',
    backgroundColor: colors.christmasGreen,
    borderTop: `4px solid ${colors.black}`,
  },
  senderCard: {
    backgroundColor: colors.christmasRed,
    border: `5px solid ${colors.black}`,
    boxShadow: `8px 8px 0px ${colors.black}`,
    padding: '30px',
    textAlign: 'center' as const,
    marginBottom: '25px',
  },
  closingMessage: {
    backgroundColor: colors.christmasGreenDark,
    border: `4px solid ${colors.black}`,
    padding: '20px 25px',
    textAlign: 'center' as const,
  },
  closingText: {
    color: colors.white,
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 8px 0',
  },
  closingSubtext: {
    color: colors.goldLight,
    fontSize: '13px',
    margin: 0,
  },
  senderLabel: {
    color: colors.goldLight,
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '3px',
    textTransform: 'uppercase' as const,
    margin: '0 0 8px 0',
  },
  senderName: {
    color: colors.white,
    fontSize: '28px',
    fontWeight: 900,
    margin: '0 0 20px 0',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
  },
  linkedinButton: {
    backgroundColor: colors.white,
    border: `4px solid ${colors.black}`,
    boxShadow: `5px 5px 0px ${colors.black}`,
    color: colors.black,
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 700,
    padding: '14px 28px',
    textDecoration: 'none',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
  },
  footer: {
    backgroundColor: colors.christmasGreen,
    borderTop: `4px solid ${colors.black}`,
    padding: '25px',
    textAlign: 'center' as const,
  },
  footerIcons: {
    fontSize: '20px',
    letterSpacing: '8px',
    marginBottom: '15px',
  },
  footerTextBox: {
    backgroundColor: colors.christmasGreenDark,
    display: 'inline-block',
    padding: '12px 25px',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  footerText: {
    color: colors.white,
    fontSize: '14px',
    fontWeight: 600,
    margin: 0,
  },
  footerSubtextBox: {
    backgroundColor: colors.christmasGreen,
    display: 'inline-block',
    padding: '8px 20px',
    borderRadius: '4px',
  },
  footerSubtext: {
    color: colors.white,
    fontSize: '12px',
    margin: 0,
  },
  bottomBanner: {
    backgroundColor: colors.christmasRed,
    padding: '15px',
    textAlign: 'center' as const,
    fontSize: '16px',
    letterSpacing: '6px',
  },
  divider: {
    height: '8px',
    backgroundColor: colors.gold,
    border: 'none',
    margin: 0,
  },
};

// ============================================
// Main Email Component
// ============================================

export const ChristmasEmail: React.FC<ChristmasEmailProps> = ({
  recipientName = 'Friend',
  personalImageUrl = config.personalImageUrl,
  festiveImageUrl = config.festiveImageUrl,
  stickerImageUrl = config.stickerImageUrl,
}) => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  return (
    <Html>
      <Head>
        <title>{`Season's Greetings from ${config.sender.name}`}</title>
      </Head>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Top Decorative Banner */}
          <Section style={styles.topBanner}>
            <Text style={styles.topBannerText}>
              {icons.snowflake} {icons.star} {icons.snowflake} {icons.bell} {icons.snowflake} {icons.star} {icons.snowflake}
            </Text>
          </Section>

          {/* Main Header */}
          <Section style={styles.header}>
            <Text style={styles.headerSubtitle}>Season's Greetings</Text>
            <Text style={styles.headerTitle}>Merry Christmas</Text>
            <Text style={styles.headerYear}>
              {icons.star} {nextYear} {icons.star}
            </Text>
          </Section>

          {/* Icon Decoration Bar */}
          <Section style={styles.iconBar}>
            {icons.christmasTree} {icons.gift} {icons.bell} {icons.ribbon} {icons.gift} {icons.christmasTree}
          </Section>

          {/* Personal Image Section */}
          {personalImageUrl && personalImageUrl !== 'YOUR_IMAGE_URL_HERE' && (
            <Section style={styles.imageSection}>
              <Text style={styles.imageSectionIcons}>
                {icons.star} {icons.christmasTree} {icons.star}
              </Text>
              <div style={styles.imageContainer}>
                <Img
                  src={personalImageUrl}
                  alt="Holiday Greetings"
                  style={styles.mainImage}
                />
              </div>
              <div>
                <Text style={styles.imageCaption}>
                  {icons.snowflake} Holiday Wishes {icons.snowflake}
                </Text>
              </div>
            </Section>
          )}

          {/* Gold Divider */}
          <Hr style={styles.divider} />

          {/* Greeting Section */}
          <Section style={styles.greetingSection}>
            <div style={styles.greetingBox}>
              <Text style={styles.greetingText}>
                Dear {recipientName},
              </Text>
            </div>
          </Section>

          {/* Message Section */}
          <Section style={styles.messageSection}>
            <div style={styles.messageBox}>
              <Text style={styles.messageText}>
                As the holiday season fills the air with joy and celebration,
                I wanted to take a moment to send you my warmest wishes and heartfelt gratitude.
              </Text>

              <Text style={styles.messageText}>
                This year has been an incredible journey, and I am truly grateful
                for the meaningful connections we've made and the opportunities
                to collaborate, learn, and grow together.
              </Text>

              <div style={styles.highlightBox}>
                <Text style={styles.highlightText}>
                  {icons.sparkle} Wishing You a Magical Holiday Season {icons.sparkle}
                </Text>
              </div>

              <Text style={styles.messageTextLast}>
                May this Christmas bring you endless happiness, peace, and prosperity.
                Wishing you and your loved ones a season filled with laughter, love,
                and unforgettable moments.
              </Text>
            </div>

            {/* Wishes List */}
            <div style={styles.wishesSection}>
              <Text style={styles.wishesTitle}>
                {icons.heart} My Wishes for You
              </Text>
              <Text style={styles.wishItem}>
                {icons.star} Joy and happiness in every moment
              </Text>
              <Text style={styles.wishItem}>
                {icons.star} Success in all your endeavors
              </Text>
              <Text style={styles.wishItem}>
                {icons.star} Health and wellness for you and your family
              </Text>
              <Text style={styles.wishItem}>
                {icons.star} Exciting new adventures in {nextYear}
              </Text>

              {/* Sticker Image */}
              {stickerImageUrl && (
                <div style={styles.stickerContainer}>
                  <Img
                    src={stickerImageUrl}
                    alt="Christmas Sticker"
                    style={styles.stickerImage}
                  />
                </div>
              )}
            </div>
          </Section>

          {/* Decorative Ribbon Divider */}
          <Section style={styles.ribbonDivider}>
            <Text style={styles.ribbonText}>
              {icons.gift} Spreading Holiday Cheer {icons.gift}
            </Text>
          </Section>

          {/* Festive Image Section */}
          {festiveImageUrl && (
            <Section style={styles.festiveImageSection}>
              <Text style={styles.imageSectionIcons}>
                {icons.bell} {icons.christmasTree} {icons.bell}
              </Text>
              <div style={styles.festiveImageContainer}>
                <Img
                  src={festiveImageUrl}
                  alt="Festive Celebration"
                  style={styles.mainImage}
                />
              </div>
              <div>
                <Text style={styles.festiveImageCaption}>
                  {icons.sparkle} Season's Joy {icons.sparkle}
                </Text>
              </div>
            </Section>
          )}

          {/* Gold Divider before Sender */}
          <Hr style={styles.divider} />

          {/* Sender Card + Closing Message (combined to avoid Gmail folding) */}
          <Section style={styles.senderSection}>
            <div style={styles.senderCard}>
              <Text style={styles.senderLabel}>Warm Regards From</Text>
              <Text style={styles.senderName}>{config.sender.name}</Text>
              <Link href={config.linkedin} style={styles.linkedinButton}>
                Connect on LinkedIn
              </Link>
            </div>

            <div style={styles.closingMessage}>
              <Text style={styles.closingText}>
                {icons.christmasTree} Merry Christmas & Happy New Year {nextYear}! {icons.christmasTree}
              </Text>
              <Text style={styles.closingSubtext}>
                Sent with warmth and appreciation {icons.heart}
              </Text>
            </div>
          </Section>

          {/* Bottom Decorative Banner */}
          <Section style={styles.bottomBanner}>
            {icons.gift} {icons.star} {icons.christmasTree} {icons.star} {icons.bell} {icons.star} {icons.christmasTree} {icons.star} {icons.gift}
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ChristmasEmail;
