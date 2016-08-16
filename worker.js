var header = "";
var body = "";
var boxLength = 0;
var fontSize = 0;
var wsReplace = " ";
var fontType = "Courier"

var dateInput = 
[
	"lam bui \ndep trai", //Monday
	"lam buiasdfjkalsdjhfkajhdsfljahskdjfhlkajdhsf", //Tuesday
	"lam bui", //Wednesday
	"lam bui", //Thursday
	"lam bui", //Friday
	"lam bui", //Saturday
	"lam bui"  //Sunday
];

var globalIndex = [0, 0, 0, 0, 0, 0, 0];

function getFontSize()
{
	fontSize = document.getElementById("fontSize").value;

	//minimum fontSize is 5
	if(fontSize < 5)
		fontSize = 5;
}

function getFont()
{
	fontType = document.getElementById("fontType").value;
}

function changeFont()
{
	getFont();
	document.getElementById("output").style.fontFamily = fontType;
}

function getBoxLength()
{
	boxLength = document.getElementById("boxLength").value;

	//minimum boxLength is 10
	if(boxLength < 10)
		boxLength = 10;
}

function getWhitespaceReplacement()
{
	wsReplace = document.getElementById("wsReplace").value;
}

function getSetting()
{
	getFont();
	getFontSize();
	getBoxLength();
	getWhitespaceReplacement();
}

function generateHeader()
{
	/*create the date header like so:
		+---------+---------+---------+---------+---------+---------+---------+
		|Monday   |Tuesday  |Wednesday|Thursday |Friday   |Saturday |Sunday   |
		+---------+---------+---------+---------+---------+---------+---------+
	*/

	header = "";

	//create header
	for(k = 0; k < 3; k++) //create 3 lines of header with this loop, each k represent a line
	{
		for(j = 0; j < 7; j++) //each j represent a day of the week
		{
			var remainingChar = boxLength;
			switch(k)
			{
				case 0:
				case 2: //if it is first and third line then draw +--------+
					header += "+";
					for(i = 0; i < boxLength; i++)
						header += "-";
					if(j == 6)
						header += "+";
					break;

				case 1: //if it is second line then write the day
					header += "|";
					switch(j)
					{
						case 0: header += "Monday"; 	remainingChar = boxLength - 6; break;
						case 1: header += "Tuesday"; 	remainingChar = boxLength - 7; break;
						case 2: header += "Wednesday"; 	remainingChar = boxLength - 9; break;
						case 3: header += "Thursday"; 	remainingChar = boxLength - 8; break;
						case 4: header += "Friday"; 	remainingChar = boxLength - 6; break;
						case 5: header += "Saturday"; 	remainingChar = boxLength - 8; break;
						case 6: header += "Sunday"; 	remainingChar = boxLength - 6; break;
					}
					for(i = 0; i < remainingChar; i++)
						header += wsReplace;
					if(j == 6)
						header += "|";
					break;
			}
		}
		header += "\n"; //endline ofc
	}

	console.log(header);
}

function getInput()
{
	var inputFields = document.getElementsByClassName("inputField");
	for(i = 0; i < 7; i++)
	{
		dateInput[i] = inputFields[i].value;
	}

}

function getMaxHeight() //this also format the dateInput info to fit into box size and make it look nice 
{
	var max = 0;
	for(var i = 0; i < 7; i++)
	{
		var remainingChar = boxLength;
		var parsedContent = "";
		var aWord = "";
		var heightCounter = 0;
		if(dateInput[i].length == 0) //skip if empty
			continue;

		heightCounter = 1;
		for(var j = 0; j < dateInput[i].length; j++)
		{
			//first line
			if(j == 0)
			{
				parsedContent += "> ";
				remainingChar -= 2;
			}

			if((dateInput[i][j] != " " && dateInput[i][j] != "\n" && dateInput[i][j] != "	") && j < dateInput[i].length-1)
			{
				aWord += dateInput[i][j];
			}
			else
			{
				//if last char is a normal char
				if(j == dateInput[i].length-1)
					aWord += dateInput[i][j];

				//if aWord is longer than max length of box
				if(aWord.length > boxLength)
				{
					parsedContent += "\n";
					heightCounter += 1;
					remainingChar = boxLength;

					var index = 0;
					while(index < aWord.length)
					{
						parsedContent += aWord[index];
						remainingChar -= 1;
						if(remainingChar == 1)
						{
							parsedContent += "-\n";
							heightCounter += 1;
							remainingChar = boxLength;
						}
						index += 1;
					}
					aWord = "";
				}
				else //if not then do all these below
				{
					if(remainingChar > aWord.length)
					{
						parsedContent += aWord;
						remainingChar -= aWord.length;
					}
					else
					{
						parsedContent += "\n";
						heightCounter += 1;
						parsedContent += aWord;
						remainingChar = boxLength - aWord.length;
					}
				}

				//reset
				aWord = "";

				//then decide what to do depending on the current dateInput[i][j]
				switch(dateInput[i][j])
				{
					case "\n":
						parsedContent += "\n> ";
						heightCounter += 1;
						remainingChar = boxLength-2;
						break;

					case " ":
					case "	": //nullify the use of tab char by converting it into whitespace
						if(remainingChar > 0)
						{
							parsedContent += wsReplace;
							remainingChar -= 1;
						}
						else //if not then add linebreak
						{
							parsedContent += "\n";
							heightCounter += 1;
							remainingChar = boxLength;
						}
						break;
				}
			}
		}

		//getting rid of trailing linebreak, also have to decrease heightCounter by 1
		if(parsedContent[parsedContent.length-1] == "\n")
		{
			parsedContent = parsedContent.substring(0, parsedContent.length-1);
			heightCounter -= 1;
		}

		if(heightCounter > max)
			max = heightCounter;

		dateInput[i] = parsedContent;
	}
	return max;
}

function addWhitespace(remainingLength)
{
	var whiteString = "";
	var i = 0;
	while(i < remainingLength)
	{
		whiteString += wsReplace;
		i++;
	}
	return whiteString;
}

function resetGlobalIndex()
{
	for(var i = 0; i < 7; i++)
	{
		globalIndex[i] = 0;
	}
}

function displayInput(maxHeight)
{
	body = "";
	resetGlobalIndex();

	for(j = 0; j < maxHeight; j++)
	{
		for(i = 0; i < 7; i++)
		{
			body += "|";
			var remainingChar = boxLength;

			while(dateInput[i][globalIndex[i]] != "\n" && globalIndex[i] < dateInput[i].length)
			{
				body += dateInput[i][globalIndex[i]];
				remainingChar -= 1;
				globalIndex[i] += 1;
			}
			globalIndex[i] += 1;

			body += addWhitespace(remainingChar);

			if(i == 6)
				body += "|";
		}
		body += "\n";
	}

	//create +--------+ at the end to finish off the box
	for(j = 0; j < 7; j++)
	{
		body += "+";
		for(i = 0; i < boxLength; i++)
			body += "-";
		if(j == 6)
			body += "+";
	}
	console.log(body);
}

function execute()
{
	getSetting();
	generateHeader();
	getInput();
	displayInput(getMaxHeight());

	document.getElementsByClassName("outputField")[0].value = header + body;
	document.getElementById("output").style.fontSize = fontSize+"px";
	document.getElementById("output").style.fontFamily = fontType;
}