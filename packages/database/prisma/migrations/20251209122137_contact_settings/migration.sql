-- CreateTable
CREATE TABLE "ContactSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "mainEmail" TEXT NOT NULL,
    "mainPhone" TEXT NOT NULL,
    "officeAddress" TEXT NOT NULL,
    "facebookUrl" TEXT,
    "linkedinUrl" TEXT,
    "twitterUrl" TEXT,
    "instagramUrl" TEXT,
    "youtubeUrl" TEXT,
    "googleMapsEmbedUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactSettings_pkey" PRIMARY KEY ("id")
);
