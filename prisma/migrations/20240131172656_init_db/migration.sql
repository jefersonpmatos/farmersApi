-- CreateTable
CREATE TABLE "famers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpfCnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalAreaHectares" REAL NOT NULL,
    "cultivableAreaHectares" REAL NOT NULL,
    "vegetationAreaHectares" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "crops" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CropToFarmer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CropToFarmer_A_fkey" FOREIGN KEY ("A") REFERENCES "crops" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CropToFarmer_B_fkey" FOREIGN KEY ("B") REFERENCES "famers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CropToFarmer_AB_unique" ON "_CropToFarmer"("A", "B");

-- CreateIndex
CREATE INDEX "_CropToFarmer_B_index" ON "_CropToFarmer"("B");
