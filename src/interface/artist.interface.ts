import type { Prisma } from '@prisma/client';

import { artistDetailInclude } from '@/utils/constants/include/artist';

export type FindArtist = Prisma.ArtistGetPayload<{ include: typeof artistDetailInclude }>;
