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
const playerName = document.createElement("div");
const playerHistory = document.createElement("div");
const playerImage = document.createElement("img");
const level = document.createElement("div");
const matches = document.getElementById("matches");
const userInformation = document.getElementById("user");
const userName = document.getElementById("userName");
const userRank = document.getElementById("userRank");
const buttonReset = document.querySelector("#reset");
const buttonSearch = document.querySelector("#search");

const record = document.createElement("div");

inputSubmit.addEventListener("submit", onSubmitNickname);
buttonReset.addEventListener("click", onClickReset);

function onClickReset() {
  const information = document.getElementById("NicknameHistory");

  while (matches.firstChild) {
    matches.firstChild.remove();
  }

  while (userName.firstChild) {
    userName.firstChild.remove();
  }

  while (userRank.firstChild) {
    userRank.firstChild.remove();
  }

  userName.style = null;
  information.style = null;

  inputNickname.value = "";

  buttonSearch.removeAttribute("disabled");
}

// function onSubmitNickname(event) {
//   event.preventDefault();
//   const Nickname = inputNickname.value;
//   const information = document.getElementById("NicknameHistory");

//   const URL_NICKNAME = `https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname=${Nickname}`;
//   fetch(URL_NICKNAME, {
//     headers: {
//       Authorization: API_KEY,
//     },
//   })
//     .then((Response) => Response.json())
//     .then((data) => {
//       console.log(data);
//       level.innerText = `level. ${data.level}`;
//       information.appendChild(level);
//       const playerID = data.accessId;
//       const URL_HISTORY = `https://api.nexon.co.kr/fifaonline4/v1.0/users/${playerID}/maxdivision`;
//       const URL_MATCH = `https://api.nexon.co.kr/fifaonline4/v1.0/users/${playerID}/matches?matchtype=50&offset=1&limit=5`;
//       fetch(URL_HISTORY, {
//         headers: {
//           Authorization: API_KEY,
//         },
//       })
//         .then((Response) => Response.json())
//         .then((HistoryData) => {
//           Division.forEach((d) => {
//             if (d.divisionId === HistoryData[0].division) {
//               playerHistory.innerText = d.divisionName;
//               playerImage.src = `image/ico_rank${d.divisionId}.png`;
//               information.appendChild(playerHistory);
//               information.appendChild(playerImage);
//             }
//           });
//         });
//       const matchResult = [];
//       //
//       fetch(URL_MATCH, {
//         headers: {
//           Authorization: API_KEY,
//         },
//       })
//         .then((Response) => Response.json())
//         .then((matchData) => {
//           console.log(matchData);
//           matchData.forEach((d) => {
//             fetch(`https://api.nexon.co.kr/fifaonline4/v1.0/matches/${d}`, {
//               headers: {
//                 Authorization: API_KEY,
//               },
//             })
//               .then((Response) => Response.json())
//               .then((detailData) => {
//                 console.log(2);
//                 let time = detailData.matchDate;
//                 time = time.replace(/-/g, "");
//                 time = time.replace(/T/g, "");
//                 time = time.replace(/:/g, "");
//                 matchResult.push({
//                   date: time,
//                   result: detailData.matchInfo[0].matchDetail.matchResult,
//                 });
//               });
//           });
//           console.log(1);
//         });
//     });
// }
function onSubmitNickname(event) {
  buttonSearch.disabled = true;
  event.preventDefault();
  const Nickname = inputNickname.value;
  const information = document.getElementById("NicknameHistory");
  console.dir(information);
  information.style.width = "500px";
  information.style.padding = "50px";
  const URL_NICKNAME = `https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname=${Nickname}`;
  fetch(URL_NICKNAME, {
    headers: {
      Authorization: API_KEY,
    },
  })
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      console.log(userName);
      playerName.innerText = `${Nickname}님의 정보`;
      level.innerText = `level. ${data.level}`;
      userName.style.padding = "5px";
      userName.style.marginBottom = "30px";
      userName.appendChild(playerName);
      userRank.appendChild(level);
      const playerID = data.accessId;
      const URL_HISTORY = `https://api.nexon.co.kr/fifaonline4/v1.0/users/${playerID}/maxdivision`;
      const URL_MATCH = `https://api.nexon.co.kr/fifaonline4/v1.0/users/${playerID}/matches?matchtype=50&offset=1&limit=5`;

      fetch(URL_HISTORY, {
        headers: {
          Authorization: API_KEY,
        },
      })
        .then((Response) => Response.json())
        .then((HistoryData) => {
          Division.forEach((d) => {
            if (d.divisionId === HistoryData[0].division) {
              playerHistory.innerText = d.divisionName;
              playerImage.src = `image/ico_rank${d.divisionId}.png`;
              userRank.appendChild(playerHistory);
              userRank.appendChild(playerImage);
            }
          });
        });

      const matchResult = [];
      const fetchMatchPromises = [];

      fetch(URL_MATCH, {
        headers: {
          Authorization: API_KEY,
        },
      })
        .then((Response) => Response.json())
        .then((matchData) => {
          console.log(matchData);
          matchData.forEach((d) => {
            const fetchMatchPromise = fetch(
              `https://api.nexon.co.kr/fifaonline4/v1.0/matches/${d}`,
              {
                headers: {
                  Authorization: API_KEY,
                },
              }
            )
              .then((Response) => Response.json())
              .then((detailData) => {
                let time = detailData.matchDate;
                time = time.replace(/-/g, "");
                time = time.replace(/T/g, "");
                time = time.replace(/:/g, "");
                matchResult.push({
                  date: time,
                  result: detailData.matchInfo[0].matchDetail.matchResult,
                });
              });

            fetchMatchPromises.push(fetchMatchPromise);
          });

          Promise.all(fetchMatchPromises).then(() => {
            matchResult.sort((a, b) => {
              const dateA = new Date(
                parseInt(a.date.slice(0, 4)),
                parseInt(a.date.slice(4, 6)) - 1,
                parseInt(a.date.slice(6, 8)),
                parseInt(a.date.slice(8, 10)),
                parseInt(a.date.slice(10, 12)),
                parseInt(a.date.slice(12, 14))
              );
              const dateB = new Date(
                parseInt(b.date.slice(0, 4)),
                parseInt(b.date.slice(4, 6)) - 1,
                parseInt(b.date.slice(6, 8)),
                parseInt(b.date.slice(8, 10)),
                parseInt(b.date.slice(10, 12)),
                parseInt(b.date.slice(12, 14))
              );
              return dateB - dateA; // 역순으로 정렬하기 위해 dateB - dateA로 변경
            });
            // 여기에서 matchResult 배열이 완성된 상태이므로 원하는 작업을 수행할 수 있습니다.
            console.log(matchResult);
            // for (let i = 0; i <= 4; i++) {
            //   const matchRecord = document.createElement("div");
            //   matchRecord.className = "match";
            //   matchRecord.innerText = `${number} ${matchResult[i].result}`;
            //   matches.appendChild(matchRecord);
            // }
            console.log(matchResult);
            record.innerText = "최근 전적";
            record.className = "latest";
            matches.appendChild(record);

            matchResult.forEach((item) => {
              const matchRecord = document.createElement("div");
              const history = item.date.substr(0, 8);
              matchRecord.innerText = `${history} ${item.result}`;
              matches.append(matchRecord);
              console.log(item);
            });
          });
        });
    });
}

// fetch(URL_PLAYER)
//   .then((Response) => Response.json())
//   .then((data) => {
//     console.log(data);
//   });
