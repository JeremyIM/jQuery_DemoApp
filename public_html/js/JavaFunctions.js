/*
 Author  : Jeremy Moore
 Date    : 2015-09-12
 Email   : jeremy.I.moore20@gmail.com
 LinkdIn : https://ca.linkedin.com/pub/jeremy-moore/98/950/407
 */

$('#addNewItem').click(function () {
    var inputValue = document.getElementById("nameValueUserInput").value;
    var nameValueList = document.getElementById("nameValuePairList");
    var splitInput = inputValue.split("=");
    if (splitInput.length === 2) {
        for (i = 0; i < splitInput.length; i++) {
            if (!!splitInput[i]) {
                if (!splitInput[i].match("^[a-zA-Z0-9]*$")) {
                    alert('Invalid Input, input must be alphanumeric');
                    return;
                }
                splitInput[i].trim();
            } else {
                alert("Invalid Input, <name> = <value>");
                return;
            }
        }
        var optionToAdd = document.createElement("option");
        optionToAdd.text = inputValue;
        nameValueList.add(optionToAdd);
    } else {
        alert("Invalid Input, Only one '=' sign please.");
    }
});

$('#removeItems').click(function () {
    $("#nameValuePairList").find('option:selected').remove();
});

$('#sortByName').click(function () {
    var nameList = document.getElementById('nameValuePairList');
    var nameValues = [];
    for (var i = 0; i < nameList.options.length; i++) {
        nameValues[i] = nameList.options[i].text;
    }
    nameValues.sort(function (a, b) {
        if (a !== "" && b !== "") {
            return a.split('=')[0].localeCompare(b.split('=')[0]);
        } else {
            return 0;
        }
    });
    populateList(nameList, nameValues);
});

$('#sortByValue').click(function () {
    var valueList = document.getElementById('nameValuePairList');
    var valueValues = [];
    for (var i = 0; i < valueList.options.length; i++) {
        valueValues[i] = valueList.options[i].text;
    }
    valueValues.sort(function (a, b) {
        if (a !== "" && b !== "") {
            return a.split('=')[1].localeCompare(b.split('=')[1]);
        } else {
            return 0;
        }
    });
    populateList(valueList, valueValues);
});

function populateList(listToBePopulated, sortedValues) {
    while (listToBePopulated.options.length > 0) {
        listToBePopulated.options[0] = null;
    }

    for (var i = 0; i < sortedValues.length; i++) {
        var option = document.createElement("option");
        option.text = sortedValues[i];
        listToBePopulated.options[i] = option;
    }
}

$('#showXML').click(function () {
    var formattedXML = listToXML();
    window.open('data:text/xml,' + encodeURIComponent(formattedXML));
});

function listToXML() {
    var xmlBuilder = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><name_value_pairs>";
    var nameValueList = document.getElementById('nameValuePairList');
    var items = [];
    var line = "";

    for (var i = 0; i < nameValueList.options.length; i++) {
        items = nameValueList.options[i].text.split("=");
        line = "<name_value><name>" + items[0] + "</name><value>" + items[1]
                + "</value></name_value>";
        xmlBuilder += line;
    }
    xmlBuilder += "</name_value_pairs>";
    return xmlBuilder;
}

$(window).resize(function () {
    var dynamicStyle = document.getElementById('pageStyle');
    if ($(window).width() < 500) {
        dynamicStyle.setAttribute("href", "css/mobile.css");
    } else if ($(window).width() < 1024) {
        dynamicStyle.setAttribute("href", "css/medium.css");
    } else {
        dynamicStyle.setAttribute("href", "css/large.css");
    }
});
