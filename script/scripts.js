// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC5VjLGd235Czyfh2pXakpFf40ZtcujjQ4",
    authDomain: "chat-lab1.firebaseapp.com",
    databaseURL: "https://chat-lab1.firebaseio.com",
    projectId: "chat-lab1",
    storageBucket: "",
    messagingSenderId: "357562063620"
  };
  firebase.initializeApp(config);

  const db = firebase.database();



window.addEventListener('load', function(event) {

	var titleHeader = document.getElementById('titleHeader');
	var formTitle = document.getElementById('formTitle');
	var chatName = document.getElementById('chatName');
	var dot = document.getElementById('dot');
	var online = document.getElementById('online');
	var currentUser = "";
	var msgWrap = document.getElementById('msgWrap');
	var allMessages = [];

	//checks if localStorage has username saved
	if(!localStorage.getItem('username')) {
	  console.log('First time user');

	  //Checks availability of local storage
			if (storageAvailable('localStorage')) {
			  console.log('Local storage is available');
				  
				localStorage.setItem('username', 'unknown');
				let username = localStorage.getItem('username');
	  			formTitle.innerHTML = 'Enter your name here';
	  			chatName.innerHTML = username;
	  			currentUser = username;
	  			dot.innerHTML = '.';
	  			online.innerHTML = 'online';				     
			}
			else {
			  console.log('Local storage is not available');
			}//end of if localS available

	} else {
	  let username = localStorage.getItem('username');
	  titleHeader.innerHTML = 'Welcome back, ' + username + '!';
	  formTitle.innerHTML = 'Change your name here';
	  chatName.innerHTML = username;
	  currentUser = username;
	  dot.innerHTML = '.';
	  online.innerHTML = 'online';
	}

//Save button functionality
	 var btnSave = document.getElementById('btnSave');
	 btnSave.addEventListener('click', function(event) {
	 	var name = document.getElementById('name').value;
	 	document.getElementById('name').value = "";

	 	if (name === "") {
	 		formTitle.style.color = '#DD2C00';
	 		formTitle.style.fontWeight = 'normal';
		} else {
		
			titleHeader.innerHTML = 'Welcome, ' + name + '!';
			chatName.innerHTML = name;
			dot.innerHTML = '.';
	  		online.innerHTML = 'online';
	  		currentUser = name;

			//Checks availability of local storage
			if (storageAvailable('localStorage')) {
			  console.log('Local storage is available');
				  
				localStorage.setItem('username', name);
				console.log('username: ' + localStorage.getItem('username') + ' saved');
				     
			}
			else {
			  console.log('Local storage is not available');
			}//end of if localS available
		
  		} //end of else
	 }) //end of btnSave eventlistener


	 //retrieving DB and publishing on the chat window
	db.ref('messages/').on('value', function(snapshot) {
		let data = snapshot.val();
		console.log(data);
		for(let child in data){
			let r = data[child];
			//console.log('Child: ' + r.name);
			//console.log('Child: ' + r.msgTime);
			//console.log('Child: ' + r.msgDate);
			//console.log('Child: ' + r.message);

			//Adding messages into array
			allMessages.push(r);

		}

		//clearing all children from div msgWrap
		while (msgWrap.firstChild) {
    		msgWrap.removeChild(msgWrap.firstChild);
		}

			
		
		//Publishing messages into chat window
		var nr = 1;
		for (var i = 0; i < allMessages.length; i++) {
			var lastMsg = allMessages[allMessages.length - nr];
			nr = nr + 1;
		

			const newDiv = document.createElement('div');
			newDiv.classList.add("divMsg");

			//Adding child into chat window
			//username of the message
			const nameP = document.createElement('p');
			nameP.classList.add("nameMsg");
			nameP.innerHTML = lastMsg.name;
			newDiv.appendChild(nameP);
			
			//Time of the message
			const timeP = document.createElement('p');
			timeP.classList.add("time");

			timeP.innerHTML = lastMsg.msgDate + ' / ' + lastMsg.msgTime;
			newDiv.appendChild(timeP);

			//Message content
			const msgP = document.createElement('p');
			msgP.classList.add("pMsg");

			msgP.innerHTML = lastMsg.message;
			newDiv.appendChild(msgP);

			//hr line
			const msgHr = document.createElement('hr');
			msgHr.classList.add("hrMsg");
			newDiv.appendChild(msgHr);

			msgWrap.appendChild(newDiv);
		}


	})//end of function publish from DB



	 //Send button functionality
	 var btnSend = document.getElementById('btnSend');

	 btnSend.addEventListener('click', function(event) {
	 	var inputMsg = document.getElementById('inputMsg').value;
	 	document.getElementById('inputMsg').value = "";
	 	if (inputMsg === "") {
	 		console.log('No message to send');
	 		document.getElementById('inputMsg').placeholder='Please write a message to send...';
		} else {
			console.log(inputMsg);
			var currentDate = new Date();

			//get the day
			var dayNr = currentDate.getDate();
			var day = "";
			if (dayNr <= 9){
				day = '0' + dayNr;
			} else if (dayNr > 9) {
				day = dayNr;
			}
			//console.log('Day: ' + day);

			//get the month
			var monthNr = currentDate.getMonth() + 1;
			var month = "";
			switch (monthNr) {
			    case 1:
			    	month = 'january';
			    	break;
			    case 2:
			    	month = 'february';
			    	break;
			    case 3:
			    	month = 'march';
			    	break;
			    case 4:
			    	month = 'april';
			    	break;
			    case 5:
			        month = 'may';
			        break; 
			    case 6:
			    	month = 'june';
			    	break;
			    case 7:
			    	month = 'july';
			    	break;
			    case 8:
			    	month = 'august';
			    	break;
			    case 9:
			    	month = 'september';
			    	break;
			    case 10:
			    	month = 'october';
			    	break;
			    case 11:
			    	month = 'november';
			    	break;
			    case 12:
			    	month = 'december';
			    	break;
			    default: 
			        month = "unknowm";
			}//end of switch

			//get the year
			var year = currentDate.getFullYear();
			//console.log('Year: ' + year);

			//get the time
			var hour = currentDate.getHours();
			//console.log('Hour: ' + hour);

			//get minutes
			var minutes = currentDate.getMinutes();
			//console.log('Minutes: ' + minutes);

			var fullDate = day + ' ' + month + ' ' + year;
			console.log(fullDate);
			var time = hour + ':' + minutes;
			console.log(time);

			insertMsg(inputMsg, fullDate, time); //adds msg into DB

		}//end of esle

	 }); //end of save

	 //inserts message into database

	function insertMsg(msg, date, time) {
		console.log('Message: ' + msg);
		console.log('Date: ' + date);
		console.log('Time: ' + time);
	//creating message object
	const newMsg = {
		name: currentUser,
		message: msg,
		msgDate: date,
		msgTime: time 
	}
	console.log(newMsg);

	//Adding message into the DB
	db.ref('messages/').push(newMsg);


	}

//Sign out button functionality
	 var btnSignOut = document.getElementById('btnSignOut');
	 btnSignOut.addEventListener('click', function(event) {
	 	
	 	titleHeader.innerHTML = 'Welcome to the realtime chat service!';
		chatName.innerHTML = 'unknown';
		currentUser = 'unknown';

			//Checks availability of local storage
			if (storageAvailable('localStorage')) {
				  
				localStorage.setItem('username', 'unknown'); 
			}
			else {
			  console.log('Local storage is not available');
			}//end of if localS availa
	 }) //end of btnSignOut eventlistener

}); //windows.load

//Checks if local storage is available
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}






	

