-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectToUser" (
    "userEmail" TEXT NOT NULL,
    "projectTitle" TEXT NOT NULL,

    CONSTRAINT "ProjectToUser_pkey" PRIMARY KEY ("userEmail","projectTitle")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_key" ON "Project"("title");

-- AddForeignKey
ALTER TABLE "ProjectToUser" ADD CONSTRAINT "ProjectToUser_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectToUser" ADD CONSTRAINT "ProjectToUser_projectTitle_fkey" FOREIGN KEY ("projectTitle") REFERENCES "Project"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
