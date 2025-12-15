import { connectToDatabase } from '@/lib/db';
import FoundingHealer from '@/models/FoundingHealer';
import SoulAmbassador from '@/models/SoulAmbassador';
import WaitlistEntry from '@/models/WaitlistEntry';
import Creator from '@/models/Creator';

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all entries from each collection
    const healers = await FoundingHealer.find({});
    const ambassadors = await SoulAmbassador.find({});
    const waitlistEntries = await WaitlistEntry.find({});
    const creators = await Creator.find({});

    // Combine all entries
    const allEntries = [
      ...healers.map(h => ({ ...h.toObject(), type: 'healer' })),
      ...ambassadors.map(a => ({ ...a.toObject(), type: 'ambassador' })),
      ...waitlistEntries.map(w => ({ ...w.toObject(), type: 'waitlist' }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Calculate counts
    const counts = {
      total: allEntries.length,
      healers: healers.length,
      ambassadors: ambassadors.length,
      waitlist: waitlistEntries.length,
      creators: creators.length,
      creatorsPending: creators.filter(c => c.status === 'pending').length
    };

    return Response.json({ entries: allEntries, counts });
  } catch (error) {
    console.error('Error fetching waitlist entries:', error);
    return Response.json({ error: 'Failed to fetch waitlist entries' }, { status: 500 });
  }
} 