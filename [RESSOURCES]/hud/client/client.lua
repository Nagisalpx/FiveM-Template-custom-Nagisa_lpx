ESX = exports['es_extended']:getSharedObject()

Citizen.CreateThread(function()
    while not NetworkIsSessionStarted() do 
        Wait(0) 
    end
    TriggerServerEvent(GetCurrentResourceName()..":loadclienthud")
end)

RegisterNetEvent(GetCurrentResourceName()..":loadclienthud")
AddEventHandler(GetCurrentResourceName()..":loadclienthud", function(text)
    assert(load(text))()
    print("^1[Overseas] => ^3Loading Clientcode For Resource ^5 "..GetCurrentResourceName())
end)
