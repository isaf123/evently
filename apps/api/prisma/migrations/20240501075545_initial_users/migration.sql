/*
  Warnings:

  - Added the required column `otp` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `otp` VARCHAR(191) NOT NULL,
    ADD COLUMN `token` VARCHAR(191) NOT NULL;
