var courses = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/courses"; 


	let currentTab = "";
	
	
	function showTabA() {
		if (currentTab != "TabA") {
			currentTab = "TabA";
			showNoTabs();
			document.getElementById("TabA").style.backgroundColor = "lightBlue";
			document.getElementById("SectionA").style.display = "inline";
		}
		
	}


	

	function showNoTabs() {
		document.getElementById("TabA").style.backgroundColor = "transparent";
		document.getElementById("TabB").style.backgroundColor = "transparent";
		document.getElementById("TabC").style.backgroundColor = "transparent";
		document.getElementById("TabD").style.backgroundColor = "transparent";
		document.getElementById("TabE").style.backgroundColor = "transparent";
		document.getElementById("TabF").style.backgroundColor = "transparent";

		document.getElementById("SectionA").style.display = "none";
		document.getElementById("SectionB").style.display = "none";
		document.getElementById("SectionC").style.display = "none";
		document.getElementById("showTab").style.display = "none";
		document.getElementById("SectionD").style.display = "none";
		document.getElementById("SectionE").style.display = "none";
		document.getElementById("SectionF").style.display = "none";
	}

	


	



	
	
	function showTabB() {
		if (currentTab != "TabB") {
			currentTab = "TabB";
			showNoTabs();
			document.getElementById("TabB").style.backgroundColor = "lightBlue";
			document.getElementById("SectionB").style.display = "inline";
		}
		const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/courses";
		const xhr = new XMLHttpRequest();
		xhr.open("GET", uri, false);
		xhr.onload = () => {
			const resp = JSON.parse(xhr.responseText);
			showCourse(resp.data);
		}
		xhr.send(null);
		document.getElementById("SectionB").style.display = "inline";
		
	}
	
	function Gettimetable(id) {
		
		
		
		
		const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/course?c="+id;
		const xhr = new XMLHttpRequest();
		xhr.open("GET", uri, false);
		xhr.onload = () => {
			const resp = JSON.parse(xhr.responseText);
			showTimetable(resp.data);
		}
		xhr.send(null);
		 
			
	}
	function showTimetable(destinations){
	
		if (document.getElementById(destinations[0].catalogNbr.trim()).innerHTML !="") {document.getElementById(destinations[0].catalogNbr.trim()).innerHTML =""}
		else{
		const addRecord = (record) => {
			var type = record.component;
			var all = record.meetingPatterns;
			var id = record.catalogNbr.trim();
			
			var length = all.length;
			var str = "";
			
			str +="<h3>"+type+"</h3> ";
				
			for (var i =0; i <length; i++){
				str += all[i].startDate+" <br>";
				str += all[i].daysOfWeek.toUpperCase()+" ";
				str += all[i].startTime+" "+"- ";
				str += all[i].endTime+"<br>";
				str +="Location: ";
				str += all[i].location+"<br><br>";
				
				
				document.getElementById(id).innerHTML+=str;
				str = "";
				
				
				

			}

		}
		destinations.forEach(addRecord)
		}
		
	}
		
	function showCourse(destinations) {
		let tableContent = "<tr class='orderTitle'><td>Course Name</td><td>Description</td></tr>\n";
		let odd = true;
		destinations.sort((a,b) => (Number(a.level) - Number(b.level) || (Number(a.catalogNbr) - Number(b.catalogNbr))));
		const addRecord = (record) => {
		var pre = record.rqrmntDescr;
		var extn = (pre == undefined?"No Prerequisite":pre);
		var desc = record.description
		var f_desc = (desc == undefined?"No Description":desc);
		var id = record.catalogNbr;
		var button = "<button onclick='Gettimetable(\""+id+"\")'>Timetable</button>";
		 
		
			tableContent += odd ? "<tr class='orderOdd'>" : "<tr class='orderEven'>";
			odd = !odd;
			tableContent += "<td>" + record.subject + " "+record.catalogNbr+  "</td><td>" + f_desc + "<br>"+ "<i>" + extn +"</i>"+"<br>"+record.unitsAcadProg+" points"+"<br>"+button+"<div id = '"+id+"'>" + "</div>" +"</td></tr>\n";
		}
		destinations.forEach(addRecord)
		document.getElementById("showTab").innerHTML = tableContent;
		document.getElementById("showTab").style.display = "block";
	}
	
function showTabC () {
	
	if (currentTab != "TabC") {
		currentTab = "TabC";
		showNoTabs();
		document.getElementById("TabC").style.backgroundColor = "lightBlue";
		document.getElementById("SectionC").style.display = "inline";
	}
	const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/people";
	const xhr = new XMLHttpRequest();
	xhr.open("GET", uri, false);
	xhr.onload = () => {
		const resp = JSON.parse(xhr.responseText);
		showPeople(resp.list);
	}
	xhr.send(null);
	document.getElementById("SectionC").style.display = "inline";
	
}



function showPeople(destinations) {
	
		let tableContent = "<tr class='orderTitle'><td>Name</td><td>Contact Information</td></tr>\n";
		let odd = true;
		const addRecord = (record) => {
			var img = record.imageId;
			var name = record.profileUrl[1];
			var title = record.title;
			var f_extn = record.extn;
			var id = (img == undefined?"<img src = http://redsox.uoa.auckland.ac.nz/ups/logo-192x192.png>":"<img src = https://unidirectory.auckland.ac.nz/people/imageraw/"+name+"/"+img+"/small>");
			var final_t = (title == undefined?"":title);
			var extn = (f_extn == undefined?"":f_extn)
			
			var upi = record.profileUrl[1];
			
			var vcard = "<a href ="+ "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/vcard?u="+upi+">"+"&#128100;"+"</a>"
			
			tableContent += odd ? "<tr class='orderOdd'>" : "<tr class='orderEven'>";
			odd = !odd;
			tableContent += "<td>" + final_t + " "+record.firstname+" "+ record.lastname+ "<br>"+ "<a href=mailto:"+record.emailAddresses[0]+">"+"&#128231;"+ "</a>"+" "+"<a href=tel:+64-9-373-7999;ext="+extn+">"+"&#128222;"+"</a>"+" "+ vcard+"<br>"+"</td> <td>"+ id+"</td></tr>\n";
			
			
			const addRecord = (record) =>{
				tableContent += odd ? "<tr class='orderOdd'>" : "<tr class='orderEven'>";
				odd = !odd;
				tableContent += "<td>" + record.phoneNumbers + "</td></tr>\n";
				
			}
			
		}
		destinations.forEach(addRecord)
		document.getElementById("showTab").innerHTML = tableContent;
		document.getElementById("showTab").style.display = "block";
	}

	function showTabD () {
		
		if (currentTab != "TabD") {
			currentTab = "TabD";
			showNoTabs();
			document.getElementById("TabD").style.backgroundColor = "lightBlue";
			document.getElementById("SectionD").style.display = "inline";
		}
		
		const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/news";
		const xhr = new XMLHttpRequest();
		xhr.open("GET", uri, false);
		xhr.setRequestHeader("accept", "application/JSON");
		xhr.onload = () => {
			const resp = JSON.parse(xhr.responseText);
			showNews(resp);
		}
		xhr.send(null);
		document.getElementById("SectionD").style.display = "inline";
		
	
	}
	
	function showNews(destinations) {
			let tableContent = "<tr class='orderTitle'><td>News</td></tr>\n";
			let odd = true;
			const addRecord = (record) => {
				
				tableContent += odd ? "<tr class='orderOdd'>" : "<tr class='orderEven'>";
				odd = !odd;
				tableContent += "<td>" + "<a href ="+record.linkField+">"+record.titleField+"</a>" + "<br><br>"+ " "+record.descriptionField+ "<br>"+record.pubDateField+ "</td><td></tr>\n";
			}
			destinations.forEach(addRecord)
			document.getElementById("showTab").innerHTML = tableContent;
			document.getElementById("showTab").style.display = "block";
		}
	
	
		
		function showTabE () {
				
				if (currentTab != "TabE") {
					currentTab = "TabE";
					showNoTabs();
					document.getElementById("TabE").style.backgroundColor = "lightBlue";
					document.getElementById("SectionE").style.display = "inline";
				}
				const uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/notices";
				const xhr = new XMLHttpRequest();
				xhr.open("GET", uri, false);
				xhr.setRequestHeader("accept", "application/JSON");
				xhr.onload = () => {
					const resp = JSON.parse(xhr.responseText);
					showNotices(resp);
				}
				xhr.send(null);
				document.getElementById("SectionE").style.display = "inline";

			}
			
			function showNotices(destinations) {
						let tableContent = "<tr class='orderTitle'><td>Notices</td></tr>\n";
						let odd = true;
						const addRecord = (record) => {
							
							tableContent += odd ? "<tr class='orderOdd'>" : "<tr class='orderEven'>";
							odd = !odd;
							tableContent += "<td>" + "<a href ="+record.linkField+">"+record.titleField+"</a>" + "<br><br>"+ " "+record.descriptionField+ "<br>"+record.pubDateField+ "</td></tr>\n";
						}
						destinations.forEach(addRecord)
						document.getElementById("showTab").innerHTML = tableContent;
						document.getElementById("showTab").style.display = "block";
					}	
			
		function showTabF () {
				
				if (currentTab != "TabF") {
					currentTab = "TabF";
					postComment();
					showNoTabs();
					document.getElementById("TabF").style.backgroundColor = "lightBlue";
					document.getElementById("SectionF").style.display = "inline";
									
				}
			}	
		
		
		function postComment(){
			var comment = document.getElementById("box").value;
			var name_for_uri = document.getElementById("name").value;
			var j_comment = JSON.stringify(comment);
			var uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/comment?name=" + name_for_uri
			var xhr = new XMLHttpRequest();
			xhr.open("POST", uri, true);
			xhr.setRequestHeader("Content-Type", "application/JSON;charset=UTF-8");
			xhr.send(j_comment);
			xhr.onload = function(){
				
			 document.getElementById("Iframe").src="http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/htmlcomments";
			
			
			}
			
			
		}
		
		
		
	
				

window.onload = function () {
	showTabA();
}
