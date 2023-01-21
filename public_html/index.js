/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var conntoken = "90932358|-31949271613214930|90953878";
            var dbname = "STUDENT-TABLE";
            var dbrel = "SCHOOL-DB";
            var dbbaseurl = "http://api.login2explore.com:5577";
            var dbendurlIML = "/api/iml";
            var dbendurlIRL = "/api/irl";
            $('#stdId').focus();
            function createUPDATERecordRequest(jsonObj, reqId) {
                var req = "{\n"
                        + "\"token\" : \""
                        + conntoken
                        + "\","
                        + "\"dbName\": \""
                        + dbname
                        + "\",\n" + "\"cmd\" : \"UPDATE\",\n"
                        + "\"rel\" : \""
                        + dbrel
                        + "\",\n"
                        + "\"jsonStr\":{ \""
                        + reqId
                        + "\":\n"
                        + jsonObj
                        + "\n"
                        + "}}";
                return req;
            }
            function createGET_BY_KEYRequest(studjsonObj) {
                var getRequest = "{\n"
                          + "\"token\" : \"" //connection TOKEN
                          + conntoken
                          + "\","
                          + "\"dbName\": \""
                          + dbname
                          + "\",\n" + "\"cmd\" : \"GET_BY_KEY\",\n"
                          + "\"rel\" : \""
                          + dbrel + "\","
                          + "\"jsonStr\": \n"
                          + studjsonObj
                          + "\n"
                          + "}";
                return getRequest;
            }
            function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
                  var url = dbBaseUrl + apiEndPointUrl;
                  var jsonObj;
                  $.post(url, reqString, function (result) {
                      jsonObj = JSON.parse(result);
                  }).fail(function (result) {
                      var dataJsonObj = result.responseText;
                      jsonObj = JSON.parse(dataJsonObj);
                  });
                  return jsonObj;
              }
            function saveRec2LS(jsonObj) {
                var lvdata = JSON.parse(jsonObj.data);
                localStorage.setItem('recno', lvdata.rec_no);
            }
            function fillform(resjsonObj) {
                //console.log('hi');
                saveRec2LS(resjsonObj);
                var record = JSON.parse(resjsonObj.data).record;
                $('#stdName').val(record.name);
                $('#stdclass').val(record.stdclass);
                $('#stdbirth').val(record.birthday);
                $('#stdAdd').val(record.address);
                $('#stdEdate').val(record.enrolldate);
            }
            function getStudAsJsonObj() {
                var stdid = $('#stdId').val();
                var jsonstr = {
                    id: stdid
                };
                return JSON.stringify(jsonstr);
            }
            function getStud() {
                var studjsonobj = getStudAsJsonObj();
                var getRequest = createGET_BY_KEYRequest(studjsonobj);
                //console.log(getRequest);
                jQuery.ajaxSetup({async: false});
                var resJsonObj = executeCommand(getRequest, dbbaseurl, dbendurlIRL);
                //console.log(resJsonObj);
                jQuery.ajaxSetup({async: true});
                if (resJsonObj.status === 400) {
                    $('#Save').prop('disabled', false);
                    $('#Reset').prop('disabled', false);
                    $('#stdId').focus();
                } else if (resJsonObj.status === 200) {
                    //console.log('bi');
                    $('#stdId').prop('disabled', true);
                    fillform(resJsonObj);
                    $('#Update').prop('disabled', false);
                    $('#Reset').prop('disabled', false);
                    $('stdName').focus();
                }
            }
            function createPUTRequest(jsonObj) {
                  var putRequest = "{\n"
                          + "\"token\" : \"" //connection TOKEN
                          + conntoken
                          + "\","
                          + "\"dbName\": \""
                          + dbname
                          + "\",\n" + "\"cmd\" : \"PUT\",\n"
                          + "\"rel\" : \""
                          + dbrel + "\","
                          + "\"jsonStr\": \n"
                          + jsonObj
                          + "\n"
                          + "}";
                  return putRequest; //returning a string //talend API me kiya tha "token :  , "db : " "
              }
              function resetForm() {
                  $("#stdId").val("")
                  $("#stdName").val("");
                  $("#stdclass").val("");
                $("#stdEdate").val("");
                $("#stdbirth").val("");
                $("#stdAdd").val("");
                  $("#stdId").prop('disabled', false);
                $('Save').prop('disabled', true);
                $('Update').prop('disabled', true);
                $('Reset').prop('disabled', true);
                $("#stdId").focus();

              }
            function validateAndGetFormData() {
                  var idvar = $("#stdId").val(); //JQUERY 
                  if (idvar === "") {
                      alert("Student RollNo Required Value");
                      $("#stdId").focus();
                      return "";
                  }
                  var namevar = $("#stdName").val();
                  if (namevar === "") {
                      alert("Student Name is Required Value");
                      $("#stdName").focus();
                      return "";
                  }
                  var classvar = $("#stdclass").val();
                  if (classvar === "") {
                      alert("Student Class is Required Value");
                      $("#stdclass").focus();
                      return "";
                  }
                var birthvar = $("#stdbirth").val();
                  if (birthvar === "") {
                      alert("Student BirthDate is Required");
                      $("#stdbirth").focus();
                      return "";
                  }
                var stdAddvar = $("#stdAdd").val();
                  if (stdAddvar === "") {
                      alert("Student Address is Required");
                      $("#stdAdd").focus();
                      return "";
                  }
                var stdEdatevar = $("#stdEdate").val();
                  if (stdEdatevar === "") {
                      alert("Student Enrollment date is Required");
                      $("#stdEdate").focus();
                      return "";
                  }
                  var jsonStrObj = {
                      id: idvar,
                      name: namevar,
                    stdclass: classvar,
                    birthday: birthvar,
                    address: stdAddvar,
                    enrolldate: stdEdatevar

                  };
                  return JSON.stringify(jsonStrObj);
              }
            function savestudent() {
                  var jsonStr = validateAndGetFormData();
                  if (jsonStr === "") {
                      return;
                  }
                //console.log(jsonStr);
                  var putReqStr = createPUTRequest(jsonStr);
                  alert(putReqStr);
                  jQuery.ajaxSetup({async: false}); //yeh neeche wali line pe jaane se pehle
                  var resultObj = executeCommand(putReqStr, dbbaseurl, dbendurlIML);
                  jQuery.ajaxSetup({async: true});
                alert(JSON.stringify(resultObj));
                resetForm();
            }
            function updatestudent() {
                $('#Update').prop('disabled', true);
                var jsonStr = validateAndGetFormData();
                var updatereq = createUPDATERecordRequest(jsonStr, localStorage.getItem('recno'));
                console.log(updatereq);
                jQuery.ajaxSetup({async: false});
                var resultObj = executeCommand(updatereq, dbbaseurl, dbendurlIML);
                jQuery.ajaxSetup({async: true});
                alert(JSON.stringify(resultObj));
                resetForm();
                
            }


