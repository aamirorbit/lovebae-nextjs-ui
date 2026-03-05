import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { sanitizeInput, logger } from '@/lib/security';
import { headers } from '@/lib/headers';
import SuccessStory from '@/models/SuccessStory';

const MAX_STORY_LENGTH = 3000;
const MAX_NAME_LENGTH = 100;

export async function GET() {
  try {
    await connectToDatabase();
    const published = await SuccessStory.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(50)
      .lean();
    return NextResponse.json(
      { stories: published.map((s) => ({ ...s, id: s._id.toString() })) },
      { headers }
    );
  } catch (err) {
    logger.error({ action: 'success_stories_list', error: err.message });
    return NextResponse.json({ message: 'Could not load stories' }, { status: 500, headers });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const story = typeof data.story === 'string' ? data.story.trim() : '';
    if (!story || story.length < 20) {
      return NextResponse.json(
        { message: 'Please share at least a few sentences (min 20 characters).' },
        { status: 400, headers }
      );
    }
    if (story.length > MAX_STORY_LENGTH) {
      return NextResponse.json(
        { message: `Story is too long (max ${MAX_STORY_LENGTH} characters).` },
        { status: 400, headers }
      );
    }

    const sanitized = sanitizeInput(data);
    const authorName =
      typeof sanitized.authorName === 'string' ? sanitized.authorName.trim().slice(0, MAX_NAME_LENGTH) : '';
    const partnerNames =
      typeof sanitized.partnerNames === 'string' ? sanitized.partnerNames.trim().slice(0, MAX_NAME_LENGTH) : '';
    const email = typeof sanitized.email === 'string' ? sanitized.email.trim().toLowerCase() : '';
    const relationshipType =
      typeof sanitized.relationshipType === 'string' ? sanitized.relationshipType.trim().slice(0, 100) : '';
    const duration = typeof sanitized.duration === 'string' ? sanitized.duration.trim().slice(0, 50) : '';
    const consentToPublish = Boolean(sanitized.consentToPublish);

    await connectToDatabase();
    const entry = new SuccessStory({
      authorName: authorName || undefined,
      partnerNames: partnerNames || undefined,
      story: story.slice(0, MAX_STORY_LENGTH),
      relationshipType: relationshipType || undefined,
      duration: duration || undefined,
      email: email || undefined,
      consentToPublish,
      status: 'pending',
    });
    await entry.save();

    logger.info({ action: 'success_story_submit', id: entry._id.toString() });
    return NextResponse.json(
      { message: 'Thank you! Your story has been submitted and may be featured after review.' },
      { status: 201, headers }
    );
  } catch (err) {
    logger.error({ action: 'success_story_submit_error', error: err.message });
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500, headers }
    );
  }
}
