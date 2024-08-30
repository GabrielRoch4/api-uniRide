-- CreateTable
CREATE TABLE "rides" (
    "Id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "Origem" TEXT NOT NULL,
    "Destino" TEXT NOT NULL,

    CONSTRAINT "rides_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
