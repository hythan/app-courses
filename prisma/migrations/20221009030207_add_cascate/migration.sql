-- DropForeignKey
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Registrations" DROP CONSTRAINT "Registrations_classId_fkey";

-- DropForeignKey
ALTER TABLE "Registrations" DROP CONSTRAINT "Registrations_studentId_fkey";

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrations" ADD CONSTRAINT "Registrations_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrations" ADD CONSTRAINT "Registrations_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
