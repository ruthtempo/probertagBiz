const puppeteer = require("puppeteer");
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://bnwjefziktrpjkkaxeuh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJud2plZnppa3RycGpra2F4ZXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3ODg4NTMsImV4cCI6MTk4OTM2NDg1M30.yAsb7nRdWPS0MQQV4y4QTFysLLVVbH7XR1AVXkW3dDM";
const supabase = createClient(supabaseUrl, supabaseKey);

async function getFlats() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://english.habitaclia.com/rent-district_eixample-barcelona.htm?ordenar=mas_recientes&pmax=800&codzonas=203,204,205,201,202,206&coddists=200"
  );

  const titles = await page.$$eval(".list-item-title a", (link) =>
    link.map((l) => l.innerText)
  );

  const urls = await page.$$eval(".list-item-title a", (link) =>
    link.map((l) => l.href)
  );

  const prices = await page.$$eval(
    ".list-item-price  span[itemprop]",
    (content) => content.flatMap((price) => price.innerText.match(/[\d]+/))
  );

  const sqms = await page.$$eval(".list-item-feature", (content) =>
    content
      .flatMap((c) => c.innerText.match(/[\d]+[m]/))
      .map((sqm) => parseInt(sqm.slice(0, -1)))
  );

  const flatsDetails = urls.map((url, i) => ({
    url,
    price: prices[i],
    sqm: sqms[i],
    title: titles[i],
  }));

  //supabase (backend)

  const { data: oldFlats } = await supabase.from("wohnungen").select("*");

  const newFlats = flatsDetails.filter(
    (flat) => oldFlats.every((oldFlat) => oldFlat.url !== flat.url) //every flat url must be different from newurl
  );
  // todo : send email to notify about new flats ( if newflats is not empty) ?

  const { error } = await supabase.from("wohnungen").insert(newFlats); // if newflats empty, not appended/ nothing happens
  console.log(error);
  await browser.close();
}

getFlats();
