/*
The purpose of this script is to validate all of the language files to ensure
that there are no cycles in them to prevent infinite recursion. This must pull
the pattern to match subkeys on via the config, otherwise this could result in
inconsistencies with the localizer logic.
*/
