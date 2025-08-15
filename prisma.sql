model User{
    id  Int @id @default(autoincrement())
    username String
    email String @unique
    password String
    profile Profile? 
    messages Message[]
}
model Profile{
    id Int @id @default(autoincrement())
    aboutUser String
    userId Int @unique
    user User @relation(fields: [userId],references: [id])

}
model PrivateChat {
    id Int @id @default(autoincrement())
    
}

Model Messages {
    id Int @id @default(autoincrement())
    messageId Int
    messages User @relation(field:'')
}
Model Profile{
id Int @id #default(autoincrement()) 
about_user String
}