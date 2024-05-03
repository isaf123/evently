/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `referral_code` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `samples_code_key` ON `samples`;

-- AlterTable
ALTER TABLE `users` MODIFY `referral_code` VARCHAR(191) NOT NULL,
    MODIFY `otp` VARCHAR(191) NULL,
    MODIFY `token` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `users_token_key` ON `users`(`token`);
