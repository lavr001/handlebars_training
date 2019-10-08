// Your web app's Firebase configuration
let firebaseConfig = {
	apiKey: "AIzaSyCAvJIz8dko6qln-X3AiST3QjvBKBKjhVw",
	authDomain: "handlebars-f2f56.firebaseapp.com",
	databaseURL: "https://handlebars-f2f56.firebaseio.com",
	projectId: "handlebars-f2f56",
	storageBucket: "",
	messagingSenderId: "53695549404",
	appId: "1:53695549404:web:d829fa2a25941b84288919"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Handlebars.registerHelper('format_name', (property1, property2) => {
	return 'My name is <b>' + property1 + ' </b> and I live at <b>' + property2 + ' </b>';
});
Handlebars.registerHelper('format_phone_number', property => {
	if (property) {
		let phone = property.toString();
		return '(' + phone.substring(0, 3) + ')' + phone.substring(3, 6) + '-' + phone.substring(6);
	}
});
// Handlebars.registerPartial('characterDetailsPartial', document.querySelector('#character_details_partial').innerHTML);
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
$(document).ready(() => {
	let characterTemplate = document.querySelector('#character_template').innerHTML;
	let compiledCharacterTemplate = Handlebars.compile(characterTemplate);

	let characterID = getParameterByName('id');

	$.ajax('./cast_character_details.html').done(charDetailsPartial => {
		$('body').append(charDetailsPartial);
		Handlebars.registerPartial('characterDetailsPartial', $('#character_details_partial').html());
	});

	let db_ref = firebase.database().ref();
	db_ref.on('value', snap => {
		if (document.querySelector('.page_cast_details')) {
			document.querySelector('.character_list_container').innerHTML = compiledCharacterTemplate(snap.val().characters[characterID]);
		} else {
			document.querySelector('.character_list_container').innerHTML = compiledCharacterTemplate(snap.val());
		}
	});

	$('.character_list_container').on('click', '.view_details', () => {
		console.log('Button clicked');
	});


});
