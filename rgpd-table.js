var jsonArray = [{ "consentConfigId":"5" , "purpose":"Marketing APV" , "channel":"CellPhone" , "entities" : "KIA" , "ConsentId" : "3" , "IsConsented" : "True"}  , 
                {"consentConfigId":"3" , "purpose":"VIP evento concecinario" , "channel":"CellPhone" , "entities" : "Equipa de Demonstração" , "ConsentId" : "4" , "IsConsented" : "False"} , 
                {"consentConfigId":"4" , "purpose":" Mensagens" , "channel":"CellPhone" , "entities" : "Equipa de Demonstração" , "ConsentId" : "5" , "IsConsented" : "True"} , 
                {"consentConfigId":"3" , "purpose":"VIP evento concecinario" , "channel":"Email" , "entities" : "Equipa de Demonstração" , "ConsentId" : "19" , "IsConsented" : "True"} , 
                {"consentConfigId":"14" , "purpose":"Mails Malucos Concessionario" , "channel":"Email" , "entities" : "Equipa de Demonstração" , "ConsentId" : "0" , "IsConsented" : "False"} , 
                {"consentConfigId":"6" , "purpose":"Marketing APV" , "channel":"CellPhone" , "entities" : "Equipa de Demonstração" , "ConsentId" : "0" , "IsConsented" : "False"} ,
                {"consentConfigId":"15" , "purpose":"Chamadas Nível 1" , "channel":"CellPhone" , "entities" : "BMW MOTORRAD" , "ConsentId" : "0" , "IsConsented" : "True"}]

//On document ready and loaded!
$( document ).ready(function() {
    jsonArray.forEach(function(json) {
        var elementId = replaceES(json.purpose.trim());

        if($('#'+ elementId +'' ).length > 0 ) { //If the purpose  already exists!
            if($('#' + elementId + '-table tr:contains(' + json.entities + ')').length > 0) { //If the entitie row already exists in that table
                addExistingInputBox(elementId + '-table',json.entities,json.channel,json.ConsentId,json.IsConsented);
                return
            }
            addTableRows(elementId + '-table',json.entities,json.channel,json.consentConfigId,json.ConsentId,json.IsConsented)
        } else {

        createNavButton(json.purpose,elementId); // Needs the name to populate the button and the ID

        createDisplayDiv(elementId); // Only uses the id

        $('#' + elementId + '').append(createTable(json.purpose,elementId))

        addTableRows(elementId + '-table',json.entities,json.channel,json.consentConfigId,json.ConsentId,json.IsConsented); //  Adds a TableRow with the channel.

        }
    });
});




function createNavButton(purpose,elementId) {
    var button = '<button class="tablinks" onclick="openCity(event,\'' + elementId + '\')">' + purpose +  '</button>'
    $('.tab').append(button)
}

function createDisplayDiv(elementId) {
    newDiv = "<div id='" + elementId +  "' class='tabcontent' style='display:none;'></div>"
    $('.tabcontent').last().after(newDiv)
    return newDiv
}

//Has the table is created the Headers are already added(Email,Telemovel)
function createTable(purpose,TableId) {
    var table = '<table id="' + TableId + '-table" class="rgpd-table"> <tr> <th> &emsp; </th> <th>Email</th> <th>Telemovel</th> </tr> </table>'
    return table;
}


function replaceES(elementId) {
    var emptySpace = / /g
    return elementId.replace(emptySpace,"-");
}

function addTableRows(tableId,entitie,channelType,consentConfigId,ConsentId,IsConsented) {
    if(channelType === "CellPhone") {
        $('#' + tableId + '').append('<tr id="' + consentConfigId + '"> <td class="entitie-cell">' + entitie + '</td> </tr>')
        $('#' + tableId + ' tr').last().append('<td class="empty-td-email"></td>')
        $('#' + tableId + ' tr').last().append('<td data-consent-id="' + ConsentId + '"> ' + createCheckBox(IsConsented) + '  </td>')
    } else {
        $('#' + tableId + '').append('<tr id="' + consentConfigId + '"> <td class="entitie-cell">' + entitie + '</td> </tr>')
        $('#' + tableId + ' tr').last().append('<td data-consent-id="' + ConsentId + '"> ' + createCheckBox(IsConsented) + ' </td>')
    }
}

//Ads input button if the Entite row already exists 
function addExistingInputBox(tableId,entitie,channelType,ConsentId,IsConsented) {
    switch(channelType) {
        case "Email":
        $('#' + tableId + ' tr:contains(' + entitie + ') .empty-td-email').attr('data-consent-id',ConsentId)
        $('#' + tableId + ' tr:contains(' + entitie + ') .empty-td-email').append(createCheckBox(IsConsented))
        $('#' + tableId + ' tr:contains(' + entitie + ') .empty-td-email').removeClass('empty-td-email')
        break;

        case "CellPhone":
        $('#' + tableId + ' tr:contains(' + entitie + ')').append('<td data-consent-id="' + ConsentId + '">' + createCheckBox(IsConsented) + '</td>')
        break;
        }
}

//If the consent is already created and the value is True then it creates a checked CheckBox
function createCheckBox(isChecked) {
    var checkBoxText = '';
    if(isChecked === "True") {
        checkBoxText = '<input class="check-box" type="checkbox" checked>'
    } else {
        checkBoxText = '<input class="check-box" type="checkbox">'
    }

    return checkBoxText;
}