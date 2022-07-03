const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

urls = {
  "spring": 'https://www.animatetimes.com/tag/details.php?id=5228',
  "summer": 'https://www.animatetimes.com/tag/details.php?id=5806',
  "fall": 'https://www.animatetimes.com/tag/details.php?id=5947',
  "winter": 'https://www.animatetimes.com/tag/details.php?id=6212',
}

async function scrapeData(url,season) {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  const animeList = [];

  const animes = $('div.maybe-legacy.tag-content:has(table):gt(0)');
  animes.each((i, animeElem) => {
    const animeData = {
      "title": '',
      "story": '',
      'schedule': '',
      "casts": {},
      "staffs": {},
      "homeLink": '',
      "twitterLink": '',
      "imageUrl": '',
      "season": season,
    };

    try {
      const imageUrl = $(animeElem).find('img').attr('src');
      animeData.imageUrl = imageUrl;
    } catch (e) {
      return
    }

    try {
    const title = $(animeElem).find('td:contains("作品名")').next().text();
    animeData.title = title;
    } catch (e) {
      return
    }

    try {
      const taggedStory = $(animeElem).html().split('<br>')[0].split('</center>')[1].split('\n').join(' ').trim();
      re = /<.*?>(.*?)<.*?>/g;
      const story = taggedStory.replace(re, '$1');
      animeData.story = story;
    } catch (e) {
      return
    }

    try {
      const schedule = $(animeElem).find('td:contains("放送スケジュール")').next().text();
      animeData.schedule = schedule;
    } catch (e) {
      return
    }


    try {
      const casts = $(animeElem).find('td:contains("キャスト")').next().text();
      const re = /^(.*?)：(.*?)$/;
      const castsList = casts.split('\n').map(cast => cast.match(re));
      animeData.casts = castsList.reduce((acc, cast) => {
        if (cast) {
          acc[cast[1]] = cast[2];
        }
        return acc;
      }
      , {});
    } catch (e) {
      return
    }
    try {
      const staffs = $(animeElem).find('td:contains("スタッフ")').next().text();
      const re = /^(.*?)：(.*?)$/;
      const staffsList = staffs.split('\n').map(staff => staff.match(re));
      animeData.staffs = staffsList.reduce((acc, staff) => {
        if (staff) {
          acc[staff[1]] = staff[2];
        }
        return acc;
      }
      , {});
    } catch (e) {
      return
    }
    try {
      const homeLink = $(animeElem).find('a:contains("公式サイト")').attr('href');
      animeData.homeLink = homeLink;
    } catch (e) {
      return
    }
    try {
      const twitterLink = $(animeElem).find('a:contains("公式Twitter")').attr('href');
      animeData.twitterLink = twitterLink;
    } catch (e) {
      return
    }
    animeList.push(animeData);
  });
  return animeList;
}


const loop = async () => {
  const allAnimeList = [];
  for (const season of Object.keys(urls)) {
    console.log(season);
    const animes = await scrapeData(urls[season], season);
    console.log(animes);
    allAnimeList.push(...animes);
  }
  fs.writeFileSync('data/animeData.json', JSON.stringify(allAnimeList));
}

loop();




