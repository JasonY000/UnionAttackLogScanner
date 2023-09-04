# UnionAttackLogScanner

## Introduction

UnionAttackLogScanner is tool that aims remove tediouse spreadsheet work for tracking union member damage in NIKKE. simple drag in screenshots of damage logs, and click submit, the application will take care of the rest and present you with a bar chart and notify you of any slackers.
<img src="./public/Screenshot 2023-09-04 at 4.27.10 PM.png" width="900px"/><br>

## Getting Started

To get started, clone this repo onto your machine and open your terminal with the root directory pointed to this repo and type:

```bash
npm install
```

then type in

```bash
npm run dev
```

On your browser, localhost:8080 should appear, and you are now running our application!<br>Next you would take screenshots of the union damage logs and put them in the nikkeLog directory.

```bash
/src/nikkeLog
```

Below is a example of the image: **(make sure the image is cropped just like below!)** <br>
<img src="./__test__/testImage/image_1.jpg" width="300px"/><br>
After that, navagate to **memberList.js** in src directory and input all the members name (English only, More information in [Limitation](#Limitation))<br>
Finially, you are ready to press submit on the website. Depending on how many images there are, the wait time may vary.

## Limitation

This application relise on <a href='https://github.com/naptha/tesseract.js/tree/master'>tesseract.js</a> OCR Engine, to scane each image to extract its words. Here is a list of constraints and deficiencies:
| constraints | Status | Notes |
| :--------------------: | :----: | :---- |
| Language limitation | ⏳ | At the moment, this application exclusively supports English names. While it might be feasible to extend its functionality to other languages, further testing is necessary to ensure the reliability of tesseract.js in handling these variations.
| Inconsistant names | ❌ | Tesseract.js could be inconsistant ocationally, for example the name 'mimi' could result in both 'mimi' or 'miimi' being scanned. **If you see any names in the members list missing or damage being off on this bar chart, you might need to check the result of tesseract.js scan result and see if the name is being miss read** more [Troubleshoot](#Troubleshoot) below on how to configure this problem.

- 🎉 = **Completed!**
- ❌ = **Problem!**
- ⏳ = **Problem with solution!**

##Troubleshoot
