/*
 Copyright (C) 2009, 2010 Alex Clemesha <alex@clemesha.org>
 
 This module is part of Hotdot, and is distributed under the terms 
 of the BSD License: http://www.opensource.org/licenses/bsd-license.php
*/
/*
TODO: 

- add timestamp after N seconds of non-activity
- set cookie for open/closed
*/


function chat_send_message(msg){
    var fullmsg = {"type":"chat", "msg":msg};
    fullmsg = JSON.stringify(fullmsg); 
    client.send(fullmsg, CHANNEL_NAME);
};
function chat_handle_message(msg){
    var text = msg.msg;
    var from = msg.from; 
    if (from == USERNAME) from = "me";
    var chatmsg = "<p class='chatmsg'><b>"+from+": </b>"+text+"</p>";
    var chat_text = $("#chat_text");
    chat_text.append(chatmsg);
    chat_text.attr({scrollTop: chat_text.attr("scrollHeight")});
};

function chat_create_box(title) {
    var html = "<div id='chatbox'>";
    html += "<p id='chat_title'>"+title+"<span id='chat_close'>-</span><span id='chat_open'>^</span></p>";
    html += "</div>";
    $("#container").after(html);
    chat_create_box_body();
};

function chat_create_box_body(){
    var html = "<div id='chat_box_body'>";
    html += "<div id='chat_text'></div>";
    html += "<textarea id='chat_type_box'></textarea>";   
    html += "</div>";
    $("#chat_title").after(html);
}
function chat_handle_typing(ev){
   if (ev.keyCode != 13) return; /* if not 'Enter' pressed */
    var msg = $(this).val();
    if (msg == "" || msg == "\n") {
        $(this).val(""); /* Clear the textarea */
        return;
    }
    //console.log(msg);
    $(this).val(""); /* Clear the textarea */
    chat_send_message(msg);
    return false;
};

function chat_open_box(){
    $("#chatbox").css("height", "300px");
    $("#chat_box_body").show();
}
function chat_close_box(){
    $("#chatbox").css("height", "20px");
    $("#chat_box_body").hide();
}

$(document).ready(function(){
    chat_create_box("Chat");
    $("#chat_open").click(chat_open_box);
    $("#chat_close").click(chat_close_box);
    $("#chat_type_box").keydown(chat_handle_typing);
});
