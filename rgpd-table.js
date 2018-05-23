//Sample data for clientId and JSON Array.
var currClientId = 33899;

var jsonArray = [{ "consentConfigId":"5" , "purpose":"Marketing APV" , "channel":"CellPhone" , "entities" : "KIA" , "ConsentId" : "3" , "IsConsented" : "True"}  , 
                {"consentConfigId":"7" , "purpose":"VIP evento concecinario" , "channel":"CellPhone" , "entities" : "Equipa de Demonstração" , "ConsentId" : "4" , "IsConsented" : "False"} , 
                {"consentConfigId":"4" , "purpose":" Mensagens" , "channel":"CellPhone" , "entities" : "Equipa de Demonstração" , "ConsentId" : "5" , "IsConsented" : "True"} , 
                {"consentConfigId":"3" , "purpose":"VIP evento concecinario" , "channel":"Email" , "entities" : "Equipa de Demonstração" , "ConsentId" : "19" , "IsConsented" : "True"} , 
                {"consentConfigId":"14" , "purpose":"Mails Malucos Concessionario" , "channel":"Email" , "entities" : "Equipa de Demonstração" , "ConsentId" : "0" , "IsConsented" : "False"} , 
                {"consentConfigId":"6" , "purpose":"Marketing APV" , "channel":"CellPhone" , "entities" : "Equipa de Demonstração" , "ConsentId" : "0" , "IsConsented" : "False"} ,
                {"consentConfigId":"15" , "purpose":"Chamadas Nível 1" , "channel":"CellPhone" , "entities" : "BMW MOTORRAD" , "ConsentId" : "0" , "IsConsented" : "True"} ,
                {"consentConfigId":"20" , "purpose":"Chamadas Nível 1" , "channel":"CellPhone" , "entities" : "MSCar" , "ConsentId" : "16" , "IsConsented" : "False"} ,
                {"consentConfigId":"21" , "purpose":"Chamadas Nível 1" , "channel":"Email" , "entities" : "MSCar" , "ConsentId" : "29" , "IsConsented" : "True"} ,
                {"consentConfigId":"27" , "purpose":"Mails Malucos Concessionario" , "channel":"CellPhone" , "entities" : "Equipa de Demonstração" , "ConsentId" : "0" , "IsConsented" : "False"}
            ]

//On document ready and loaded!
$( document ).ready(function() {
    jsonArray.forEach(function(json) {
        var elementId = replaceES(json.purpose.trim());
        var currTableId = elementId + '-table';

        if($('#'+ elementId +'' ).length > 0 ) { //If the purpose  already exists!
            if($('#' + currTableId + ' tr:contains(' + json.entities + ')').length > 0) { //If the entitie row already exists in that table
                addExistingInputBox(currTableId,json.entities,json.channel,json.ConsentId,json.consentConfigId,json.IsConsented);
                return
            }
            addTableRows(currTableId,json.entities,json.channel,json.consentConfigId,json.ConsentId,json.IsConsented)
        } else {

        createNavButton(json.purpose,elementId); // Needs the name to populate the button and the ID

        createDisplayDiv(elementId); // Only uses the id

        $('#' + elementId + '').append(createTable(json.purpose,elementId)) // Appends to the div a new table with the header pre-created(Email,CellPhone)

        addTableRows(currTableId,json.entities,json.channel,json.consentConfigId,json.ConsentId,json.IsConsented); //  Adds a TableRow with the channel.

        }
    });
    //Calling the genrealCleaning function and calling all the nested utility functions inside
    generalCleaning();
    generalCleaning.heightFix();
    generalCleaning.fillEmptyData();

    
});



//Creates the button with onclick function and a class assigned! The return false on the OnCLick is an Outsystems config take it out for another tecnologies!
function createNavButton(purpose,elementId) {
    var button = '<button class="tablinks" onclick="openCity(event,\'' + elementId + '\'); return false">' + purpose +  '</button>'
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
    switch(channelType) {
        case "CellPhone" :
         $('#' + tableId + '').append('<tr> <td class="entitie-cell">' + entitie + '</td> </tr>')
         $('#' + tableId + ' tr').last().append('<td class="empty-td-email"></td>')
         $('#' + tableId + ' tr').last().append('<td data-consent-config-id="' + consentConfigId + '" data-consent-id="' + ConsentId + '"> ' + createCheckBox(IsConsented) + '  </td>')
        break;

        case "Email" :
         $('#' + tableId + '').append('<tr> <td class="entitie-cell">' + entitie + '</td> </tr>')
         $('#' + tableId + ' tr').last().append('<td data-consent-config-id="' + consentConfigId + '" data-consent-id="' + ConsentId + '"> ' + createCheckBox(IsConsented) + ' </td>')
         $('#' + tableId + ' tr').last().append('<td class="empty-td-cellphone"></td>')
         break;

    }
}

//Ads input button if the Entite row already exists. We can do this changes beacuse no <td> will come replicated(supostamente!). So any other purpose will create a new button and a new Div
function addExistingInputBox(tableId,entitie,channelType,ConsentId,consentConfigId,IsConsented) {
    switch(channelType) {
        case "Email":
        $('#' + tableId + ' tr:contains(' + entitie + ') .empty-td-email').attr('data-consent-id',ConsentId)
        $('#' + tableId + ' tr:contains(' + entitie + ') .empty-td-email').attr('data-consent-config-id',consentConfigId)
        $('#' + tableId + ' tr:contains(' + entitie + ') .empty-td-email').append(createCheckBox(IsConsented))
        $('#' + tableId + ' tr:contains(' + entitie + ') .empty-td-email').removeClass('empty-td-email')
        break;

        case "CellPhone":
        $('#' + tableId + ' .empty-td-cellphone').remove();
        $('#' + tableId + ' tr:contains(' + entitie + ')').append('<td  data-consent-config-id="' + consentConfigId + '" data-consent-id="' + ConsentId + '">' + createCheckBox(IsConsented) + '</td>')
        break;
        }
}

//If the consent is already created and the value is True then it creates a checked CheckBox
function createCheckBox(isChecked) {
    var checkBoxText = '';
    if(isChecked === "True") {
        checkBoxText = '<input class="check-box" type="checkbox" checked=checked>'
    } else {
        checkBoxText = '<input class="check-box" type="checkbox">'
    }

    return checkBoxText;
}

//Gets all the checkboxes results and gets the ids of its DOM parents. That are the corresponding consentId and consentConfigid for the first parent 
// *Return*-- The json value of check checkbox with ConsentConfigs Ids and a ConsentId with a True or False value if the input is Checked
function onSaveTables() {
    var checkBoxes = $('.check-box')
    var resultJSON_Array = [];
    $.each(checkBoxes,function(index,checkbox) {
        var resultjson = {};

        resultjson.ConsentConfigId = $(checkbox).parent().attr('data-consent-config-id');
        resultjson.ConsentId = $(checkbox).parent().attr('data-consent-id');
        resultjson.IsConsented = $(checkbox).is(":checked");

        /**
         * Logs for debug purposes so they stay commented.
         */
        //console.log('ConsentConfig ID : ' + $(checkbox).parent().attr('data-consent-config-id');//Get the data-consent-config-id the parent td of the checkbox
        //console.log('Consent ID : '+ $(checkbox).parent().attr('data-consent-id'));//Get the Conset Id that is the parent data-consent-id of the checkbox
        //console.log( index + " : " + $(checkbox).is(":checked")); // Gets the boolean value if the checkbox is checked or not.

        resultJSON_Array.push(resultjson)
    });

    return resultJSON_Array;
}

//Returns a custom string to be processed in the Outsystems Back End. JSONS separated by $$
function customJsonResult() {

        var checkBoxes = $('.check-box')
        var resultCustomJson = '';
        var checkBoxesLength = checkBoxes.length - 1;

        $.each(checkBoxes,function(index,checkbox) {
            var resultjson = {};
            
    
            resultjson.ConsentConfigId = $(checkbox).parent().attr('data-consent-config-id');
            resultjson.ConsentId = $(checkbox).parent().attr('data-consent-id');
            resultjson.IsConsented = $(checkbox).is(":checked");
            
            if(index === checkBoxesLength) {
                resultCustomJson += JSON.stringify(resultjson)    
            } else {
                resultCustomJson += JSON.stringify(resultjson) + "$$"
            }
            
        });
        return resultCustomJson
    
}

//Outsystmes specific function. Will not work on a normal environment.
function fillInput() {
    $('.json-input').val(customJsonResult());
    $('.clientid-input').val(currClientId);
    $('.save-button').click();
}

//General function that cleans all the tables fills empty <td>'s and makes displays more appiling 
function generalCleaning() {

    function heightFix() {
        var tabHeight = $('.tab').height();
        $('.tabcontent').css("height",tabHeight + "px");
    }
    generalCleaning.heightFix = heightFix;


    function fillEmptyData() {
    //For all the empty tags of <td> it will a text and a specific class.
        $( "td:empty" ) 
        .text( "Sem configuração" )
        .addClass('empty-td');
    }
    generalCleaning.fillEmptyData = fillEmptyData;
}

//Prepares a new Array of JSON´s with the necessary info to be print
/**
 *Return --> Array of JSON objects with Channel, isConsented, purpose, entitie
 */
function prepareConsentTables() {
    var resultConsentPrint = [] , checkBoxes = $('.check-box')
        
        //For each check boxe we get the consent config id and if the checkbox is check or not   
        $.each(checkBoxes,function(index,checkbox) {
            var printConsent = {}
            printConsent.IsConsented = $(checkbox).is(":checked");
            printConsent.ConsentConfigId = $(checkbox).parent().attr('data-consent-config-id');

            resultConsentPrint.push(printConsent);
            
        });
            //After that we add the additional for each ConsentPrint json. We look for every Config for its purpose , channel and entitie.
            resultConsentPrint.forEach(function(consent) {
                jsonArray.forEach(function(json) {
                    if(json.consentConfigId == consent.ConsentConfigId) {
                        consent.channel = json.channel;
                        consent.purpose = json.purpose;
                        consent.entitie = json.entities;
                    } 
                });
            });

        return resultConsentPrint;
}

