=== ClashPlayer ===
Contributors: automattic
Donate link: https://example.com/
Tags: custom-background, custom-logo, custom-menu, featured-images, threaded-comments, translation-ready
Requires at least: 6.0
Tested up to: 6.2
Requires PHP: 5.6
Stable tag: 1.0.0
License: GNU General Public License v2 or later

=== Please be aware that this theme has been completed yet. download and use at your own risk. ===

== Description ==

Block Audio/Video Player plugin.

=== Installing ===

1. To use these exercise files, you must have the following installed:
   - WordPress
   - Node and NPM
2. Clone this repository to the `/wp-content/plugins/` folder of your local WordPress installation using the terminal (Mac), CMD (Windows), or a GUI tool like SourceTree.
3. Run `npm install` in terminal to install dependencies.
4. Run `npm run start` to start the development process.
5. In WordPress, activate the "ClashPlayer" plugin.

=== Quick Start ===

Clone or download this repository, change its name to something else (like, say, `megatherium-is-awesome`), and then you'll need to do a six-step find and replace on the name in all the templates.

1. Search for `'clashplayer'` (inside single quotations) to capture the text domain and replace with: `'megatherium-is-awesome'`.
2. Search for `clashplayer` to capture all the functions names and replace with: `megatherium_is_awesome_`.
3. Search for `Text Domain: clashplayer` in `style.css` and replace with: `Text Domain: megatherium-is-awesome`.
4. Search for <code>&nbsp;clashplayer</code> (with a space before it) to capture DocBlocks and replace with: <code>&nbsp;Megatherium_is_Awesome</code>.
5. Search for `clashplayer-` to capture prefixed handles and replace with: `megatherium-is-awesome-`.
6. Search for `CLASHPLAYER` (in uppercase) to capture constants and replace with: `MEGATHERIUM_IS_AWESOME_`.

Then, update the stylesheet header in `style.css`, the links in `footer.php` with your own information and rename `clashplayer.pot` from `languages` folder to use the theme's slug. Next, update or delete this readme.


=== Requirements ===

`clashplayer` requires the following dependencies:

- [Node.js](https://nodejs.org/)
- [Composer](https://getcomposer.org/)


=== Setup ===

Clone the repo

git clone git@github.com:raythompsonwebdev/clashplayer.git

To start using all the tools that come with `clashplayer` you need to install the necessary Node.js and Composer dependencies :

Install NPM packages :

npm install

or

yarn install

or

pnpm install

Install Composer packages :

$ composer install
$ npm install

=== Available CLI commands ===

`clashplayer` comes packed with CLI commands tailored for WordPress theme development :

- `composer lint:wpcs` : checks all PHP files against [PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/).
- `composer lint:php` : checks all PHP files for syntax errors.
- `composer make-pot` : generates a .pot file in the `languages/` directory.
- `npm run compile:css` : compiles SASS files to css.
- `npm run compile:rtl` : generates an RTL stylesheet.
- `npm run watch` : watches all SASS files and recompiles them to css when they change.
- `npm run lint:scss` : checks all SASS files against [CSS Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/css/).
- `npm run lint:js` : checks all JavaScript files against [JavaScript Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/).
- `npm run bundle` : generates a .zip archive for distribution, excluding development and system files.

Now you're ready to go! The next step is easy to say, but harder to do: make an awesome WordPress theme. :)

Good luck!

=== Recommended VS Code extensions ===

- [ESLint](https://marketplace.visualstudio.com/itemdetails?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/itemdetails?itemName=esbenp.prettier-vscode)
- [stylelint](https://marketplace.visualstudio.com/itemdetails?itemName=shinnn.stylelint)

== Frequently Asked Questions ==

= Does this theme support any plugins? =

clashplayer includes support for clashplayer-plugin and clashplayer plugins.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is stored in the /assets directory.
2. This is the second screen shot

== Changelog ==

= 1.0.0 - Jan 21 2024 =

- Initial release

== Upgrade Notice ==

= 1.0 =
Upgrade notices describe the reason a user should upgrade. No more than 300 characters.

= 0.5 =
This version fixes a security related bug. Upgrade immediately.



