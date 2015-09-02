/*
*
*	code by harryt2996
*   date: 3/9/2015
*	There's no copyright so you can take this code and claim it as your own if you want, I dont mind
*
*/
var machine = {};

machine.rotor1 = 
[[0,0],[1,2],[2,4],[3,6],[4,8],[5,10],[6,12],
[7,3],[8,16],[9,18],[10,20],[11,24],
[12,22],[13,26],[14,14],[15,25],[16,5],
[17,9],[18,23],[19,7],[20,1],[21,11],
[22,13],[23,21],[24,19],[25,17],[26,15]];
machine.rotor2 = 
[[0,0],[1,1],[2,10],[3,4],[4,11],[5,19],[6,9],
[7,18],[8,21],[9,24],[10,2],[11,12],
[12,8],[13,23],[14,20],[15,13],[16,3],
[17,17],[18,7],[19,26],[20,14],[21,16],
[22,25],[23,6],[24,22],[25,15],[26,5]];
machine.rotor3 = 
[[0,0],[1,5],[2,11],[3,13],[4,6],[5,12],[6,7],
[7,4],[8,17],[9,22],[10,26],[11,14],
[12,20],[13,15],[14,23],[15,25],[16,8],
[17,24],[18,21],[19,19],[20,16],[21,1],
[22,9],[23,2],[24,18],[25,3],[26,10]];
machine.reflector = 
[[0,0],[1,25],[2,18],[3,21],[4,8],[5,17],[6,19],
[7,12],[8,4],[9,16],[10,24],[11,14],
[12,7],[13,15],[14,11],[15,13],[16,9],
[17,5],[18,2],[19,6],[20,26],[21,3],
[22,23],[23,22],[24,10],[25,1],[26,20]];
/*
*machine.pair_settings = 
*[0,[1],[2],[3],[4],[5],[6],
*[7],[8],[9],[10],[11],
*[12],[13],[14],[15],[16],
*[17],[18],[19],[20],[21],
*[22],[23],[24],[25],[26]];
*/
machine.rotor1_set = Math.floor(Math.random() * (25 + 1));
machine.rotor2_set = Math.floor(Math.random() * (25 + 1));
machine.rotor3_set = Math.floor(Math.random() * (25 + 1));

var input_str = new String();
var alpha =[' ','A','B','C','D','E','F','G','H','I','J','K','L',
			'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var decimal = ['0','1','2','3','4','5','6','7','8','9'];
var inp_num;
var output_str = new String();
var mainlog = document.getElementById("mainlog");

function finddecimal(chr){
	for(var i=0; i<10; i++){
		if(chr == decimal[i]){  return i  };
	}
}

function number(inp){
	for(var i=1; i<27; i++){
		if(inp == alpha[i]){	return i;	}
	}
	return 0;
}

function trans(inp, num){
	var rotor_set;
	switch(num){
		case 1: rotor_set = machine.rotor1_set; break;
		case 2: rotor_set = machine.rotor2_set; break;
		case 3: rotor_set = machine.rotor3_set; break;
	}
	inp = inp + rotor_set;
	if(inp > 26){
		return (inp-26);
	}
	return inp;
}

function detrans(inp, num){
	var rotor_set;
	switch(num){
		case 1: rotor_set = machine.rotor1_set; break;
		case 2: rotor_set = machine.rotor2_set; break;
		case 3: rotor_set = machine.rotor3_set; break;
	}
	inp = inp - rotor_set;
	if(inp < 1){
		return(inp+26);
	}
	return inp;
}

function returnrun(inp, num){
	var rotor;
	switch(num){
		case 1: rotor = machine.rotor1; break;
		case 2: rotor = machine.rotor2; break;
		case 3: rotor = machine.rotor3; break;
	}
	for(var i=1; i<27; i++){
		if(rotor[i][1] == inp){
			return rotor[i][0];
		}
	}
}

function encrypt(){
	var input = input_str;
	output_str = new String();
	var numstr = new Array(); 
	for(var i =0; i<input.length; i++){

		var inp_char = input[i];
		inp_num = number(inp_char);
		if(inp_num === 0){ 
			numstr[i] = 0;
		}else{
			//run through pairing settings//
			//inp_num = machine.pair_settings[inp_num][1];
			//run through transfer1//
			inp_num = trans(inp_num,1);
			inp_num = machine.rotor1[inp_num][1];
			inp_num = detrans(inp_num,1);
			//run through transfer2//
			inp_num = trans(inp_num,2);
			inp_num = machine.rotor2[inp_num][1];
			inp_num = detrans(inp_num,2);
			//run through transfer3//
			inp_num = trans(inp_num,3);
			inp_num = machine.rotor3[inp_num][1];
			inp_num = detrans(inp_num,3);
			//reflector//
			inp_num = machine.reflector[inp_num][1];
			//return through transfer3//
			inp_num = trans(inp_num, 3);
			inp_num = returnrun(inp_num, 3);
			inp_num = detrans(inp_num, 3);
			//return through transfer2//
			inp_num = trans(inp_num, 2);
			inp_num = returnrun(inp_num, 2);
			inp_num = detrans(inp_num, 2);
			//return through transfer1//
			inp_num = trans(inp_num, 1);
			inp_num = returnrun(inp_num, 1);
			inp_num = detrans(inp_num, 1);
			//return through pairing settings// 

			numstr[i] = inp_num;	 

			machine.rotor1_set++;
			if(machine.rotor1_set > 25){
				machine.rotor1_set = 0;
				machine.rotor2_set++;
			};
			if (machine.rotor2_set > 25){
				machine.rotor2_set = 0;
				machine.rotor3_set++;
			};
		};
		output_str += alpha[numstr[i]];
	};
}

function print_settings(){
	mainlog.innerHTML = mainlog.innerHTML + "[" + machine.rotor1_set + " " + machine.rotor2_set + " " + 
	                    machine.rotor3_set + "]";
}

function enter(){
	var input_txt = document.getElementById("input").value;
	if(input_txt[0] == '[' && input_txt[input_txt.length-1] == ']'){
		if(input_txt[1] == "c"){
			mainlog.innerHTML += "<br>current rotor settings: ";
			print_settings();
		} else {
			var digits = [0,0,0], temp=0;
			for(var i=1; i<9; i++){
				if(input_txt[i] == ' ' || input_txt[i] == ']'){ temp++; }
				else{ digits[temp]++; }
			}
			
			if(digits[0] == 1){
				machine.rotor1_set = finddecimal(input_txt[digits[0]]);
			}else{
				machine.rotor1_set = finddecimal(input_txt[digits[0]-1])*10 + finddecimal(input_txt[digits[0]]);
			}

			if(digits[1] == 1){
				machine.rotor2_set = finddecimal(input_txt[digits[0] + 1 + 1]);
			}else{
				machine.rotor2_set = finddecimal(input_txt[digits[0] + 1 + 2 - 1])*10 + finddecimal(input_txt[digits[0] + 1 + 2]);
			}

			if(digits[2] == 1){
				machine.rotor3_set = finddecimal(input_txt[digits[0] + 1 + digits[1] + 1 + 1]);
			}else{
				machine.rotor3_set = finddecimal(input_txt[digits[0] + 1 + digits[1] + 2])*10 + finddecimal(input_txt[digits[0] + digits[1] + 4]);
			}
			mainlog.innerHTML += "<br>new rotor settings: ";
			print_settings();
			mainlog.innerHTML += "<br>";
		}
	} else {
		input_str = input_txt;
		input_str = input_str.toUpperCase();
		mainlog.innerHTML = mainlog.innerHTML + "<br> pre settings: ";
		print_settings();
		mainlog.innerHTML = mainlog.innerHTML + "<br> input text :" + input_str;
		encrypt();
		mainlog.innerHTML = mainlog.innerHTML +  "<br> output text:" + output_str + "<br>"; 
		mainlog.innerHTML += "post settings: ";
		print_settings();
		mainlog.innerHTML += "<br>";
	}
	document.getElementById("input").value = "";
}

function initialize(){
	console.log("initialized");
	mainlog.innerHTML = "*note: to change rotor settings, type '[x y z]' where x,y and z are the desired rotor settings of rotor 1, 2 and 3. Rotor settings run between 0 and 25<br>";
	mainlog.innerHTML += "<br> current rotor settings: ";
	print_settings();
	mainlog.innerHTML += "<br>";
}

initialize()