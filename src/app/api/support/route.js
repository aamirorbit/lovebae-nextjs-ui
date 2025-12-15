import { NextResponse } from 'next/server';

const issueTypeLabels = {
  bug: '🐛 Bug Report',
  feature: '✨ Feature Request',
  account: '👤 Account Issue',
  billing: '💳 Billing Question',
  feedback: '💬 General Feedback',
  other: '📝 Other',
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, issueType, subject, message } = body;

    // Validate required fields
    if (!name || !email || !issueType || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Get Slack webhook URL from environment variable
    const slackWebhookUrl = process.env.SLACK_SUPPORT_WEBHOOK_URL;

    if (!slackWebhookUrl) {
      console.error('SLACK_SUPPORT_WEBHOOK_URL is not configured');
      // Still return success to user, but log the error
      return NextResponse.json(
        { success: true, message: 'Support request received' },
        { status: 200 }
      );
    }

    // Format the Slack message
    const slackMessage = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📬 New Support Request',
            emoji: true,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Type:*\n${issueTypeLabels[issueType] || issueType}`,
            },
            {
              type: 'mrkdwn',
              text: `*From:*\n${name}`,
            },
          ],
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Email:*\n<mailto:${email}|${email}>`,
            },
            {
              type: 'mrkdwn',
              text: `*Subject:*\n${subject}`,
            },
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Message:*\n${message}`,
          },
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `Submitted at ${new Date().toISOString()} via Lovebae Support Form`,
            },
          ],
        },
      ],
    };

    // Send to Slack
    const slackResponse = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    });

    if (!slackResponse.ok) {
      console.error('Failed to send to Slack:', await slackResponse.text());
      // Still return success to user
    }

    return NextResponse.json(
      { success: true, message: 'Support request submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing support request:', error);
    return NextResponse.json(
      { error: 'Failed to process support request' },
      { status: 500 }
    );
  }
}
