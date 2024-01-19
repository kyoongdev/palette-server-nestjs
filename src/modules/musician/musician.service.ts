import { Injectable } from '@nestjs/common';

import { CommonMusicianDTO, CreateMusicianDTO } from './dto';
import { UpdateMusicianDTO } from './dto/update-musician.dto';
import { MusicianRepository } from './musician.repository';

@Injectable()
export class MusicianService {
  constructor(private readonly musicianRepository: MusicianRepository) {}

  async findMusicianByUserId(userId: string) {
    const musician = await this.musicianRepository.findMusicianByUserId(userId);

    return new CommonMusicianDTO(musician);
  }

  async createMusician(userId: string, data: CreateMusicianDTO) {
    const musician = await this.musicianRepository.createMusician({
      ...data,
      user: {
        connect: {
          id: userId,
        },
      },
    });

    return musician.id;
  }

  async updateMusician(userId: string, data: UpdateMusicianDTO) {
    const musician = await this.findMusicianByUserId(userId);
    await this.musicianRepository.updateMusician(musician.id, data);
  }

  async deleteMusician(userId: string) {
    const musician = await this.findMusicianByUserId(userId);
    await this.musicianRepository.deleteMusician(musician.id);
  }
}
