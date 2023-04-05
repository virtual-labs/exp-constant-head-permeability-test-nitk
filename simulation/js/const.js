//Variables declaration
let myInt; let calcTrack=0;
let simsubscreennum=0, temp=0;
const mouldDia=10, mouldHeight=12.7, constHead=67.5;

const nextButton=document.querySelector(".nextButton");
// const pointerArrow=document.querySelector(".arrow");
const tooltip=document.querySelector(".tooltip");
const variables=document.querySelector('.variables');
const varDescription=document.querySelector('.variables-description');

const dataset=[[240,19.5],
			   [240, 20.5],
			   [240,21],
			   [240,22]];

//Calculation
const mouldArea=Math.PI*(mouldDia/4)*10;
const mouldVolume=mouldArea*mouldHeight;
let totalOfQ=0, avgOfQ=0;//Average of volume of water collected in measuring jar
for(i=0;i<dataset.length;i++)
	totalOfQ+=dataset[i][1];
avgOfQ=totalOfQ/dataset.length;

const coefficient=(avgOfQ*mouldHeight)/(mouldArea*dataset[0][0]*constHead)*1000;

// Formative questions
var questions=["The filter paper is placed inside the permeameter so that soil particles do not clog the pores present in the porous stones.",
			   "The number of blows to be given for each soil layer is _____.",
			   "What is the constant head of water is</br> maintained for this experiment?"];
			   
var options2=[["True","False"],//True
			  ["6","7","5","3"],//5
			  ["65.7cm","67.5cm","65.5cm","67.8cm"]];//67.5cm

// font-size:14px; background-color:grey; color:white; padding:7.5px; border-radius:5px; :::: formativeQuestDiv
function validateFormativeQA(qn,ans,left,top)
{
	$(".answer").empty();
	document.querySelector(".a").innerHTML="";
	document.querySelector(".formativeQuestDiv").style="position:absolute; left:"+left+";top:"+top+"; visibility:visible;";
	document.querySelector(".q").innerHTML=questions[qn];
	el = document.createElement("option");
	el.textContent = " ";
	el.value = " ";
	document.querySelector(".answer").appendChild(el);
  
	for(j=0;j<options2[qn].length;j++)
	{
		opt = options2[qn][j];
		el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		document.querySelector(".answer").appendChild(el);
		$(".answer").change(function()
		{
			ca=$(this).children("option:selected").val();
			if(options2[qn][ans]==ca)
			{
				document.querySelector(".a").innerHTML="Correct Answer!";
			}
			else
			{
				document.querySelector(".a").innerHTML="Wrong! Answer is "+options2[qn][ans];
			}
			setTimeout(function()
			{
				document.querySelector(".formativeQuestDiv").style.visibility="hidden";
				document.querySelector(".nextButton").style.visibility="visible";
			},1500);
		});
	}
}

function create_totalTable(className, time) 
{
	let j=0;
    let table = document.querySelector(className);
    for(let i=dataset.length-1;i>=0;i--)
    {
		$(className).delay(time)
		.queue(function (create_totalTable) 
		{
			$(this).append("<tr><td style=\"border:1px solid black; padding:5px;\">" + (+j+1)  + "</td><td style=\"border:1px solid black; padding:5px;\">"+ dataset[j][0] +"</td><td style=\"border:1px solid black; padding:5px;\">"+ dataset[j][1]  +"</td></tr>");
			
			j++;
			// time=dataset[j][0]*60*1000;
			create_totalTable(time);
        });
	}
}

function commonStmtsInEvaluateCalculationAnswers(inputBoxClass, checkBtnClass, resultBtnClass, RgtWrngMarkClass)
{	
	document.querySelector(RgtWrngMarkClass).classList.remove("wrong-mark");
	document.querySelector(inputBoxClass).disabled=true;
	document.querySelector(inputBoxClass).style.color="black";
	document.querySelector(resultBtnClass).classList.add("hidden");
	document.querySelector(checkBtnClass).classList.add("hidden");
	if(simsubscreennum===1){
		if(calcTrack===1)
		{
			document.querySelector('.vol-table').style.visibility="visible";
			calcTrack=0;	
			evaluateCalculationAnswers('.vol', mouldVolume,'.check2', '.result2', '.mark2');
		}
		else if(calcTrack===0) displayNextButton();
	}
	if(simsubscreennum==11)
	{
		if(calcTrack===1)
		{
			document.querySelector('.coefficient-tab').style.visibility="visible";	
			evaluateCalculationAnswers('.coeff', coefficient,'.check4', '.result4', '.mark4');
		}
		else if(calcTrack===2){
			document.querySelector('.inference').style.visibility="visible";
		}
	}
}

function evaluateCalculationAnswers(inputBoxClass,rightAnswer,checkBtnClass,resultBtnClass,RgtWrngMarkClass)
{
	document.querySelector(resultBtnClass).disabled=true;
	document.querySelector(checkBtnClass).addEventListener("click",function(){
		
		if(document.querySelector(inputBoxClass).value && document.querySelector(inputBoxClass).value!==null && document.querySelector(inputBoxClass).value!=="" && document.querySelector(inputBoxClass).value!==" ")
		{
			if(+(document.querySelector(inputBoxClass).value) == rightAnswer.toFixed(2))
			{
				document.querySelector(RgtWrngMarkClass).classList.remove("hidden");
				document.querySelector(RgtWrngMarkClass).innerHTML="&#10004;";
				document.querySelector(RgtWrngMarkClass).classList.add("right-mark");
				commonStmtsInEvaluateCalculationAnswers(inputBoxClass, checkBtnClass, resultBtnClass, RgtWrngMarkClass);
				if((simsubscreennum==2  && calcTrack===1) || (simsubscreennum==11  && calcTrack===1)) calcTrack=2;
			}
			else 
			{
				// document.querySelector(RgtWrngMarkClass).classList.remove("hidden");
				document.querySelector(RgtWrngMarkClass).innerHTML="&#10008;";
				document.querySelector(RgtWrngMarkClass).classList.add("wrong-mark");
				document.querySelector(RgtWrngMarkClass).classList.remove("right-mark");
				document.querySelector(resultBtnClass).disabled=false;
			}
		}
		else {
			alert("Enter appropriate value to proceed.");
		}
	});
	document.querySelector(resultBtnClass).addEventListener("click",function()
	{
		document.querySelector(inputBoxClass).value=rightAnswer.toFixed(2);
		document.querySelector(RgtWrngMarkClass).classList.add("hidden");
		commonStmtsInEvaluateCalculationAnswers(inputBoxClass, checkBtnClass, resultBtnClass, RgtWrngMarkClass);
		if((simsubscreennum==2 && calcTrack===1) || (simsubscreennum==11 && calcTrack===1)) calcTrack=2;
	});
}

function placePorousStoneOnTop(){
	//Placing porous stone
	document.querySelector(".setup5-10").style.visibility="visible";
	blinkArrow("175","425",270,30);
	document.querySelector(".setup5-10").addEventListener("click",function(){
		myStopFunction();
		document.querySelector(".setup5-10").style.visibility="hidden";
		document.querySelector(".setup5-11").style.visibility="visible";
		document.querySelector(".setup5-11").style.animation="placePorousStone 1.15s forwards";
		setTimeout(function(){
			document.querySelector(".setup5-11").style.visibility="hidden";
			document.querySelector(".setup5-10").style="position: absolute; left: 459px; top: 303px; visibility:visible; height:19px;";
			setTimeout(function(){
				displayNextButton();
			},300);
		},1150);
	});
}

function placeFilterPaper(className1,className2)
{
	document.querySelector(className1).style.visibility="visible";
	blinkArrow("185","460",270,30);
	document.querySelector(className1).addEventListener("click",function()
	{
		myStopFunction();
		document.querySelector(className2).style.visibility="visible";
		document.querySelector(className2).style.animation="placeFilterPaper 1.25s forwards";
		setTimeout(function()
		{
			document.querySelector(className2).style.visibility="hidden";					
			document.querySelector(className1).style.visibility="hidden";				
			if(simsubscreennum===3)	displayNextButton();
			if(simsubscreennum===5) 
			{
				document.querySelector(".setup5-7").style.visibility="hidden";
				setTimeout(function(){
					placePorousStoneOnTop();
				},500);
			}
		},1350);
	});
}

function step8continued()
{
	document.querySelector(".setup8-9").style.visibility="visible";
	setTimeout(function(){
		document.querySelector(".setup8-8").style.visibility="visible";
		setTimeout(function()
		{
			// blinkArrow(342,331,180,30);
			document.getElementById('arrow1').style="visibility:visible; position:absolute; left:342px; top:331px; height:30px; z-index: 10; transform:rotate(180deg);";
			document.querySelector(".setup8-5b").addEventListener("click",function(){
				myStopFunction();
				document.querySelector(".setup8-5b").style.animation="openValve 0.5s reverse";
				setTimeout(function(){
					document.querySelector(".setup8-7").style.visibility="hidden";
					document.querySelector(".setup8-8").style.visibility="hidden";
					document.querySelector(".setup8-9").style.visibility="hidden";
					// blinkArrow(468,371,270,20);
					document.getElementById('arrow1').style="visibility:visible; position:absolute; left:468px; top:371px; height:20px; z-index: 10; transform:rotate(270deg);";
					document.querySelector(".setup8-4").addEventListener("click",function()
					{
						myStopFunction();
						document.querySelector(".setup8-4").style.visibility="hidden";
						// displayNextButton();
						document.querySelector(".nextButton").style.visibility="visible";
					});
				},500);
			});
		},500);
	},300);
}

function step9continued()
{
	document.querySelector(".setup9-6 ").style.visibility="visible";
	// blinkArrow(342,319,180,30);
	document.getElementById('arrow1').style="visibility:visible; position:absolute; left:342px; top:319px; height:30px; z-index: 10; transform:rotate(180deg);";
	document.querySelector(".setup9-5").addEventListener("click",function(){
		myStopFunction();
		document.querySelector(".setup9-5").style.animation="openValve 0.5s forwards";
		setTimeout(function(){
			document.querySelector(".setup9-4b").style.visibility="visible";
			
			setTimeout(function(){
				// displayNextButton();
				document.querySelector(".nextButton").style.visibility="visible";
			},500);
		},500);
	});
}

function displayNote(note="Fasten all the remaining bolts.",posLeft,posTop)
{
	setTimeout(function(){
		document.querySelector(".note").style="visibility:visible; position:absolute; left:"+posLeft+"px; top:"+posTop+"px;";
		document.querySelector(".note-text").innerHTML=note;
		document.querySelector(".note-btn").addEventListener("click",function(){
			document.querySelector(".note").style="visibility:hidden; "
			if(simsubscreennum===3)
			{
				document.querySelector(".setup3-11").style.visibility="visible";
				setTimeout(function()
				{
					placeFilterPaper(".setup3-12",".setup3-13");
				},500);
			}
			if(simsubscreennum===4)
			{
				displayNextButton();
			}
			if(simsubscreennum===6)
			{
				document.querySelector(".setup6-15").style.visibility="visible";
				document.querySelector(".setup6-16").style.visibility="visible";
				setTimeout(function()
				{
					// displayNextButton();
					validateFormativeQA(1,2,"100px","150px");
				},500);
			}
			if(simsubscreennum===7)
			{
				// blinkArrow(238,371,270,20);
				document.getElementById('arrow1').style="visibility:visible; position:absolute; left:238px; top:371px; height:20px; z-index: 10; transform:rotate(270deg);";
				document.querySelector(".setup7-6").addEventListener("click",function()
				{
					myStopFunction();
					document.querySelector(".setup7-6").style="height: 8px; position: absolute; left: 192px; top: 344px; width: 15px; background-color:#fff;";
					// displayNextButton();
					validateFormativeQA(0,0,"350px","150px");
				});
			}
			if(simsubscreennum==8)
			{
				step8continued();
			}
			if(simsubscreennum==9)
			{
				step9continued();
			}
		});
	},300);
}

function resetAnimation(){
	myStopFunction();
	clearInterval(myInt);
	document.querySelector(".setup4-11").style.animation="";
	document.querySelector(".setup4-12").style.animation="";
	document.querySelector(".setup4-13").style.animation="";
}

function pourSoilSampleAndTamp(cnt)
{
	document.querySelector(".setup4-11").style.visibility="visible";
	if(cnt===1) blinkArrow("100","390",290,30);
	if(cnt>=2) document.getElementById('arrow1').style="visibility:visible; position:absolute; left:100px; top:390px; height:30px; z-index: 10; transform:rotate(290deg)";
	document.querySelector(".setup4-11").addEventListener("click",function(){
		myStopFunction();
		document.querySelector(".setup4-11").style.animation="placeTrowel_1 0.5s forwards";
		setTimeout(function(){
			document.querySelector(".setup4-11").style.visibility="hidden";
			document.querySelector(".setup4-12").style.visibility="visible";
			if(cnt===1)
			{
				document.querySelector(".setup4-8").style.visibility="hidden";
			    document.querySelector(".setup4-9").style.visibility="visible";
			}
			if(cnt===2)
			{
				document.querySelector(".setup4-9").style.visibility="hidden";
			    document.querySelector(".setup4-10").style.visibility="visible";
			}
			if(cnt===3) document.querySelector(".setup4-10").style.visibility="hidden";
			    
			document.querySelector(".setup4-12").style.animation="placeTrowel_2 1s forwards";
			setTimeout(function(){
				document.querySelector(".setup4-12").style="position:absolute; left: 351px; top: 212px; visibility:visible;"
				document.querySelector(".setup4-12").style.transformOrigin="0 100%";
				document.querySelector(".setup4-12").style.animation="pourSoil 0.5s forwards";
				setTimeout(function(){
					if(cnt===3) document.querySelector(".setup4-14").style.visibility="visible";
					document.querySelector(".setup4-12").style="position: absolute; left: 48px; top: 409px; visibility:hidden;";
					document.querySelector(".setup4-13").style.visibility="visible";
					if(cnt===1)	blinkArrow("485","170",180,30);
					if(cnt>=2) document.getElementById('arrow1').style="visibility:visible; position:absolute; left:485px; top:170px; height:30px; z-index: 10; transform:rotate(180deg);";
					document.querySelector(".setup4-13").addEventListener("click",function(){
						myStopFunction();
						
						document.querySelector(".setup4-13").style.animation="tamping 3s forwards";
						setTimeout(function(){
							
							document.querySelector(".setup4-13").style.visibility="hidden";
							cnt++;
							resetAnimation();
							if(cnt<=3)
							{
								
								pourSoilSampleAndTamp(cnt);
							}
							if(cnt>4){ myStopFunction(); displayNote("Make sure the soil is completely packed in the mould with no air gaps.","10","100");}
							
						},3500);
					});
				},500);
			},1000);
		},500);
	});
}

function animatearrow()
{
    if (document.getElementById('arrow1').style.visibility=="hidden")
        document.getElementById('arrow1').style.visibility="visible";
    else
        document.getElementById('arrow1').style.visibility="hidden";
}

function myStopFunction() 
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}

function blinkArrow(l,t,correctAnswer,h)
{
	myInt = setInterval(function(){ animatearrow(); }, 500);
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:"+l+"px; top:"+t+"px; height:"+h+"px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate("+correctAnswer+"deg)"; 
	document.getElementById("arrow1").style.msTransform = "rotate("+correctAnswer+"deg)";
	document.getElementById("arrow1").style.transform = "rotate("+correctAnswer+"deg)";
}

function hideNextButton(){
	nextButton.classList.add('hidden');
}

function displayNextButton()
{
	nextButton.classList.remove('hidden');
}

function navNext()
{
	for(temp=0;temp<11;temp++)
	{
		document.querySelector(".canvas"+temp).classList.add("hidden");
	}
	simsubscreennum+=1;
	document.querySelector(".canvas"+simsubscreennum).classList.remove("hidden");
	hideNextButton();
	magic();
}

function magic()
{
	if(simsubscreennum===1)
	{
		let count=0;
		let dataSentence="Height of the mould, h = ";
		// measureHieght(count,"170","399",180,30,"scale1-1","scale1-1Rotate","measureMouldHeight", dataSentence, mouldHeight);
		blinkArrow("170","399",180,30);
		document.querySelector(".scale").addEventListener("click",function()
		{
			count++;
			myStopFunction();
			document.querySelector(".scale").style.animation="measureMouldHeight 0.5s forwards";
			setTimeout(function(){
				document.querySelector(".data1-1").innerHTML="Height of the mould, L = "+mouldHeight+" cm";
				setTimeout(function(){
					document.querySelector(".scale").style.animation="";
					document.querySelector(".scale").classList.remove("scale1-1");
					document.querySelector(".scale").classList.add("scale1-1Rotate");
					if(count===1)
					{
						blinkArrow("337","248",270,30);
						document.querySelector(".scale").addEventListener("click",function()
						{
							myStopFunction();
							document.querySelector(".scale").style.animation="measureMouldDia 0.5s forwards";
							setTimeout(function()
							{
								document.querySelector(".data1-2").innerHTML="Diameter of the mould, d = "+mouldDia+" cm";
								document.querySelector(".scale").classList.add("hidden");
								setTimeout(function(){
									// displayNextButton();
									document.querySelector('.mould1-1').style.visibility="hidden";
									document.querySelector('.area-table').style.visibility="visible";
									calcTrack++;	
									evaluateCalculationAnswers('.area', mouldArea,'.check1', '.result1', '.mark1');
								},300);
							},500);
						});
					}
				},500);
			},600);
		});
	}
	if(simsubscreennum===2)
	{
		
		document.querySelector('.area-vol-table').style.visibility="hidden";
		document.querySelector('.area-table').style.visibility="hidden";
		document.querySelector('.vol-table').style.visibility="hidden";
		hideNextButton();
		
		//Placeing sealing gasket 
		blinkArrow("175","425",270,30);
		document.querySelector(".setup2-3").addEventListener("click",function(){
			myStopFunction();
			document.querySelector(".setup2-3").style.visibility="hidden";
			document.querySelector(".setup2-2").style.visibility="visible";
			document.querySelector(".setup2-2").style.animation="placeSealingGasket 1.15s forwards";
			setTimeout(function(){
				document.querySelector(".setup2-2").style.visibility="hidden";
				document.querySelector(".setup2-3").style="position: absolute; left: 454px; top: 322px; visibility:visible;";
				
			//Placing porous stone
				document.querySelector(".setup2-5").style.visibility="visible";
				blinkArrow("175","425",270,30);
				document.querySelector(".setup2-5").addEventListener("click",function(){
					myStopFunction();
					document.querySelector(".setup2-5").style.visibility="hidden";
					document.querySelector(".setup2-6").style.visibility="visible";
					document.querySelector(".setup2-6").style.animation="placeSealingGasket 1.15s forwards";
					setTimeout(function(){
						document.querySelector(".setup2-6").style.visibility="hidden";
						document.querySelector(".setup2-5").style="position: absolute; left: 460px; top: 328px; visibility:visible;";
						setTimeout(function(){
							displayNextButton();
						},300);
					},1150);
				});
			},1150);
		});
	}
	if(simsubscreennum===3)
	{
		document.querySelector(".setup2-3").style.visibility="hidden";
		document.querySelector(".setup2-5").style.visibility="hidden";
		hideNextButton();
		blinkArrow("163","400",270,30);
		document.querySelector(".setup3-5").addEventListener("click",function(){
			myStopFunction();
			document.querySelector(".setup3-5").style.visibility="hidden";
			document.querySelector(".setup3-7").style.visibility="visible";
			document.querySelector(".setup3-7").style.animation="placeFullMould_1 0.75s forwards";
			setTimeout(function(){
				document.querySelector(".setup3-6").style.visibility="visible";
				document.querySelector(".setup3-7").style.animation="placeFullMould_2 1.5s forwards";
				document.querySelector(".setup3-6").style.animation="placeHalfMould 1.5s forwards";
				setTimeout(function(){
					document.querySelector(".setup3-7").style.visibility="hidden";
					document.querySelector(".setup3-5").style="visibility:visible; position:absolute; left:439px; top:303px;";
					
					//place nut and tighten it
					setTimeout(function(){
						document.querySelector(".setup3-8").style.visibility="visible";
						blinkArrow("552","268",180,20);
						document.querySelector(".setup3-8").addEventListener("click",function(){
							myStopFunction();
							document.querySelector(".setup3-8").style.animation="placeNut 0.75s forwards";
							setTimeout(function(){
								document.querySelector(".setup3-9").style.visibility="visible";
								document.querySelector(".setup3-9").style.transformOrigin="0% 100%";
								document.querySelector(".setup3-9").style.animation="tightenNut 0.5s 2 forwards";
								setTimeout(function(){
									document.querySelector(".setup3-8").style.visibility="hidden";
									document.querySelector(".setup3-9").style.visibility="hidden";
									document.querySelector(".setup3-10").style.visibility="visible";
									displayNote("Fasten all the remaing bolts.","150","150");
								},1000);
							},750);
						});
					},500);
				},1600);
			},750);
		});
	}
	if(simsubscreennum===4)
	{
		document.querySelector(".setup3-5").style.visibility="hidden";
		document.querySelector(".setup3-6").style.visibility="hidden";
		document.querySelector(".setup3-10").style.visibility="hidden";
		document.querySelector(".setup3-11").style.visibility="hidden";
		
		pourSoilSampleAndTamp(1);
	}
	if(simsubscreennum===5)
	{
		document.querySelector(".setup4-4").style.visibility="hidden";
		document.querySelector(".setup4-14").style.visibility="hidden";
		document.querySelector(".setup5-8").style.visibility="visible";
		setTimeout(function(){
			placeFilterPaper(".setup5-8",".setup5-9");
		},300);
	}
	if(simsubscreennum===6)
	{
		document.querySelector(".setup5-4").style.visibility="hidden";
		document.querySelector(".setup5-10").style.visibility="hidden";
		//Placing top plate on top of mould
		blinkArrow(194,450,270,30);
		document.querySelector(".setup6-8").addEventListener("click",function(){
			myStopFunction();
			document.querySelector(".setup6-8").style.animation="placeTopPlate_1 1s forwards";
			setTimeout(function(){

				document.querySelector(".setup6-8").style="position:absolute; left: 439px; top: 220px;";
				document.querySelector(".setup6-9").style.visibility="visible";
				document.querySelector(".setup6-10").style.visibility="visible";
				document.querySelector(".setup6-11").style.visibility="visible";
				document.querySelector(".setup6-8").style.animation="placeTopPlate_2 0.5s forwards";
				document.querySelector(".setup6-9").style.animation="placeTopPlate_left 0.5s forwards";
				document.querySelector(".setup6-10").style.animation="placeTopPlate_right 0.5s forwards";
				document.querySelector(".setup6-11").style.animation="placeTopPlate_behind 0.5s forwards";
				
				//fasten top plate by nut & bolt mechanism
				setTimeout(function(){
					document.querySelector(".setup6-12").style.visibility="visible";
					blinkArrow(463,263,180,20);
					document.querySelector(".setup6-12").addEventListener("click",function(){
						myStopFunction();
						document.querySelector(".setup6-12").style.animation="placeBolt 0.5s forwards";
						setTimeout(function(){
							document.querySelector(".setup6-13").style.visibility="visible";
							setTimeout(function(){
								document.querySelector(".setup6-13").style.transformOrigin="0% 100%";
								document.querySelector(".setup6-13").style.animation="tightenNut 0.5s 2 forwards";
								setTimeout(function(){
									document.querySelector(".setup6-13").style.visibility="hidden";
									document.querySelector(".setup6-12").style.visibility="hidden";
									document.querySelector(".setup6-14").style.visibility="visible";
									displayNote("Fasten all the remaing bolts.","150","150");
								},1000);
							},250);
						},500);
					});
				},1000);
			},1000);
		});
	}
	if(simsubscreennum===7)
	{
		document.querySelector(".nextButton").style.visibility="hidden";
		document.querySelector(".setup6-4").style.visibility="hidden";
		document.querySelector(".setup6-7").style.visibility="hidden";
		document.querySelector(".setup6-9").style.visibility="hidden";
		document.querySelector(".setup6-10").style.visibility="hidden";
		document.querySelector(".setup6-11").style.visibility="hidden";
		document.querySelector(".setup6-14").style.visibility="hidden";
		document.querySelector(".setup6-15").style.visibility="hidden";
		document.querySelector(".setup6-16").style.visibility="hidden";
		
		setTimeout(function()
		{
			blinkArrow(263,541,388,30);
			document.querySelector(".setup7-5").addEventListener("click",function(){
				myStopFunction();
				document.querySelector(".setup7-4").style.visibility="visible";
				document.querySelector(".setup7-3").style.animation="connectPipe 0.5s forwards";
				document.querySelector(".setup7-4").style.animation="moveHand 0.5s forwards";
				setTimeout(function(){
					document.querySelector(".setup7-4").style.visibility="hidden";
					document.querySelector(".setup7-5").style="height: 20px; position: absolute; left: 192px; top: 344px; width: 15px;";
					setTimeout(function()
					{
						displayNote("Open the air release valve  to make the soil sample completely saturated before finding the permeability of the soil.", "350","150");
					},500);
				},500);
			});
		},500);
	}
	if(simsubscreennum===8)
	{
		document.querySelector(".nextButton").style.visibility="hidden";
		// nextButton.classlist.add("hidden");
		setTimeout(function()
		{
			blinkArrow(342,331,180,30);
			document.querySelector(".setup8-5a").addEventListener("click",function(){
				myStopFunction();
				document.querySelector(".setup8-5a").style.animation="openValve 0.5s forwards";
				setTimeout(function(){
					document.querySelector(".setup8-5a").style.visibility="hidden";
					document.querySelector(".setup8-5b").style.visibility="visible";
					document.querySelector(".setup8-7").style.visibility="visible";
					displayNote("Observe the water flow through the air release valve, then stop the water supply.","450","180");
				},500);
			});
		},500);
	}
	if(simsubscreennum===9)
	{
		document.querySelector(".nextButton").style.visibility="hidden";
		document.querySelector(".setup8-5b").style.visibility="hidden";
		displayNote("Water pipe is removed from outlet valve and connected to inlet valve at the top. Now start the water supply maintaining a constant head of water.","450","120");
	}
	if(simsubscreennum===10)
	{
		document.querySelector(".nextButton").style.visibility="hidden";
		document.querySelector(".setup9-6").style.visibility="hidden";
		document.querySelector(".drop10-1").style.animation="drops 0.5s linear infinite";
		setTimeout(function()
		{
			document.querySelector(".drop10-2").style.animation="drops 0.5s linear infinite";
			document.querySelector(".setup10-6").style.animation="fillWater 25s 1";
			document.querySelector(".setup10-8").style.transformOrigin="0 100%";
			document.querySelector(".setup10-8").style.animation="rotateNeedle 1.25s linear 16";
			create_totalTable(".table10",4600);
			setTimeout(function()
			{
				document.querySelector(".setup10-6").style="position:absolute; left: 424px; top: 492px;";
			},25000);
			setTimeout(function()
			{
				validateFormativeQA(2,1,"43px","417px");
				// displayNextButton();
			},19000);
		},250);
	}
	if(simsubscreennum===11)
	{
		document.querySelector(".nextButton").style.visibility="hidden";
		variables.classList.remove("hidden");
		varDescription.innerHTML="Constant head, h = 67.5cm</br>Height of the mould, L = "+mouldHeight+" cm</br>Diameter of the mould, d = "+mouldDia+" cm</br>Area of mould, A = &pi; &times; <span class='frac'><sup>d<sup>2</sup></sup><span>&frasl;</span><sub>4</sub></span>";
		document.querySelector(".setup9-4b").style.visibility="hidden";
		calcTrack=1;
		create_totalTable(".table11-1",0);
		evaluateCalculationAnswers(".avg",avgOfQ,".check3",".result3",".mark3")
	}
}


