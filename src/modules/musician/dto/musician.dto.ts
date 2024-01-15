import { ApiProperty } from '@nestjs/swagger';

import { DateDTO, DateDTOProps } from '@/utils';

import { CommonMusicianDTO, CommonMusicianDTOProps } from './common-musician.dto';

export interface MusicianDTOProps extends CommonMusicianDTOProps, DateDTOProps {
  isPending: boolean;
  isAuthorized: boolean;
  bankCode: string;
  bankAccount: string;
  bankAccountOwnerName: string;
  evidenceFileUrl: string;
}

export class MusicianDTO extends CommonMusicianDTO {
  @ApiProperty({
    description: '승인 상태',
    type: 'string',
    enum: ['APPROVED', 'PENDING', 'REJECTED'],
    example: 'APPROVED |PENDING |REJECTED',
  })
  approveStatus: string;

  @ApiProperty({ description: '은행 코드', type: 'string' })
  bankCode: string;

  @ApiProperty({ description: '계좌 번호', type: 'string' })
  bankAccount: string;

  @ApiProperty({ description: '계좌주', type: 'string' })
  bankAccountOwnerName: string;

  @ApiProperty({ description: '증빙자료', type: 'string' })
  evidenceFileUrl: string;

  @ApiProperty({ description: '생성일', type: 'string', format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ description: '수정일', type: 'string', format: 'date-time' })
  updatedAt: Date;

  @ApiProperty({ description: '삭제일', type: 'string', format: 'date-time' })
  deletedAt?: Date;

  constructor(props: MusicianDTOProps) {
    super(props);
    this.approveStatus = this.getApproveStatus(props.isPending, props.isAuthorized);
    this.bankAccount = props.bankAccount;
    this.bankCode = props.bankCode;
    this.bankAccountOwnerName = props.bankAccountOwnerName;
    this.evidenceFileUrl = props.evidenceFileUrl;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  private getApproveStatus(isPending: boolean, isAuthorized: boolean) {
    if (isPending && isAuthorized) {
      return 'APPROVED';
    } else if (isPending && !isAuthorized) {
      return 'REJECTED';
    } else return 'PENDING';
  }
}
