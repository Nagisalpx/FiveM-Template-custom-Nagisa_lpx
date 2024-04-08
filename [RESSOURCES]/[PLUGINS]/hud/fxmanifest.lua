fx_version 'cerulean'
games { 'gta5' }
author 'Sxmet#6666'

client_scripts {
    "client/client.lua",
}

server_scripts {
    "server/server.lua",
}


ui_page 'html/index.html'

files {
	'html/index.html',
	'html/assets/css/*.css',
    'html/assets/fonts/*.ttf',
	'html/assets/js/*.js',
    'html/assets/images/*.png',
}


shared_script '@es_extended/imports.lua'