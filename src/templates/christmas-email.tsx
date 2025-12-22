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
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';
import { config } from '../config.js';

interface ChristmasEmailProps {
  recipientName?: string;
  personalImageUrl?: string;
}

// Neobrutalism + Christmas themed styles
const styles = {
  body: {
    backgroundColor: config.colors.cream,
    fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
    margin: 0,
    padding: '20px',
  },
  container: {
    backgroundColor: config.colors.warmWhite,
    border: `4px solid ${config.colors.black}`,
    boxShadow: `8px 8px 0px ${config.colors.black}`,
    maxWidth: '600px',
    margin: '0 auto',
  },
  header: {
    backgroundColor: config.colors.christmasRed,
    border: `4px solid ${config.colors.black}`,
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    padding: '30px 20px',
    textAlign: 'center' as const,
  },
  headerTitle: {
    color: config.colors.warmWhite,
    fontSize: '42px',
    fontWeight: 900,
    margin: 0,
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    textShadow: `3px 3px 0px ${config.colors.black}`,
  },
  decorationRow: {
    backgroundColor: config.colors.christmasGreen,
    padding: '15px',
    textAlign: 'center' as const,
    borderBottom: `4px solid ${config.colors.black}`,
  },
  decorationText: {
    fontSize: '28px',
    margin: 0,
    letterSpacing: '10px',
  },
  imageSection: {
    padding: '30px',
    textAlign: 'center' as const,
  },
  imageContainer: {
    border: `4px solid ${config.colors.black}`,
    boxShadow: `6px 6px 0px ${config.colors.christmasGreen}`,
    display: 'inline-block',
    backgroundColor: config.colors.warmWhite,
    padding: '10px',
  },
  mainImage: {
    maxWidth: '100%',
    width: '400px',
    height: 'auto',
    display: 'block',
  },
  messageSection: {
    padding: '30px',
    backgroundColor: config.colors.warmWhite,
  },
  greetingBox: {
    backgroundColor: config.colors.christmasGreen,
    border: `4px solid ${config.colors.black}`,
    boxShadow: `6px 6px 0px ${config.colors.christmasRed}`,
    padding: '25px',
    marginBottom: '25px',
  },
  greetingText: {
    color: config.colors.warmWhite,
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: 1.6,
    margin: 0,
    textShadow: `1px 1px 0px ${config.colors.black}`,
  },
  messageBox: {
    backgroundColor: config.colors.warmWhite,
    border: `4px solid ${config.colors.black}`,
    padding: '25px',
    marginBottom: '25px',
  },
  messageText: {
    color: config.colors.black,
    fontSize: '16px',
    lineHeight: 1.8,
    margin: 0,
  },
  highlightText: {
    backgroundColor: config.colors.gold,
    padding: '2px 8px',
    fontWeight: 700,
  },
  senderCard: {
    backgroundColor: config.colors.christmasRed,
    border: `4px solid ${config.colors.black}`,
    boxShadow: `6px 6px 0px ${config.colors.black}`,
    padding: '25px',
    textAlign: 'center' as const,
  },
  senderName: {
    color: config.colors.warmWhite,
    fontSize: '24px',
    fontWeight: 900,
    margin: '0 0 15px 0',
    textTransform: 'uppercase' as const,
  },
  linkedinButton: {
    backgroundColor: config.colors.warmWhite,
    border: `3px solid ${config.colors.black}`,
    boxShadow: `4px 4px 0px ${config.colors.black}`,
    color: config.colors.black,
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 700,
    padding: '12px 24px',
    textDecoration: 'none',
    textTransform: 'uppercase' as const,
    transition: 'transform 0.1s',
  },
  footer: {
    backgroundColor: config.colors.christmasGreen,
    borderTop: `4px solid ${config.colors.black}`,
    padding: '20px',
    textAlign: 'center' as const,
  },
  footerText: {
    color: config.colors.warmWhite,
    fontSize: '14px',
    margin: 0,
    fontWeight: 700,
  },
  snowflakes: {
    fontSize: '24px',
    letterSpacing: '15px',
  },
};

// Christmas decorative elements (using Unicode symbols for email compatibility)
const ChristmasDecorations = () => (
  <Text style={styles.decorationText}>
    🎄 ⭐ 🎁 ❄️ 🎄 ⭐ 🎁 ❄️
  </Text>
);

const Snowflakes = () => (
  <Text style={{ ...styles.footerText, ...styles.snowflakes }}>
    ❄️ ⛄ ❄️ 🎅 ❄️ ⛄ ❄️
  </Text>
);

export const ChristmasEmail: React.FC<ChristmasEmailProps> = ({
  recipientName = 'Friend',
  personalImageUrl = config.personalImageUrl,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head>
        <title>Season's Greetings from Chan Meng</title>
      </Head>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.headerTitle}>
              Merry Christmas
            </Text>
          </Section>

          {/* Decoration Row */}
          <Section style={styles.decorationRow}>
            <ChristmasDecorations />
          </Section>

          {/* Personal Image Section */}
          {personalImageUrl && personalImageUrl !== 'YOUR_IMAGE_URL_HERE' && (
            <Section style={styles.imageSection}>
              <div style={styles.imageContainer}>
                <Img
                  src={personalImageUrl}
                  alt="Holiday Greetings"
                  style={styles.mainImage}
                />
              </div>
            </Section>
          )}

          {/* Message Section */}
          <Section style={styles.messageSection}>
            {/* Greeting */}
            <div style={styles.greetingBox}>
              <Text style={styles.greetingText}>
                Dear {recipientName},
              </Text>
            </div>

            {/* Main Message */}
            <div style={styles.messageBox}>
              <Text style={styles.messageText}>
                As the holiday season fills the air with joy and celebration,
                I wanted to take a moment to send you my warmest wishes!
              </Text>
              <br />
              <Text style={styles.messageText}>
                This year has been an incredible journey, and I'm truly grateful
                for the connections we've made and the opportunities to collaborate
                and grow together.
              </Text>
              <br />
              <Text style={styles.messageText}>
                May this <span style={styles.highlightText}>Christmas</span> bring you
                endless happiness, peace, and prosperity. Wishing you and your loved
                ones a season filled with laughter, love, and unforgettable moments.
              </Text>
              <br />
              <Text style={styles.messageText}>
                Here's to a fantastic <span style={styles.highlightText}>{currentYear + 1}</span> ahead!
                May it be filled with new adventures, achievements, and wonderful surprises.
              </Text>
            </div>

            {/* Sender Card */}
            <div style={styles.senderCard}>
              <Text style={styles.senderName}>
                {config.sender.name}
              </Text>
              <Link href={config.linkedin} style={styles.linkedinButton}>
                Connect on LinkedIn
              </Link>
            </div>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Snowflakes />
            <Text style={{ ...styles.footerText, marginTop: '15px' }}>
              Wishing you a Merry Christmas & Happy New Year {currentYear + 1}!
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ChristmasEmail;
