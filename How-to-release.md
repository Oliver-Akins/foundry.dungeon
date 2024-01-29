1. Make sure that the `version` is the correct version number.
2. Copy the `system.json` in order to make the version-specific manifest
3. Update the `download` to point to the version-specific file from Github
4. Compress all of the necessary files and folders
5. Create the release on Github with the correct tag being created
6. Upload the compressed files and the version-specific manifest file
7. Save the release as draft, prerelease, or stable (pre-releases won't be caught in the `/latest` URL that is used to check for updates)