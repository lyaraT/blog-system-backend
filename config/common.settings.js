exports.SETTINGS = {
    "PORT": 3000,
    "SQL_DB": {
        "HOST": "Localhost",
        "USER": "root",

        "PASSWORD": "lyara",
        "DATABASE": "blogsystem"
    },
    "JWT_SECRET": "mySecretKey",
    "BASE_URL": "https://localhost:3000",
    "EMAIL_CONFIG": {
        "username": "apiittestblog123@gmail.com",
        "password": "beqfddobqajnfnet",
        "host": "smtp.gmail.com",
        "port": 465
    },
    "EMAIL": {
        "NEW_USER_PASSWORD_SEND": "new-user-password-send.ejs",
    },
    "AZURE": {
        "SAS_TOKEN": "sv=2022-11-02&ss=bfqt&srt=o&sp=rwdlacupiytfx&se=2024-03-24T06:23:28Z&st=2024-03-23T22:23:28Z&spr=https&sig=zdKi7UJHR84wHoJ1xgVCiZJV%2F91jYjmSZA9TZ5n5boE%3D",
        "ACCOUNT_NAME": "blogsystem101",
        "CONTAINER_NAME": "blobby"
    },
    "AWS": {
        "accessKeyId": "AKIAQ3EGRBFOTBKAUNTF",
        "baseUrl": "https://blogsystemapiit.s3.eu-north-1.amazonaws.com",
        "bucketName": "blogsystemapiit",
        "folder": "bucket",
        "hostedZoneName": "",
        "region": "eu-north-1",
        "secretAccessKey": "GvjXcwRiOUWrtJIitPRKpF9K7S78Qb+gYwgy2n3B",
    },
}
