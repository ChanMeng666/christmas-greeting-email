import { Resend } from 'resend';
import * as React from 'react';
import { render } from '@react-email/render';
import { ChristmasEmail } from './templates/christmas-email.js';
import { config } from './config.js';
import { listContacts } from './contacts.js';

const resend = new Resend(config.resendApiKey);

interface SendResult {
  success: boolean;
  email: string;
  error?: string;
}

async function sendEmail(
  to: string,
  recipientName: string
): Promise<SendResult> {
  try {
    const emailHtml = await render(
      React.createElement(ChristmasEmail, {
        recipientName,
        personalImageUrl: config.personalImageUrl,
        festiveImageUrl: config.festiveImageUrl,
        stickerImageUrl: config.stickerImageUrl,
      })
    );

    const { data, error } = await resend.emails.send({
      from: `${config.sender.name} <${config.sender.email}>`,
      to: [to],
      subject: config.emailSubject,
      html: emailHtml,
    });

    if (error) {
      return { success: false, email: to, error: error.message };
    }

    return { success: true, email: to };
  } catch (error) {
    return {
      success: false,
      email: to,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function sendTestEmail() {
  console.log('\n🧪 Sending test email to yourself...\n');

  const testEmail = config.sender.email;
  const result = await sendEmail(testEmail, 'Test Recipient');

  if (result.success) {
    console.log(`✅ Test email sent successfully to ${testEmail}`);
    console.log('   Check your inbox!');
  } else {
    console.log(`❌ Failed to send test email: ${result.error}`);
  }
}

async function sendToAllContacts() {
  console.log('\n🎄 Christmas Email Sender');
  console.log('━'.repeat(40));
  console.log(`From: ${config.sender.name} <${config.sender.email}>`);
  console.log(`Subject: ${config.emailSubject}`);
  console.log('━'.repeat(40));

  // Get all contacts
  const contacts = await listContacts();

  if (contacts.length === 0) {
    console.log('\n⚠️  No contacts found!');
    console.log('Add contacts first using:');
    console.log('  npm run contacts:add');
    console.log('  npm run contacts:import <file>');
    return;
  }

  console.log(`\n📧 Sending to ${contacts.length} recipients...\n`);

  const results: SendResult[] = [];

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const recipientName = contact.firstName || 'Friend';

    process.stdout.write(`[${i + 1}/${contacts.length}] ${contact.email}... `);

    const result = await sendEmail(contact.email, recipientName);
    results.push(result);

    if (result.success) {
      console.log('✅');
    } else {
      console.log(`❌ ${result.error}`);
    }

    // Small delay to avoid rate limiting
    if (i < contacts.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  // Summary
  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  console.log('\n' + '━'.repeat(40));
  console.log('📊 Summary:');
  console.log(`   ✅ Sent: ${successful}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log('━'.repeat(40));

  if (failed > 0) {
    console.log('\nFailed recipients:');
    results
      .filter((r) => !r.success)
      .forEach((r) => console.log(`   - ${r.email}: ${r.error}`));
  }

  console.log('\n🎄 Done! Merry Christmas! 🎅\n');
}

async function main() {
  const isTest = process.argv.includes('--test');

  if (isTest) {
    await sendTestEmail();
  } else {
    // Confirm before sending
    console.log('\n⚠️  This will send emails to all contacts in your list.');
    console.log('To preview the email first, run: npm run preview');
    console.log('To send a test email to yourself, run: npm run send:test\n');

    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const answer = await new Promise<string>((resolve) => {
      rl.question('Are you sure you want to send? (yes/no): ', resolve);
    });
    rl.close();

    if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
      await sendToAllContacts();
    } else {
      console.log('\nSending cancelled.');
    }
  }
}

main().catch(console.error);
