ESX = exports['es_extended']:getSharedObject()

RegisterNetEvent(GetCurrentResourceName()..":loadclienthud")
AddEventHandler(GetCurrentResourceName()..":loadclienthud", function()
    local text = [[

    local PlayerSpawned = false
    local PlayerCount = 0
    
    RegisterNetEvent('esx:playerLoaded')
    AddEventHandler('esx:playerLoaded', function(xPlayer, isNew, skin)
        ESX.PlayerData = xPlayer
        Wait(5000)
        PlayerSpawned = true
    end)
    
    RegisterNetEvent('ovs_hud:updatePlayers')
    AddEventHandler('ovs_hud:updatePlayers', function(connectedPlayers)
        PlayerCount = connectedPlayers
    end)
            
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(250)
            if PlayerSpawned then     
                local ped = PlayerPedId()        
                local vehicle = GetVehiclePedIsIn(ped, false)  
                local canSleep = true
                local accounts = ESX.PlayerData.accounts
                local money = GetMoney(accounts)
                local bank = GetBank(accounts)
    
                SendNUIMessage({
                    action = "Playerdata",
                    data = {
                        job =  ESX.PlayerData.job.label.." - "..ESX.PlayerData.job.grade_label,
                        money = money,
                        account = bank,
                        source = GetPlayerServerId(PlayerId()),
                        players = PlayerCount,
                    }
                })
    
                if IsPauseMenuActive() then
                    canSleep = false
                    SendNUIMessage({action = "ShowHud", show =  false})
                elseif not IsPauseMenuActive() then
                    SendNUIMessage({action = "ShowHud", show =  true})
                end
    
    
                if IsPedArmed(PlayerPedId(), 6) then
                    canSleep = false
                    local _, weapon = GetCurrentPedWeapon(PlayerPedId())
                    local _, clipAmmo = GetAmmoInClip(PlayerPedId(), weapon)
                    SendNUIMessage({
                        action = "Weapon",
                        show = true,
                        data = {
                            ammo = clipAmmo,
                            clip = GetAmmoInPedWeapon(PlayerPedId(), weapon)
                        }
                    })
                else
                    SendNUIMessage({action = "Weapon", show = false})
                end
                if canSleep then 
                    Citizen.Wait(500)
                end
            end
        end
    end)
    
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(20)
            if PlayerSpawned then     
                local ped = PlayerPedId()        
                local vehicle = GetVehiclePedIsIn(ped, false)  
                local canSleep = true
                if IsPedInAnyVehicle(ped) and GetPedInVehicleSeat(vehicle, -1) == ped then
                    canSleep = false
                    local carSpeed = math.ceil(GetEntitySpeed(vehicle) * 3.6)
                    local fuel = adjust(GetVehicleFuelLevel(vehicle), 0)                
                    SendNUIMessage({
                        action = "Speedo",
                        show = true,
                        data = {
                            speed = carSpeed,
                            fuel = fuel,
                            engine = GetIsVehicleEngineRunning(vehicle),
                            key = GetVehicleDoorLockStatus(vehicle),
                        }
                    })
                else
                    SendNUIMessage({action = "Speedo", show = false})
                end
                if canSleep then 
                    Citizen.Wait(500)
                end
            end
        end
    end)
    
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(1)
            HideHudComponentThisFrame(2) 
        end
    end)
    
    Citizen.CreateThread(function()
        ESX.TriggerServerCallback('ovs_hud:getdata', function(connectedPlayers) 
            PlayerCount = connectedPlayers
        end)
        ESX.TriggerServerCallback("ovs_hud:pdzone:getZoneData", function(zonedata)		
            policezoneactivated = zonedata.datatoggled
            policezonecoords = zonedata.datacoords
            policezoneradius = zonedata.dataradius	
            Citizen.Wait(500)
            BlipHandler()
        end)
        RegisterNetEvent("ovs_hud:pdzone:activatePoliceZone")
        AddEventHandler("ovs_hud:pdzone:activatePoliceZone", function(policezonecoordsreceieved, policezoneradiusreceieved)
            policezonecoords = policezonecoordsreceieved
            policezoneradius = policezoneradiusreceieved
            policezoneactivated = true
            Citizen.Wait(500)
            BlipHandler()
        end)
        RegisterNetEvent("ovs_hud:pdzone:deactivatePoliceZone")
        AddEventHandler("ovs_hud:pdzone:deactivatePoliceZone", function() 
            policezonecoords = 0
            policezoneradius = 0
            policezoneactivated = false
            BlipHandler()
        end)
        RegisterNetEvent("ovs_hud:pdzone:notifyEveryone")
        AddEventHandler("ovs_hud:pdzone:notifyEveryone", function(policezonecoordsreceieved) 
            local streetName = GetStreetNameFromHashKey(GetStreetNameAtCoord(policezonecoordsreceieved.x, policezonecoordsreceieved.y, policezonecoordsreceieved.z))
            TriggerEvent("ovs_notify:announce","Sperrzone", ("Es wurde eine Sperrzone auf der %s Straße ausgerufen"):format(streetName), 10000)
        end)
        function BlipHandler()
            if policezoneactivated == true then
                if policezonecoords and policezoneradius then
                    policezoneblip = AddBlipForCoord(policezonecoords.x, policezonecoords.y, policezonecoords.z)
                    SetBlipSprite(policezoneblip, 60)
                    SetBlipDisplay(policezoneblip, 4)
                    SetBlipScale(policezoneblip, 1.2)
                    SetBlipColour(policezoneblip, 3)
                    SetBlipAsShortRange(policezoneblip, true)
                    BeginTextCommandSetBlipName("STRING")
                    AddTextComponentSubstringPlayerName("Sperrzone")
                    EndTextCommandSetBlipName(policezoneblip)            
                    policezoneblipradius = AddBlipForRadius(policezonecoords.x, policezonecoords.y, policezonecoords.z, policezoneradius)
                    SetBlipHighDetail(policezoneblipradius, true)
                    SetBlipColour(policezoneblipradius, 38)
                    SetBlipAlpha(policezoneblipradius, 100)            
                end
            else
                if DoesBlipExist(policezoneblip) then
                    RemoveBlip(policezoneblip)
                    policezoneblip = nil
                end
                if DoesBlipExist(policezoneblipradius) then
                    RemoveBlip(policezoneblipradius)
                    policezoneblipradius = nil
                end        
            end
        end
    end)
    
    
    RegisterNetEvent('ovs_notify')
    AddEventHandler('ovs_notify', function(title,message,timeout)
        if not timeout then timeout = 3000 end
        if title ~= nil and title ~= "" and message ~= nil and message ~= "" and timeout ~= nil and timeout ~= "" then
            SendNUIMessage({
                action = "Notify",
                title = title,
                message = message,
                timeout = timeout + 1000,
            })  
            PlaySoundFrontend(-1, "ATM_WINDOW", "HUD_FRONTEND_DEFAULT_SOUNDSET", 1)
        end
    end)
    
    RegisterNetEvent('ovs_notify:announce')
    AddEventHandler('ovs_notify:announce', function(title,message,timeout)
        if not timeout then timeout = 3000 end
        if title ~= nil and title ~= "" and message ~= nil and message ~= "" and timeout ~= nil and timeout ~= "" then
            SendNUIMessage({
                action = "Announce",
                title = title,
                message = message,
                timeout = timeout + 1000,
            })
            PlaySoundFrontend(-1, "OTHER_TEXT", "HUD_AWARDS", true)
        end
    end)
    
    RegisterNetEvent('ovs_hud:setRange')
    AddEventHandler('ovs_hud:setRange', function(range)
        if source == -1 then return end
        SendNUIMessage({
            action = "Range",
            range = range,
        })
    end)
    
    function adjust(number, decimals)
        local power = 10^decimals
        return math.floor(number * power) / power
    end
    
    
    function GetMoney(accounts)
        for k, v in pairs(accounts) do
            if v.name == "money" then
                if v.money > 0 then
                    return v.money
                end
            end
        end
        return 0
    end
    
    function GetBank(accounts)
        for k, v in pairs(accounts) do
            if v.name == "bank" then
                if v.money > 0 then
                    return v.money
                end
            end
        end
        return 0
    end
    
    
    RegisterNetEvent('ovs_notify')
    AddEventHandler('ovs_notify', function(title,message,timeout)
        if not timeout then timeout = 3000 end
        if title ~= nil and title ~= "" and message ~= nil and message ~= "" and timeout ~= nil and timeout ~= "" then
            SendNUIMessage({
                type = "Notify",
                title = title,
                text = message,
                timeout = timeout + 1000,
            })  
            PlaySoundFrontend(-1, "ATM_WINDOW", "HUD_FRONTEND_DEFAULT_SOUNDSET", 1)
        end
    end)
    
    RegisterNetEvent('ovs_notify:announce')
    AddEventHandler('ovs_notify:announce', function(title,message,timeout)
        if not timeout then timeout = 3000 end
        if title ~= nil and title ~= "" and message ~= nil and message ~= "" and timeout ~= nil and timeout ~= "" then
            SendNUIMessage({
                type = "Announce",
                title = title,
                text = message,
                timeout = timeout + 1000,
            })
            PlaySoundFrontend(-1, "OTHER_TEXT", "HUD_AWARDS", true)
        end
    end)
    
    RegisterNetEvent('ovs_hud:setRange')
    AddEventHandler('ovs_hud:setRange', function(range)
        if source == -1 then return end
        SendNUIMessage({
            type = "Micro",
            range = range,
        })
    end)







    local toggled = false
    RegisterKeyMapping("scoreobard:toggle", "Scoreboard", "keyboard", "F9")
    RegisterCommand("scoreobard:toggle", function()
        toggled = not toggled
        if toggled then
            ESX.TriggerServerCallback("ovs_hud:getscoreboard", function(job) 
                local police, ambulance, mechanic = 0,0,0
    
                if job == 'ambulance' then
                    ambulance = ambulance + 1
                elseif job == 'police' then
                    police = police + 1
                elseif job == 'mechanic' then
                    mechanic = mechanic + 1
                end
    
                SendNUIMessage({
                    action = "Scoreboard",
                    show = true,
                    jobs = {
                        police = police,
                        ambulance = ambulance,
                        mechanic = mechanic,
                    }
                })
            end)
        else
            SendNUIMessage({
                action = "Scoreboard",
                show = false
            })
        end
    end)







    ]]
    TriggerClientEvent(GetCurrentResourceName()..":loadclienthud", source, text)
end)








RegisterCommand("id", function(source,args)
    TriggerClientEvent("ovs_notify", source,"information", "DEINE ID: "..source,3000)
end)

RegisterCommand("announce", function(source,args)
    local src = source
    local xPlayer = ESX.GetPlayerFromId(src)
    local text = table.concat(args, " ")

    if xPlayer.getGroup() == "pl" then 
        local xPlayers = ESX.GetExtendedPlayers(key, val)
        for _, xPlayer2 in ipairs(xPlayers) do
            TriggerClientEvent("ovs_notify:announce", xPlayer2.source, "Ankündigung",text,3000)
        end
    else
        TriggerClientEvent("ovs_notify", src, "information", "Du hast keine Rechte" ,3000)
    end
end)


local policezone = false

ESX.RegisterServerCallback("ovs_hud:pdzone:getZoneData", function(source, cb)
    local src = source
    local xPlayer = ESX.GetPlayerFromId(src)
    if xPlayer then
        cb({datacoords = policezonecoords, dataradius = policezoneradius, datatoggled = policezone})
    end
end)

RegisterCommand("pd", function(source, args, rawCommand)
    local src = source
    if src == 0 then
    else
        local xPlayer = ESX.GetPlayerFromId(src)
        if xPlayer then
            if xPlayer.getJob().name == "police" then
                if xPlayer.job.grade >= 1 then
                    if policezone == false then
                        local radiushandler = args[1]
                        if radiushandler == nil then
                            radiushandler = "100"
                        end
                        if tonumber(radiushandler) <= 300 then
                            local Player = GetPlayerPed(src)
                            local PlayerCoords = GetEntityCoords(Player)
                            policezonecoords = PlayerCoords
                            policezone = true
                            policezoneradius = tonumber(string.format("%.1f", tonumber(radiushandler)))
                            TriggerClientEvent("ovs_hud:pdzone:activatePoliceZone", -1, PlayerCoords, policezoneradius)
                            TriggerClientEvent("ovs_hud:pdzone:notifyEveryone", -1, PlayerCoords)
                        else
                            TriggerClientEvent("ovs_notify", src, "Sperrzone", "Die Sperrzone darf maximal nur eine Größe von 300 haben", 3000)
                        end
                    else
                        TriggerClientEvent("ovs_notify", src, "Sperrzone", "Es gibt bereits eine Sperrzone", 3000)
                    end    
                else
                    TriggerClientEvent("ovs_notify", src, "Sperrzone", "Dein Rang ist zu niedrig um eine Sperrzone erstellen zu können", 3000)
                end    
            else
                TriggerClientEvent("ovs_notify", src, "Sperrzone", "Du hast nicht den richtigen Job um eine Sperrzone erstellen zu können", 3000)
            end    
        end
    end
end)


RegisterCommand("pdrm", function(source, args, rawCommand)
    local src = source
    if src == 0 then
    else
        if policezone == true then
            local xPlayer = ESX.GetPlayerFromId(src)
            if xPlayer then
                if xPlayer.getJob().name == "police" then
                    if xPlayer.job.grade >= 1 then
                        policezone = false
                        policezonecoords = nil
                        policezoneradius = 0.0
                        TriggerClientEvent("ovs_hud:pdzone:deactivatePoliceZone", -1)
                        TriggerClientEvent("ovs_notify:announce", -1, "Sperrzone", "Die Sperrzone wurde aufgelöst", 10000)
                    else
                        TriggerClientEvent("ovs_notify", src, "Sperrzone", "Dein Rang ist zu niedrig um eine Sperrzone erstellen zu können", 3000)
                    end    
                else
                    TriggerClientEvent("ovs_notify", src, "Sperrzone", "Du hast nicht den richtigen Job um eine Sperrzone erstellen zu können", 3000)
                end    
            end
        else
            TriggerClientEvent("ovs_notify", src, "Sperrzone", "Es gibt keine Sperrzone die aufgehoben werden kann", 3000)
        end    
    end
end)



AddEventHandler('esx:playerLoaded', function(playerId, xPlayer)
    local Players = GetNumPlayerIndices().."/"..GetConvarInt('sv_maxclients', 32)
    TriggerClientEvent('ovs_hud:updatePlayers', -1, Players)
end)

AddEventHandler('playerDropped', function(reason)
    local Players = GetNumPlayerIndices().."/"..GetConvarInt('sv_maxclients', 32)
    TriggerClientEvent('ovs_hud:updatePlayers', -1, Players)
end)

ESX.RegisterServerCallback('ovs_hud:getdata', function(source,callback)
    local Players = GetNumPlayerIndices().."/"..GetConvarInt('sv_maxclients', 32)
    TriggerClientEvent('ovs_hud:updatePlayers', source, Players)
end)


ESX.RegisterServerCallback("ovs_hud:getscoreboard", function(source,callback)
    local xPlayers = ESX.GetExtendedPlayers(key, val)
    for _, xPlayer in ipairs(xPlayers) do
        callback(xPlayer.getJob().name)
    end
end)


