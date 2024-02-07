import { Prisma } from '@prisma/client';

import { inquiryInclude } from '@/utils/constants/include/inquiry';

export type FindInquiry = Prisma.InquiryGetPayload<{ include: typeof inquiryInclude }>;
