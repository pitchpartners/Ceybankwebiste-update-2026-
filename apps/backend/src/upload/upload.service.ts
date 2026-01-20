import { Injectable, BadRequestException } from '@nestjs/common';
import { join, extname } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class UploadService {
  private readonly uploadRoot = join(__dirname, '..', '..', 'uploads');
  private readonly teamDir = join(this.uploadRoot, 'team');
  private readonly reportDir = join(this.uploadRoot, 'fund-reports');
  private readonly newsDir = join(this.uploadRoot, 'news');

  async saveTeamProfileImage(
    memberId: number,
    file: Express.Multer.File,
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const extension = extname(file.originalname) || '.png';
    const memberDir = join(this.teamDir, memberId.toString());
    const filePath = join(memberDir, `avatar${extension}`);

    await fs.mkdir(memberDir, { recursive: true });
    await fs.writeFile(filePath, file.buffer);

    return `/uploads/team/${memberId}/avatar${extension}`;
  }

  async removeFileIfExists(pathRelative: string | null | undefined) {
    if (!pathRelative) return;
    const withoutPrefix = pathRelative.replace(/^\/?uploads[\\/]/, '');
    const absolutePath = join(this.uploadRoot, withoutPrefix);
    try {
      await fs.unlink(absolutePath);
    } catch {
      // Ignore missing files
    }
  }

  async removeNewsDirectory(newsId: string) {
    const newsDir = join(this.newsDir, newsId);
    try {
      await fs.rm(newsDir, { recursive: true, force: true });
    } catch {
      // ignore
    }
  }

  async saveFundReportPdf(
    fundId: string,
    type: string,
    file: Express.Multer.File,
  ): Promise<{ filePath: string; mimeType: string; size: number }> {
    if (!file) {
      throw new BadRequestException('Report file is required');
    }
    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Only PDF uploads are allowed');
    }
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('Report exceeds the 20MB size limit');
    }

    const extension = '.pdf';
    const safeType = type?.toLowerCase() || 'report';
    const filename = `${Date.now()}-${Math.random().toString(16).slice(2)}-${safeType}${extension}`;
    const fundDir = join(this.reportDir, fundId.toString());
    const filePath = join(fundDir, filename);

    await fs.mkdir(fundDir, { recursive: true });
    await fs.writeFile(filePath, file.buffer);

    return {
      filePath: `/uploads/fund-reports/${fundId}/${filename}`,
      mimeType: file.mimetype,
      size: file.size,
    };
  }

  async saveNewsCoverImage(
    newsId: string,
    file: Express.Multer.File,
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('Cover image is required');
    }

    const extension = extname(file.originalname) || '.png';
    const newsDir = join(this.newsDir, newsId);
    const filePath = join(newsDir, `cover${extension}`);

    await fs.mkdir(newsDir, { recursive: true });
    await fs.writeFile(filePath, file.buffer);

    return `/uploads/news/${newsId}/cover${extension}`;
  }

  async saveNewsGalleryImage(
    newsId: string,
    file: Express.Multer.File,
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const extension = extname(file.originalname) || '.png';
    const filename = `${Date.now()}-${Math.random().toString(16).slice(2)}${extension}`;
    const newsDir = join(this.newsDir, newsId);
    const filePath = join(newsDir, filename);

    await fs.mkdir(newsDir, { recursive: true });
    await fs.writeFile(filePath, file.buffer);

    return `/uploads/news/${newsId}/${filename}`;
  }
}
