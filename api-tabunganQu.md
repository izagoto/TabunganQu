"email": "admin@gmail.com",
"password": "admin12#",



1.  Endpoint: POST /api/auth/register
    Body(JSON):
    {
        "status": 200,
        "messages": "",
        "data": [
            {
                "fullName": "Budi Santoso",
                "username": "budi123",
                "email": "budi@email.com",
                "password": "passwordku",
                "photo": "https://randomuser.me/api/portraits/men/1.jpg"
            }
        ]
    }

    {
        "status": 404,
        "messages": "",
    }

    {
        "status": 500,
        "messages": "",
    }



2.  Endpoint: POST /api/auth/login
    Body (JSON):
    {
        "email": "budi@email.com",
        "password": "passwordku"
    }