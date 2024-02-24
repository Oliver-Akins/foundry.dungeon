/*
Takes the system.json and updates all the release-specific properties in it to
help prevent erroneous updates from being made when using the local package for
development.

---

Set the "manifest" property to:
	"url" property + "/releases/latest/download/system.json"

Set the "download" property to:
	"url" property + "/releases/download/{version number}/{zip_name}.zip"
*/
