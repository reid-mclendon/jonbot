require('dotenv').config()
const Twit = require('twit')
const config = require('./config')
const Chance = require('chance')
const date = require('date-and-time')
var GoogleNews = require('googlenews-rss-scraper');
var rndFlickr = require('rnd-flickr');
const bot = new Twit({
consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
})
const fs = require('fs')
const path = require('path')
const os = require('os');
const tmpDir = os.tmpdir();
ch = new Chance();
let now = new Date();
date.setLocales('en',
{
  A: ['am', 'pm'],
  Z: ['EST']
});

var tweetz = ["News", "Quotes", "Photos"];

var quotez =
[
 '"Observe good faith and justice toward all nations. Cultivate peace and harmony with all" ~ George Washington',
 '"If you cant handle me at my worst, then you sure as hell dont deserve me at my best" ~ Marilyn Monroe',
 '"Be yourself; everyone else is already taken" ~ Oscar Wilde ', 
 '"We are what we repeatedly do. Excellence, then, is not an act, but a habit" ~ Aristotle',
 '"The fear of death follows from the fear of life. A man who loves fully is prepared to die at any time" ~ Mark Twain',
 '"There are no accidents; there is only some purpose that we havent yet understood" ~ Deepak Chopra',
 '"Impossible is a word to be found only in the dictionary of fools" ~ Napoleon Bonaparte',
 '"It is hard to fail but it is worse never to have tried to succeed" ~ Theodore Roosevelt',
 '"There is just one life for each of us: our own" ~ Euripides',
 '"We are all in the gutter, but some of us are looking at the stars" ~ Oscar Wilde',
 '"The mind of a man, once stretched by a new idea, never regains its original dimensions" ~ Oliver Wendell Holmes, Jr',
 '"It does not do to dwell on dreams and forget to live" ~ J.K. Rowling',
 '"If you dont stand for something you will fall for anything" ~ Malcolm X',
 '"Moral indignation is jealousy with a halo" ~ H.G. Wells',
 '"If a man does his best, what else is there?" ~ George S. Patton',
 '"The artist is nothing without the gift, but the gift is nothing without work" ~ Emile Zola',
 '"God is a comedian playing to an audience too afraid to laugh" ~ Voltaire',
 '"As in absolute governments the king is law so too in free countries the law ought to be king" ~ Thomas Paine',
 '"Mitochondria is the powerhouse of the cell" ~ Philip Siekevitz',
 '"You talk when you cease to be at peace with your thoughts" ~ Kahlil Gibran',
 '"There is nothing either good or bad, but thinking makes it so" ~ William Shakespeare',
 '"The very concept of objective truth is fading out of the world. Lies will pass into history" ~ George Orwell',
 '"I can go all over the world with Skype" ~ Ram Dass',
 '"Learn to watch your drama unfold while at the same time knowing you are more than your drama" ~ Ram Dass',
 '"Man is born free and everywhere he is in chains" ~ Jean-Jacques Rousseau'
];

var b64content;
var mentioned = bot.stream('statuses/filter', { track: ['@jonbotxiv'] });
mentioned.on('tweet', Listen);

setInterval(Tweet, (ch.integer({ min: 60000, max: 60000 * 60})));

function Listen(tweet)
{
    // Detect commands
    var text = tweet.text;
    if (text.includes('fetch!') || text.includes('Fetch!') || text.includes('FETCH!'))
    {
        Respond(tweet, "fetch");
    }
    if (text.includes('bedtime!') || text.includes('Bedtime!') || text.includes('BEDTIME!'))
    {
        Respond(tweet, "bedtime");
    }
    if (text.includes('walkies?') || text.includes('Walkies?') || text.includes('WALKIES?'))
    {
        Respond(tweet, "walkies");
    }
}

function Respond(tweet, command) {
    // Who sent the tweet?
    var name = tweet.user.screen_name;
    var repliez;
    var reply;
    // What is the text?
    // var txt = tweet.text;
    // the status update or tweet ID in which we will reply
    var nameID = tweet.id_str;

    // Get rid of the @ mention
    // var txt = txt.replace(/@myTwitterHandle/g, "");

    // Compose reply based on commands
    switch (command) {
        case "fetch":
            repliez = ["I believe this belongs to you...", "Hey, you dropped this", "Why do people keep throwing this at me?", "I dare you to take this from me", "Its a little soggy... but I want you to have it", "I'm keeping this next time", "Here ya go", "This was in my mouth!", "Throw it again!!", "I ran over a small child to get this", "You throw like a human"];
            reply = "@" + name + " \ud83c\udfbe " + DogSpeak() + "(" + repliez[ch.integer({ min: 0, max: repliez.length - 1 })] + ")";
                var params = {
        status: reply,
        in_reply_to_status_id: nameID
    };

		bot.post('statuses/update', params, function (err, data, response) {
        if (err !== undefined) {
            console.log(err);
            console.log("News Tweet Failed! Tweet: " + reply);
        } else {
            console.log('Tweeted: ' + params.status);
        }
    })
            break;

        case "bedtime":
			objectz = ["collar", "food bowl", "tennis ball", "chew toy", "human", "other dog's butt", "bone", "dog park", "shiny objects", "crate", "mailman", "fire hydrant", "UPS guy", "pee corner", "ear medicine", "squeaky toy", "Cesar Millan", "Gampel Pavilion", "Susan", "Storrs Center", "poop spot", "fellow huskies"];
            reply = "@" + name + " \ud83c\udf15 " + DogSpeak() + "(Goodnight moon, goodnight " + objectz[ch.integer({min: 0 , max: objectz.length - 1})] + ", goodnight " + objectz[ch.integer({min: 0 , max: objectz.length - 1})] + "...)";
			    var params = {
        status: reply,
        in_reply_to_status_id: nameID
    };

		bot.post('statuses/update', params, function (err, data, response) {
        if (err !== undefined) {
            console.log(err);
            console.log("News Tweet Failed! Tweet: " + reply);
        } else {
            console.log('Tweeted: ' + params.status);
        }
    })
            break;

		case "walkies":
			eventz = ["\ud83d\udc3e Walked", "\ud83d\udc31 Cat encounter", "\ud83d\udc36 Dog encounter", "\uD83D\uDC41 Looked around", "\uD83D\uDCA9 Took care of business", "\ud83d\udc43 Sniffed something"];
            reply = "@" + name;
            time = date.format(now, 'h:mmA');  // => '12:34 p.m.'
            for (i = 0; i < 4; i++)
            {
                time = date.addMinutes(now, i);
                time = date.format(time, 'h:mmA');  // => '12:34 p.m.'
                console.log(time);
                if (i != 3)
                {
                    reply += "\n" + time + ": " + eventz[ch.weighted([0, 1, 2, 3, 4, 5] , [50, 5, 10, 10, 5, 20])]
                }
                else
                {
                    reply += "\n" + time + ": " + "\uD83C\uDFE1 Walked back inside";
                }

            }
            //reply = "@" + name ")";
            setTimeout(function() {TweetReport(nameID, reply);}, 5000);
            break;
    };
};

function Tweet()
{
    tweet = tweetz[ch.integer({ min: 0, max: tweetz.length - 1 })];
    switch (tweet)
    {
        case "News":
            {
                TweetNews();
                break;
            }

        case "Quotes":
            {
                TweetQuote();
                break;
            }

        case "Photos":
            {
                TweetPhoto();
                break;
            }
    }

}

function TweetPhoto()
{
    var keywords = ch.pickone(['squirrel', 'dog food', 'pigeon', 'tennis ball dog', 'kitten']);
    var options = {
        api_key: process.env.FLICKR_KEY,
        width: 880,
        height: 440,
        tags: [keywords],
        tag_mode: 'any',
        content_type: 1,
        file: path.join(tmpDir + 'image.jpg')
    };

    rndFlickr(options, function (error, image, data) {
        if (!error)
        {
            console.log("rndFlickr working");
            b64content = fs.readFileSync(path.join(tmpDir + 'image.jpg'), { encoding: 'base64' })
            bot.post('media/upload', { media_data: b64content }, function (err, data, response) {
                // now we can assign alt text to the media, for use by screen readers and
                // other text-based presentations and interpreters
                var mediaIdStr = data.media_id_string
                var altText = "Image"
                var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

                bot.post('media/metadata/create', meta_params, function (err, data, response) {
                    if (!err) {
                        // now we can reference the media and post a tweet (media will attach to the tweet)
                        var params = { status: DogSpeak(), media_ids: [mediaIdStr] }

                        bot.post('statuses/update', params, function (err, data, response) {
                            console.log(data)
                        })
                    }
                    else {
                        console.log(err);
                        console.log("Photo Tweet Failed!");
                    }
                })
            })
        }
        else
        {
            console.log(error);
        }

    });
}

function TweetNews()
{
    GoogleNews.getGoogleNewsRSSScraperData({ newsType: 'QUERY', newsTypeTerms: 'UCONN , DOG , HUSKY , CONNECTICUT, STORRS, SQUIRREL'}, function (data)
    {
    if (!data.error) {
        var article = data.newsArray[ch.integer({ min: 0, max: data.newsArray.length - 1 })];
        console.log(article.title);
        var repliez = ["I don't know how to read", "Say what?", "This gives me paws", "If only I could read", "More on this at 11!", "I wrote this", "Won't somebody please think of the children?", "This just in!", "I had nothing to do with this", "Top-notch journalism!", "Don't believe everything you read", "Thanks, Susan", "But how will this impact the dog community?", "What do these letters mean?", "My grandma forwarded this to me", "I'm a dog!"];
        var reply = DogSpeak() + "(" + repliez[ch.integer({min: 0 , max: repliez.length - 1})] + ") " + article.cleanURL;
        var params = {
        status: reply,
    };

        bot.post('statuses/update', params, function (err, data, response) {
            if (err !== undefined) {
                console.log(err);
                console.log("News Tweet Failed! Tweet: " + reply);
            } else {
                console.log('Tweeted: ' + params.status);
            }
        })
        //console.log(JSON.stringify(data, null, 2));
    }
    else {
        console.log('Some error occured.');
    }
    });
}

function TweetQuote()
{
    bot.post('statuses/update', {
        status: DogSpeak() + "(" + quotez[ch.integer({min: 0 , max: quotez.length - 1})] + ")",
    }, (err, data, response) => {
        if (err) {
            console.log(err)
            console.log("Quote Tweet Failed! Tweet: " + reply);

        } else {
            console.log(`Just tweeted: ${data.text}`)
        }
    })
}

function TweetReport(nameID, reply)
{
    var params = {
        status: reply,
        in_reply_to_status_id: nameID
    };

    bot.post('statuses/update', params, function (err, data, response) {
        if (err !== undefined) {
            console.log(err);
        } else {
            console.log('Tweeted: ' + params.status);
        }
    })
};

function DogSpeak()
{
    var wordz = ["Woof!", "Bark!", "Arooo!", "Woof?", "*sniff*", "*pant*", "*yawn*"];
    var wordCount = ch.integer({ min: 1, max: 8 });
    var text = "";
    for (i = 0; i < wordCount; i++) // Generate Dog Speak
    {
        text += wordz[ch.weighted([0, 1, 2, 3, 4, 5, 6], [100, 80, 15, 20, 10, 10, 5])] + " "; // Pick words with weighted probability
    }
    return text;
}
