//Add support for hash
{
function Hash(){
				for( var i=0; i < arguments.length; i++ )
					for( n in arguments[i] )
						if( arguments[i].hasOwnProperty(n) )
							this[n] = arguments[i][n];
			}
 
				// Hash.version = 1.00;	// Original version
				// Hash.version = 1.01;	// Added ability to initialize in the constructor
				// Hash.version = 1.02;	// Fixed document bug that showed a non-working example (thanks mareks)
				//Hash.version = 1.03;	// Removed returning this from the constructor (thanks em-dash)
				Hash.version = 1.04;	// Missed some 'var' declarations (thanks Twey)
 
 
				Hash.prototype = new Object();
 
				Hash.prototype.keys = function(){
					var rv = [];
					for( var n in this )
						if( this.hasOwnProperty(n) )
							rv.push(n);
					return rv;
				}
 
				Hash.prototype.length = function(){
					return this.keys().length();
				}
 
				Hash.prototype.values = function(){
					var rv = [];
					for( var n in this )
						if( this.hasOwnProperty(n) )
							rv.push(this[n]);
					return rv;
				}
 
				Hash.prototype.slice = function(){
					var rv = [];
					for( var i = 0; i < arguments.length; i++ )
						rv.push(
							( this.hasOwnProperty( arguments[i] ) )
								? this[arguments[i]]
								: undefined
						);
					return rv;
				}
 
				Hash.prototype.concat = function(){
					for( var i = 0; i < arguments.length; i++ )
						for( var n in arguments[i] )
							if( arguments[i].hasOwnProperty(n) )
								this[n] = arguments[i][n];
					return this;
				}
}

//Institutional Variables
var tuitionHash = new Hash({A: 870, E: 870, M: 785, S: 785});
var onCampusBudget = new Hash({Fees: 570, Housing: 4959, Meal: 3347, Books: 1341, Transportation: 1810, Personal: 2111});
var offCampusBudget = new Hash({Fees: 570, Housing: 3490, Meal: 3347, Books: 1341, Transportation: 1810, Personal: 2111});

var maxFSEOG = 1000;
var maxFPELL = 5500;
var maxMTG = 1512;
var maxLGRANT = 6000;
var maxFWS = 4000;
var maxFPERK = 2000;
var maxFDS1 = 3500;
var maxDepFDU1 = 5500;
var maxIndFDU1 = 9500;
var maxFDP1 = 40000;

var budget=0;
var efc=0;
var ltuScholarships=0;
var ltuGrants=0;
var stateGrants=0;
var federalGrants=0;
var totalGrantAid = 0;
var subStafford = 0;
var unsubStafford = 0;
var PLUS = 0;
var perkins = 0;
var workStudy = 0;

var subEligible = true;
var perkinsEligible = true;
var plusEligible = true;

var currentTab = 0;

var otherAidBarVisible = false;
var totalPriceDetailVisible = false;
var totalGrantAwardDetailVisible = false;
var totalOtherAidDetailVisible = false;

//Validation

$(document).ready(function() {

	//Tab initialization
	$( "#npeNavigation" ).tabs(
		{ 
		fx: [{opacity:'toggle', duration:'fast'},   // hide option
             {opacity:'toggle', duration:'slow'}]	// show option
		});
	$( "#npeNavigation" ).bind("tabsselect", function(event, ui) {tabSelected(event, ui)});
	$( "#npeNavigation" ).bind("tabsshow", function(event, ui) {tabShown(event, ui)});
	disableAllTabs();

	
	resetForm();

	//Next button functionality
	{
	
		//Plan section Next button
		$('#planSectionNextButton').click(function() {
			$("#planSectionForm").validate();
			if($("#planSectionForm").valid())
			{
			//go to next section
			showAcademicSection();
			}
		});
		
		//Academic section Next Button
		$('#academicSectionNextButton').click(function() {
			$("#academicSectionForm").validate();
			if($("#academicSectionForm").valid())
			{
			//go to next section
			showStatusSection();
			}
		});
		
		//Academic section Back Button
		$('#academicSectionBackButton').click(function() {
			//go to previous section
			showPlanSection();
			
		});
		
		//Status section Next Button
		$('#statusSectionNextButton').click(function() {
			$("#statusSectionForm").validate();
			if($("#statusSectionForm").valid())
			{
			//go to  section
			showHouseholdSection();
			}
		});
		
		//Status section Back Button
		$('#statusSectionBackButton').click(function() {
			//go to previous section
			showAcademicSection();
		});
		
		//Household section Next Button
		$('#householdSectionNextButton').click(function() {
			var validator = $("#householdSectionForm").validate();
			if(!$("#householdSectionForm").valid())
				{
				if(validator.numberOfInvalids() <= 3)
					{
					//go to next section
					showReviewSection();
					}
				}
			else if($("#householdSectionForm").valid())
				{
				showReviewSection();
				}
		});
		
		//Household section Back Button
		$('#householdSectionBackButton').click(function() {
			//go to previous section
			showStatusSection();
		});
		
		//Review section next button
		$('#reviewSectionNextButton').click(function() {
			
			//go to next section
			showResultsSection();
				
		});
		
		//Review section Back Button
		$('#reviewSectionBackButton').click(function() {
			//go to previous section
			showHouseholdSection();
		});
		
		//Results section Back Button
		$('#resultsSectionBackButton').click(function() {
			//go to previous section
			showReviewSection();
		});
		
		//Results section start over button
		$('#resultsSectionStartOverButton').click(function() {
			
			//start over
			resetForm();
				
		});
	
	}
	
	//Final Results Functionality
	{
		$("#coaResultDetails").hide();
		$("#totalPriceHideDetails").hide();
		$("#totalPrice").click(function() {
		$("#coaResultDetails").toggle('slow');
		if(!totalPriceDetailVisible)
			{
			totalPriceDetailVisible = true;
			$("#totalPriceShowDetails").hide();
			$("#totalPriceHideDetails").show();
			$("#totalPriceHideDetails").css('display', 'inline');
			}
		else 
			{
			totalPriceDetailVisible = false;
			$("#totalPriceShowDetails").show();
			$("#totalPriceShowDetails").css('display', 'inline');
			$("#totalPriceHideDetails").hide();
			}
		});
		
		$("#grantAidResultDetails").hide();
		$("#totalGrantAwardHideDetails").hide();
		$("#totalGrantAid").click(function() {
		$("#grantAidResultDetails").toggle('slow');
		if(!totalGrantAwardDetailVisible)
			{
			totalGrantAwardDetailVisible = true;
			$("#totalGrantAwardShowDetails").hide();
			$("#totalGrantAwardHideDetails").show();
			$("#totalGrantAwardHideDetails").css('display', 'inline');
			}
		else 
			{
			totalGrantAwardDetailVisible = false;
			$("#totalGrantAwardShowDetails").show();
			$("#totalGrantAwardShowDetails").css('display', 'inline');
			$("#totalGrantAwardHideDetails").hide();
			}
		});
		
		$("#otherAidResultDetails").hide();
		$("#totalOtherAidHideDetails").hide();
		$("#totalOtherAidRow").click(function() {	
			$("#otherAidResultDetails").toggle('slow');
			if(!totalOtherAidDetailVisible)
			{
			totalOtherAidDetailVisible = true;
			$("#totalOtherAidShowDetails").hide();
			$("#totalOtherAidHideDetails").show();
			$("#totalOtherAidHideDetails").css('display', 'inline');
			}
		else 
			{
			totalOtherAidDetailVisible = false;
			$("#totalOtherAidShowDetails").show();
			$("#totalOtherAidShowDetails").css('display', 'inline');
			$("#totalOtherAidHideDetails").hide();
			}
			if(otherAidBarVisible == false)
				{
				otherAidBarVisible = true;
				}
			else
				{
				otherAidBarVisible = false;
				}
				
			if(otherAidBarVisible) {
			$("#totalOtherAidResult").addClass("bar");
			}
			else {
			$("#totalOtherAidResult").removeClass("bar");
			}
		});
	}
});

//Run after tab is shown
function tabShown(event, ui)
{
//Disable review and results tabs if user goes back
if(ui.index < 5)
	{
	$( "#npeNavigation" ).tabs("disable", 5);
	}
}

//Track tab selections
function tabSelected(event, ui)
{

if(currentTab == 0 && ui.index > currentTab && !$("#planSectionForm").valid())
	{
	return false();
	}
else if(currentTab == 1 && ui.index > currentTab && !$("#academicSectionForm").valid())
	{
	return false();
	}
else if(currentTab == 2 && ui.index > currentTab && !$("#statusSectionForm").valid())
	{
	return false();
	}
else if(currentTab == 3 && ui.index > currentTab && !$("#householdSectionForm").valid())
	{
	var validator = $("#householdSectionForm").validate()
	if(validator.numberOfInvalids() <= 3)
		{
		//Continue
		}
	else
		{
		return false;
		}
	}

//Update the household tab
if(ui.index == 3)
	{
	//Hide the appropriate questions in the Household Section
	if(dependencyStatus() == "D")
			{
			$("#numberInFamilyQuestionIndependent").hide();
			$("#numberInFamilyQuestionIndependentNoDependents").hide();
			$("#numberInCollegeQuestionIndependent").hide();
			$("#numberInFamilyQuestionDependent").show();
			$("#numberInCollegeQuestionDependent").show();
			}
		else if(dependencyStatus() == "I")
			{
				$("#numberInFamilyQuestionDependent").hide();
				$("#numberInCollegeQuestionDependent").hide();
				
				if(childrenIndValue() == 1)
					{
					$("#numberInFamilyQuestionIndependentNoDependents").hide();
					$("#numberInFamilyQuestionIndependent").show();
					$("#numberInCollegeQuestionIndependent").show();
					}
				else
					{
					$("#numberInFamilyQuestionIndependent").hide();
					$("#numberInFamilyQuestionIndependentNoDependents").show();
					$("#numberInCollegeQuestionIndependent").show();
					}
			
			}
	}

//Run calculations
if(ui.index == 4)
	{
	reviewInputs();
	}	
currentTab = ui.index;

}
//Format currency
function Currency(sSymbol, vValue) {
   aDigits = vValue.toFixed(0).split(".");
   aDigits[0] = aDigits[0].split("").reverse().join("").replace(/(\d{3})(?=\d)/g, "$1,").split("").reverse().join("");
   return sSymbol + aDigits.join(".");
}

//Show planSection
function showPlanSection()
{
$( "#npeNavigation" ).tabs("select", 0);
}

//Show academicSection
function showAcademicSection()
{
$( "#npeNavigation" ).tabs("enable", 1);
$( "#npeNavigation" ).tabs("select", 1);
}

//Show statusSection
function showStatusSection()
{
$( "#npeNavigation" ).tabs("enable", 2);
$( "#npeNavigation" ).tabs("select", 2);
}

//Show householdSection
function showHouseholdSection()
{
$( "#npeNavigation" ).tabs("enable", 3);
$( "#npeNavigation" ).tabs("select", 3);
}

//Show reviewSection
function showReviewSection()
{
$( "#npeNavigation" ).tabs("enable", 4);
$( "#npeNavigation" ).tabs("select", 4);

//reviewInputs();
}

//Show resultsSection
function showResultsSection()
{
$("#coaResultDetails").hide();
$("#grantAidResultDetails").hide();
$("#otherAidResultDetails").hide();
$( "#npeNavigation" ).tabs("enable", 5);
$( "#npeNavigation" ).tabs("select", 5);
}

//Disable all tabs
function disableAllTabs()
{
$( "#npeNavigation" ).tabs("option", "disabled", [1,2,3,4,5]);
}
//Reset the form
function resetForm()
{

//show the first section
showPlanSection();

//disable tabs
disableAllTabs();

//reset form values
$(':input','#planSectionForm')
	.not(':button, :submit, :reset, :hidden')
	.val('')
	.removeAttr('checked')
	.removeAttr('selected');

$(':input','#academicSectionForm')
	.not(':button, :submit, :reset, :hidden')
	.val('')
	.removeAttr('checked')
	.removeAttr('selected');	
	
$(':input','#statusSectionForm')
	.not(':button, :submit, :reset, :hidden')
	.val('')
	.removeAttr('checked')
	.removeAttr('selected');		

$(':input','#householdSection')
	.not(':button, :submit, :reset, :hidden')
	.val('')
	.removeAttr('checked')
	.removeAttr('selected');		
	
//Check the other aid checkboxes
document.resultsSectionForm.workStudyCheckbox.checked = true;
document.resultsSectionForm.subStaffordCheckbox.checked = true;
document.resultsSectionForm.unsubStaffordCheckbox.checked = true;
document.resultsSectionForm.perkinsCheckbox.checked = true;
document.resultsSectionForm.plusCheckbox.checked = true;
}

//Reset award amounts to zero
function resetAwards()
{
budget=0;
efc=0;
ltuScholarships=0;
ltuGrants=0;
stateGrants=0;
federalGrants=0;
totalGrantAid = 0;
subStafford = 0;
unsubStafford = 0;
PLUS = 0;
perkins = 0;
workStudy = 0;
}

//Calculate dependency status
function dependencyStatus()
{
if(document.planSectionForm.ageText.value >= 24 || document.statusSectionForm.maritalStatusRadio[0].checked==true || document.statusSectionForm.childrenIndRadio[0].checked==true)
	{
	return 'I';
	}
else 
	{
	return 'D';
	}
}

//Returns Children Indicator
function childrenIndValue()
{
if(document.statusSectionForm.childrenIndRadio[0].checked==true)
	{
	return 1;
	}
else if(document.statusSectionForm.childrenIndRadio[1].checked==true)
	{
	return 0;
	}
return 0;
}

//Returns income level
function incomeLevel()
{
var i=0;
	for (i=0;i<=8;i++)
	{
	if(document.householdSectionForm.householdIncomeRadio[i].checked==true)
		{
		return i;
		}
	}
	//If no radio button is selected
	return 0;
}

//Returns family size
function familySize()
{
var i=0;
	for (i=0;i<=5;i++)
	{
		if(dependencyStatus()=='D')
		{
			if(document.householdSectionForm.householdSizeDependentRadio[i].checked==true)
			{
			return i+2;
			}
		}
		else if(dependencyStatus()=='I')
		{
			if(childrenIndValue() == 1)
				{
				if(document.householdSectionForm.householdSizeIndependentRadio[i].checked==true)
				{
				return i+1;
				}
				}
			else
				{
				if(document.householdSectionForm.householdSizeIndependentNoDependentsRadio[i].checked==true)
				{
				return i+1;
				}
				}
			
		}
	}
	//if no button is selected
	return 0;
}

//Returns number in college
function numberInCollege()
{
var i=0;

if(dependencyStatus()=='D')
	{
	for (i=0;i<=2;i++)
		{
		if(document.householdSectionForm.numberInCollegeDependentRadio[i].checked==true)
			{
			return i+1;
			}
		}
	}
else if(dependencyStatus()=='I')
	{
	for (i=0;i<=1;i++)
		{
		
		if(document.householdSectionForm.numberInCollegeIndependentRadio[i].checked==true)
			{
			return i+1;
			}
		}
	}
	//if no button is selected
	return 0;
}

//EFC Calculation
//Algorithm based on the EFC Tables provided at http://nces.ed.gov/ipeds/resource/net_price_calculator.asp
function calculateEFC()
{
//efcHash contains all of the EFC combinations. Key format is '[Dependency Status][Children Indicator][Income Level Indicator][Family Size][Number in College]'
//Example: Independent, has children, income of 30,000-39,999, family size of 5, 2 in college would be 'I1152'
var efcHash = new Hash();
{
efcHash['D0021'] = 0;
efcHash['D0031'] = 0;
efcHash['D0032'] = 0;
efcHash['D0041'] = 0;
efcHash['D0042'] = 0;
efcHash['D0043'] = 0;
efcHash['D0051'] = 0;
efcHash['D0052'] = 0;
efcHash['D0053'] = 0;
efcHash['D0061'] = 0;
efcHash['D0062'] = 0;
efcHash['D0063'] = 0;

efcHash['D0121'] = 1662;
efcHash['D0131'] = 1148;
efcHash['D0132'] = 839;
efcHash['D0141'] = 322;
efcHash['D0142'] = 549;
efcHash['D0143'] = 413;
efcHash['D0151'] = 0;
efcHash['D0152'] = 83;
efcHash['D0153'] = 260;
efcHash['D0161'] = 0;
efcHash['D0162'] = 0;
efcHash['D0163'] = 0;

efcHash['D0221'] = 3838;
efcHash['D0231'] = 3345;
efcHash['D0232'] = 2005;
efcHash['D0241'] = 2499;
efcHash['D0242'] = 1697;
efcHash['D0243'] = 1225;
efcHash['D0251'] = 1605;
efcHash['D0252'] = 1226;
efcHash['D0253'] = 1048;
efcHash['D0261'] = 100;
efcHash['D0262'] = 401;
efcHash['D0263'] = 462;

efcHash['D0321'] = 6233;
efcHash['D0331'] = 5671;
efcHash['D0332'] = 3374;
efcHash['D0341'] = 4632;
efcHash['D0342'] = 2949;
efcHash['D0343'] = 2124;
efcHash['D0351'] = 3641;
efcHash['D0352'] = 2357;
efcHash['D0353'] = 1891;
efcHash['D0361'] = 2208;
efcHash['D0362'] = 1567;
efcHash['D0363'] = 1236;

efcHash['D0421'] = 9213;
efcHash['D0431'] = 8505;
efcHash['D0432'] = 5085;
efcHash['D0441'] = 7038;
efcHash['D0442'] = 4526;
efcHash['D0443'] = 3382;
efcHash['D0451'] = 5871;
efcHash['D0452'] = 3728;
efcHash['D0453'] = 2961;
efcHash['D0461'] = 4317;
efcHash['D0462'] = 2764;
efcHash['D0463'] = 2092;

efcHash['D0521'] = 12598;
efcHash['D0531'] = 11903;
efcHash['D0532'] = 6794;
efcHash['D0541'] = 10235;
efcHash['D0542'] = 6192;
efcHash['D0543'] = 4619;
efcHash['D0551'] = 8764;
efcHash['D0552'] = 5410;
efcHash['D0553'] = 4232;
efcHash['D0561'] = 6714;
efcHash['D0562'] = 4318;
efcHash['D0563'] = 3207;

efcHash['D0621'] = 16073;
efcHash['D0631'] = 15457;
efcHash['D0632'] = 8615;
efcHash['D0641'] = 13750;
efcHash['D0642'] = 7988;
efcHash['D0643'] = 5771;
efcHash['D0651'] = 12239;
efcHash['D0652'] = 7182;
efcHash['D0653'] = 5416;
efcHash['D0661'] = 9983;
efcHash['D0662'] = 6054;
efcHash['D0663'] = 4436;

efcHash['D0721'] = 19653;
efcHash['D0731'] = 19000;
efcHash['D0732'] = 10326;
efcHash['D0741'] = 17322;
efcHash['D0742'] = 6775;
efcHash['D0743'] = 6899;
efcHash['D0751'] = 15864;
efcHash['D0752'] = 8974;
efcHash['D0753'] = 6582;
efcHash['D0761'] = 13653;
efcHash['D0762'] = 7847;
efcHash['D0763'] = 5634;

efcHash['D0821'] = 31988;
efcHash['D0831'] = 33515;
efcHash['D0832'] = 17065;
efcHash['D0841'] = 32834;
efcHash['D0842'] = 18327;
efcHash['D0843'] = 11664;
efcHash['D0851'] = 31509;
efcHash['D0852'] = 17646;
efcHash['D0853'] = 12831;
efcHash['D0861'] = 28644;
efcHash['D0862'] = 16193;
efcHash['D0863'] = 11372;

efcHash['I1021'] = 0;
efcHash['I1022'] = 0;
efcHash['I1031'] = 0;
efcHash['I1032'] = 0;
efcHash['I1041'] = 0;
efcHash['I1042'] = 0;
efcHash['I1051'] = 0;
efcHash['I1052'] = 0;
efcHash['I1061'] = 0;
efcHash['I1062'] = 0;

efcHash['I1121'] = 1637;
efcHash['I1122'] = 1152;
efcHash['I1131'] = 1026;
efcHash['I1132'] = 888;
efcHash['I1141'] = 143;
efcHash['I1142'] = 432;
efcHash['I1151'] = 0;
efcHash['I1152'] = 0;
efcHash['I1161'] = 0;
efcHash['I1162'] = 0;

efcHash['I1221'] = 3443;
efcHash['I1222'] = 2093;
efcHash['I1231'] = 2879;
efcHash['I1232'] = 1790;
efcHash['I1241'] = 2045;
efcHash['I1242'] = 1313;
efcHash['I1251'] = 1072;
efcHash['I1252'] = 847;
efcHash['I1261'] = 0;
efcHash['I1262'] = 167;

efcHash['I1321'] = 5690;
efcHash['I1322'] = 3294;
efcHash['I1331'] = 4967;
efcHash['I1332'] = 2934;
efcHash['I1341'] = 3933;
efcHash['I1342'] = 2300;
efcHash['I1351'] = 2926;
efcHash['I1352'] = 1728;
efcHash['I1361'] = 1513;
efcHash['I1362'] = 985;

efcHash['I1421'] = 8862;
efcHash['I1422'] = 5061;
efcHash['I1431'] = 7722;
efcHash['I1432'] = 4605;
efcHash['I1441'] = 6320;
efcHash['I1442'] = 3652;
efcHash['I1451'] = 5074;
efcHash['I1452'] = 2871;
efcHash['I1461'] = 3381;
efcHash['I1462'] = 1866;

efcHash['I1521'] = 12472;
efcHash['I1522'] = 6666;
efcHash['I1531'] = 11301;
efcHash['I1532'] = 6315;
efcHash['I1541'] = 9661;
efcHash['I1542'] = 5347;
efcHash['I1551'] = 7911;
efcHash['I1552'] = 4435;
efcHash['I1561'] = 5733;
efcHash['I1562'] = 2986;

efcHash['I1621'] = 15990;
efcHash['I1622'] = 8506;
efcHash['I1631'] = 14865;
efcHash['I1632'] = 8089;
efcHash['I1641'] = 13299;
efcHash['I1642'] = 7079;
efcHash['I1651'] = 11611;
efcHash['I1652'] = 6139;
efcHash['I1661'] = 8928;
efcHash['I1662'] = 4547;

efcHash['I1721'] = 19521;
efcHash['I1722'] = 10170;
efcHash['I1731'] = 18368;
efcHash['I1732'] = 9799;
efcHash['I1741'] = 16837;
efcHash['I1742'] = 8774;
efcHash['I1751'] = 15236;
efcHash['I1752'] = 7821;
efcHash['I1761'] = 12738;
efcHash['I1762'] = 6184;

efcHash['I1821'] = 31434;
efcHash['I1822'] = 15498;
efcHash['I1831'] = 28063;
efcHash['I1832'] = 14647;
efcHash['I1841'] = 26430;
efcHash['I1842'] = 13030;
efcHash['I1851'] = 24769;
efcHash['I1852'] = 11894;
efcHash['I1861'] = 22159;
efcHash['I1862'] = 10155;

efcHash['I0011'] = 0;
efcHash['I0021'] = 672;
efcHash['I0022'] = 1206;

efcHash['I0111'] = 10517;
efcHash['I0121'] = 8286;
efcHash['I0122'] = 5119;

efcHash['I0211'] = 14250;
efcHash['I0221'] = 11986;
efcHash['I0222'] = 7005;

efcHash['I0311'] = 18108;
efcHash['I0321'] = 15852;
efcHash['I0322'] = 8953;

efcHash['I0411'] = 22054;
efcHash['I0421'] = 19648;
efcHash['I0422'] = 10871;

efcHash['I0511'] = 25903;
efcHash['I0521'] = 23491;
efcHash['I0522'] = 12767;

efcHash['I0611'] = 29900;
efcHash['I0621'] = 27325;
efcHash['I0622'] = 14727;

efcHash['I0711'] = 34071;
efcHash['I0721'] = 31081;
efcHash['I0722'] = 16566;

efcHash['I0811'] = 49733;
efcHash['I0821'] = 44262;
efcHash['I0822'] = 22170;
}

var hashKey = dependencyStatus() + childrenIndValue().toString() + incomeLevel().toString() + familySize().toString() + numberInCollege().toString();

if(efcHash[hashKey] != null)
	{
	return efcHash[hashKey];
	}
	
return 0;
}

//Populates the review section
function reviewInputs()
{
//testing
calculateNetPrice();

//Finaid Indicator
if(document.planSectionForm.applyRadio[0].checked==true)
	{
	document.getElementById("applyIndDetail").innerHTML="Yes";
	}
else if(document.planSectionForm.applyRadio[1].checked==true)
	{
	document.getElementById("applyIndDetail").innerHTML="No";
	}

//Age text box
if(document.planSectionForm.ageText.value!=null && document.planSectionForm.ageText.value!="")
{
	document.getElementById("ageDetail").innerHTML=document.planSectionForm.ageText.value;
}

//Living arrangements indicator
if(document.planSectionForm.livingArrangementRadio[0].checked==true)
	{
	document.getElementById("livingArrangementDetail").innerHTML="On campus in university housing";
	}
else if(document.planSectionForm.livingArrangementRadio[1].checked==true)
	{
	document.getElementById("livingArrangementDetail").innerHTML="Living on my own or with a roomate";
	}
else if(document.planSectionForm.livingArrangementRadio[2].checked==true)
	{
	document.getElementById("livingArrangementDetail").innerHTML="Living with my parents or other family members";
	}
//Marital status indicator
if(document.statusSectionForm.maritalStatusRadio[0].checked==true)
	{
	document.getElementById("maritalStatusDetail").innerHTML="Married";
	}
else if(document.statusSectionForm.maritalStatusRadio[1].checked==true)
	{
	document.getElementById("maritalStatusDetail").innerHTML="Not Married";
	}
	
//Children indicator
if(document.statusSectionForm.childrenIndRadio[0].checked==true)
	{
	document.getElementById("childrenDetail").innerHTML="Yes";
	}
else if(document.statusSectionForm.childrenIndRadio[1].checked==true)
	{
	document.getElementById("childrenDetail").innerHTML="No";
	}
	
//Number in family
if(familySize()==1)
	{
	document.getElementById("numberInFamilyDetail").innerHTML="One";
	}
else if(familySize()==2)
	{
	document.getElementById("numberInFamilyDetail").innerHTML="Two";
	}
else if(familySize()==3)
	{
	document.getElementById("numberInFamilyDetail").innerHTML="Three";
	}
else if(familySize()==4)
	{
	document.getElementById("numberInFamilyDetail").innerHTML="Four";
	}
else if(familySize()==5)
	{
	document.getElementById("numberInFamilyDetail").innerHTML="Five";
	}
else if(familySize()==6)
	{
	document.getElementById("numberInFamilyDetail").innerHTML="Six or more";
	}
	
//Number in college
if(numberInCollege()==1 && dependencyStatus() == 'I')
	{
	document.getElementById("numberInCollegeDetail").innerHTML="One";
	}
else if(numberInCollege()==2 && dependencyStatus() == 'I')
	{
	document.getElementById("numberInCollegeDetail").innerHTML="Two or more";
	}

if(numberInCollege()==1 && dependencyStatus() == 'D')
	{
	document.getElementById("numberInCollegeDetail").innerHTML="One child";
	}
else if(numberInCollege()==2 && dependencyStatus() == 'D')
	{
	document.getElementById("numberInCollegeDetail").innerHTML="Two children";
	}
else if(numberInCollege()==2 && dependencyStatus() == 'D')
	{
	document.getElementById("numberInCollegeDetail").innerHTML="Three or more children";
	}
//Household income
if(document.householdSectionForm.householdIncomeRadio[0].checked==true)
	{
	document.getElementById("householdIncomeDetail").innerHTML="Less than $30,000";
	}
else if(document.householdSectionForm.householdIncomeRadio[1].checked==true)
	{
	document.getElementById("householdIncomeDetail").innerHTML="$30,000 - $39,999";
	}
else if(document.householdSectionForm.householdIncomeRadio[2].checked==true)
	{
	document.getElementById("householdIncomeDetail").innerHTML="$40,000 - $49,999";
	}
else if(document.householdSectionForm.householdIncomeRadio[3].checked==true)
	{
	document.getElementById("householdIncomeDetail").innerHTML="$50,000 - $59,999";
	}
else if(document.householdSectionForm.householdIncomeRadio[4].checked==true)
	{
	document.getElementById("householdIncomeDetail").innerHTML="$60,000 - $69,999";
	}
else if(document.householdSectionForm.householdIncomeRadio[5].checked==true)
	{
	document.getElementById("householdIncomeDetail").innerHTML="$70,000 - $79,999";
	}
else if(document.householdSectionForm.householdIncomeRadio[6].checked==true)
	{
	document.getElementById("householdIncomeDetail").innerHTML="$80,000 - $89,999";
	}
else if(document.householdSectionForm.householdIncomeRadio[7].checked==true)
	{
	document.getElementById("householdIncomeDetail").innerHTML="$90,000 - $99,999";
	}
else if(document.householdSectionForm.householdIncomeRadio[8].checked==true)
	{
	document.getElementById("householdIncomeDetail").innerHTML="Above $99,999";
	}

//ACT Score
if(document.academicSectionForm.actScoreText.value!=null && document.academicSectionForm.actScoreText.value!="")
{
	document.getElementById("actScoreDetail").innerHTML=document.academicSectionForm.actScoreText.value;
}

//SAT Score
if(document.academicSectionForm.satScoreText.value!=null && document.academicSectionForm.satScoreText.value!="")
{
	document.getElementById("satScoreDetail").innerHTML=document.academicSectionForm.satScoreText.value;
}

//High School GPA
if(document.academicSectionForm.hsGPAText.value!=null && document.academicSectionForm.hsGPAText.value!="")
{
	document.getElementById("hsGPADetail").innerHTML=document.academicSectionForm.hsGPAText.value;
}

//College selection
if(document.academicSectionForm.collegeRadio[0].checked==true)
	{
	document.getElementById("collegeDetail").innerHTML="Architecture and Design";
	}
else if(document.academicSectionForm.collegeRadio[1].checked==true)
	{
	document.getElementById("collegeDetail").innerHTML="Engineering";
	}
else if(document.academicSectionForm.collegeRadio[2].checked==true)
	{
	document.getElementById("collegeDetail").innerHTML="Management";
	}
else if(document.academicSectionForm.collegeRadio[3].checked==true)
	{
	document.getElementById("collegeDetail").innerHTML="Arts and Sciences";
	}

}

//Returns housing plans
function housingPlans()
{
	if(document.planSectionForm.livingArrangementRadio[0].checked==true)
		{
		return "housing";
		}
	else if(document.planSectionForm.livingArrangementRadio[1].checked==true)
		{
		return "self";
		}
	else if(document.planSectionForm.livingArrangementRadio[2].checked==true)
		{
		return "family";
		}
	
	//If no button selected
	return 0;
}

//Returns college code
function collegeSelection()
{
	if(document.academicSectionForm.collegeRadio[0].checked==true)
	{
	return "A";
	}
else if(document.academicSectionForm.collegeRadio[1].checked==true)
	{
	return "E";
	}
else if(document.academicSectionForm.collegeRadio[2].checked==true)
	{
	return "M";
	}
else if(document.academicSectionForm.collegeRadio[3].checked==true)
	{
	return "S";
	}
	
	//if no button selected
	return 0;
}

//Calculate ACT score from SAT score
function satToACT()
{
var satScoreVal;
satScoreVal = satScore();

	if(satScoreVal == 1600)
	{
		return 36;
	}
	else if(satScoreVal >= 1540 && satScoreVal <= 1590)
	{
		return 35;
	}
	else if(satScoreVal >= 1490 && satScoreVal <= 1530)
	{
		return 34;
	}
	else if(satScoreVal >= 1440 && satScoreVal <= 1480)
	{
		return 33;
	}
	else if(satScoreVal >= 1400 && satScoreVal <= 1430)
	{
		return 32;
	}
	else if(satScoreVal >= 1360 && satScoreVal <= 1390)
	{
		return 31;
	}
	else if(satScoreVal >= 1330 && satScoreVal <= 1350)
	{
		return 30;
	}
	else if(satScoreVal >= 1290 && satScoreVal <= 1320)
	{
		return 29;
	}
	else if(satScoreVal >= 1250 && satScoreVal <= 1280)
	{
		return 28;
	}
	else if(satScoreVal >= 1210 && satScoreVal <= 1240)
	{
		return 27;
	}
	else if(satScoreVal >= 1170 && satScoreVal <= 1200)
	{
		return 26;
	}
	else if(satScoreVal >= 1130 && satScoreVal <= 1160)
	{
		return 25;
	}
	else if(satScoreVal >= 1090 && satScoreVal <= 1120)
	{
		return 24;
	}
	else if(satScoreVal >= 1050 && satScoreVal <= 1080)
	{
		return 23;
	}
	else if(satScoreVal >= 1020 && satScoreVal <= 1040)
	{
		return 22;
	}
	else if(satScoreVal >= 980 && satScoreVal <= 1010)
	{
		return 21;
	}
	else if(satScoreVal >= 940 && satScoreVal <= 970)
	{
		return 20;
	}
	else if(satScoreVal >= 900 && satScoreVal <= 930)
	{
		return 19;
	}
	else if(satScoreVal >= 860 && satScoreVal <= 890)
	{
		return 18;
	}
	else if(satScoreVal >= 820 && satScoreVal <= 850)
	{
		return 17;
	}
	else if(satScoreVal >= 770 && satScoreVal <= 810)
	{
		return 16;
	}
	else if(satScoreVal >= 720 && satScoreVal <= 760)
	{
		return 15;
	}
	else if(satScoreVal >= 670 && satScoreVal <= 710)
	{
		return 14;
	}
	else if(satScoreVal >= 620 && satScoreVal <= 660)
	{
		return 13;
	}
	else if(satScoreVal >= 560 && satScoreVal <= 610)
	{
		return 12;
	}
	else if(satScoreVal >= 510 && satScoreVal <= 550)
	{
		return 11;
	}
}

//Returns ACT Score
function actScore()
{
	return document.academicSectionForm.actScoreText.value;
}

//Returns SAT Score
function satScore()
{
	return document.academicSectionForm.satScoreText.value;
}
//Returns HS GPA
function hsGPA()
{
	return document.academicSectionForm.hsGPAText.value;
}

//Calculates LTU index
function ltuIndex()
{
if(satToACT() > actScore())
	{
	return ((0.4*(hsGPA()/4)) + (0.6*satToACT()/36))*100;
	}
	else
	{
	return ((0.4*(hsGPA()/4)) + (0.6*actScore()/36))*100;
	}
	
}

//Calculates estimated aid and net price
function calculateNetPrice()
{
//Reset all awards to zero
resetAwards();
budget = estimateCOA();

efc = calculateEFC();
var grossNeed = budget - efc;
var giftAidMax = grossNeed/2;

//Calculate LTU Scholarships
ltuScholarships = calculateScholarships();

//Only calculate if applyRadio is set to "Yes"
if(document.planSectionForm.applyRadio[0].checked == true)
	{
	stateGrants = calculateStateGrants();
	federalGrants = calculateFederalGrants(giftAidMax - ltuScholarships - stateGrants);
	ltuGrants = institutionalGrants(giftAidMax - (ltuScholarships + federalGrants + stateGrants));
	}

//Calculate total grant aid	
totalGrantAid = ltuScholarships + federalGrants + stateGrants + ltuGrants;

//display total grant aid
document.getElementById("totalGrantAidResult").innerHTML = "- " + Currency("$",totalGrantAid);

//display federal aid
document.getElementById("federalAidResult").innerHTML = Currency("$",federalGrants);

//display state grant aid
document.getElementById("stateAidResult").innerHTML = Currency("$",stateGrants);

//display institutional grant aid
document.getElementById("institutionalAidResult").innerHTML = Currency("$",ltuGrants + ltuScholarships);

//calculate and display net price
var netPrice = budget - totalGrantAid;
document.getElementById("estimatedNetPriceResult").innerHTML = Currency("$",netPrice);
document.getElementById("netCostSummary").innerHTML = Currency("$",netPrice);

//Calculate other aid if applyRadio is set to "Yes"
if(document.planSectionForm.applyRadio[0].checked == true)
	{
	$("#otherAidSection").show();
	$("#netPriceExplanationFederalAidSection").show();
	//Work study
	var workStudyAmountRemaining = budget - ltuScholarships - stateGrants - federalGrants - ltuGrants;
	workStudy = calculateWorkStudy(workStudyAmountRemaining);

	//Perkins
	var perkinsAmountRemaining = budget - efc - ltuScholarships - stateGrants - federalGrants - ltuGrants - workStudy;
	perkins = calculatePerkins(perkinsAmountRemaining);

	//Subsidized Stafford
	var subStaffordAmountRemaining = budget - efc - ltuScholarships - stateGrants - federalGrants - ltuGrants - workStudy - perkins;
	subStafford = calculateSubStafford(subStaffordAmountRemaining);

	//Unsub Stafford 
	var unsubStaffordAmountRemaining = budget - ltuScholarships - stateGrants - federalGrants - ltuGrants - workStudy - subStafford - perkins;
	unsubStafford = calculateUnsubStafford(unsubStaffordAmountRemaining);

	//Parent PLUS
	var plusAmountRemaining = budget - ltuScholarships - stateGrants - federalGrants - ltuGrants - subStafford - workStudy - unsubStafford - perkins;
	PLUS = calculatePLUS(plusAmountRemaining);
	}
else
	{
	$("#otherAidSection").hide();
	$("#netPriceExplanationFederalAidSection").hide();
	}

//display total other aid

document.getElementById("totalOtherAidResult").innerHTML = "- " + Currency("$",subStafford + unsubStafford + PLUS + perkins + workStudy);
document.getElementById("otherAidSummary").innerHTML = Currency("$",subStafford + unsubStafford + PLUS + perkins + workStudy);

//Display remaining balance
document.getElementById("netCostLessOtherAid").innerHTML = Currency("$", (netPrice)-(subStafford + unsubStafford + PLUS + perkins + workStudy));
document.getElementById("estimatedBalanceResult").innerHTML = Currency("$", (netPrice)-(subStafford + unsubStafford + PLUS + perkins + workStudy));

//display work study
document.getElementById("workStudyResult").innerHTML = Currency("$",workStudy);

//display perkins
if(perkinsEligible == true)
	{
	$("#perkinsResultRow").show();
	document.getElementById("perkinsResult").innerHTML = Currency("$",perkins);
	}
else
	{
	$("#perkinsResultRow").hide();
	}
//display sub stafford
if(subEligible == true)
	{
	$("#subStaffordResultRow").show();
	document.getElementById("subStaffordResult").innerHTML = Currency("$",subStafford);
	}
else
	{
	$("#subStaffordResultRow").hide();
	}

//display unsub stafford
document.getElementById("unsubStaffordResult").innerHTML = Currency("$",unsubStafford);

//display plus
if(plusEligible == true)
	{
	$("#plusResultRow").show();
	document.getElementById("plusResult").innerHTML = Currency("$",PLUS);
	}
else
	{
	$("#plusResultRow").hide();
	}


}


//Calculates gross need
function grossNeed()
{
return budget - (efc + ltuScholarships + ltuGrants + stateGrants + federalGrants);
}

//Calculate scholarship eligibility
function calculateScholarships()
{

var ltuIndex_ = ltuIndex();
var hsGPA_ = hsGPA();
var actScore_ = actScore();
var satScore_ = satToACT();

if(satScore_ > actScore_)
	{
	actScore_ = satScore_;
	}

if(ltuIndex_ >= 88 && hsGPA_ >= 3.8 && actScore_ >= 30)
	{
	return 18000;
	}
else if(ltuIndex_ >= 83 && hsGPA_ >= 3.60 && actScore_ >= 28)
	{
	return 16000;
	}
else if(ltuIndex_ >= 78 && hsGPA_ >= 3.50 && actScore_ >= 26)
	{
	return 13000;
	}
else if(ltuIndex_ >= 75 && hsGPA_ >= 3.30 && actScore_ >= 25)
	{
	return 10000;
	}
else if(ltuIndex_ >= 70 && hsGPA_ >= 3.00 && actScore_ >= 24)
	{
	return 6000;
	}
else if(ltuIndex_ >= 67)
	{
	return 4500;
	}	
	
return 0;
}

//Calculate institutional grant eligibility
function institutionalGrants(needRemaining)
{
if(efc < 6001)
	{
	if(maxLGRANT <= (needRemaining))
		{
		return maxLGRANT;
		}
	else if(needRemaining > 0)
		{
		return needRemaining - (needRemaining % 50);
		}

	}
return 0;
}

//Calculate federal grant eligibility
function calculateFederalGrants(needRemaining)
{
var amountFPELL=0;
var amountFSEOG=0;

//Calculate PELL

if(efc >= 5201 && efc <= 5273)
{
amountFPELL = 555;
}
else if(efc >= 5274)
{
amountFPELL = 0;
}
else
{
var pellHash = new Hash();
pellHash[0] = 5550;
pellHash[100] = 5500;
pellHash[200] = 5400;
pellHash[300] = 5300;
pellHash[400] = 5200;
pellHash[500] = 5100;
pellHash[600] = 5000;
pellHash[700] = 4900;
pellHash[800] = 4800;
pellHash[900] = 4700;
pellHash[1000] = 4600;
pellHash[1100] = 4500;
pellHash[1200] = 4400;
pellHash[1300] = 4300;
pellHash[1400] = 4200;
pellHash[1500] = 4100;
pellHash[1600] = 4000;
pellHash[1700] = 3900;
pellHash[1800] = 3800;
pellHash[1900] = 3700;
pellHash[2000] = 3600;
pellHash[2100] = 3500;
pellHash[2200] = 3400;
pellHash[2300] = 3300;
pellHash[2400] = 3200;
pellHash[2500] = 3100;
pellHash[2600] = 3000;
pellHash[2700] = 2900;
pellHash[2800] = 2800;
pellHash[2900] = 2700;
pellHash[3000] = 2600;
pellHash[3100] = 2500;
pellHash[3200] = 2400;
pellHash[3300] = 2300;
pellHash[3400] = 2200;
pellHash[3500] = 2100;
pellHash[3600] = 2000;
pellHash[3700] = 1900;
pellHash[3800] = 1800;
pellHash[3900] = 1700;
pellHash[4000] = 1600;
pellHash[4100] = 1500;
pellHash[4200] = 1400;
pellHash[4300] = 1300;
pellHash[4400] = 1200;
pellHash[4500] = 1100;
pellHash[4600] = 1000;
pellHash[4700] = 900;
pellHash[4800] = 800;
pellHash[4900] = 700;
pellHash[5000] = 600;
pellHash[5100] = 555;
pellHash[5200] = 555;

var roundedEFC;
if(efc % 100 == 0)
	{
	roundedEFC = efc;
	}
else
	{
	roundedEFC = efc - (efc % 100) + 100;
	}

if(pellHash[roundedEFC] != null)
	{
	amountFPELL = pellHash[roundedEFC];
	}

needRemaining = needRemaining - amountFPELL;
}

//Calculate SEOG
if(efc < 1001)
	{
	if(maxFSEOG <= needRemaining)
		{
		amountFSEOG = maxFSEOG;
		}
	else if(needRemaining > 0)
		{
		amountFSEOG = needRemaining - (needRemaining % 50);
		}
	}

return amountFPELL + amountFSEOG;
}

//Calculate state grant eligibility
function calculateStateGrants()
{

if(efc < 27737)
	{
	return maxMTG;
	}
	
return 0;
}

//Calculate Subsidized Stafford eligibility
function calculateSubStafford(needRemaining)
{
//check for checkbox status
if(document.resultsSectionForm.subStaffordCheckbox.checked == true)
{
	if(needRemaining >= maxFDS1)
		{
		return maxFDS1;
		}
	else if(needRemaining > 0)
		{
		return needRemaining;
		}
}
return 0;
}

//Calculate Unsubsidized Stafford eligibilty
function calculateUnsubStafford(needRemaining)
{
var maxUnsub = 0;
//check the checkbox
if(document.resultsSectionForm.unsubStaffordCheckbox.checked == true)
{
	//Check dependency status
	if(dependencyStatus() == "D")
		{
		maxUnsub = maxDepFDU1 - subStafford;
		}
	else
		{
		maxUnsub = maxIndFDU1 - subStafford;
		}

	//calculate unsub
	if(needRemaining >= maxUnsub)
		{
		return maxUnsub;
		}
	else if(needRemaining > 0)
		{
		return needRemaining;
		}
}

return 0;

}

//Calculate Parent PLUS eligibilty
function calculatePLUS(needRemaining)
{
if(document.resultsSectionForm.plusCheckbox.checked == true)
{

	if(dependencyStatus() == "D")
		{
		plusEligible = true;
		return needRemaining;
		}
	else
		{
		plusEligible=false;
		}
}

return 0;
	
}

//Calculate Perkins eligibility
function calculatePerkins(needRemaining)
{
//check the checkbox
if(document.resultsSectionForm.perkinsCheckbox.checked == true)
{	
	if(efc < 101)
		{
		perkinsEligible = true;
		if(needRemaining >= maxFPERK)
			{
			return maxFPERK;
			}
		else if(needRemaining > 0)
			{
			return needRemaining;
			}
		}
	else
		{
		perkinsEligible = false;
		}
}

return 0;
}

//Calculate work study
function calculateWorkStudy(needRemaining)
{

//check the checkbox

if(document.resultsSectionForm.workStudyCheckbox.checked == true)
{
	if(needRemaining >= maxFWS)
		{
		return maxFWS;
		}
	else if(needRemaining >= 500)
		{
		return needRemaining - (needRemaining % 50);
		}
}

return 0;
}

//Returns credit hours
function creditHours()
{
return 24;
}

//Populates COA section
function estimateCOA()
{
	if(housingPlans()=="self" || housingPlans()=="family")
		{
		var totalBudget = offCampusBudget["Fees"] + offCampusBudget["Housing"] + offCampusBudget["Meal"] + offCampusBudget["Books"] + offCampusBudget["Transportation"] + offCampusBudget["Personal"] + creditHours()*tuitionHash[collegeSelection()];		
		document.getElementById("totalPriceResult").innerHTML= Currency("$",totalBudget);
		document.getElementById("coaTuitionFees").innerHTML= Currency("$",offCampusBudget["Fees"] + creditHours()*tuitionHash[collegeSelection()]);
		document.getElementById("coaRoomBoard").innerHTML= Currency("$",offCampusBudget["Housing"] + offCampusBudget["Meal"]);
		document.getElementById("coaBooksSupplies").innerHTML= Currency("$",offCampusBudget["Books"]);
		document.getElementById("coaOtherExpenses").innerHTML= Currency("$",offCampusBudget["Personal"] + offCampusBudget["Transportation"]);
		
		return totalBudget;
		}
	else
		{
		var totalBudget = onCampusBudget["Fees"] + onCampusBudget["Housing"] + onCampusBudget["Meal"] + onCampusBudget["Books"] + onCampusBudget["Transportation"] + onCampusBudget["Personal"] + creditHours()*tuitionHash[collegeSelection()];
		document.getElementById("totalPriceResult").innerHTML= Currency("$",totalBudget);
		document.getElementById("coaTuitionFees").innerHTML= Currency("$",onCampusBudget["Fees"] + creditHours()*tuitionHash[collegeSelection()]);
		document.getElementById("coaRoomBoard").innerHTML= Currency("$",onCampusBudget["Housing"] + onCampusBudget["Meal"]);
		document.getElementById("coaBooksSupplies").innerHTML= Currency("$",onCampusBudget["Books"]);
		document.getElementById("coaOtherExpenses").innerHTML= Currency("$",onCampusBudget["Personal"] + onCampusBudget["Transportation"]);
		
		return totalBudget;
		}
}