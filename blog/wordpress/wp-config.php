<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'yG1|&=,iR%Q*w{zeAU=hny6Ij5}jz.X?i(D#Q*+C.2&wvt,,=rU%W9k2g#YSw:/{' );
define( 'SECURE_AUTH_KEY',  '2SpKQD6o0U*qoQ2(hpy>}e)FyS_BJ@F1Zu;L!^F #JI?P?N yZX%7R9($vXq+M;&' );
define( 'LOGGED_IN_KEY',    'b^74OLI[2x4oMAfy?Ij}hkBv2 eQf1,qm?KG^gS4[f@,fH#PX.l0rKTp5lE-%y.|' );
define( 'NONCE_KEY',        'K611UJ(.,K}vw&zjX>V*([oq`6JaZag9X+G#Cx}M(F>OdXxt kMkWGO#m6W=$s`|' );
define( 'AUTH_SALT',        'NjBWzaUsF^x%M9`5]mw`|^RQP]Q %,/-8ngC?G@}X1?T~Oc9mh7!f9;t:D:WA-YX' );
define( 'SECURE_AUTH_SALT', 'KzRIE/5qL|~.MVc#Mm1nh.K%_zL=@4<$o^5XU}5Dtigml:s$S!@^UmU]b*t9qAml' );
define( 'LOGGED_IN_SALT',   'qn/(5_v^2o,q|u.yX~~KP#I~B106nB0?vZezu;1d>t1LQ$BeB1D-&r(z.>=G7Ice' );
define( 'NONCE_SALT',       'qP]G*-qb=]pioM(2)4zRYBJ)>.jIf2myRI]Bc/j-[eHi+5DK;>tij1~!*W]>[5mx' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
