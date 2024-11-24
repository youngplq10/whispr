-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "isUsernameSet" BOOLEAN NOT NULL DEFAULT false,
    "kindeId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bio" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profilepic" TEXT NOT NULL DEFAULT 'https://lh3.googleusercontent.com/a/ACg8ocIximtuKu7QUkx_E5R9WctexXezRz5DLWX_3KRXJhQ3lebAGTLM=s96-c'
);
INSERT INTO "new_User" ("bio", "createdAt", "email", "firstName", "id", "isUsernameSet", "kindeId", "lastName", "username") SELECT "bio", "createdAt", "email", "firstName", "id", "isUsernameSet", "kindeId", "lastName", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_kindeId_key" ON "User"("kindeId");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_kindeId_username_key" ON "User"("kindeId", "username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
