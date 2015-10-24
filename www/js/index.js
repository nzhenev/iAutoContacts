/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Конструктор приложения
    // Вызывается из скоупа главной страницы
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        // Важно запускать эту фцнкцию после загрузки приложения
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        var fields = ["phoneNumbers", "emails", "displayName", ];

        $("#contactList").html("Загружаю...");

        navigator.contacts.find(fields, function(contacts){
            // задампить полный список в JSON
            // JSON.stringify(contacts, null, 4);

            // displayName — полное имя с учётом локали которое выводится в контактной книжке
            // emails: [{type: "other", "value": "example@exmaple.com"}, {type: "other", "value": "example2@exmaple.com"}, ]
            // phoneNumbers: [{type: "mobile", "value": "+71231234567"}]
            // ну и остальное по документации http://docs.phonegap.com/en/1.7.0/cordova_contacts_contacts.md.html

            var $holder = $("#contactList");
            $holder.html("");
                // Выведем первые 40 (выведется меньше, тк в записной книжке есть контакты без имён)
                $.each(contacts.slice(0, 39), function(){
                    // За счёт этого условия выведется меньше
                    if (this.displayName !== null) {
                        var concated = "<div style='padding:6px;border-bottom:1px solid #EEE;'><strong>" + this.displayName + "</strong><br /><small>";

                        // $.each(this.phoneNumbers, function(){
                        //     concated += "<a href='tel:" + this.value + "'>" + this.value + "</a><br />";
                        // });
                        // $.each(this.emails, function(){
                        //     concated += "<a href='mailto:" + this.value + "'>" + this.value + "</a><br />";
                        // });
                        console.warn(this.displayName);
                        concated += "</small></div>";
                        $holder.append(concated);
                    }
                });

        }, function(){
            $("#contactList").html("Возникла какая-то ошибка...");
        }, options);
    },
};
