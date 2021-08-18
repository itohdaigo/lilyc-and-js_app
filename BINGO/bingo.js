(function() {
    'use strict';

    var slotTimer;
    var drumRoll = document.getElementById('audio_drum');
    var cymbal = document.getElementById('audio_cymbal');
    var bingoNumArray = Array.from(new Array(75)).map((v, i) => i+1)
    var bingoNumer = "0";
    var setNum = "0";
    var spintimes = 0;


    var vm = new Vue({
        el: '#app',
        data: {
            items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12','13','14','15',
                    '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
                    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45',
                    '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
                    '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75',],
            panel1:"0",
            panel10:"0",
            spinButton:false,
            stopButton: true,
            pStyle:"",
            bingoId:"0"
        },
        methods: {
            runSlot: function () {

                this.spinButton = true;
                this.stopButton = false;

                var bingoNum = bingoNumArray.length;
                if (bingoNum==0){
                    return;
                }

                bingoNumer = Math.floor(Math.random() * bingoNum).toString();
                setNum = bingoNumArray[bingoNumer];
                if (parseInt(setNum) < 10){
                    setNum = '0' + setNum;
                }
                setNum = setNum.toString();

                this.panel1 = setNum.substr(0, 1);
                this.panel10 = setNum.substr(1, 2);

                slotTimer = setTimeout(this.runSlot, 25);
                sound();

            },

            runStop: function () {
                clearInterval(slotTimer);
                this.spinButton = false;
                this.stopButton = true;

                bingoNumArray.splice(parseInt(bingoNumer),1);
                var id = setNum;
                $('#' + id).addClass("unmatched");

                if(spintimes > 0){
                  sound2();
                }
                spintimes += 1;
            }

        },
        directives: {
            disable: function (el, binding) {
                el.disabled = binding.value
            }
        }
    });

    $("body").keypress(function (event) {
        if (event.which === 13) {
            console.log("ENTER");
            $('#spinButton').click();
            $('#stopButton').click();
        }
    });

})();
function sound()
{
	// [ID:sound-file]の音声ファイルを再生[play()]する
	document.getElementById( 'sound-file' ).play();
}
function sound2()
{
  document.getElementById( 'sound-file' ).pause();// チャカチャカ鳴るやつを一時停止する
  document.getElementById( 'sound-file' ).currentTime = 0;//最初の時間に戻す。
	// [ID:sound-file2]の音声ファイルを再生[play()]する
	document.getElementById( 'sound-file2' ).play() ;//ピロン♪を鳴らす
}
function sound3()
{
	// [ID:sound-file]の音声ファイルを再生[play()]する
	document.getElementById( 'sound-file3' ).play();
}
