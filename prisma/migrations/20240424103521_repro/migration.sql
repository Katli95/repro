-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "authorId" INTEGER,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ThingA" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "PartOfA" (
    "thingAId" TEXT NOT NULL,
    "childUtilityId" TEXT NOT NULL,

    PRIMARY KEY ("thingAId", "childUtilityId"),
    CONSTRAINT "PartOfA_thingAId_fkey" FOREIGN KEY ("thingAId") REFERENCES "ThingA" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "PartOfA_childUtilityId_fkey" FOREIGN KEY ("childUtilityId") REFERENCES "LinkToChildUtility" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ThingB" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "childUtilityId" TEXT NOT NULL,
    CONSTRAINT "ThingB_childUtilityId_fkey" FOREIGN KEY ("childUtilityId") REFERENCES "LinkToChildUtility" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LinkToChildUtility" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "childAId" TEXT,
    "childBId" TEXT,
    CONSTRAINT "LinkToChildUtility_childAId_fkey" FOREIGN KEY ("childAId") REFERENCES "ThingA" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "LinkToChildUtility_childBId_fkey" FOREIGN KEY ("childBId") REFERENCES "ThingB" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PartOfA_childUtilityId_key" ON "PartOfA"("childUtilityId");

-- CreateIndex
CREATE UNIQUE INDEX "ThingB_childUtilityId_key" ON "ThingB"("childUtilityId");
