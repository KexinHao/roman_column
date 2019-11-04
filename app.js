const puppeteer = require("puppeteer");
const fs = require("fs");

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
//
// var port = 8081;
// var app = express();

//code here is from https://www.penta-code.com/scraping-youtube-comments-with-puppeteer/
//I am hoping this part could help 1.navigate to the taobao site, 2.check if the page is loaded, 3.to scroll down the lazy loaded part and find the img.
async function getElText(page, selector) {
	return await page.evaluate((selector) => {
		return document.querySelector(selector).innerText
	}, selector);
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const navigationPromise = page.waitForNavigation();

  await page.goto('https://item.taobao.com/item.htm?spm=a230r.1.14.265.365915d6JmYCed&id=551660449648&ns=1&abbucket=11#detail');
  await page.waitForSelector('a.tb-tab-anchor'); //here I am not sure
  await page.evaluate(_ => {
    window.scrollBy(0, window.innerHeight);
  });
  await page.waitFor(2000);
  await page.waitForSelector('#img');
  await navigationPromise;
	const imageUrl = await page.evaluate(() =>
	    document.querySelector("img") // image selector
	    );
			console.log(imageUrl);
  // await page.waitForSelector('.style-scope:nth-child(1) > #comment > #body > #main > #header > #header-author > #author-text > .style-scope')
  //
  //
  // const images = [];
  // for (let i = 1; i < 5; i++) {
  //    // const authorSelector = `.style-scope:nth-child(${i}) > #comment > #body > #main > #header > #header-author > #author-text > .style-scope`
  //    // const commentSelector = `.style-scope:nth-child(${i}) > #comment > #body > #main > #expander #content-text`;
  //    await page.waitForSelector("img");
	// 	 const innerHTML = await page.evaluate(() => document.querySelector('img').attr("src"));
  //    // await page.waitForSelector(authorSelector);
  //    // const commentText = await getElText(page, commentSelector);
  //    // const author = await getElText(page, authorSelector);
	//
  //    // if (commentText) {
  //   // write each comment to DB or file
  //   // or batch the for processing later
  //   console.log(innerHTML);
  //   comments.push(commentText);
  //     // }
  //   }




//  code here is from https://stackoverflow.com/questions/52542149/how-can-i-download-images-on-a-page-using-puppeteer
//  The code is for downloading the images. But I intend just to load the image so I didn't use it.

// function download(uri, filename, callback) {
//   request.head(uri, function(err, res, body) {
//     request(uri)
//     .pipe(fs.createWriteStream(filename))
//     .on("close", callback);
//  });
// }
//
// let scrape = async () => {
//  // Actual Scraping goes Here...
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.goto("https://item.taobao.com/item.htm?spm=a230r.1.14.265.365915d6JmYCed&id=551660449648&ns=1&abbucket=11#detail");
//     await page.waitFor(1000);
//     const imageUrl = await page.evaluate(() =>
//     document.querySelector("img") // image selector
//     ); // here we got the image url.
//     // Now just simply pass the image url to the downloader function to
//     download  the image.
//     download(imageUrl, "image.png", function() {
//      console.log("Image downloaded");
//   });
//  };


// code here is from the workshop we had in the class. I do not know how it connects properly and reasonablly with the code above.
// app.get('/taobao', function (req, res) {
//     var url = "https://item.taobao.com/item.htm?spm=a230r.1.14.265.365915d6JmYCed&id=551660449648&ns=1&abbucket=11#detail";
//     request(url, function (error, response, html) {
//         if (!error) {
//
//             var imagesList = [];
//
//             var $ = cheerio.load(html);
//
//             $('img').each(function(){
//               imagesList.push($(this).attr('src'));
//             });
//
//             res.send(html);
//             fs.writeFile('taobao_output.js', "var taobao_output = [" + imagesList + "]", function(error){
//             console.log("File is written sucessfully!");
//             });
//         }
//     });
// });


//this part is from https://www.penta-code.com/scraping-youtube-comments-with-puppeteer/
 await browser.close();
})()

// scrape()

// app.listen(port);
// console.log('Magic happens on port' + port);
// exports = module.exports = app;
