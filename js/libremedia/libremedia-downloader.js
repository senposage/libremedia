async function downloadStream(match) {
	if (match.params == null) {
		pagePotato(match);
		return;
	}
	var uri = match.params.uri;

	var stream = (await v1GetObject(uri)).object;
	if (stream == null) {
		displayNotification("Download not ready!", 3000);
		return;
	}

	var hostname = window.location.hostname;
	var port = window.location.port;
	if (port != "")
		port = ":" + port;
	var protocol = location.protocol;
	var urlpath = protocol + "//" + hostname + port + "/v1/download/" + uri;
	window.open(urlpath, "_blank");
	pagePotato(match);

	const creator = '<div id="creator"><a href="/creator?uri=' + stream.creators[0].object.uri + '" data-navigo>' + stream.creators[0].object.name + '</a></div>';
	const albumObj = (await v1GetObject(stream.album.object.uri)).object;
	const album = '<div id="album"><a href="/album?uri=' + stream.album.object.uri + '" data-navigo>' + albumObj.name + '</a>';
	const name = '<div id="stream"><a href="/stream?uri=' + uri + '" data-navigo>' + stream.name + '</a></div>';

	var streamName = name;
	if (stream.creators != null)
		streamName += creator;
	if (stream.album != null)
		streamName += album;
	displayNotification("Downloading:<br />" + streamName, 4000);
}

function downloadAlbum(albumURI) {
	//console.log("Not implemented yet! TODO: Download " + albumURI + " as ZIP");
}

function downloadDiscography(creatorURI) {
	//console.log("Not implemented yet! TODO: Download " + creatorURI + " as ZIP");
}
