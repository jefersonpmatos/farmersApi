-- CreateTable
CREATE TABLE "famers" (
    "id" SERIAL NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalAreaHectares" DOUBLE PRECISION NOT NULL,
    "cultivableAreaHectares" DOUBLE PRECISION NOT NULL,
    "vegetationAreaHectares" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "famers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crops" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "crops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CropToFarmer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CropToFarmer_AB_unique" ON "_CropToFarmer"("A", "B");

-- CreateIndex
CREATE INDEX "_CropToFarmer_B_index" ON "_CropToFarmer"("B");

-- AddForeignKey
ALTER TABLE "_CropToFarmer" ADD CONSTRAINT "_CropToFarmer_A_fkey" FOREIGN KEY ("A") REFERENCES "crops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CropToFarmer" ADD CONSTRAINT "_CropToFarmer_B_fkey" FOREIGN KEY ("B") REFERENCES "famers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
