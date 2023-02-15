      
      var push_permission_type;
var push_user_endpoint = null;
var push_user_id = null;
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var sbuzz_safari = null;
var sbuzz_push_id = null;
/*var notify = function () {
    // Check for notification compatibility.
    if (!'Notification' in window) {
        // If the browser version is unsupported, remain silent.
        console.log("browser version is unsupported for safari notification");
        return;
    }
    // Log current permission level
    
    console.log("current permission: ");
    console.log(Notification.permission);
    // If the user has not been asked to grant or deny notifications
    // from this domain...
    if (Notification.permission === 'default') {
        Notification.requestPermission(function () {
            // ...callback this function once a permission level has been set.
            notify();
        });
    }
    // If the user has granted permission for this domain to send notifications...
    else if (Notification.permission === 'granted') {
        var n = new Notification(
                    'New message from Liz',
                    {
                      'body': 'Liz: "Hi there!"',
                      // ...prevent duplicate notifications
                      'tag' : 'unique string'
                    }
                );
        // Remove the notification from Notification Center when clicked.
        n.onclick = function () {
            this.close();
        };
        // Callback function when the notification is closed.
        n.onclose = function () {
            console.log('Notification closed');
        };
    }
    // If the user does not want notifications to come from this domain...
    else if (Notification.permission === 'denied') {
        // ...remain silent.
        return;
    }
};*/
/*var checkRemotePermission = function (permissionData) {
    if (permissionData.permission === 'default') {
        // This is a new web service URL and its validity is unknown.
        window.safari.pushNotification.requestPermission(
            'https://dev.superbuzz.io', // The web service URL.
            'web.io.superbuzz.dev',     // The Website Push ID.
            {}, // Data that you choose to send to your server to help you identify the user.
            checkRemotePermission         // The callback function.
        );
    }
    else if (permissionData.permission === 'denied') {
        // The user said no.
    }
    
    else if (permissionData.permission === 'granted') {
        var n = new Notification(
            'New message from Liz', {
                'body': 'Hey there! Welcome to dev.superbuzz.io"', // ...prevent duplicate notifications
                'tag' : 'unique string'
             }
        );
        // Remove the notification from Notification Center when clicked.
        n.onclick = function () {
            this.close();
        };
    }
};
var p = document.getElementById("foo");
p.onclick = function() {
    // Ensure that the user can receive Safari Push Notifications.
    if ('safari' in window && 'pushNotification' in window.safari) {
        var permissionData = window.safari.pushNotification.permission('web.io.superbuzz.dev');
        checkRemotePermission(permissionData);
    }
};
*/
class SBAlert {
    constructor(icon = '', text = '', topics = [], empty = 0) {
        this.iconURL = icon;
        this.displayText = text;
        this.topicsArray = topics; // COPYTHIS
        this.empty = empty;
        this.init();
    }
    init() {
        console.log("---in init");
        console.log(this.iconURL);
        console.log(this.empty);
        if (!this.empty) {
            this.createContainer();
            this.createPanel();
            this.createBody();
            // COPYTHIS START
            if (this.topicsArray && this.topicsArray.length) {
                this.checkboxes = [];
                this.checkedCount = this.topicsArray.length;
                this.createTopics();
                this.fillTopics();
            }
            // COPYTHIS END
            this.createFooter();
            this.createIconWrapper();
            this.createIcon();
            this.createMessage();
            this.createAllow();
            this.createCancel();
            this.createClearFix();
            setTimeout(() => {
                this.panel.style.transform = `translateY(0)`;
                SuperBuzzSDK.promptAction('view');
            }, 4000);
        } else {
            SuperBuzzSDK.promptAction('view');
            SuperBuzzSDK.subscribeUser();
        }
    }
    // COPYTHIS START
    createTopics() {
        this.topics = document.createElement('div');
        this.topics.style = `
                clear: both;
                padding: 30px 0;
                margin: 0 -12px;
            `;
        this.panel.appendChild(this.topics);
    }
    createTopic(topicText) {
        let label = document.createElement('label');
        label.style = `
                display: block;
                box-sizing: border-box;
                width: 50%;
                float: left;
                padding: 0 12px 24px 12px;
                min-width: 238px;
                font-size: 15px;
            `;
        let checkbox = document.createElement('div');
        checkbox.style = `
                width: 24px;
                height: 24px;
                border-radius: 3px;
                background: rgb( 0, 120, 209 );
                float: left;
                margin-right: 15px;
                cursor: pointer;
                color: #fff;
                text-align: center;
                font-size: 20px;
                line-height: 22px;
            `;
        checkbox.textContent = '✔';
        let input = document.createElement('input');
        input.type = 'checkbox';
        input.style = `display: none;`;
        input.checked = true;
        input.value = topicText;
        label.textContent = topicText;
        label.appendChild(input);
        label.appendChild(checkbox);
        input.addEventListener('change', () => {
            checkbox.textContent = input.checked ? '✔' : '';
            checkbox.style.background = input.checked ? 'rgb( 0, 120, 209 )' : 'gray';
            this.checkedCount += input.checked ? 1 : -1;
            if (this.checkedCount == 0) {
                input.checked = true;
                var change = document.createEvent("HTMLEvents");
                change.initEvent("change", false, true);
                input.dispatchEvent(change);
            }
        });
        this.checkboxes.push(input);
        this.topics.appendChild(label);
    }
    fillTopics() {
        this.topicsArray.forEach(topic => {
            this.createTopic(topic);
        });
        let clear = document.createElement('div');
        clear.style = `
                clear: both;
                width: 100%;
                height: 1px;
            `;
        this.topics.appendChild(clear);
    }
    // COPYTHIS END
    createContainer() {
        this.container = document.createElement('div');
        this.container.style = `
                font-size: 16px;
                position: fixed;
                z-index: 2258594000;
                top: 0;
                left: 0;
                right: 0;
                -webkit-font-smoothing: initial;
            `;
        document.body.appendChild(this.container);
    }
    createPanel() {
        this.panel = document.createElement('div');
        // COPYTHIS changed width: 530px;
        this.panel.style = `
                box-sizing: border-box;
                width: 530px;
                max-width: 100%;
                margin: 0 auto;
                box-shadow: 0 1px 6px rgba(5,27,44,.06),0 2px 32px rgba(5,27,44,.16)!important;
                background: #fff!important;
                color: #051b2c;
                padding: 1.5em;
                border-bottom-left-radius: 0.5em;
                border-bottom-right-radius: 0.5em;
                font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                transition: ease 400ms transform;
                transform: translateY(-100%);
            `;
        this.container.appendChild(this.panel);
    }
    createBody() {
        this.body = document.createElement('div');
        this.body.style = `
            `;
        this.panel.appendChild(this.body);
    }
    createIconWrapper() {
        this.iconWrapper = document.createElement('div');
        this.iconWrapper.style = `
                box-sizing: border-box;
                float: left;
                width: 80px;
                height: 80px;
                position: relative;
            `;
        this.body.appendChild(this.iconWrapper);
    }
    createIcon() {
        this.icon = document.createElement('img');
        this.icon.style = `
                width: 100%;
                height: 100%;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            `;
        this.icon.src = this.iconURL;
        this.iconWrapper.appendChild(this.icon);
    }
    createMessage() {
        this.message = document.createElement('div');
        this.message.style = `
                box-sizing: border-box;
                padding: 0 0 0 1em;
                font-weight: 400;
                float: left;
                width: calc(100% - 80px);
                line-height: 1.45em;
                -o-user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                cursor: default;
                color: #051b2c!important;
                user-select: none;
            `;
        this.message.textContent = this.displayText;
        this.body.appendChild(this.message);
    }
    createFooter() {
        this.footer = document.createElement('div');
        this.footer.style = `
                clear: both;
            `;
        this.panel.appendChild(this.footer);
    }
    createAllow() {
        this.allow = document.createElement('button');
        this.allow.style = `
                background-color: #0078d1;
                color: #fff!important;
                transition: 75ms linear;
                float: right;
                padding: 12px 24px;
                font-size: 16px;
                border-radius: 4px;
                font-weight: 400;
                box-shadow: unset;
                display: -ms-flexbox;
                display: flex;
                line-height: 1.5;
                text-align: center;
                white-space: nowrap;
                vertical-align: middle;
                cursor: pointer;
                border: 1px solid transparent;
                border-radius: 0.25rem;
                font-family: inherit;
                letter-spacing: .05em;
                transition: background-color 75ms ease;
                margin: 0;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            `;
        this.allow.textContent = 'Allow';
        this.allow.addEventListener('mouseenter', () => {
            this.allow.style.backgroundColor = `#0062ab`;
        });
        this.allow.addEventListener('mouseleave', () => {
            this.allow.style.backgroundColor = `#0078d1`;
        });
        if (!isSafari) {
            this.allow.addEventListener('click', () => {
                let selected_topics = [];
                // COPYTHIS START
                if (this.checkboxes && this.checkboxes.length > 0) {
                    let checkedInputs = this.checkboxes.filter(checkbox => checkbox.checked ? checkbox.value : '')
                    selected_topics = checkedInputs.map(checkbox => checkbox.value);
                }
                console.log("selected_topics");
                console.log(selected_topics);
                // COPYTHIS END
                localStorage.setItem('sbuzz_prompt_allowed', 1);
                console.log("show offer now");
                SuperBuzzSDK.setPromptSelectedTopics(selected_topics);
                SuperBuzzSDK.subscribeUser();
                /*else{
                    SuperBuzzSDK.subscribeSfriUser();   
                }*/
                this.panel.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    this.container.remove();
                }, 400);
                SuperBuzzSDK.promptAction('allow');
            });
        } else {
            var that = this;
            this.allow.onclick = function() {
                that.panel.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    that.container.remove();
                }, 400);
                if ('safari' in window && 'pushNotification' in window.safari) {
                    var permissionData = window.safari.pushNotification.permission('web.io.superbuzz.dev');
                    //checkRemotePermission(permissionData);
                    SuperBuzzSDK.subscribeSfriUser(permissionData);
                }
            };
        }
        this.footer.appendChild(this.allow);
    }
    createCancel() {
        this.cancel = document.createElement('button');
        this.cancel.style = `
                margin: 0 12px 0 0;
                box-shadow: none;
                background: #fff!important;
                color: #0078d1!important;
                float: right;
                padding: 12px 24px;
                font-size: 16px;
                border-radius: 4px;
                font-weight: 400;
                box-shadow: unset;
                display: -ms-flexbox;
                display: flex;
                line-height: 1.5;
                text-align: center;
                white-space: nowrap;
                vertical-align: middle;
                cursor: pointer;
                border: 1px solid transparent;
                border-radius: 0.25rem;
                font-family: inherit;
                letter-spacing: .05em;
                transition: background-color 75ms ease;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            `;
        this.cancel.textContent = 'No Thanks';
        this.cancel.addEventListener('click', () => {
            localStorage.setItem('sbuzz_prompt_dismissed', 1);
            this.panel.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                this.container.remove();
            }, 400);
            SuperBuzzSDK.promptAction('deny');
        })
        this.footer.appendChild(this.cancel);
    }
    createClearFix() {
        this.clearFix = document.createElement('div');
        this.clearFix.style = `
                clear: both;
                height: 1px;
                visibility: hidden;
            `;
        this.footer.appendChild(this.clearFix);
    }
}
//-------------------------------------------------------------------
(function(window) {
    'use strict';
    function SB_alert(icon, text, topics, empty) {
        new SBAlert(icon, text, topics, empty);
    }
    function SuperBuzzSDK() {
        const applicationServerPublicKey = 'BHTkEq4Ag8DZ3s+pwbywJtkAE2dt78m3aOpYl/GZdZaRrcut2GfNd58hL6E3e5Y2mod0+4grdVXAoYj2BlQmUvo=';
        let isSubscribed = false;
        let swRegistration = null;
        let sb_app_id = "";
        //let base = "https://app.superbuzz.io";
        let base = "https://dd.superbuzz.io";
        let sb_prompt = null;
        let selected_topics = [];
        var _SuperBuzzSDKObject = {};
        _SuperBuzzSDKObject.init = function(options) {
            sb_app_id = options.app_id;
            /*if(typeof(window.SuperBuzzUB) === 'undefined'){
                window.SuperBuzzUB = SuperBuzzUB(sb_app_id);
                window.SuperBuzzUB.start();
            }*/
            var that = this;
            var http = new XMLHttpRequest();
            var url = base + '/api/validateSDK';
            var params = 'app_id=' + sb_app_id + '&origin=' + window.location.href;
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.onreadystatechange = function() {
                if (http.readyState == 4 && http.status == 200) {
                    var setting = JSON.parse(http.responseText);
                    console.log(setting);
                    sb_prompt = setting.preloader;
                    //user tracking
                    /*if ( typeof ( window.SuperBuzzUB ) === 'undefined' ) {
                        window.SuperBuzzUB = SuperBuzzUB( sb_app_id );
                        window.SuperBuzzUB.start();
                    }*/
                    console.log("isSafari = " + isSafari);
                    if (isSafari && setting.safari && setting.wpushid) {
                        sbuzz_safari = setting.safari;
                        sbuzz_push_id = setting.wpushid;
                        that.register_sfri();
                    } else if (!isSafari) {
                        //console.log("now register sw");
                        that.register_sw();
                    }
                } else if (http.status == 400) {
                    if (http.responseText) {
                        var response = JSON.parse(http.responseText);
                        //console.error("ERROR: SuperBuzz:"+response);
                    }
                }
            }
            http.send(params);
        };
        _SuperBuzzSDKObject.getAppId = function() {
            return sb_app_id;
        };
        _SuperBuzzSDKObject.getPrompt = function() {
            return sb_prompt;
        };
        _SuperBuzzSDKObject.setPromptSelectedTopics = function(topics) {
            this.selected_topics = topics;
        };
        _SuperBuzzSDKObject.getPromptSelectedTopics = function() {
            return this.selected_topics;
        };
        _SuperBuzzSDKObject.propmt = function(icon, text, topics, empty) {
            return SB_alert(icon, text, topics, empty);
        };
        _SuperBuzzSDKObject.urlB64ToUint8Array = function(base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);
            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        };
        _SuperBuzzSDKObject.register_sw = function() {
            console.log("register sw");
            try {
                var that = this;
              if('serviceWorker' in navigator){
                  // window.addEventListener("load", function () {
                    navigator.serviceWorker.register('/apps/source/SuperBuzzSDKWorker.js', {
                        updateViaCache: 'none'
                    })
                    .then(function(swReg) {
                        //console.log( swReg.active.state );
                        console.log('Service Worker is registered', swReg);
                        swRegistration = swReg;
                        console.log("--- calling showOffer");
                        that.showOffer();
                        /*if(typeof(window.SuperBuzzUB) === 'undefined'){
                            window.SuperBuzzUB = SuperBuzzUB(sb_app_id);
                            window.SuperBuzzUB.start();
                        }*/
                    });
                  // });
            }

            } catch (err) {
                console.log("push not supported");
            }
        };
        _SuperBuzzSDKObject.register_sfri = function() {
            console.log("register sfri");
            console.log(sbuzz_safari);
            console.log(sbuzz_push_id);
            try {
                var that = this;
                if ('safari' in window && 'pushNotification' in window.safari) {
                    var permissionData = window.safari.pushNotification.permission(sbuzz_push_id);
                    console.log("permissionData");
                    console.log(permissionData);
                    console.log("current permission = " + permissionData.permission); //granted, default, blocked
                    if (permissionData.permission === 'denied') {} else if (permissionData.permission === 'granted') {
                        //push_user_endpoint = subscription.endpoint;
                        //console.log( 'User IS subscribed.' );
                        //_SuperBuzzSDKObject.getPushUserID( push_user_endpoint );
                    } else {
                        console.log('User is NOT subscribed.');
                        console.log('offer notifications');
                        var p = _SuperBuzzSDKObject.getPrompt();
                        console.log(p);
                        that.propmt(p.icon, p.text, p.topics, p.empty);
                    }
                    //checkRemotePermission(permissionData);
                }
            } catch (err) {
                console.log(err);
                console.log("push not supported");
            }
        };
        _SuperBuzzSDKObject.subscribeSfriUser = function(permissionData) {
            var that = this;
            console.log("now request permission");
            /*window.safari.pushNotification.requestPermission(
                'https://dev.superbuzz.io', // The web service URL.
                'web.io.superbuzz.dev',     // The Website Push ID.
                {}, // Data that you choose to send to your server to help you identify the user.
                that.subscribeSfriUser         // The callback function.
            );*/
            if (permissionData.permission === 'default') {
                // This is a new web service URL and its validity is unknown.
                window.safari.pushNotification.requestPermission(
                    'https://dd.superbuzz.io', // The web service URL.
                    //'web.io.superbuzz.dev',     // The Website Push ID.
                    sbuzz_push_id, // The Website Push ID.
                    {
                        uid: "TEST"
                    }, // Data that you choose to send to your server to help you identify the user.
                    that.subscribeSfriUserClbk // The callback function.
                );
            } else if (permissionData.permission === 'denied') {
                console.log("user denied!");
            } else if (permissionData.permission === 'granted') {
                that.subscribeSfriUserClbk(permissionData);
            }
        };
        _SuperBuzzSDKObject.subscribeSfriUserClbk = function(permissionData) {
            var that = this;
            console.log("inside subscribeSfriUserClbk");
            console.log(permissionData);
            if (permissionData.permission === 'granted') {
                console.log("user allowed :)");
                console.log("now send to server");
                _SuperBuzzSDKObject.updateSubscriptionOnServer(permissionData);
                console.log("after updateSubscriptionOnServer ...");
                push_user_endpoint = permissionData.deviceToken;
                push_permission_type = 'granted';
                isSubscribed = true;
                setTimeout(() => {
                    _SuperBuzzSDKObject.getPushUserID(push_user_endpoint);
                }, 1000);
                /*var n = new Notification(
                    'New message from Liz', {
                        'body': 'Hey there! Welcome to dev.superbuzz.io"', // ...prevent duplicate notifications
                        'tag' : 'unique string'
                     }
                );
                // Remove the notification from Notification Center when clicked.
                n.onclick = function () {
                    this.close();
                };*/
            }
        };
        _SuperBuzzSDKObject.getPushUserID = function(endpoint) {
            var that = this;
            var http = new XMLHttpRequest();
            var url = base + '/api/pushuserid';
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.onreadystatechange = function() {
                if (http.readyState == 4 && http.status == 200) {
                    if (http.responseText != '') {
                        var response = JSON.parse(http.responseText);
                        push_user_id = response.id;
                    }
                } else if (http.status == 400) {}
            }
            http.send('endpoint=' + endpoint);
        };
        _SuperBuzzSDKObject.promptAction = function(action) {
            var that = this;
            var http = new XMLHttpRequest();
            var url = base + '/api/prompt-action';
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.onreadystatechange = function() {
                if (http.readyState == 4 && http.status == 200) {} else if (http.status == 400) {}
            }
            http.send('app_id=' + sb_app_id + '&p_id=' + sb_prompt.id + '&action=' + action);
        };
        _SuperBuzzSDKObject.showOffer = function() {
            console.log("--- showOffer");
            var that = this;
            swRegistration.pushManager.getSubscription()
                .then(function(subscription) {
                    console.log(subscription);
                    isSubscribed = !(subscription === null);
                    console.log("current permission = " + Notification.permission); //granted, default, blocked
                    push_permission_type = Notification.permission;
                    if (Notification.permission == "blocked" || Notification.permission == "denied") {
                    } else if (isSubscribed) {
                        push_user_endpoint = subscription.endpoint;
                        console.log('User IS subscribed.');
                        _SuperBuzzSDKObject.getPushUserID(push_user_endpoint);
                    } else {
                        console.log('User is NOT subscribed.');
                        console.log('offer notifications');
                        //check prompt
                        var allowed = localStorage.getItem('sbuzz_prompt_allowed');
                        var canceled = localStorage.getItem('sbuzz_prompt_dismissed');
                        console.log("allowed: " + allowed);
                        console.log("canceled: " + canceled);
                        if (!canceled) {
                            var p = _SuperBuzzSDKObject.getPrompt();
                            console.log(p);
                            if (p && !allowed) {
                                that.propmt(p.icon, p.text, p.topics, p.empty);
                            } else {
                                that.subscribeUser();
                            }
                        }
                    }
                });
        };
        _SuperBuzzSDKObject.subscribeUser = function() {
            var that = this;
            const applicationServerKey = that.urlB64ToUint8Array(applicationServerPublicKey);
            swRegistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: applicationServerKey
                })
                .then(function(subscription) {
                    console.log('User is subscribed.');
                    that.updateSubscriptionOnServer(subscription);
                    push_user_endpoint = subscription.endpoint;
                    push_permission_type = 'granted';
                    isSubscribed = true;
                    setTimeout(() => {
                        _SuperBuzzSDKObject.getPushUserID(push_user_endpoint);
                    }, 1000);
                })
                .catch(function(err) {
                    console.log('Failed to subscribe the user: ', err);
                });
        };
        _SuperBuzzSDKObject.updateSubscriptionOnServer = function(subscription) {
            console.log("in updateSubscriptionOnServer");
            if (subscription) {
                var http = new XMLHttpRequest();
                var url = base + '/api/save-subscription/' + sb_app_id;
                var params = 'subscription=' + JSON.stringify(subscription);
                var p = _SuperBuzzSDKObject.getPrompt();
                if (p) {
                    params = params + "&prompt_id=" + p.id;
                }
                var selected_topics = _SuperBuzzSDKObject.getPromptSelectedTopics();
                console.log(selected_topics);
                if (selected_topics) {
                    params = params + "&selected_topics=" + encodeURIComponent(JSON.stringify(selected_topics));
                }
                http.open('POST', url, true);
                http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                http.send(params);
            }
        };
        return _SuperBuzzSDKObject;
    }
    //---------------------------------------------------------------
    function SuperBuzzUB(app_id) {
        var results = {};
        var _UserBehaviourObject = {};
        var uid;
        var start_time = 0;
        _UserBehaviourObject.app_id = app_id;
        _UserBehaviourObject.getTimeStamp = function() {
            return Date.now();
        };
        _UserBehaviourObject.uid = function() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        }
        uid = _UserBehaviourObject.uid();
        _UserBehaviourObject.server = function(data) {
            var http = new XMLHttpRequest();
            var url = 'https://dd.superbuzz.io/api/save-ub';
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            //http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            http.onreadystatechange = function() {
                if (http.readyState == 4 && http.status == 200) {
                    //console.log(http.responseText);                   
                } else if (http.status == 400) {
                    if (http.responseText) {
                        var response = http.responseText;
                        console.error("ERROR: SuperBuzzUB:" + response);
                    }
                }
            }
            http.send('data=' + JSON.stringify(data));
        }
        var defaults = {
            userInfo: true,
            clicks: true,
            mouseMovement: true,
            mouseMovementInterval: 1,
            mouseScroll: true,
            mousePageChange: true, //todo
            timeCount: true,
            clearAfterProcess: true, // todo
            processTime: 15,
            processData: function(results) {
                results.uid = uid;
                if (push_user_id) {
                    results.PUID = push_user_id;
                }
                console.log(results);
                _UserBehaviourObject.server(results);
                uid = _UserBehaviourObject.uid();
            },
        };
        var user_config = {};
        var mem = {
            processInterval: null,
            mouseInterval: null,
            mousePosition: [], //x,y,timestamp
            eventListeners: {
                scroll: null,
                click: null,
                mouseMovement: null,
            },
            eventsFunctions: {
                scroll: () => {
                    results.mouseScroll.push([window.scrollX, window.scrollY, _UserBehaviourObject.getTimeStamp(), uid]);
                },
                click: (e) => {
                    //console.log(e);                                       
                    var target = e.target || e.srcElement,
                        text = target.textContent || target.innerText;
                    //outerHtml = target.outerHTML,
                    //outerText = target.outerText;
                    if (text.length < 150) {
                        results.clicks.clickCount++;
                        var path = [];
                        var node = "";
                        e.path.forEach((el, i) => {
                            if ((i !== e.path.length - 1) && (i !== e.path.length - 2)) {
                                node = el.localName;
                                (el.className !== "") ? el.classList.forEach((clE) => {
                                    node += "." + clE
                                }): 0;
                                (el.id !== "") ? node += "#" + el.id: 0;
                                path.push(node);
                            }
                        })
                        path = path.reverse().join(">");
                        results.clicks.clickDetails.push([e.clientX, e.clientY, path, text, _UserBehaviourObject.getTimeStamp(), uid]);
                    }
                },
                mouseMovement: (e) => {
                    var move_text = '';
                    var target = e.target || e.srcElement,
                        text = target.textContent || target.innerText;
                    if (text && text.length < 150) {
                        move_text = text;
                    }
                    mem.mousePosition = [e.clientX, e.clientY, move_text, _UserBehaviourObject.getTimeStamp(), uid];
                }
            }
        };
        _UserBehaviourObject.resetResults = function() {
            results = {
                appID: this.app_id || '',
                URL: location.protocol + '//' + location.host + location.pathname,
                UID: uid,
                PUID: push_user_id,
                userInfo: {
                    appCodeName: navigator.appCodeName || '',
                    appName: navigator.appName || '',
                    vendor: navigator.vendor || '',
                    platform: navigator.platform || '',
                    userAgent: navigator.userAgent || '',
                    languages: ''
                },
                time: { //todo
                    startTime: start_time,
                    currentTime: 0,
                },
                clicks: {
                    clickCount: 0,
                    clickDetails: []
                },
                mouseMovements: [],
                mouseScroll: [],
                contextChange: [], //todo
                //keyLogger: [], //todo
            }
        };
        //this.resetResults();
        _UserBehaviourObject.resetResults();
        _UserBehaviourObject.config = function(ob) {
            user_config = {};
            Object.keys(defaults).forEach((i) => {
                i in ob ? user_config[i] = ob[i] : user_config[i] = defaults[i];
            })
        };
        _UserBehaviourObject.start = function() {
            //uid = _UserBehaviourObject.uid();
            if (Object.keys(user_config).length !== Object.keys(defaults).length) {
                console.log("no config provided. using default..");
                user_config = defaults;
            }
            // TIME SET
            if (user_config.timeCount !== undefined && user_config.timeCount) {
                results.time.startTime = this.getTimeStamp();
                start_time = results.time.startTime;
            }
            // MOUSE MOVEMENTS
            if (user_config.mouseMovement) {
                mem.eventListeners.mouseMovement = window.addEventListener("mousemove", mem.eventsFunctions.mouseMovement);
                mem.mouseInterval = setInterval(() => {
                    if (mem.mousePosition && mem.mousePosition.length) { //if data has been captured
                        if (!results.mouseMovements.length || ((mem.mousePosition[0] !== results.mouseMovements[results.mouseMovements.length - 1][0]) && (mem.mousePosition[1] !== results.mouseMovements[results.mouseMovements.length - 1][1]))) {
                            results.mouseMovements.push(mem.mousePosition)
                        }
                    }
                }, defaults.mouseMovementInterval * 1000);
            }
            //CLICKS
            if (user_config.clicks) {
                mem.eventListeners.click = window.addEventListener("click", mem.eventsFunctions.click);
            }
            //SCROLL
            if (user_config.mouseScroll) {
                mem.eventListeners.scroll = window.addEventListener("scroll", mem.eventsFunctions.scroll);
            }
            //PROCESS INTERVAL
            if (user_config.processTime !== false) {
                mem.processInterval = setInterval(() => {
                    user_config.processData(this.result());
                    if (user_config.clearAfterProcess) {
                        _UserBehaviourObject.resetResults();
                    }
                }, user_config.processTime * 1000)
            }
        };
        /*_UserBehaviourObject.processResults = function() {
            user_config.processData(result());
            if (user_config.clearAfterProcess) {
                _UserBehaviourObject.resetResults();
            }
        }*/
        _UserBehaviourObject.stop = function() {
            if (user_config.processTime !== false) {
                clearInterval(mem.processInterval);
            }
            clearInterval(mem.mouseInterval);
            window.removeEventListener("scroll", mem.eventsFunctions.scroll);
            window.removeEventListener("click", mem.eventsFunctions.click);
            window.removeEventListener("mousemove", mem.eventsFunctions.mouseMovement);
        }
        _UserBehaviourObject.result = function() {
            if (user_config.userInfo === false && userBehaviour.showResult().userInfo !== undefined) {
                delete userBehaviour.showResult().userInfo;
            }
            if (user_config.timeCount !== undefined && user_config.timeCount) {
                results.time.currentTime = this.getTimeStamp();
            }
            return results
        };
        _UserBehaviourObject.showConfig = function() {
            if (Object.keys(user_config).length !== Object.keys(defaults).length) {
                return defaults;
            } else {
                return user_config;
            }
        };
        return _UserBehaviourObject;
    }
    //---------------------------------------------------------------
    if (typeof(window.SuperBuzzSDK) === 'undefined') {
        window.SuperBuzzSDK = SuperBuzzSDK();
        //console.log(window.SuperBuzzSDK.getAppId());
        //window.SuperBuzzUB = SuperBuzzUB(window.SuperBuzzSDK.getAppId());
        //window.SuperBuzzUB.start();
    }
    /*if(typeof(window.SuperBuzzUB) === 'undefined'){
        window.SuperBuzzUB = SuperBuzzUB();
        window.SuperBuzzUB.start();
    }*/
})(window);
