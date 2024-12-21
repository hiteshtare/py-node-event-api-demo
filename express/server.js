"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const { readFile, readFileSync } = require("fs").promises;
const morgan = require("morgan");

const router = express.Router();
router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>PY - Hello from Express.js!</h1>");
  res.end();
});

router.get("/events", async (req, res) => {
  let centerid = req.query.centerid;
  let languageid = req.query.languageid;

  if (!languageid) languageid = "en";

  let data;
  if (!centerid && !languageid) {
    data = [
      {
        event_id: 2,
        event_title: "ALL EVENTS - Christmas",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Jesus-Christ-Featured-Image-Ranchi-Ashram-Homepage-Events-Section-300x300.jpg",
        event_date: [
          {
            date_id: 7,
            date: "24 Dec 2024",
            desc: "Long Meditation",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "10:00 AM to 6:00 PM",
                schedule_name: "8-hours Meditation",
              },
            ],
          },
          {
            date_id: 6,
            date: "25 Dec 2024",
            desc: "Merry Christmas",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "6:30 AM to 8:00 AM",
                schedule_name: "Morning Meditation",
              },
              {
                schedule_id: 2,
                schedule_time: "9:30 AM to 11:30 AM",
                schedule_name: "Guru Puja",
              },
              {
                schedule_id: 3,
                schedule_time: "6:00 PM to 9:00 PM",
                schedule_name: "Evening Meditation",
              },
            ],
          },
        ],
      },
      {
        event_id: 3,
        event_title: "ALL EVENTS - New Years Eve",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Christmas-Commemorations-at-YSS-Ashrams-Jesus-Christ-Featured-Image-Additional-300x300.jpg",
        event_date: [
          {
            date_id: 8,
            date: "31 Dec 2024",
            desc: "Happy New Year",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "11:30 PM to 12:30 AM",
                schedule_name: "Special New Years Eve Meditation",
              },
            ],
          },
        ],
      },
      {
        event_id: 5,
        event_title: "ALL EVENTS - Gurudeva’s Janmotsav",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Paramahansa-Yogananda-Standard-Image-Ranchi-Ashram-Homepage-Events-Section-300x300.jpg",
        event_date: [
          {
            date_id: 9,
            date: "5 Jan 2025",
            desc: "The celebrations of the 124th Birth Anniversary of Sri Sri Paramahansa Yogananda (1893-1952), author of the spiritual classic ‘Autobiography of a Yogi’, and the centenary of the Yogoda Satsanga Society of India (YSS) took place on 5th Jan in Ranchi",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "6:40 AM to 8:00 AM",
                schedule_name: "Morning Meditation",
              },
              {
                schedule_id: 2,
                schedule_time: "6:00 PM to 7:40 PM",
                schedule_name: "Evening Meditation",
              },
            ],
          },
        ],
      },
    ];
  } else if (centerid == "36" && languageid == "en") {
    data = [
      {
        event_id: 2,
        event_title: "RANCHI - Christmas",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Jesus-Christ-Featured-Image-Ranchi-Ashram-Homepage-Events-Section-300x300.jpg",
        event_date: [
          {
            date_id: 7,
            date: "24 Dec 2024",
            desc: "Long Meditation",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "10:00 AM to 6:00 PM",
                schedule_name: "8-hours Meditation",
              },
            ],
          },
          {
            date_id: 6,
            date: "25 Dec 2024",
            desc: "Merry Christmas",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "6:30 AM to 8:00 AM",
                schedule_name: "Morning Meditation",
              },
              {
                schedule_id: 2,
                schedule_time: "9:30 AM to 11:30 AM",
                schedule_name: "Guru Puja",
              },
              {
                schedule_id: 3,
                schedule_time: "6:00 PM to 9:00 PM",
                schedule_name: "Evening Meditation",
              },
            ],
          },
        ],
      },
      {
        event_id: 3,
        event_title: "RANCHI - New Years Eve",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Christmas-Commemorations-at-YSS-Ashrams-Jesus-Christ-Featured-Image-Additional-300x300.jpg",
        event_date: [
          {
            date_id: 8,
            date: "31 Dec 2024",
            desc: "Happy New Year",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "11:30 PM to 12:30 AM",
                schedule_name: "Special New Years Eve Meditation",
              },
            ],
          },
        ],
      },
      {
        event_id: 5,
        event_title: "RANCHI - Gurudeva’s Janmotsav",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Paramahansa-Yogananda-Standard-Image-Ranchi-Ashram-Homepage-Events-Section-300x300.jpg",
        event_date: [
          {
            date_id: 9,
            date: "5 Jan 2025",
            desc: "The celebrations of the 124th Birth Anniversary of Sri Sri Paramahansa Yogananda (1893-1952), author of the spiritual classic ‘Autobiography of a Yogi’, and the centenary of the Yogoda Satsanga Society of India (YSS) took place on 5th Jan in Ranchi",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "6:40 AM to 8:00 AM",
                schedule_name: "Morning Meditation",
              },
              {
                schedule_id: 2,
                schedule_time: "6:00 PM to 7:40 PM",
                schedule_name: "Evening Meditation",
              },
            ],
          },
        ],
      },
    ];
  } else if (centerid == "36" && languageid == "hi") {
    data = [
      {
        event_id: 2,
        event_title: "RANCHI - क्रिसमस",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Jesus-Christ-Featured-Image-Ranchi-Ashram-Homepage-Events-Section-300x300.jpg",
        event_date: [
          {
            date_id: 7,
            date: "24 दिसम्बर 2024",
            desc: "दीर्घ ध्यान",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "10:00 AM to 6:00 PM",
                schedule_name: "8 घंटे का ध्यान",
              },
            ],
          },
          {
            date_id: 6,
            date: "25 दिसम्बर 2024",
            desc: "क्रिसमस की बधाई",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "6:30 AM to 8:00 AM",
                schedule_name: "प्रातः ध्यान",
              },
              {
                schedule_id: 2,
                schedule_time: "9:30 AM to 11:30 AM",
                schedule_name: "गुरु पूजा",
              },
              {
                schedule_id: 3,
                schedule_time: "6:00 PM to 9:00 PM",
                schedule_name: "संध्या ध्यान",
              },
            ],
          },
        ],
      },
      {
        event_id: 3,
        event_title: "RANCHI - नववर्ष की पूर्वसंध्या",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Christmas-Commemorations-at-YSS-Ashrams-Jesus-Christ-Featured-Image-Additional-300x300.jpg",
        event_date: [
          {
            date_id: 8,
            date: "31 दिसम्बर 2024",
            desc: "नए साल की शुभकामनाएँ",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "11:30 PM to 12:30 AM",
                schedule_name: "नववर्ष की पूर्वसंध्या पर विशेष ध्यान",
              },
            ],
          },
        ],
      },
      {
        event_id: 5,
        event_title: "RANCHI - गुरुदेव का जन्मोत्सव",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Paramahansa-Yogananda-Standard-Image-Ranchi-Ashram-Homepage-Events-Section-300x300.jpg",
        event_date: [
          {
            date_id: 9,
            date: "5 जनवरी 2025",
            desc: "आध्यात्मिक क्लासिक 'ऑटोबायोग्राफी ऑफ ए योगी' के लेखक श्री श्री परमहंस योगानंद (1893-1952) की 124वीं जयंती और योगदा सत्संग सोसाइटी ऑफ इंडिया (वाईएसएस) की शताब्दी का समारोह 5 जनवरी को रांची में मनाया गया।",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "6:40 AM to 8:00 AM",
                schedule_name: "प्रातः ध्यान",
              },
              {
                schedule_id: 2,
                schedule_time: "6:00 PM to 7:40 PM",
                schedule_name: "संध्या ध्यान",
              },
            ],
          },
        ],
      },
    ];
  } else if (centerid == "36" && languageid == "ta") {
    data = [
      {
        event_id: 2,
        event_title: "RANCHI - கிறிஸ்துமஸ்",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Jesus-Christ-Featured-Image-Ranchi-Ashram-Homepage-Events-Section-300x300.jpg",
        event_date: [
          {
            date_id: 7,
            date: "24 டிசம்பர் 2024",
            desc: "நீண்ட தியானம்",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "10:00 AM to 6:00 PM",
                schedule_name: "8 மணி நேர தியானம்",
              },
            ],
          },
          {
            date_id: 6,
            date: "25 டிசம்பர் 2024",
            desc: "கிறிஸ்துமஸ் வாழ்த்துக்கள்",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "6:30 AM to 8:00 AM",
                schedule_name: "காலை தியானம்",
              },
              {
                schedule_id: 2,
                schedule_time: "9:30 AM to 11:30 AM",
                schedule_name: "குரு பூஜை",
              },
              {
                schedule_id: 3,
                schedule_time: "6:00 PM to 9:00 PM",
                schedule_name: "மாலை தியானம்",
              },
            ],
          },
        ],
      },
      {
        event_id: 3,
        event_title: "RANCHI - புத்தாண்டு ஈவ்",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Christmas-Commemorations-at-YSS-Ashrams-Jesus-Christ-Featured-Image-Additional-300x300.jpg",
        event_date: [
          {
            date_id: 8,
            date: "31 டிசம்பர் 2024",
            desc: "புத்தாண்டு வாழ்த்துக்கள்",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "11:30 PM to 12:30 AM",
                schedule_name: "புத்தாண்டு தினத்தன்று சிறப்பு கவனம்",
              },
            ],
          },
        ],
      },
      {
        event_id: 5,
        event_title: "RANCHI - குருதேவரின் ஜன்மோத்ஸவ்",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Paramahansa-Yogananda-Standard-Image-Ranchi-Ashram-Homepage-Events-Section-300x300.jpg",
        event_date: [
          {
            date_id: 9,
            date: "5 ஜனவரி 2025",
            desc: "'யோகியின் சுயசரிதை' என்ற ஆன்மீகக் கிளாசிக் நூலை எழுதிய ஸ்ரீ ஸ்ரீ பரமஹம்ச யோகானந்தாவின் (1893-1952) 124வது பிறந்தநாள் விழாவும், இந்தியாவின் யோகாதா சத்சங்க சொசைட்டியின் (YSS) நூற்றாண்டு விழாவும் ராஞ்சியில் ஜனவரி 5ஆம் தேதி நடைபெற்றது.",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "6:40 AM to 8:00 AM",
                schedule_name: "காலை தியானம்",
              },
              {
                schedule_id: 2,
                schedule_time: "6:00 PM to 7:40 PM",
                schedule_name: "மாலை தியானம்",
              },
            ],
          },
        ],
      },
    ];
  } else if (centerid == "41" && languageid == "en") {
    data = [
      {
        event_id: 2,
        event_title: "CHENNAI - Christmas",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Jesus-Christ-Featured-Image-Ranchi-Ashram-Homepage-Events-Section-300x300.jpg",
        event_date: [
          {
            date_id: 7,
            date: "24 Dec 2024",
            desc: "Long Meditation",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "10:00 AM to 6:00 PM",
                schedule_name: "8-hours Meditation",
              },
            ],
          },
          {
            date_id: 6,
            date: "25 Dec 2024",
            desc: "Merry Christmas",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "6:30 AM to 8:00 AM",
                schedule_name: "Morning Meditation",
              },
              {
                schedule_id: 2,
                schedule_time: "9:30 AM to 11:30 AM",
                schedule_name: "Guru Puja",
              },
              {
                schedule_id: 3,
                schedule_time: "6:00 PM to 9:00 PM",
                schedule_name: "Evening Meditation",
              },
            ],
          },
        ],
      },
      {
        event_id: 5,
        event_title: "CHENNAI - Gurudeva’s Janmotsav",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Paramahansa-Yogananda-Standard-Image-Ranchi-Ashram-Homepage-Events-Section-300x300.jpg",
        event_date: [
          {
            date_id: 9,
            date: "5 Jan 2025",
            desc: "The celebrations of the 124th Birth Anniversary of Sri Sri Paramahansa Yogananda (1893-1952), author of the spiritual classic ‘Autobiography of a Yogi’, and the centenary of the Yogoda Satsanga Society of India (YSS) took place on 5th Jan in Ranchi",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "6:40 AM to 8:00 AM",
                schedule_name: "Morning Meditation",
              },
              {
                schedule_id: 2,
                schedule_time: "6:00 PM to 7:40 PM",
                schedule_name: "Evening Meditation",
              },
            ],
          },
        ],
      },
    ];
  } else if (centerid == "41" && languageid == "ta") {
    data = [
      {
        event_id: 2,
        event_title: "CHENNAI - கிறிஸ்துமஸ்",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Jesus-Christ-Featured-Image-Ranchi-Ashram-Homepage-Events-Section-300x300.jpg",
        event_date: [
          {
            date_id: 7,
            date: "24 டிசம்பர் 2024",
            desc: "நீண்ட தியானம்",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "10:00 AM to 6:00 PM",
                schedule_name: "8 மணி நேர தியானம்",
              },
            ],
          },
          {
            date_id: 6,
            date: "25 டிசம்பர் 2024",
            desc: "கிறிஸ்துமஸ் வாழ்த்துக்கள்",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "6:30 AM to 8:00 AM",
                schedule_name: "காலை தியானம்",
              },
              {
                schedule_id: 2,
                schedule_time: "9:30 AM to 11:30 AM",
                schedule_name: "குரு பூஜை",
              },
              {
                schedule_id: 3,
                schedule_time: "6:00 PM to 9:00 PM",
                schedule_name: "மாலை தியானம்",
              },
            ],
          },
        ],
      },
      {
        event_id: 5,
        event_title: "CHENNAI - குருதேவரின் ஜன்மோத்ஸவ்",
        event_image:
          "https://yssofindia.org/wp-content/uploads/2024/09/Paramahansa-Yogananda-Standard-Image-Ranchi-Ashram-Homepage-Events-Section-300x300.jpg",
        event_date: [
          {
            date_id: 9,
            date: "5 ஜனவரி 2025",
            desc: "'யோகியின் சுயசரிதை' என்ற ஆன்மீகக் கிளாசிக் நூலை எழுதிய ஸ்ரீ ஸ்ரீ பரமஹம்ச யோகானந்தாவின் (1893-1952) 124வது பிறந்தநாள் விழாவும், இந்தியாவின் யோகாதா சத்சங்க சொசைட்டியின் (YSS) நூற்றாண்டு விழாவும் ராஞ்சியில் ஜனவரி 5ஆம் தேதி நடைபெற்றது.",
            schedule: [
              {
                schedule_id: 1,
                schedule_time: "6:40 AM to 8:00 AM",
                schedule_name: "காலை தியானம்",
              },
              {
                schedule_id: 2,
                schedule_time: "6:00 PM to 7:40 PM",
                schedule_name: "மாலை தியானம்",
              },
            ],
          },
        ],
      },
    ];
  } else {
    data = [
      {
        message: "Jai Guru! 404 Wrong endpoint or queryparams :-(",
      },
    ];
  }

  res.type("application/json");
  res.send(data);
});

//Middlewares
app.use(morgan("dev")); // Logging

app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
