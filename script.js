// 게임 선수 불러오기
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6IjQwMzMxMzgyMCIsImF1dGhfaWQiOiIyIiwiZXhwIjoxNzAzOTI4MzAxLCJpYXQiOjE2ODgzNzYzMDEsIm5iZiI6MTY4ODM3NjMwMSwic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsInRva2VuX3R5cGUiOiJBY2Nlc3NUb2tlbiJ9.z1JIMVbhJKVynLbXtv5Gx4diU6TGaEvvTfSARmLZ_Io";
const URL_PLAYER =
  "https://static.api.nexon.co.kr/fifaonline4/latest/spid.json";

// 등급
const Division = [
  {
    divisionId: 800,
    divisionName: "슈퍼챔피언스",
  },
  {
    divisionId: 900,
    divisionName: "챔피언스",
  },
  {
    divisionId: 1000,
    divisionName: "슈퍼챌린지",
  },
  {
    divisionId: 1100,
    divisionName: "챌린지1",
  },
  {
    divisionId: 1200,
    divisionName: "챌린지2",
  },
  {
    divisionId: 1300,
    divisionName: "챌린지3",
  },
  {
    divisionId: 2000,
    divisionName: "월드클래스1",
  },
  {
    divisionId: 2100,
    divisionName: "월드클래스2",
  },
  {
    divisionId: 2200,
    divisionName: "월드클래스3",
  },
  {
    divisionId: 2300,
    divisionName: "프로1",
  },
  {
    divisionId: 2400,
    divisionName: "프로2",
  },
  {
    divisionId: 2500,
    divisionName: "프로3",
  },
  {
    divisionId: 2600,
    divisionName: "세미프로1",
  },
  {
    divisionId: 2700,
    divisionName: "세미프로2",
  },
  {
    divisionId: 2800,
    divisionName: "세미프로3",
  },
  {
    divisionId: 2900,
    divisionName: "유망주1",
  },
  {
    divisionId: 3000,
    divisionName: "유망주2",
  },
  {
    divisionId: 3100,
    divisionName: "유망주3",
  },
];

const inputNickname = document.getElementById("inputNickname");
const inputSubmit = document.getElementById("inputSubmit");
//const playerName = document.getElementById("playerName");
const playerHistory = document.createElement("div");
const playerImage = document.createElement("img");

function onSubmitNickname(event) {
  event.preventDefault();
  const Nickname = inputNickname.value;
  const information = document.getElementById("NicknameHistory");

  const URL_NICKNAME = `https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname=${Nickname}`;
  fetch(URL_NICKNAME, {
    headers: {
      Authorization: API_KEY,
    },
  })
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      information.innerText = data.level;
      const playerID = data.accessId;
      const URL_HISTORY = `https://api.nexon.co.kr/fifaonline4/v1.0/users/${playerID}/maxdivision`;
      fetch(URL_HISTORY, {
        headers: {
          Authorization: API_KEY,
        },
      })
        .then((Response) => Response.json())
        .then((HistoryData) => {
          console.log(HistoryData);
          Division.forEach((d) => {
            if (d.divisionId === HistoryData[0].division) {
              playerHistory.innerText = d.divisionName;
              playerImage.href = `image/ico_rank_${d.divisionId}.png`;
              console.dir(playerImage);
              document.body.appendChild(playerHistory);
              document.body.appendChild(playerImage);
            }
          });
        });
    });
}

// fetch(URL_PLAYER)
//   .then((Response) => Response.json())
//   .then((data) => {
//     console.log(data);
//   });

inputSubmit.addEventListener("submit", onSubmitNickname);
