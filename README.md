# UnionAttackLogScanner

I started this as just a personal tool, but when I saw how helpful it could be, I thought, "Why not make it even easier for everyone else and save them from all that spreadsheet work?" So, here we are.<br>
As this project is still early in its development, checkout the [development roadmap](#development) for future improvments and development for this project.

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

This application relies on <a href='https://github.com/naptha/tesseract.js/tree/master'>tesseract.js</a> OCR Engine, to scane each image to extract its words. Here is a list of constraints and deficiencies:
| constraints | Status | Notes |
| :--------------------: | :----: | :---- |
| Language limitation | ⏳ | At the moment, this application exclusively supports English names. While it might be feasible to extend its functionality to other languages, further testing is necessary to ensure the reliability of tesseract.js in handling these variations.
| Inconsistant names | ❌ | Tesseract.js could be inconsistant ocationally, for example the name 'mimi' could result in both 'mimi' or 'miimi' being scanned. **If you see any names in the members list missing or damage being off on this bar chart, you might need to check the result of tesseract.js scan result and see if the name is being miss read** more [Troubleshoot](#Troubleshoot) below on how to configure this problem.
| Inconsistant damage | ❌ | As mentioned above, Tesseract.js could be inconsistant ocationally, some damage numbers might be off for exsample '1' could result in '7' or '5' => '3' <br>**So please take this into consideration when making a final dicision.** But the overall performance should be fairly accurate.

- 🎉 = **Completed!**
- ❌ = **Problem!**
- ⏳ = **Problem with solution!**

## Troubleshoot

As mentioned above this application could be inconsistent, you may encounter a few difficulties when using this application:
Here are some potentials issue with it's solutions. <br>
(more user friendly solution will be added in the future, checkout the [development roadmap](#development) for more information.)

After updating the memberList and scanning your images, if you spot any anomaly such as;

- names missing on the bar charts, or members showing up on the 0 attack used list when they have attacked.
- some members having lower damage numbers than expected.

The could be due to <a href='https://github.com/naptha/tesseract.js/tree/master'>tesseract.js</a> scanning the name differently as mentioned above in [Limitation](#Limitation). Follow the below steps to troubleshoot.

- Only include the image with the name that is experiencing problems.
- go to clearUp.js and uncomment line 9, and click submit on the appilcation.
- check the console in the browser and see what tesseract.js result is after scanning the image. is the name being miss-scanned?
- add a else if statment under line 28;

```bash
else if(element === 'tesseract.js miss-scan result'){
    filtered.push('correct name in memberList')
}
```

## Development

|                   Goal                   | Status | Notes                                                                    |
| :--------------------------------------: | :----: | :----------------------------------------------------------------------- |
|            Rearrange project             |   ⏳   | Move most functionaility to the back-end.                                |
| Add and remove images in the application |   ⏳   | Exploring possible options.                                              |
|     ease the troubleshooting process     |   ⏰   | The goal would be the user not having type a single line of code at all. |
|           Frontend improvement           |   ⏰   |

- 🎉 = **Completed!**
- ⏳ = **In progress!**
- ⏰ - **Waitlist!**
