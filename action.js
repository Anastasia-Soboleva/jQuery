$('#modal').hide();
$('#modal').html('<div align="right" id="close">[X]</div><div id="res" align="center"></div>');
	$('#close').click(function() {
			$('#modal').hide();
		})
function translation (ukr, eng) {
	this.ukr = ukr;
	this.eng = eng;
	this.check = function (ukrTxt) {
		let isRight = false;
			for (let word of ukr) {
		 		if (word == ukrTxt) {
		 			isRight = true;
				}
			}
		return isRight;
	}
}

var words = [];
words.push(new translation (['студентка', 'студент', 'учень'], 'student'));
words.push(new translation (['взяти', 'беручи', 'брати', 'прийняти', 'приймати', 'прийматися', 'взяття', 'збір', 'захоплення'], 'take'));
words.push(new translation (['отримати', 'одержати', 'отримувати', 'одержувати'], 'receive'));
words.push(new translation (['заробляти', 'заробити', 'заслужити', 'отримувати'], 'earn'));
words.push(new translation (['красти', 'украсти', 'вкрадена річ', ' прослизнути', 'крадіжка', 'майно'], 'steal'));
words.push(new translation (['таємниця', 'секрет', 'по секрету', 'таємний', 'секретний', 'негласний'], 'secret'));
words.push(new translation (['відкритий', 'розкритися', 'розкрити', 'відкрито', 'відкривати', 'отвір', 'доступний', 'відвертий', 'м\'який'], 'open'));
words.push(new translation (['покриття', 'покрив', 'покрити', 'прикрити', 'охоплювати', 'покривати', 'кришка', 'обкладинка', 'чохол'], 'cover'));
words.push(new translation (['з\'ясувавши', 'дізнатися', 'з\'ясовувати', 'довідатися', 'вивідати', 'дізнаватися', ' допитуватися'], 'find out'));
words.push(new translation (['ховати', 'приховувати ', 'приховати', 'сховати', 'ховатися', 'схованка', 'шкура', 'шкура', 'шкура'], 'hide'));
words.push(new translation (['появляться', 'з\'являтися', 'з\'явитися', 'фігурувати', 'видаватися', 'постати'], 'appear'));
words.push(new translation (['зовнішність', 'зовнішній вигляд', 'вигляд', 'поява'], 'appearance'));
words.push(new translation (['пригода', 'пригод', 'авантюра', 'ризикувати'], 'adventure'));
words.push(new translation (['нещастя', 'напасть', 'біда'], 'misfortune'));
words.push(new translation (['знаменитість', 'популярність', 'слава'], 'celebrity'));
words.push(new translation (['айстра'], 'aster'));
words.push(new translation (['катастрофа', 'лихо', 'біда'], 'disaster'));
words.push(new translation (['відчутний', 'відчутний', 'матеріальний', 'видимий', 'який можна осягнути', 'відчутний факт', 'реальність'], 'tangible'));
words.push(new translation (['фінансовий'], 'financial'));
words.push(new translation (['вимірний'], 'measurable'));
words.push(new translation (['золото', 'колір золота', 'багатство'], 'gold'));
//console.log(words);
function test () {
	this.right = 0;
	this.wrong = 0;
	this.generate = function () {
		let q = [];
		for (let i=0; i<10; i++) {
			let n = Math.floor(Math.random()*21);
			let contains = false;
			for (let x of q) {
				if(n == x) {
					contains = true;
				}
			}
			if(contains) {
				i--;
				continue;
			}
			else {
				q[i] = n;
			}
		}
		console.log(q);
		let quest = [];
		for (let i=0; i<10; i++) {
			quest[i] = words[q[i]];
		}
		return quest;
	}
}

$('#card').click(async function () {
	let x = new test();
	let answ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	let questions = x.generate();
	$('#nav').text("<span id=\"num\">1</span>/10");
	let qn = 0;
	$('#cardTxt').text(questions[qn].eng);
	$('#num').text(qn+1);
	$('#next').click(function () {
		if (qn<9) {
			let w = $('#txt').val().toString();
			w = w.replace(/^\s+(.*)\s+$/uig, '$1');
			answ[qn] = Number(questions[qn].check(w));
			tp = answ.reduce((a, b) => a + b, 0);
			$('#t').text(tp);
			fp = qn - tp + 1;
			$('#f').text(fp);
			qn++;
			$('#cardTxt').text(questions[qn].eng);
			$('#num').text(qn+1);
			$("#txt").val('');
			}
			else {
				tp = answ.reduce((a, b) => a + b, 0);
				$('#t').text(tp);
				fp = qn - tp + 1;
				$('#f').text(fp);
				if (tp < 2) {
				$('#res').text('You are a beginner');
				}
				else if (tp < 5) {
				$('#res').text('Well, you know some foreign words!');
				}
				else if (tp < 8) {
				$('#res').text('Well done! Your English is good');
				}
				else {
				$('#res').text('That\'s great! Your English is fluent');
				}
				$('#modal').show();
			}
	});

});
