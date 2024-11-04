class P4 {
    constructor(selector, options) {
        this.options = options;
        this.ROW = options.ROW;
        this.COL = options.COL;
        this.selector = selector;
        this.P1 = options.P1;
        this.P2 = options.P2;
        this.player = this.P1;
        this.colorone = options.colorone;
        this.colortwo = options.colortwo;
        this.color = this.colorone;
        this.turn = $('#OTK');
        this.count = 1;
        this.compteur = $('#count');
        this.GameOver = 0;
        this.restart = $('#restart');

        //  this.undo();
        this.createGame();
        this.fonc();
    }

    // bouton

    //display du jeu
    createGame() {
        const game = document.createElement('div');
        document.querySelector('body').appendChild(game);
        game.setAttribute('id', "game");
        this.turn.html(`Player ${this.player}`);
        this.compteur.html(`Tour ${this.count}`);
        const $jeu = $(this.selector);
        for (let row = 0; row < this.ROW; row++) {
            const $row = $('<div>').addClass('row');
            $row.attr('id', 'g' + row);
            for (let col = 0; col < this.COL; col++) {
                const $col = $('<div>').addClass('col empty').attr("data-col", col).attr("data-row", row);
                $col.attr('id', 'c' + col);
                $row.append($col);
            }
            $jeu.append($row);
        }
        //html

        // tout le css
        $('body').css({
            'background': 'radial-gradient(circle, rgba(238,174,202,1) 28%, rgba(148,187,233,1) 88%)'
        });
        $('body').css({
            'text-align': 'center'
        });
        $('#game').css({
            'background-color': 'navy'
        });
        $('#game').css({
            'display': 'inline-block'
        });
        $('#game').css({
            'border-radius': '10px'
        });
        $('#game').css({
            'text-align': 'center'
        });
        $('#game').css({
            'margin-top': '1rem'
        });
        $('#game').css({
            'rotate': '-90deg'
        });
        $('.col').css({
            'width': '50px'
        });
        $('.col').css({
            'border': 'solid 3px #E5CCFF'
        });
        $('.col').css({
            'height': '50px'
        });
        $('.col').css({
            'border-radius': '50%'
        });
        $('.col').css({
            'margin': '5px'
        });
        $('.col').css({
            'display': 'inline-block'
        });
        $('.col.empty').css({
            'cursor': 'pointer'
        });
        $('.col.empty').css({
            'background-color': 'white'
        });
        $('#OTK').css({
            'background-color': 'grey'
        });
        $('#OTK').css({
            'border': '1px solid black'
        });
        $('#OTK').css({
            'height': '30px'
        });
        $('#OTK').css({
            'text-align': 'center'
        });
        $('#OTK').css({
            'width': '20%'
        });
        $('#OTK').css({
            'display': 'block'
        });
        $('#count').css({
            'background-color': 'grey'
        });
        $('#count').css({
            'border': '1px solid black'
        });
        $('#count').css({
            'height': '30px'
        });
        $('#count').css({
            'text-align': 'center'
        });
        $('#count').css({
            'width': '10%'
        });
        $('#count').css({
            'display': 'block'
        });
        var turn = this.turn;
        var compteur = this.compteur;
        var p1 = this.P1;
        $("#restart").on("click", function () {
            $('.col').css({
                "background-color": "white"
            });
            turn.html(`Player ${p1}`);
            compteur.html(`Tour 1`);
        });
    }
    fonc() {
        const $jeu = $(this.selector);
        const that = this;
        $jeu.on('click', '.col.empty', function () {
            that.color = that.color === that.colorone ? that.colortwo : that.colorone;
            that.player = that.player === that.P1 ? that.P2 : that.P1;
            that.turn.html(`Player ${that.player}`);
            if (that.colorone = "red") {
                that.colorone = "rgb(255, 0, 0)";
            }
            if (that.colortwo = "yellow") {
                that.colortwo = "rgb(255, 255, 0)";
            }
            var countCell = $(this).parent().children().length;
            var grille = $(this).parent().children();
            let red_win_verti = 0;
            let yellow_win_verti = 0;
            function tokenplayedVerti() {
                for (let index = 0; index < grille.length; index++) {
                    var element = grille[index];
                    if ($(element).css('background-color') == that.colorone || $(element).css('background-color') == that.colortwo) { } else {
                        $(element).css({
                            'background-color': that.color
                        });
                        that.compteur.html(`Tour ${that.count++}`);
                        let Lastoken = $(element);
                        return Lastoken;
                    }
                }
            }
            let lastto = tokenplayedVerti();
            // btn undo

            $("#undo").on("click", function () {
                lastto.css({
                    "background-color": "white"
                });
            });
            //VICTOIRE HORIZONTAL
            //vitoire P1 

            for (let i = 0; i < countCell; i++) {
                if ($(grille[i]).css("background-color") == that.colorone) {
                    red_win_verti++;
                }
                if ($(grille[i]).css("background-color") == that.colortwo) {
                    red_win_verti = 0;
                }
            }
            if (red_win_verti == 4) {
                setTimeout(function () {
                    alert(`ta gagner ${that.P1}`);
                }, 1);
            }

            //victoire P2 

            for (let j = 0; j < countCell; j++) {
                if ($(grille[j]).css("background-color") == that.colortwo) {
                    yellow_win_verti++;
                }
                if ($(grille[j]).css("background-color") == that.colorone) {
                    yellow_win_verti = 0;
                }
            }
            if (yellow_win_verti == 4) {
                setTimeout(function () {
                    alert(`ta gagner ${that.P2}`);
                }, 1);
            }

            // VICTOIRE HORIZONTALE

            var countCellHori = $(this).parent().parent().children().length;
            var grillHori = $(this).parent().parent().children();
            var red_win_hori = 0;
            var yellow_win_hori = 0;
            var idcellhori = $(lastto).attr('id');

            // VICTOIRE P1 

            for (let i = 0; i < countCellHori; i++) {
                if ($(grillHori[i]).find('#' + idcellhori).css("background-color") == that.colorone) {
                    red_win_hori++;
                }
                if ($(grillHori[i]).find('#' + idcellhori).css("background-color") == that.colortwo) {
                    red_win_hori = 0;
                }
            }
            if (red_win_hori == 4) {
                setTimeout(function () {
                    alert(`ta gagner ${that.P1}`);
                }, 1);
            }

            // VICTOIRE P2

            for (let j = 0; j < countCellHori; j++) {
                if ($(grillHori[j]).find('#' + idcellhori).css("background-color") == that.colortwo) {
                    yellow_win_hori++;
                }
                if ($(grillHori[j]).find('#' + idcellhori).css("background-color") == that.colorone) {
                    yellow_win_hori = 0;
                }
            }
            if (yellow_win_hori == 4) {
                setTimeout(function () {
                    alert(`ta gagner ${that.P2}`);
                }, 1);
            }

            //DIAGONAL

            var CellID = parseInt(idcellhori.split('c')[1]);
            var GrilleID = parseInt(lastto.parent().attr('id').split('g')[1]);
            let diago_p1 = 0;
            for (let index = 0; index < 4; index++) {
                if ($('#g' + (GrilleID + index)).find('#c' + (CellID + index)).css("background-color") == that.colorone) {
                    diago_p1++;
                }
                if (diago_p1 == 4) {
                    setTimeout(function () {
                        alert(`ta gagner ${that.P1}`);
                    }, 1);
                }
                if ($('#g' + (GrilleID + index)).find('#c' + (CellID + index)).css("background-color") == that.colortwo) {
                    diago_p1 = 0;
                }
            }
        });
    }
}
export { P4 };