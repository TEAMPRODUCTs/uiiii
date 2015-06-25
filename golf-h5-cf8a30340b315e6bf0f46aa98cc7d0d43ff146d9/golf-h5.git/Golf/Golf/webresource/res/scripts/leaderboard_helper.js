define([], function () {
    var helper = {};

    helper.formatHandicapString = function (handicap) {
        var strResult;

        if(!handicap) return "";
        else if(handicap ===0) return "E";
        else return (handicap > 0) ? "+" + handicap.toString() : handicap.toString();
    };

    helper.formatTotalScoreString = function(totalScore){
        return totalScore ? totalScore.toString() : "";
    }

    /*记分牌颜色规则如下：
     score_color1：3bogey
     score_color2：2bogey
     score_color3：bogey
     score_color4：par0
     score_color5：birdie/eagle/albatross
     */

    var ScoreColorCSS = {
        97: "score_color_minus_3", 98: "score_color_minus_2", 99: "score_color_minus_1",
        100: "score_color_par",
        101: "score_color_plus_1", 102: "score_color_plus_2", 103: "score_color_plus_3",
        0: "score_empty"
    };

    helper.getScoreColor = function (handicap) {
        var normalizedHandicap;

        if(handicap) normalizedHandicap = handicap + 100;
        else normalizedHandicap = 0;

        return ScoreColorCSS[normalizedHandicap] === undefined ?
            "score_color_plus_3" : ScoreColorCSS[normalizedHandicap];
    };

    helper.refreshIntervel = 6000;

    return helper;
});