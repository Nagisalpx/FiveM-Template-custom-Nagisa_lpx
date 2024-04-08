Config = {}; // Do not touch

Config.Buttons = [
    {
        "id": "about", // Button ID
        "label": "über uns", // Button label
        "default": true // On page load which button is pre-selected?
    },
    {
        "id": "contacts",
        "label": "Kontakt",
        "default": false
    },
    {
        "id": "media",
        "label": "Medien",
        "default": false
    },
] // Categories [on the top right corner in the left box], match the ID's with page ID's.

Config.Pages = [
    {
        "id": "about",
        "description": "Willkommen auf <b>NRW RolePlay</b>"
    },
    {
        "id": "contacts",
        "description": "Highteam",
        "additionalinfo": [
            {
                "icon": "discord.png", // In assets/media folder.
                "data": "<b>Luka</b>"
            },
            {
                "icon": "discord.png", // In assets/media folder.
                "data": "<b>Leon</b>"
            },
            {
                "icon": "discord.png", // In assets/media folder.
                "data": "<b>Pierre</b>"
            },
            {
                "icon": "discord.png", // In assets/media folder.
                "data": "<b>Lina</b>"
            }, 
            {
                "icon": "discord.png", 
                "data": "<b>Tim</b>"
            }

        ]
    },
    {
        "id": "media",
        "description": "Genießt hier einen kleinen einblick von tollen Momenten auf NRW Roleplay!"
    }
] // Pages in the left screen box. "id" has to be set to one of the button's ID's, it'll open that page when you click on that button.

Config.MediaPage = "media" // The page in which you'll be able to see gallery and video.
Config.Images = [ // Gallery images, put them in assets/media/gallery folder.
];