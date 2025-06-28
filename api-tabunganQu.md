1.  Endpoint: POST /api/auth/register
    Body(JSON):
    {
        "fullName": "Budi Santoso",
        "username": "budi123",
        "email": "budi@email.com",
        "password": "passwordku",
        "photo": "https://randomuser.me/api/portraits/men/1.jpg"
    }


2.  Endpoint: POST /api/auth/login
    Body (JSON):
    {
        "email": "budi@email.com",
        "password": "passwordku"
    }