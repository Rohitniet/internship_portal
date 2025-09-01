-- CreateTable
CREATE TABLE "public"."Student" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resumeurl" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Employer" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Employer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Resume" (
    "id" SERIAL NOT NULL,
    "skill" TEXT[],
    "location" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "ews" BOOLEAN NOT NULL,
    "studentid" INTEGER NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Internship" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skill" TEXT[],
    "location" TEXT NOT NULL,
    "employerId" INTEGER NOT NULL,

    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "public"."Student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "public"."Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_email_key" ON "public"."Employer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_id_key" ON "public"."Resume"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_studentid_key" ON "public"."Resume"("studentid");

-- AddForeignKey
ALTER TABLE "public"."Resume" ADD CONSTRAINT "Resume_studentid_fkey" FOREIGN KEY ("studentid") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Internship" ADD CONSTRAINT "Internship_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "public"."Employer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
