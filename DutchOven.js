'use strict';

/**
 * This is an initial set of Code for interacting with the Dutch oven Skill
 * 
 */
var ovenTemperatures = new Array("325", "350", "375", "400", "425");
var ovenSizes = new Array("8","10","12","14");

/* 8 inch sizes info */
var ovenEightThreeTwentyFive = "An 8 inch oven requires a total of 15 coals 10 on top 5 on bottom for 325 degrees";
var ovenEightThreeFifty = "An 8 inch oven requires a total of 16 coals 11 on top 5 on bottom for 350 degrees";
var ovenEightThreeSeventyFive = "An 8 inch oven requires a total of 17 coals 11 on top 6 on bottom for 375 degrees";
var ovenEightFour = "An 8 inch oven requires a total of 18 coals 12 on top 6 on bottom for 400 degrees";
var ovenEightFourTwentyFive = "An 8 inch oven requires a total of 19 coals 13 on top 6 on bottom for 425 degrees";
var ovenEightFourFifty = "An 8 inch oven requires a total of 20 coals 14 on top 6 on bottom for 450 degrees";

/* 10 inch size info */
var ovenTenThreeTwentyFive = "A 10 inch oven requires a total of 19 coals 13 on top 6 on bottom for 325 degrees";
var ovenTenThreeFifty = "A 10 inch oven requires a total of 21 coals 14 on top 7 on bottom for 350 degrees";
var ovenTenThreeSeventyFive = "A 10 inch oven requires a total of 23 coals 16 on top 7 on bottom for 375 degrees";
var ovenTenFour = "A 10 inch oven requires a total of 25 coals 17 on top 8 on bottom for 400 degrees";
var ovenTenFourTwentyFive = "A 10 inch oven requires a total of 27 coals 18 on top 9 on bottom for 425 degrees";
var ovenTenFourFifty = "A 10 inch oven requires a total of 29 coals 19 on top 10 on bottom for 450 degrees";

/* 12 inch size info */
var ovenTwelveThreeTwentyFive = "A 12 inch oven requires a total of 23 coals 16 on top 7 on bottom for 325 degrees";
var ovenTwelveThreeFifty = "A 12 inch oven requires a total of 25 coals 17 on top 8 on bottom for 350 degrees";
var ovenTwelveThreeSeventyFive = "A 12 inch oven requires a total of 27 coals 18 on top 9 on bottom for 375 degrees";
var ovenTwelveFour = "A 12 inch oven requires a total of 29 coals 19 on top 10 on bottom for 400 degrees";
var ovenTwelveFourTwentyFive = "A 12 inch oven requires a total of 31 coals 21 on top 10 on bottom for 425 degrees";
var ovenTwelveFourFifty = "A 12 inch oven requires a total of 33 coals 22 on top 11 on bottom for 450 degrees";

/* 14 inch size info */
var ovenFourteenThreeTwentyFive = "A 14 inch oven requires a total of 30 coals 20 on top 10 on bottom for 325 degrees";
var ovenFourteenThreeFifty = "A 14 inch oven requires a total of 32 coals 21 on top 11 on bottom for 350 degrees";
var ovenFourteenThreeSeventyFive = "A 14 inch oven requires a total of 34 coals 22 on top 12 on bottom for 375 degrees";
var ovenFourteenFour = "A 14 inch oven requires a total of 36 coals 24 on top 12 on bottom for 400 degrees";
var ovenFourteenFourTwentyFive = "A 14 inch oven requires a total of 38 coals 25 on top 13 on bottom for 425 degrees";
var ovenFourteenFourFifty = "A 14 inch oven requires a total of 40 coals 26 on top 14 on bottom for 450 degrees";

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `${title}`,
            content: `${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}


// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Welcome to the Dutch oven Skill,' +
        'You can tell me what size your Dutch oven is, and what temperature you would like to cook your oven at';
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    const repromptText = 'Please tell me what temperature and size of your Dutch oven by saying, ' +
        'How many coals do I need to cook my 8 inch Dutch oven at 350 degrees';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    const cardTitle = 'Goodbye';
    const speechOutput = 'Thank you for having me help you with your Dutch oven, Happy cooking!';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function createOvenSizeAttributes(ovenSize) {
    return {
        ovenSize,
    };
}

function getTemperature(ovenTemperature)
{
	switch (ovenTemperature)
	{
		case "325°":
		case "325 degrees":
			return 325;
		case "350°":
		case "350 degrees":
			return 350;
		case "375°":
		case "375 degrees":
			return 375;
		case "400°":
		case "400 degrees":
			return 400;
		case "425°":
		case "425 degrees":
			return 425;
		case "450°":
		case "450 degrees":
			return 450;
		default:
			return 0;
	}
}

function getResponseLine(ovenSize, ovenTemperature)
{
	if (ovenSize == 8)
	{
		let ovenDegrees = getTemperature(ovenTemperature);
		switch (ovenDegrees)
		{
			case 325:
				return ovenEightThreeTwentyFive;
			case 350:
				return ovenEightThreeFifty;
			case 375:
				return ovenEightThreeSeventyFive;
			case 400:
				return ovenEightFour;
			case 425:
				return ovenEightFourTwentyFive;
			case 450:
				return ovenEightFourFifty;
			default:
				return "Sorry I couldn't figure out your desired oven temperature, I understand 325-450 degrees";
		}
	}
	else if (ovenSize == 10)
	{
		let ovenDegrees = getTemperature(ovenTemperature);
		switch (ovenDegrees)
		{
			case 325:
				return ovenTenThreeTwentyFive;
			case 350:
				return ovenTenThreeFifty;
			case 375:
				return ovenTenThreeSeventyFive;
			case 400:
				return ovenTenFour;
			case 425:
				return ovenTenFourTwentyFive;
			case 450:
				return ovenTenFourFifty;
			default:
				return "Sorry I couldn't figure out your desired oven temperature, I understand 325-450 degrees";
		}
	}
	else if (ovenSize == 12)
	{
		let ovenDegrees = getTemperature(ovenTemperature);
		switch (ovenDegrees)
		{
			case 325:
				return ovenTwelveThreeTwentyFive;
			case 350:
				return ovenTwelveThreeFifty;
			case 375:
				return ovenTwelveThreeSeventyFive;
			case 400:
				return ovenTwelveFour;
			case 425:
				return ovenTwelveFourTwentyFive;
			case 450:
				return ovenTwelveFourFifty;
			default:
				return "Sorry I couldn't figure out your desired oven temperature, I understand 325-450 degrees";
		}
	}
	else if (ovenSize == 14)
	{
		let ovenDegrees = getTemperature(ovenTemperature);
		switch (ovenDegrees)
		{
			case 325:
				return ovenFourteenThreeTwentyFive;
			case 350:
				return ovenFourteenThreeFifty;
			case 375:
				return ovenFourteenThreeSeventyFive;
			case 400:
				return ovenFourteenFour;
			case 425:
				return ovenFourteenFourTwentyFive;
			case 450:
				return ovenFourteenFourFifty;
			default:
				return "Sorry I couldn't figure out your desired oven temperature, I understand 325-450 degrees";
		}
	}
	else
	{
		return `Your Dutch oven size is ${ovenSize} inches, I only know sizes 8 through 14 inches`;
	}
}

function getBriquettes(intent, session, callback) {
    let ovenSizeSlot = intent.slots.OvenSize;
	let ovenTemperatureSlot = intent.slots.OvenTemperature;
	let ovenSize = null;
	let ovenTemperature = null;
    const repromptText = null;
    const sessionAttributes = {};
    let shouldEndSession = false;
    let speechOutput = '';

    ovenSize = ovenSizeSlot.value;
    ovenTemperature = ovenTemperatureSlot.value;

    console.log(`Size of oven: ${ovenSize}, ${intent.slots.OvenSize.value}`);
    console.log(`Size of oven: ${ovenTemperature}, ${intent.slots.OvenTemperature.value}`);

    if (ovenSize && ovenTemperature) {
        speechOutput = getResponseLine(ovenSize, ovenTemperature);
        shouldEndSession = true;
    } else {
        speechOutput = "I'm not sure what your Dutch oven size and desired temperature is, you can say, how many coals are required to cook my " +
            ' 8 inch Dutch oven at 350 degrees';
    }

    // Setting repromptText to null signifies that we do not want to reprompt the user.
    // If the user does not respond or says something that is not understood, the session
    // will end.
    callback(sessionAttributes,
         buildSpeechletResponse("Cooking Information", speechOutput, repromptText, shouldEndSession));
}


// --------------- Events -----------------------

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'HowManyBriquettes') {
        getBriquettes(intent, session, callback);
    } else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else {
        throw new Error('Invalid intent');
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
    // Add cleanup logic here
}


// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        if (event.session.application.applicationId !== 'amzn1.ask.skill.5f419475-5226-4a69-be7b-b9a12202bd44') {
             callback('Invalid Application ID');
        }

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } catch (err) {
        callback(err);
    }
};