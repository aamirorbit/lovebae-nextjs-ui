import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { sanitizeInput } from '@/lib/security';
import GlossaryWordReport from '@/models/GlossaryWordReport';

function trimTo(value, maxLength) {
  if (!value) return '';
  return String(value).trim().slice(0, maxLength);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const sanitized = sanitizeInput(body || {});

    const word = trimTo(sanitized.word, 120).toLowerCase();
    const definition = trimTo(sanitized.definition, 1000);
    const note = trimTo(sanitized.note, 1000);
    const phrase = trimTo(sanitized.phrase, 1000);
    const pagePath = trimTo(sanitized.pagePath, 300);
    const source = trimTo(sanitized.source, 80) || 'game_glossary_tooltip';
    const isMissingGlossaryWord = Boolean(sanitized.isMissingGlossaryWord);

    if (!word) {
      return NextResponse.json(
        { error: 'word is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const report = await GlossaryWordReport.create({
      word,
      definition,
      note,
      phrase,
      pagePath,
      source,
      isMissingGlossaryWord,
      userAgent: request.headers.get('user-agent') || '',
      ipAddress:
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        '',
    });

    const slackWebhookUrl =
      process.env.SLACK_CONTENT_WEBHOOK_URL ||
      process.env.SLACK_SUPPORT_WEBHOOK_URL;

    if (slackWebhookUrl) {
      const slackMessage = {
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '🧠 Difficult Word Reported',
              emoji: true,
            },
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Word:*\n${word}` },
              { type: 'mrkdwn', text: `*Source:*\n${source}` },
            ],
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Page:*\n${pagePath || 'N/A'}` },
              { type: 'mrkdwn', text: `*Report ID:*\n${report._id}` },
            ],
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Missing from glossary:*\n${isMissingGlossaryWord ? 'Yes' : 'No'}` },
              { type: 'mrkdwn', text: `*When:*\n${new Date().toISOString()}` },
            ],
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Definition shown:*\n${definition || 'N/A'}`,
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Sentence context:*\n${phrase || 'N/A'}`,
            },
          },
          ...(note
            ? [
                {
                  type: 'section',
                  text: {
                    type: 'mrkdwn',
                    text: `*User note:*\n${note}`,
                  },
                },
              ]
            : []),
        ],
      };

      const slackResponse = await fetch(slackWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage),
      });

      if (!slackResponse.ok) {
        console.error('Failed to send glossary report to Slack:', await slackResponse.text());
      }
    }

    return NextResponse.json({ success: true, id: report._id }, { status: 201 });
  } catch (error) {
    console.error('Error creating glossary report:', error);
    return NextResponse.json(
      { error: 'Failed to submit glossary report' },
      { status: 500 }
    );
  }
}
