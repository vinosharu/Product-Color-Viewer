
        var app = new Vue({
            el: '#app',
           data: {
   curOverBalls: {
                "ball1": 0,
                "ball2": 0,
                "ball3": 0,
                "ball4": 0,
                "ball5": 0,
                "ball6": 0
            },
            player1Scoreboard: [
                {
                    "playerId": 0,
                    "playerName": "",
                    "run": 0,
                    "ball": 0,
                    "fours": 0,
                    "sixs": 0,
                    "score": 0
                }
            ],
            player2Scoreboard: [
                {
                    "playerId": 0,
                    "playerName": "",
                    "run": 0,
                    "ball": 0,
                    "fours": 0,
                    "sixs": 0,
                    "score": 0
                }
            ],
            scoreDetails: [],
            overs: [],
            bowlers: [],
            players: [],
            extras: [],
            isGameOver: 0,
            noBallsCount: 0,
            totalNoOfOvers: 0,
            totalNoOfRuns: 0,
            totalWickets: 0,
            ballsCount: 0,
            curOver: 1,
            player1Id: 0,
            player1Name: "",
            player2Id: 0,
            player2Name: "",
            actPlayerId: 0,
            actPlayerName: "",
            nextPlayer: 0,
            curBowlerId: 0,
            curBowlerName: "",
            maxOversPerBowler: 0,

},
methods: {
             loadPlayers : function() {
            this.players.push({ "id": 1, "playerName": "TZ Player0", "captain": "N", "Wicketkeeper":"N" });
            this.players.push({ "id": 2, "playerName": "TZ Player1", "captain": "Y", "Wicketkeeper":"N" });
            this.players.push({ "id": 3, "playerName": "TZ Player2", "captain": "N", "Wicketkeeper":"N" });
            this.players.push({ "id": 4, "playerName": "TZ Player3", "captain": "N", "Wicketkeeper":"N" });
            this.players.push({ "id": 5, "playerName": "TZ Player4", "captain": "N", "Wicketkeeper":"Y" });
            this.players.push({ "id": 6, "playerName": "TZ Player5", "captain": "N", "Wicketkeeper":"N" });
            this.players.push({ "id": 7, "playerName": "TZ Player6", "captain": "N", "Wicketkeeper":"N" });
            this.players.push({ "id": 8, "playerName": "TZ Player7", "captain": "N", "Wicketkeeper":"N" });
            this.players.push({ "id": 9, "playerName": "TZ Player8", "captain": "N", "Wicketkeeper":"N" });
            this.players.push({ "id": 10, "playerName": "TZ Player9", "captain": "N", "Wicketkeeper":"N" });
            this.players.push({ "id": 11, "playerName": "TZ Player10", "captain": "N", "Wicketkeeper":"N" });
         },
            loadBowlers : function () {
            this.bowlers.push({ "id": 1, "playerName": "TA Player1", "completedOvers" :0 });
            this.bowlers.push({ "id": 2, "playerName": "TA Player2", "completedOvers": 0 });
            this.bowlers.push({ "id": 3, "playerName": "TA Player3", "completedOvers": 0 });
            this.bowlers.push({ "id": 4, "playerName": "TA Player4", "completedOvers": 0 });
            this.bowlers.push({ "id": 5, "playerName": "TA Player5", "completedOvers": 0 });
            this.bowlers.push({ "id": 6, "playerName": "TA Player6", "completedOvers": 0 });
            this.bowlers.push({ "id": 7, "playerName": "TA Player7", "completedOvers": 0 });
            this.bowlers.push({ "id": 8, "playerName": "TA Player8", "completedOvers": 0 });
            this.bowlers.push({ "id": 9, "playerName": "TA Player9", "completedOvers": 0 });
         },
             initData: function () {
            this.totalNoOfOvers = 20
            this.player1Id = this.players[0].id
            this.player1Name = this.players[0].playerName
            this.player2Id = this.players[1].id
            this.player2Name = this.players[1].playerName
            this.nextPlayer = 3
            this.maxOversPerBowler = this.totalNoOfOvers / 5
            this.curBowlerId = this.bowlers[0].id
            this.curBowlerName = this.bowlers[0].playerName
            this.player1Scoreboard.playerName = this.player1Name
            this.player2Scoreboard.playerName = this.player2Name
            this.actPlayerId = this.player1Id
            this.actPlayerName = this.player1Name
            this.ballsCount = 0
            this.fillOvers()
        },
        initCurPlayerScoreboard: function () {
            this.resetPlayerScoreboard(this.player1Scoreboard, 1)
            this.resetPlayerScoreboard(this.player2Scoreboard, 2)
            this.resetCurrentOverBalls()
        },
        fillOvers: function() {
            this.overs =[]
            for (var iRows=0; iRows < this.totalNoOfOvers; iRows++)
            {
                this.overs.push({"ball1": "", "ball2": "", "ball3": "", "ball4": "", "ball5": "", "ball6": ""})
            }
        },
        wideNoBallUpdate: function(ballType, addUpdate) {
            if (addUpdate == 'Add') {
                this.noBallsCount += 1
                this.extras.push({
                    "playerId": this.actPlayerId,
                    "coPlayerId": this.getCoPlayerId(),
                    "bowlerId": this.curBowlerId,
                    "over": this.curOver,
                    "ball": this.noBallsCount, 
                    "runs": 0,
                    "status": ballType,
                    "nextPlayer": this.nextPlayer,
                    "nextBattingPlayerId": ""
                })
            }
        },
        updateRun: function (selRun) {
            this.overEnd = true;
            if (this.isGameOver == 1) {
                this.$q.notify('Game Over')
                return
            }

            if (this.ballsCount == 0)
                this.resetCurrentOverBalls()

            if (this.ballsCount + 1 <= 6)
                this.ballsCount += 1
            else
                this.ballsCount = 6

            var bIsGameOver = false
            if (this.curOver == this.totalNoOfOvers && this.ballsCount == 6) {
                bIsGameOver = true
                this.isGameOver = 1
            }

            //Update current over balls and runs
            switch (this.ballsCount) {
                case 1:
                    this.curOverBalls.ball1 = selRun
                    this.overs[this.curOver -1].ball1 = selRun
                    break;
                case 2:
                    this.curOverBalls.ball2 = selRun
                    this.overs[this.curOver -1].ball2 = selRun
                    break;
                case 3:
                    this.curOverBalls.ball3 = selRun
                    this.overs[this.curOver -1].ball3 = selRun
                    break;
                case 4:
                    this.curOverBalls.ball4 = selRun
                    this.overs[this.curOver -1].ball4 = selRun
                    break;
                case 5:
                    this.curOverBalls.ball5 = selRun
                    this.overs[this.curOver -1].ball5 = selRun
                    break;
                case 6:
                    this.curOverBalls.ball6 = selRun
                    this.overs[this.curOver -1].ball6 = selRun
                    break;
            }

            //Maintain core data
            this.scoreDetails.push({
                "playerId": this.actPlayerId,
                "coPlayerId": this.getCoPlayerId(),
                "bowlerId": this.curBowlerId,
                "over": this.curOver,
                "ball": this.ballsCount, 
                "runs": selRun,
                "status": "",
                "nextPlayer": this.nextPlayer,
                "nextBattingPlayerId": ""
            })

            //Increment over when ball count reached 6
            if (this.ballsCount == 6) {
                this.updateOver(this.curBowlerId)
            }


            //swap player when run is odd number
            if (bIsGameOver == false) {
                if (selRun == 1 || selRun == 3 || selRun == 5 || selRun == 7 || selRun == 9) {
                    this.swapPlayer()
                }
            }

            //Change over when ball count reached 6
            if (this.ballsCount >= 6 && bIsGameOver == false) {
                this.swapPlayer()
                this.curOver += 1
                this.ballsCount = 0
            }

            if (bIsGameOver == false) {
                this.scoreDetails[this.scoreDetails.length - 1].nextBattingPlayerId = this.actPlayerId
            }

            console.log("Balls count: " + this.ballsCount)
            console.log("Current Over: " + this.curOver)
            console.log("Current run passed: " + selRun)
            this.actPlayerName = this.getActivePlayerName()
            this.updateScoreboard()

        },
        updateOver: function(curBowler) {
            var itemIndex = this.bowlers.findIndex(x => x.id == curBowler)
            if (itemIndex != -1) {
                this.bowlers[itemIndex].completedOvers = parseInt(this.bowlers[itemIndex].completedOvers) + 1
            }
        },
        updateScoreboard: function() {
            var totalRuns = 0
            var totalBalls = 0
            var total4s = 0
            var total6s = 0
            var totalScores = 0
            var rowNo = 0

            var result = this.scoreDetails.filter((x) => { return x.playerId == this.player1Id; });
            for (rowNo = 0; rowNo <= result.length - 1; rowNo++) {
                totalBalls += 1
                totalRuns += parseInt(result[rowNo].runs)
                if (parseInt(result[rowNo].runs) == 4)
                    total4s += 1

                if (parseInt(result[rowNo].runs) == 6)
                    total6s += 1
            }

            this.player1Scoreboard.ball = totalBalls
            this.player1Scoreboard.run = totalRuns
            this.player1Scoreboard.fours = total4s
            this.player1Scoreboard.sixs = total6s

            totalRuns = 0
            totalBalls = 0
            total4s = 0
            total6s = 0
            totalScores = 0
            rowNo = 0

            var result = this.scoreDetails.filter((x) => { return x.playerId == this.player2Id; });
            for (rowNo = 0; rowNo <= result.length - 1; rowNo++) {
                totalBalls += 1
                totalRuns += parseInt(result[rowNo].runs)

                if (parseInt(result[rowNo].runs) == 4)
                    total4s += 1

                if (parseInt(result[rowNo].runs) == 6)
                    total6s += 1
            }

            this.player2Scoreboard.ball = totalBalls
            this.player2Scoreboard.run = totalRuns
            this.player2Scoreboard.fours = total4s
            this.player2Scoreboard.sixs = total6s

            //Get total runs
            this.totalNoOfRuns = this.scoreDetails.reduce(function (sum, runCount) {
                return sum + runCount.runs;
            }, 0)
        },
        swapPlayer() {
            if (this.actPlayerId == this.player1Id) {
                this.actPlayerId = this.player2Id
            }
            else {
                this.actPlayerId = this.player1Id
            }
            this.actPlayerName = this.getActivePlayerName()
        },
        changeNextPlayer: function (outType) {
            this.scoreDetails.push({
                "playerId": this.actPlayerId,
                "coPlayerId": this.getCoPlayerId(),
                "bowlerId": this.curBowlerId,
                "over": this.curOver,
                "ball": this.ballsCount + 1,
                "runs": 0,
                "status": outType,
                "nextPlayer": this.nextPlayer,
                "nextBattingPlayerId": 0
            })

            if ((this.ballsCount + 1) < 6) {
                this.ballsCount += 1
            }
            else { 
                this.ballsCount = 0
                this.curOver += 1
            }

            this.totalWickets += 1

            if (this.actPlayerId == this.player1Id) {
                this.player1Id = this.players[this.nextPlayer - 1].id
                this.player1Name = this.players[this.nextPlayer - 1].playerName
                this.actPlayerId = this.player1Id

                //Update batting player list
                this.resetPlayerScoreboard(this.player1Scoreboard, 1)
                this.player1Scoreboard.playerName = this.player1Name
            }
            else {
                this.player2Id = this.players[this.nextPlayer - 1].id
                this.player2Name = this.players[this.nextPlayer - 1].playerName
                this.actPlayerId = this.player2Id

                //Update batting player list
                this.resetPlayerScoreboard(this.player2Scoreboard, 2)
                this.player2Scoreboard.playerName = this.player2Name
            }
            this.nextPlayer = this.players[this.nextPlayer] + 1
            this.actPlayerName = this.getActivePlayerName()
            this.scoreDetails[this.scoreDetails.length - 1].nextBattingPlayerId = this.actPlayerId
        },
        getActivePlayerName: function () {
            var actPlayerName = ""

            if (this.actPlayerId == this.player1Id)
                actPlayerName = this.player1Name
            else
                actPlayerName = this.player2Name

            return actPlayerName
        },
        resetPlayerScoreboard: function (oPlayerScoreboard, whichPlayer) {
            if (whichPlayer == 1) 
                this.player1Scoreboard.playerName = ""
            else
                this.player2Scoreboard.playerName = ""

            oPlayerScoreboard.run = 0
            oPlayerScoreboard.ball = 0
            oPlayerScoreboard.fours = 0
            oPlayerScoreboard.sixs = 0
            oPlayerScoreboard.score = 0
        },
        resetCurrentOverBalls: function () {
            this.curOverBalls.ball1 = ""
            this.curOverBalls.ball2 = ""
            this.curOverBalls.ball3 = ""
            this.curOverBalls.ball4 = ""
            this.curOverBalls.ball5 = ""
            this.curOverBalls.ball6 = ""
        },
        undoAll() {
            var tempPlayerName = "";
            var iRowPos = 0
            var iRuns = 0
            if (this.scoreDetails != null) {
                if (this.scoreDetails.length > 0) {
                    var lastBall = parseInt(this.scoreDetails[this.scoreDetails.length-1].ball)
                    var lastOver = parseInt(this.scoreDetails[this.scoreDetails.length-1].over)
                    switch(lastBall)
                    {
                        case 1:
                            this.overs[lastOver -1].ball1 = ""
                            break;
                        case 2:  
                            this.overs[lastOver-1].ball2 = ""
                            break;
                        case 3:
                            this.overs[lastOver -1].ball3 = ""
                            break;
                        case 4:
                            this.overs[lastOver -1].ball4 = ""
                            break;
                        case 5:
                            this.overs[lastOver -1].ball5 = ""
                            break;
                        case 6:
                            this.overs[lastOver -1].ball6 = ""
                            break;
                    }
                    this.scoreDetails.splice(this.scoreDetails.length-1, 1)
                }

                if (this.scoreDetails.length > 0) {
                    iRowPos = this.scoreDetails.length - 1
                    this.player1Id = this.scoreDetails[iRowPos].playerId
                    tempPlayerName = this.findPlayerById(this.player1Id)
                    this.player1Scoreboard.playerId = this.player1Id
                    this.player1Scoreboard.playerName = tempPlayerName
                    this.player1Name = tempPlayerName

                    this.player2Id = this.scoreDetails[iRowPos].coPlayerId
                    tempPlayerName = this.findPlayerById(this.player2Id)
                    this.player2Scoreboard.playerId = this.player2Id
                    this.player2Scoreboard.playerName = tempPlayerName
                    this.player2Name = tempPlayerName

                    this.curBowlerId = this.scoreDetails[iRowPos].bowlerId
                    this.curOver = this.scoreDetails[iRowPos].over
                    this.ballsCount = this.scoreDetails[iRowPos].ball
                    this.nextPlayer = this.scoreDetails[iRowPos].nextPlayer

                    this.actPlayerId = this.scoreDetails[iRowPos].nextBattingPlayerId
                    tempPlayerName = this.findPlayerById(this.actPlayerId)
                    this.actPlayerName = tempPlayerName

                    this.curOverBalls.ball1 = this.overs[this.curOver -1].ball1
                    this.curOverBalls.ball2 = this.overs[this.curOver -1].ball2
                    this.curOverBalls.ball3 = this.overs[this.curOver -1].ball3
                    this.curOverBalls.ball4 = this.overs[this.curOver -1].ball4
                    this.curOverBalls.ball5 = this.overs[this.curOver -1].ball5
                    this.curOverBalls.ball6 = this.overs[this.curOver -1].ball6

                    this.updateScoreboard()
                }
                else {
                    this.initCurPlayerScoreboard()
                    this.initData()
                }
            }

            if (this.curOver <= this.totalNoOfOvers && this.ballsCount < 6 )
                this.isGameOver = 0

            this.updateScoreboard()
        },
        getCoPlayerId: function () {
            var coPlayerId = 0;
            if (this.actPlayerId == this.player1Id)
                coPlayerId = this.player2Id
            else
                coPlayerId = this.player1Id

            return coPlayerId
        },
        findPlayerById: function (playerId) {
            var Id = 0
            var playerName = ""
            var itemIndex  = this.players.findIndex(x => x.id == playerId)
                if (itemIndex != -1) {
                    Id = this.players[itemIndex].id
                    playerName = this.players[itemIndex].playerName
                }
                return playerName
                //return {id: Id, name: playerName}
            }
        },
        watch: {
            ballsCount: function () {

            }
        },
        created() {
            console.log(this.scoreDetails.length)
            this.initCurPlayerScoreboard()
            this.loadBowlers()
            this.loadPlayers()
            this.initData()
        },
        mounted: function () {
            //if (this.curOverBalls["ball6"] == undefined) {
            //    console.log("not found")
            //}
            //else { console.log("found") }
        }
        })
