global.UNITESTS = true;
global.UNITESTS_AUTORUN = true;
if ( process.argv[2] == 'nocolor' ) {
	global.UNITESTS_NOCOLOR = true;
}
require( './Prototype.js' );